import ProfileForm from '../../components/ProfileForm';
import Card from '../../components/Card';
import Button from '../../components/Button';

const user = {
  name: 'João Pedro',
  email: 'joao@example.com',
  role: 'Administrador',
  squad: 'Growth & Revenue',
  lastAccess: '24 Nov 2025 às 09:42',
};

const accessList = [
  { system: 'CRM Executivo', level: 'Administrador', lastAudit: '12/11' },
  { system: 'Backoffice Financeiro', level: 'Editor', lastAudit: '07/11' },
  { system: 'Analytics Board', level: 'Visualizador', lastAudit: '05/11' },
];

export default function Profile() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white py-12">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary/70">Conta</p>
          <h1 className="text-4xl font-black">Centro de preferências</h1>
          <p className="text-slate-400 max-w-2xl">
            Atualize dados pessoais, políticas de acesso e preferências de autenticação do time executivo.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-white/5 border border-white/10 text-white">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-widest text-secondary/80">Perfil</p>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-sm text-slate-400">{user.role}</p>
              <p className="text-sm text-slate-400">Squad {user.squad}</p>
            </div>
            <div className="mt-6 space-y-2 text-sm text-slate-300">
              <p>{user.email}</p>
              <p>Último acesso: {user.lastAccess}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => undefined}>Ativar MFA</Button>
              <Button variant="ghost" onClick={() => undefined}>Resetar senha</Button>
            </div>
          </Card>

          <Card className="lg:col-span-2 bg-white text-slate-900 border border-white/10">
            <h3 className="text-xl font-semibold mb-6">Dados pessoais</h3>
            <ProfileForm user={user} />
          </Card>
        </section>

        <Card className="bg-white border border-white/10 text-slate-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Acessos e permissões</h2>
              <p className="text-sm text-slate-500">Última revisão automatizada há 5 dias</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => undefined}>Exportar auditoria</Button>
              <Button variant="ghost" onClick={() => undefined}>Solicitar alteração</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-400">
                  <th className="py-3">Sistema</th>
                  <th>Nível</th>
                  <th>Última auditoria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {accessList.map((access) => (
                  <tr key={access.system}>
                    <td className="py-3 font-semibold text-slate-900">{access.system}</td>
                    <td>{access.level}</td>
                    <td className="text-slate-500">{access.lastAudit}</td>
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
