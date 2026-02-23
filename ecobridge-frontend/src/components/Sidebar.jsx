import { Link } from "react-router-dom";
import { LayoutDashboard, Trash2 } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-green-700 text-white p-5">
      <h1 className="text-xl font-bold mb-8">EcoBridge</h1>

      <nav className="space-y-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 hover:bg-green-600 p-2 rounded"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/log-waste"
          className="flex items-center gap-2 hover:bg-green-600 p-2 rounded"
        >
          <Trash2 size={18} />
          Log Waste
        </Link>
      </nav>
    </div>
  );
}
