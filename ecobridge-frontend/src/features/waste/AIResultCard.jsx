export default function AIResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="mt-6 bg-white shadow-lg rounded-xl p-6 border">
      <h2 className="text-lg font-semibold text-green-700 mb-4">
        ♻️ AI Analysis Result
      </h2>

      <div className="space-y-2">
        <p>
          <strong>Waste Type:</strong> {result.type}
        </p>
        <p>
          <strong>Reuse Potential:</strong> {result.reuse}
        </p>
        <p>
          <strong>Suggested Partner:</strong> {result.partner}
        </p>
        <p>
          <strong>Impact Saved:</strong> {result.impact}
        </p>
      </div>
    </div>
  );
}
