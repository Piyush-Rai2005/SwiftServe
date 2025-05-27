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

dotenv.config();

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://yourfrontend.com"]
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

    const prompt = `Give a short paragraph about the food item "${food.name}". Then list its nutritional facts in bullet points.`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    const [description, ...nutritionLines] = response.split("\n").filter(Boolean);

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

    // CHANGE MADE HERE:
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });
    // You were previously using "models/gemini-1.5-pro-001" here.

    const prompt = `You are an expert in nutrition. A user has a question about the food item "${food.name}". The question is: "${question}"`;

    const result = await model.generateContent(prompt);
    const answer = await result.response.text();

    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini question answering failed", details: err.message });
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