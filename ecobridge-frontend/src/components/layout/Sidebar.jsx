import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
  const { user } = useAuth();
  return (
    <aside className="w-72 bg-green-800 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">EcoBridge</h1>

      <nav className="space-y-6">
        <Link to="/dashboard" className="block hover:text-green-200">
          Dashboard
        </Link>

        {/* BUSINESS USER */}
        {user.role === "business" && (
          <>
            <Link to="/log-waste">Log Waste</Link>
            <Link to="/pickups">Pickup Requests</Link>
          </>
        )}

        {/* PARTNER USER */}
        {user.role === "partner" && (
          <>
            <Link to="/marketplace">Waste Marketplace</Link>
          </>
        )}

        {/* ADMIN USER */}
        {user.role === "admin" && (
          <>
            <Link to="/analytics">Analytics</Link>
          </>
        )}

        <Link to="/notifications">Notifications</Link>
      </nav>
    </aside>
  );
}
