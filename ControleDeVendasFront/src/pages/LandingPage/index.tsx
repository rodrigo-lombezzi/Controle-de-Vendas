import Button from '../../components/Button';
import Card from '../../components/Card';

const stats = [
  { label: 'Operações monitoradas', value: '12.4k' },
  { label: 'Redução de custos', value: '18%' },
  { label: 'Tempo médio de implantação', value: '14 dias' },
];

const features = [
  {
    title: 'Visão 360º',
    description: 'Painéis inteligentes com dados financeiros, estoque e equipes em tempo real.',
  },
  {
    title: 'Fluxos automatizados',
    description: 'Automatize aprovações, integrações com ERP e notificações para o time.',
  },
  {
    title: 'Experiência mobile',
    description: 'Acesse a operação completa em qualquer dispositivo com experiência impecável.',
  },
];

export default function LandingPage() {
  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-secondary/70 font-semibold">Controle de Vendas</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mt-4">
                Plataforma inteligente para finanças, operações e crescimento.
              </h1>
              <p className="text-lg text-slate-200 mt-6 max-w-xl">
                Organize o pipeline comercial, acompanhe indicadores críticos e garanta previsibilidade.
                Tudo em um ambiente colaborativo, seguro e bonito de usar.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" onClick={() => (window.location.href = '/dashboard')}>
                Explorar plataforma
              </Button>
              <Button variant="ghost" onClick={() => (window.location.href = '/customers')}>
                Ver casos reais
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wide text-slate-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-secondary/30 rounded-full" />
            <Card className="relative bg-white/10 border-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Painel de desempenho</h2>
              <div className="space-y-4">
                {[58, 72, 90, 76, 84].map((value, index) => (
                  <div key={value}>
                    <div className="flex justify-between text-sm text-slate-300">
                      <span>Semana {index + 1}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="h-2 mt-2 rounded-full bg-white/10">
                      <div className="h-2 rounded-full bg-secondary" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-200">
                <div>
                  <p className="uppercase tracking-wide text-slate-400 text-xs">Conversão</p>
                  <p className="text-xl font-semibold text-white">32,8%</p>
                  <p className="text-emerald-400 text-xs">+4.6% vs mês anterior</p>
                </div>
                <div>
                  <p className="uppercase tracking-wide text-slate-400 text-xs">Receita prevista</p>
                  <p className="text-xl font-semibold text-white">R$ 1,9 mi</p>
                  <p className="text-emerald-400 text-xs">Forecast atualizado</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-white/5 border-white/5 text-white">
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-slate-200 mt-2">{feature.description}</p>
            </Card>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-secondary font-semibold">Equipes confiantes</p>
            <p className="text-2xl font-bold mt-2">Mais de 400 empresas usam o Controle de Vendas diariamente.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-200">
            {['Inovatech', 'BlueFoods', 'Grupo Serra', 'Latam Retail'].map((brand) => (
              <span key={brand} className="px-4 py-2 rounded-full bg-white/10 border border-white/20">
                {brand}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
