import { useState } from "react";
import { DashboardContext } from "../context/DashboardContext";

export default function DashboardProvider({ children }) {
  const [stats, setStats] = useState({
    totalWaste: 0,
    impactScore: 0,
  });

  const updateStats = (data) => {
    setStats((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <DashboardContext.Provider value={{ stats, updateStats }}>
      {children}
    </DashboardContext.Provider>
  );
}
