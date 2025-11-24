import Card from "../../components/Card";
import Button from "../../components/Button";

const quickLinks = [
  {
    label: "Relatórios financeiros",
    description: "DRE, fluxo de caixa e KPIs consolidados",
    action: "Abrir relatórios",
  },
  {
    label: "Integrações",
    description: "ERP, CRM, gateways e BI em um só lugar",
    action: "Gerenciar integrações",
  },
  {
    label: "Automação de cobranças",
    description: "Cobre automaticamente clientes em atraso",
    action: "Configurar cobrança",
  },
];

const timeline = [
  { time: "09:00", title: "Revisão de pipeline", detail: "Time comercial — identificar oportunidades quentes" },
  { time: "11:30", title: "Call com fornecedor", detail: "Negociação de novos prazos com BlueFoods" },
  { time: "14:15", title: "Atualização de estoque", detail: "Importar inventário e sincronizar com e-commerce" },
  { time: "16:40", title: "Aprovação de despesas", detail: "Validar política e liberar pagamentos" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <header className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary">Visão geral</p>
            <h1 className="text-4xl font-black text-slate-900">Bem-vindo de volta ⚡</h1>
            <p className="text-slate-500 max-w-2xl mt-2">
              Centralize informação, conecte seu time e acompanhe indicadores críticos de uma forma leve e moderna.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => (window.location.href = "/dashboard")}>
              Ver dashboard completo
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/clientes")}>
              Clientes prioritários
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white border border-slate-100 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-400">Receita prevista</p>
            <p className="text-3xl font-bold text-slate-900">R$ 2,18 mi</p>
            <p className="text-emerald-600 text-sm font-semibold">+9,4% vs último ciclo</p>
          </Card>
          <Card className="bg-white border border-slate-100 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-400">Pedidos em produção</p>
            <p className="text-3xl font-bold text-slate-900">312</p>
            <p className="text-slate-500 text-sm">126 aguardando aprovação</p>
          </Card>
          <Card className="bg-white border border-slate-100 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-400">Satisfação do cliente</p>
            <p className="text-3xl font-bold text-slate-900">93 NPS</p>
            <p className="text-emerald-600 text-sm font-semibold">Top 5% do segmento</p>
          </Card>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Linha do dia</h2>
                <p className="text-sm text-slate-500">Resumo das ações planejadas</p>
              </div>
              <Button variant="ghost" onClick={() => undefined}>Adicionar evento</Button>
            </div>
            <ul className="space-y-5">
              {timeline.map((item) => (
                <li key={item.time} className="flex gap-4">
                  <div className="text-sm font-semibold text-secondary w-16">{item.time}</div>
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900">Acessos rápidos</h2>
            {quickLinks.map((link) => (
              <div key={link.label} className="border border-slate-100 rounded-2xl p-4 flex flex-col gap-2">
                <div>
                  <p className="font-semibold text-slate-900">{link.label}</p>
                  <p className="text-sm text-slate-500">{link.description}</p>
                </div>
                <Button variant="outline" onClick={() => undefined}>
                  {link.action}
                </Button>
              </div>
            ))}
          </Card>
        </section>
      </div>
    </main>
  );
}
