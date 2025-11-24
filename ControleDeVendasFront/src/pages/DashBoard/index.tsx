import StatCard from '../../components/StatCard';

export default function Dashboard() {
  const items = Array.from({ length: 6 }).map((_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    status: i % 2 === 0 ? "Ativo" : "Inativo",
  }));

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <StatCard label="Usuários" value="1.234" />
        <StatCard label="Ativos" value="987" />
        <StatCard label="Novos" value="45" />
      </div>

      <div className="mt-6 bg-white/5 p-4 rounded-md">
        <h3 className="font-semibold mb-2">Últimos itens</h3>

        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-400">
              <th className="py-2">ID</th>
              <th>Nome</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-t border-white/5">
                <td className="py-2">{it.id}</td>
                <td>{it.name}</td>
                <td className="text-sm">{it.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
