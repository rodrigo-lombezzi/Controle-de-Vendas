import { useState, type ChangeEvent, type FormEvent } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';

const channelPerformance = [
  { channel: 'Inside Sales', volume: 'R$ 920k', variation: '+18%', trend: 'positive' },
  { channel: 'Field Team', volume: 'R$ 610k', variation: '+6%', trend: 'positive' },
  { channel: 'E-commerce', volume: 'R$ 310k', variation: '-3%', trend: 'negative' },
];

const recentSales = [
  { id: 'VN-2045', client: 'Grupo Horizonte', rep: 'Marina Silva', stage: 'Faturado', value: 'R$ 148k', date: '24/11' },
  { id: 'VN-2042', client: 'Supermercados Norte', rep: 'Carlos Mendes', stage: 'Concluído', value: 'R$ 96k', date: '24/11' },
  { id: 'VN-2038', client: 'Rede Farma+', rep: 'Paula Freitas', stage: 'Em aprovação', value: 'R$ 82k', date: '23/11' },
  { id: 'VN-2035', client: 'Orgânicos Sul', rep: 'Rafael Costa', stage: 'Proposta', value: 'R$ 57k', date: '22/11' },
];

export default function Sales() {
  const [form, setForm] = useState({
    cliente: '',
    produto: '',
    quantidade: '',
    data: '',
    valor: '',
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Venda cadastrada:', form);
    // TODO: integrar com serviço real
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <header className="flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-secondary/70">Vendas</p>
            <h1 className="text-4xl font-black">Operações comerciais</h1>
            <p className="text-slate-400 max-w-2xl mt-2">
              Cadastre novas vendas, monitore oportunidades por canal e acompanhe desempenho do time em tempo real.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => undefined}>Nova previsão</Button>
            <Button variant="ghost" onClick={() => undefined}>Importar vendas</Button>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white text-slate-900 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Registrar venda</h2>
                <p className="text-sm text-slate-500">Detalhe valores para atualizar pipeline e forecasting</p>
              </div>
              <Button variant="ghost" onClick={() => setForm({ cliente: '', produto: '', quantidade: '', data: '', valor: '' })}>
                Limpar
              </Button>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-1 text-sm text-slate-600">
                Cliente
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  name="cliente"
                  placeholder="Ex: Grupo Aurora"
                  value={form.cliente}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-slate-600">
                Produto / solução
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  name="produto"
                  placeholder="Ex: Plano Enterprise"
                  value={form.produto}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-slate-600">
                Quantidade
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  name="quantidade"
                  type="number"
                  min="1"
                  value={form.quantidade}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-slate-600">
                Valor total (R$)
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  name="valor"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.valor}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-slate-600">
                Data da venda
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  name="data"
                  type="date"
                  value={form.data}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="flex flex-col justify-end">
                <Button variant="primary" type="submit">
                  Registrar
                </Button>
              </div>
            </form>
          </Card>

          <Card className="bg-white/5 border border-white/10 text-white">
            <h3 className="text-lg font-semibold mb-4">Performance por canal</h3>
            <div className="space-y-4 text-sm">
              {channelPerformance.map((channel) => (
                <div key={channel.channel} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{channel.channel}</p>
                    <p className="text-slate-400 text-xs">{channel.volume}</p>
                  </div>
                  <span className={`text-xs font-semibold ${channel.trend === 'positive' ? 'text-emerald-300' : 'text-amber-300'}`}>
                    {channel.variation}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <Card className="bg-white border border-white/10 text-slate-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Vendas recentes</h2>
              <p className="text-sm text-slate-500">Sincronizado com CRM às 10h20</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => undefined}>Exportar CSV</Button>
              <Button variant="ghost" onClick={() => undefined}>Ver funil completo</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-400">
                  <th className="py-3">ID</th>
                  <th>Cliente</th>
                  <th>Executivo</th>
                  <th>Status</th>
                  <th>Valor</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {recentSales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="py-3 font-semibold text-slate-900">{sale.id}</td>
                    <td>{sale.client}</td>
                    <td className="text-slate-500">{sale.rep}</td>
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          sale.stage === 'Faturado'
                            ? 'bg-emerald-100 text-emerald-700'
                            : sale.stage === 'Concluído'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {sale.stage}
                      </span>
                    </td>
                    <td className="font-semibold text-slate-900">{sale.value}</td>
                    <td>{sale.date}</td>
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
