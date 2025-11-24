import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl text-center space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-secondary/70">Erro 404</p>
        <h1 className="text-5xl font-black">Ops! Não encontramos essa página</h1>
        <p className="text-slate-400">
          O endereço pode ter sido alterado ou não existe mais. Confira o link digitado ou volte para o painel principal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-slate-950"
          >
            Voltar para o dashboard
          </Link>
          <Link
            to="/clientes"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white"
          >
            Ir para a área de clientes
          </Link>
        </div>
      </div>
    </main>
  );
}
