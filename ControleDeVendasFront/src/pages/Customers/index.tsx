import Card from '../../components/Card';
import Button from '../../components/Button';

const customers = [
  { id: 'CLI-1021', name: 'Ateliê Horizonte', segment: 'Varejo', city: 'São Paulo', mrr: 'R$ 8.200', trend: '+12%', status: 'Ativo' },
  { id: 'CLI-0987', name: 'Grupo Nova Era', segment: 'Serviços', city: 'Porto Alegre', mrr: 'R$ 5.430', trend: '+4%', status: 'Ativo' },
  { id: 'CLI-0875', name: 'Mercadão do Sul', segment: 'Distribuição', city: 'Curitiba', mrr: 'R$ 4.910', trend: '+8%', status: 'Risco' },
  { id: 'CLI-0814', name: 'SmartFit Labs', segment: 'Tecnologia', city: 'Florianópolis', mrr: 'R$ 7.120', trend: '+19%', status: 'Expansão' },
  { id: 'CLI-0780', name: 'Bistrô Origem', segment: 'Food Service', city: 'Belo Horizonte', mrr: 'R$ 3.870', trend: '+2%', status: 'Ativo' },
];

const statusStyles: Record<string, string> = {
  'Ativo': 'bg-emerald-100 text-emerald-700',
  'Expansão': 'bg-cyan-100 text-cyan-700',
  'Risco': 'bg-amber-100 text-amber-700',
};

const highlights = [
  { label: 'Clientes ativos', value: '128', detail: '8 novos esta semana' },
  { label: 'Churn trimestral', value: '1.2%', detail: 'em queda de 0.4 p.p.' },
  { label: 'Ticket médio', value: 'R$ 5.840', detail: 'últimos 30 dias' },
];

export default function Customers() {
  return (
    <main className="px-6 py-10 bg-gradient-to-b from-slate-50 to-white min-h-screen">
      <header className="max-w-7xl mx-auto flex flex-col gap-6 mb-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">Relacionamento</p>
            <h1 className="text-4xl font-black text-slate-900">Clientes</h1>
            <p className="text-slate-500 mt-2 max-w-2xl">
              Acompanhe indicadores de saúde, oportunidades de expansão e garanta atendimento consultivo para cada conta.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => undefined}>Exportar lista</Button>
            <Button variant="primary" onClick={() => undefined}>Novo cliente</Button>
          </div>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((item) => (
            <Card key={item.label} compact>
              <p className="text-sm uppercase tracking-wide text-slate-400">{item.label}</p>
              <p className="text-3xl font-bold text-slate-900">{item.value}</p>
              <p className="text-sm text-slate-500">{item.detail}</p>
            </Card>
          ))}
        </section>
      </header>

      <section className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-4 gap-8">
        <Card className="xl:col-span-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Contas prioritárias</h2>
            <div className="flex flex-wrap gap-3">
              <input
                type="search"
                placeholder="Buscar cliente"
                className="px-4 py-2 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
              />
              <select className="px-4 py-2 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none">
                <option>Segmento</option>
                <option>Varejo</option>
                <option>Tecnologia</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <th className="py-3">Cliente</th>
                  <th className="py-3">Segmento</th>
                  <th className="py-3">Cidade</th>
                  <th className="py-3">MRR</th>
                  <th className="py-3">Tendência</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map((customer) => (
                  <tr key={customer.id} className="text-sm">
                    <td className="py-4">
                      <p className="font-semibold text-slate-900">{customer.name}</p>
                      <p className="text-xs text-slate-500">{customer.id}</p>
                    </td>
                    <td className="py-4 text-slate-600">{customer.segment}</td>
                    <td className="py-4 text-slate-600">{customer.city}</td>
                    <td className="py-4 font-semibold text-slate-900">{customer.mrr}</td>
                    <td className="py-4 text-emerald-600 font-semibold">{customer.trend}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[customer.status]}`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Ações imediatas</h3>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-secondary mt-2" />
                <div>
                  <p className="font-semibold text-slate-900">Reunião trimestral - Grupo Nova Era</p>
                  <p className="text-slate-500">Sexta, 10h — revisar roadmap de expansão</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-2" />
                <div>
                  <p className="font-semibold text-slate-900">Plano de retenção - Mercadão do Sul</p>
                  <p className="text-slate-500">Enviar proposta com novos indicadores e SLA</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2" />
                <div>
                  <p className="font-semibold text-slate-900">Onboarding avançado - Ateliê Horizonte</p>
                  <p className="text-slate-500">Liberar módulos de estoque até quarta-feira</p>
                </div>
              </li>
            </ul>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Segmentação</h3>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Varejo e Distribuição', value: '42 contas', bar: 'w-4/5' },
                { label: 'Serviços e Consultorias', value: '31 contas', bar: 'w-3/5' },
                { label: 'Tecnologia e SaaS', value: '27 contas', bar: 'w-2/5' },
              ].map((segment) => (
                <div key={segment.label}>
                  <div className="flex justify-between text-slate-500 text-xs uppercase tracking-wide">
                    <span>{segment.label}</span>
                    <span>{segment.value}</span>
                  </div>
                  <div className="mt-1 bg-slate-100 h-2 rounded-full">
                    <div className={`h-2 rounded-full bg-secondary ${segment.bar}`} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
