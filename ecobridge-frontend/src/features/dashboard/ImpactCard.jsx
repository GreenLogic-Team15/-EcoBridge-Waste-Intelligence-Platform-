import { useDashboard } from "../../hooks/useDashboard";

export default function ImpactWidget() {
  const { stats } = useDashboard();

  return (
    <div className="card">
      <h3>Environmental Impact</h3>

      <p>Total Waste: {stats.totalWaste} kg</p>
      <p>CO₂ Saved: {stats.co2Saved}</p>
      <p>Impact Score: {stats.impactScore}</p>
    </div>
  );
}
