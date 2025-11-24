export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        © {new Date().getFullYear()} MinhaApp — Feito com ❤️ usando React + Tailwind
      </div>
    </footer>
  );
}
