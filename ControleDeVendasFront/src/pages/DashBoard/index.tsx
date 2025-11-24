import Card from '../../components/Card';
import Button from '../../components/Button';

const kpis = [
  { label: 'Receita prevista', value: 'R$ 2,8 mi', change: '+12,4%', changeLabel: 'vs mês anterior' },
  { label: 'Pedidos ativos', value: '312', change: '+58', changeLabel: 'em produção' },
  { label: 'MRR', value: 'R$ 645 mil', change: '+8,3%', changeLabel: 'crescimento YoY' },
];

const pipeline = [
  { stage: 'Prospecção', value: 38, amount: 'R$ 420k' },
  { stage: 'Negociação', value: 52, amount: 'R$ 690k' },
  { stage: 'Fechamento', value: 74, amount: 'R$ 310k' },
];

const recentDeals = [
  { id: 'OP-9823', client: 'Grupo Nova Era', owner: 'Fernanda Lima', status: 'Concluído', value: 'R$ 180k' },
  { id: 'OP-9814', client: 'Latam Retail', owner: 'Lucas Martins', status: 'Proposta enviada', value: 'R$ 120k' },
  { id: 'OP-9799', client: 'SmartFit Labs', owner: 'João Ribeiro', status: 'Discovery', value: 'R$ 95k' },
  { id: 'OP-9781', client: 'Mercadão do Sul', owner: 'Ana Costa', status: 'Concluído', value: 'R$ 210k' },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <header className="flex flex-col gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-secondary/70 font-semibold">Operações</p>
            <h1 className="text-4xl font-black">Dashboard executivo</h1>
            <p className="text-slate-400 max-w-2xl mt-2">
              Acompanhe desempenho comercial, saúde do pipeline e indicadores financeiros em tempo real.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => (window.location.href = '/vendas')}>
              Atualizar forecast
            </Button>
            <Button variant="ghost" onClick={() => (window.location.href = '/clientes')}>
              Ver clientes críticos
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {kpis.map((kpi) => (
            <Card key={kpi.label} className="bg-white/5 border border-white/10 text-white">
              <p className="text-xs uppercase tracking-wide text-slate-300">{kpi.label}</p>
              <p className="text-3xl font-bold mt-2">{kpi.value}</p>
              <p className="text-sm text-emerald-400 font-semibold">{`${kpi.change} ${kpi.changeLabel}`}</p>
            </Card>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">Pipeline comercial</h2>
                <p className="text-sm text-slate-400">Conversão média de 31,4% nas últimas 6 semanas</p>
              </div>
              <Button variant="outline" onClick={() => undefined}>
                Exportar pipeline
              </Button>
            </div>
            <div className="space-y-4">
              {pipeline.map((stage) => (
                <div key={stage.stage}>
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>{stage.stage}</span>
                    <span>{stage.amount}</span>
                  </div>
                  <div className="h-2 mt-2 bg-white/10 rounded-full">
                    <div className="h-2 rounded-full bg-secondary" style={{ width: `${stage.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-4">Performance geral</h3>
            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Conversão do funil</p>
                <p className="text-2xl font-bold text-white">32,8%</p>
                <p className="text-emerald-400 text-xs">+4,6 p.p. vs mês anterior</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Tempo médio de ciclo</p>
                <p className="text-2xl font-bold text-white">18 dias</p>
                <p className="text-slate-400 text-xs">redução de 3 dias</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Clientes com risco</p>
                <p className="text-2xl font-bold text-white">6 contas</p>
                <p className="text-amber-400 text-xs">atendimento dedicado em andamento</p>
              </div>
            </div>
          </Card>
        </section>

        <Card className="bg-white border border-white/10 text-slate-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Negócios recentes</h2>
              <p className="text-sm text-slate-500">Atualizado às 10h12 — dados em tempo real</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => undefined}>Download</Button>
              <Button variant="primary" onClick={() => undefined}>Novo negócio</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-400">
                  <th className="py-3">ID</th>
                  <th>Cliente</th>
                  <th>Responsável</th>
                  <th>Status</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {recentDeals.map((deal) => (
                  <tr key={deal.id}>
                    <td className="py-3 font-semibold text-slate-900">{deal.id}</td>
                    <td>{deal.client}</td>
                    <td className="text-slate-500">{deal.owner}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${deal.status === 'Concluído' ? 'bg-emerald-100 text-emerald-700' : deal.status === 'Proposta enviada' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                        {deal.status}
                      </span>
                    </td>
                    <td className="font-semibold text-slate-900">{deal.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </main>
  );
}
