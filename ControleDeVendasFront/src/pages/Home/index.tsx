import { Link } from "react-router-dom";
import Card from "../../components/Card";

export default function Home() {
  return (
    <section>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-extrabold mb-4">Crie interfaces lindas com Tailwind + React</h1>
          <p className="text-lg text-gray-600 mb-6">Modelo com 6 páginas — pronto para extender.</p>

          <div className="flex gap-3">
            <Link to="/servicos" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Ver serviços</Link>
            <Link to="/contato" className="px-4 py-2 border border-indigo-200 rounded-md">Fale conosco</Link>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/60 to-white/10 rounded-xl p-6 shadow-lg">
          <ul className="space-y-4">
            <li className="p-4 bg-white/5 rounded-md">Componentes responsivos</li>
            <li className="p-4 bg-white/5 rounded-md">Layouts reutilizáveis</li>
            <li className="p-4 bg-white/5 rounded-md">Performance com Vite</li>
          </ul>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Destaques</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card title="Rápido de montar">Componentes isolados e fáceis de estilizar.</Card>
          <Card title="Acessível">Estrutura semântica com bom contraste.</Card>
          <Card title="Performance">Build minimalista com Vite.</Card>
        </div>
      </section>
    </section>
  );
}
