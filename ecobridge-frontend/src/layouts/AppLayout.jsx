import { Link } from "react-router-dom";

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white p-5 space-y-4">
        <h1 className="text-xl font-bold"> Ecobridge</h1>

        <nav className="flex flex-col space-y-3">
          <Link to="/">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/log-waste">Log Waste</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
