import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);  // <-- new

  useEffect(() => {
    const loadData = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);

        try {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/details`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });

          if (res.data.success && res.data.user) {
            setAdmin(res.data.user.role === "admin");
          } else {
            setAdmin(false);
          }
        } catch (err) {
          console.error("Error verifying user:", err);
          setAdmin(false);
        }
      }
      setLoading(false);  // <-- finished checking
    };
    loadData();
  }, []);

  const contextValue = {
    token,
    setToken,
    admin,
    setAdmin,
    loading,  // <-- provide loading state
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
