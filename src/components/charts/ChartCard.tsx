export default function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded shadow p-4 mb-4">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      {children}
    </div>
  );
}
