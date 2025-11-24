import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold mb-2">Página não encontrada</h2>
      <p className="text-gray-400 mb-4">
        Verifique a URL ou volte para a página inicial.
      </p>

      <Link to="/" className="px-4 py-2 bg-indigo-600 text-white rounded-md">
        Voltar
      </Link>
    </div>
  );
}
