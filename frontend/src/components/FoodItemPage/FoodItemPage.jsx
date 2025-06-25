import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";

import { Send, Utensils, Info, Zap, ChefHat } from "lucide-react";

const API_URL = import.meta.env.VITE_BACKEND_URL;

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
        console.log("Fetched food info:", res.data); // DEBUG LOG
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading delicious details...</p>
        </div>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center p-8">
          <ChefHat className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 text-lg font-medium">Food item not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="relative">
            <img
              src={info.imageUrl || info.image || "/fallback.jpg"}
              alt={info.name || "Food"}
              className="w-full h-80 object-cover"
              onError={(e) => {
                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNEMUQ1REIiLz4KPHBhdGggZD0iTTE4MCA4MEgyMjBWMTIwSDE4MFY4MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE3MCAyMDBIMjMwVjI0MEgxNzBWMjAwWiIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNMTUwIDEzMEgxODBWMTcwSDE1MFYxMzBaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0yMjAgMTMwSDI1MFYxNzBIMjIwVjEzMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+";
              }}
              />
             
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{info.name || "Delicious Dish"}</h1>
              <div className="flex items-center gap-2 text-emerald-200">
                <Utensils className="h-5 w-5" />
                <span className="text-lg">Culinary Delight</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Description Section */}
          <div className="lg:col-span-2 space-y-6">
            {info.description && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Info className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800">About this dish</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">{info.description}</p>
              </div>
            )}

            {/* AI Chat Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Ask about this food</h2>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    className="w-full border-2 border-slate-200 rounded-xl p-4 pr-12 resize-none focus:border-emerald-500 focus:ring-0 transition-colors duration-200 placeholder-slate-400"
                    placeholder="Ask me anything about this dish - ingredients, nutrition, preparation tips..."
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    rows={3}
                  />
                  <button
                    onClick={askQuestion}
                    disabled={asking || !userQuery.trim()}
                    className="absolute bottom-3 right-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors duration-200"
                  >
                    {asking ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </button>
                </div>
                
                {answer && (
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-400 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-1 bg-emerald-100 rounded-full mt-1">
                        <Zap className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-emerald-800 mb-1">AI Assistant</p>
                        <p className="text-slate-700 whitespace-pre-line leading-relaxed">{answer}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Nutrition Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Nutrition Facts</h3>
              </div>
              
              {Array.isArray(info.nutrition) && info.nutrition.length > 0 ? (
                <div className="space-y-3">
                  {info.nutrition.map((n, i) => (
                    <div 
                      key={i} 
                      className="flex items-start justify-between py-2 border-b border-slate-100 last:border-b-0"
                    >
                      <span 
                        className="text-sm text-slate-600 flex-1 leading-relaxed" 
                        dangerouslySetInnerHTML={{ __html: n }} 
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Info className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="text-slate-500">No nutritional information available</p>
                </div>
              )}
            </div>

            {/* Quick Tips Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-lg p-6 border border-amber-100">
              <h3 className="text-lg font-bold text-amber-800 mb-3">💡 Quick Tips</h3>
              <ul className="text-sm text-amber-700 space-y-2">
                <li>• Ask about ingredient substitutions</li>
                <li>• Learn about health benefits</li>
                <li>• Get serving suggestions</li>
                <li>• Discover cooking techniques</li>
              </ul>
            </div>

            {/* Popular Questions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Popular Questions</h3>
              <div className="space-y-2">
                {[
                  "What are the health benefits?",
                  "How many calories does it have?",
                  "What ingredients are used?",
                  "How is this prepared?"
                ].map((question, i) => (
                  <button
                    key={i}
                    onClick={() => setUserQuery(question)}
                    className="w-full text-left p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors duration-200 text-sm text-slate-600 hover:text-slate-800"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodItemPage;