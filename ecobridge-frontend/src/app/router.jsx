import { createBrowserRouter } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";

import Register from "../pages/register";

import Dashboard from "../pages/Dashboard";
import WasteLog from "../pages/WasteLog";
import Notifications from "../pages/Notifications";
import Pickups from "../pages/Pickups";
import Analytics from "../pages/Analytics";
import Marketplace from "../pages/Marketplace";

export const router = createBrowserRouter([
  // public onboarding / auth routes
  { path: "/onboarding", element: <Register /> },
  /* {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "log-waste",
        element: <WasteLog />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
    ],
  }, */

  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> }, // default page
      { path: "dashboard", element: <Dashboard /> },
      { path: "log-waste", element: <WasteLog /> },
      { path: "pickups", element: <Pickups /> },
      { path: "notifications", element: <Notifications /> },
      { path: "analytics", element: <Analytics /> },
      { path: "marketplace", element: <Marketplace /> },
    ],
  },
]);
