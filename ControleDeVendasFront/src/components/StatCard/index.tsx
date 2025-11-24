interface StatCardProps {
  label: string;
  value: string | number;
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="p-4 rounded-xl shadow bg-white border">
      <h2 className="text-gray-500 text-sm font-medium">{label}</h2>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
