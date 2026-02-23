import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import LogWaste from "../pages/LogWaste";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/log-waste", element: <LogWaste /> },
]);
