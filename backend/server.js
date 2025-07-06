import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import foodModel from "./models/foodModel.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));

// DB connection
connectDB();

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, { apiVersion: "v1" });

// API routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Gemini route: Get AI-generated food description + nutrition
app.get("/api/food-info/:id", async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) return res.status(404).json({ error: "Food not found" });

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    const prompt = `Give a short paragraph about the food item "${food.name}". Then list its nutritional facts in bullet points.Also if available, provide a brief description of its health benefits.`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
const [description, ...nutritionLines] = response
  .split("\n")
  .map(line => line.trim())
  .filter(line => line);  // removes empty lines

    res.json({
      name: food.name,
      imageUrl: food.image,
      description,
      nutrition: nutritionLines,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini info fetch failed", details: err.message });
  }
});


// Gemini route: Answer a user question about a food item
app.post("/api/ask-food-question", async (req, res) => {
  try {
    const { foodId, question } = req.body;
    const food = await foodModel.findById(foodId);
    if (!food) return res.status(404).json({ error: "Food not found" });

   const menuResponse = await axios.get(`${process.env.FRONTEND_URL}/api/food/list`);
    const menu = Array.isArray(menuResponse.data?.data) ? menuResponse.data.data : [];

    if (menu.length === 0) {
      return res.status(404).json({ error: "Menu not found or empty" });
    }

    const menuItems = menu.map(item => `- ${item.name}`).join('\n');

    // CHANGE MADE HERE:
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    // You were previously using "models/gemini-1.5-pro-001" here.

    const menuDefinitionNote = `NOTE: In this conversation, the term "menu" always refers to the food menu of our restaurant ${menuItems} (not a home meal, picnic, or general food list).`;
    const prompt = `${menuDefinitionNote} You are an expert in nutrition. A user has a question about the food item "${food.name}". The question is: "${question}"`;

    const result = await model.generateContent(prompt);
    const answer = await result.response.text();

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini question answering failed", details: err.message });
  }
});


app.post("/api/ask-menu-recommendation", async (req, res) => {
  try {
    const { foodId, question } = req.body;

    const food = await foodModel.findById(foodId);
    if (!food) return res.status(404).json({ error: "Food not found" });

    const menuResponse = await axios.get(`${process.env.FRONTEND_URL}/api/food/list`);
    const menu = menuResponse.data;

if (!Array.isArray(menu) || menu.length === 0) {
  return res.status(404).json({ error: "Menu not found or empty" });
}

const menuItems = menu.map(item => `- ${item.name}`).join('\n');

    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    const menuDefinitionNote = `NOTE: In this conversation, the term "menu" always refers to the food menu of our restaurant ${menuItems} (not a home meal, picnic, or general food list).`;
    const prompt = `${menuDefinitionNote}
You are a professional food pairing assistant. A user is browsing a food menu and wants to know what pairs well with "${food.name}".

Here is the full menu of available food items:
${menuItems}

Based only on the items from the list above, suggest the best item(s) that would pair well with "${food.name}". Avoid asking for more context. If none of the items pair well, say so clearly. Be concise but informative.
`;

    const result = await model.generateContent(prompt);
    const answer = await result.response.text();

    res.json({ answer });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini menu recommendation failed", details: err.message });
  }
});



// Health check
app.get("/", (req, res) => {
  res.send("Api working");
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});