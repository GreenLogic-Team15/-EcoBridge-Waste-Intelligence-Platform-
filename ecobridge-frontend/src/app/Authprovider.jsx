import { useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: "Demo User",
    role: "business", // Change to "collector" to test collector view
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
