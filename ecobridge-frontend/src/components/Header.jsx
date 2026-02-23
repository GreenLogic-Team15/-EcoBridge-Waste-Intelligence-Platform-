import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="h-16 bg-white shadow flex items-center px-6 justify-between">
      <h2 className="font-semibold text-gray-700">SME Waste Intelligence Dashboard</h2>
      <div>
        <Link to="/onboarding" className="cta-btn px-4 py-1 rounded text-sm">
          Onboarding
        </Link>
      </div>
    </div>
  );
}
