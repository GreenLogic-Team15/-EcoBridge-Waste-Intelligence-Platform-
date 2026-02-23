import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LogWaste from "./pages/LogWaste";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Waste logging */}
        <Route path="/log-waste" element={<LogWaste />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/* export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600">
        EcoBridge Frontend Ready
      </h1>
    </div>
  );
} */

/* export default function App() {
  return (
    <h1 className="text-3xl font-bold text-green-600">Tailwind is working</h1>
  );
} */
