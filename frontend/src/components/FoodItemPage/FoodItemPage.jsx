import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function FoodItemPage() {
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const [userQuery, setUserQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/food-info/${id}`);
        setInfo(res.data);
      } catch (err) {
        console.error("Error fetching food info:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const askQuestion = async () => {
    if (!userQuery.trim()) return;
    setAsking(true);
    try {
      const res = await axios.post(`${API_URL}/api/ask-food-question`, {
        foodId: id,
        question: userQuery,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error("Error asking question:", err);
      setAnswer("An error occurred. Please try again.");
    } finally {
      setAsking(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!info) return <p className="text-center mt-10 text-red-500">Food item not found.</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <img src={info.imageUrl} alt="Food" className="w-full h-auto rounded" />
      <h2 className="text-2xl font-bold mt-2">{info.name}</h2>
      <p className="mt-2">{info.description}</p>

      <div className="mt-4">
        <h3 className="font-semibold">Nutritional Info:</h3>
        <ul className="list-disc list-inside">
          {info.nutrition.map((n, i) => (
            <li key={i}>{n}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <input
          className="border p-2 w-full rounded"
          placeholder="Ask something about this food..."
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
        />
        <button
          onClick={askQuestion}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={asking}
        >
          {asking ? "Asking..." : "Ask"}
        </button>
        {answer && (
          <p className="mt-4 bg-gray-100 p-3 rounded shadow-sm">{answer}</p>
        )}
      </div>
    </div>
  );
}

export default FoodItemPage;
