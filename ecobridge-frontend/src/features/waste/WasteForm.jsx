import { useState } from "react";
import { useDashboard } from "../../hooks/useDashboard";
import AIResultCard from "./AIResultCard";

export default function WasteForm() {
  // form state
  const [formData, setFormData] = useState({
    description: "",
    category: "",
    quantity: "",
    image: null,
  });

  const [loading, _setLoading] = useState(false);
  const [message, _setMessage] = useState("");

  const [aiResult, setAiResult] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);

  const { updateStats } = useDashboard();

  // handle text inputs
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // handle file upload
  function handleFileChange(e) {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  }

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoadingAI(true);
    setAiResult(null);

    // simulate AI processing delay
    setTimeout(() => {
      const result = {
        type: "Plastic Packaging",
        reuse: "High",
        partner: "EcoRecycle Ltd.",
        impact: "2.3kg landfill waste avoided",
      };

      setAiResult(result);

      //update dashboard stats
      updateStats({
        totalWaste: Number(formData.quantity),
        impactScore: 75,
      });

      // updateStats({
      //   totalWaste: data.weight,
      //   co2Saved: data.co2_saved,
      //   impactScore: data.impact_score,
      // });

      setLoadingAI(false);
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow space-y-4 max-w-xl"
    >
      <h2 className="text-xl font-semibold">Log Waste</h2>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Waste Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
          placeholder="Describe the waste..."
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="">Select category</option>
          <option value="organic">Organic</option>
          <option value="plastic">Plastic</option>
          <option value="metal">Metal</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      {/* Quantity */}
      <div>
        <label className="block mb-1 font-medium">Quantity (kg)</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-1 font-medium">Upload Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Waste"}
      </button>
      {message && <p className="mt-4 font-medium">{message}</p>}
      {loadingAI && (
        <p className="mt-4 text-green-700">🤖 AI analyzing waste...</p>
      )}

      <AIResultCard result={aiResult} />
    </form>
  );
}
