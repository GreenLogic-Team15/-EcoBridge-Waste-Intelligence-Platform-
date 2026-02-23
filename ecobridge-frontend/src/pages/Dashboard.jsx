import ImpactCard from "../features/dashboard/ImpactCard";

export default function Dashboard() {
  const stats = [
    { title: "Waste Logged", value: 128, unit: "kg" },
    { title: "Materials Reused", value: 76, unit: "kg" },
    { title: "CO₂ Saved", value: 54, unit: "kg" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <ImpactCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}
