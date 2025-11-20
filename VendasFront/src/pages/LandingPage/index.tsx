import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Card from "../../components/Card";
import PageLayout from "../../components/PageLayout";

// Header Moderno
const Header = () => (
  <header className="bg-white shadow-sm p-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-indigo-600">SalesControl</h1>
    <nav className="space-x-6">
      <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition">Login</Link>
      <Link to="/register" className="text-gray-700 hover:text-indigo-600 transition">Register</Link>
    </nav>
  </header>
);

// Feature Card
const Feature = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
    <h3 className="text-xl font-semibold text-indigo-600 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Footer
const Footer = () => (
  <footer className="bg-gray-900 text-white py-6 mt-16 text-center">
    <p className="text-sm">© 2024 SalesControl. Todos os direitos reservados.</p>
  </footer>
);

// Landing Page
const LandingPage = () => {
  return (
    <PageLayout title="Bem-vindo ao SalesControl">

      <Header />

      {/* HERO */}
      <main className="bg-gradient-to-b from-indigo-50 to-white">

        <section className="text-center px-6 py-20 max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-6">
            A forma inteligente de gerenciar seu negócio
          </h2>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Uma plataforma completa para organizar vendas, clientes e produtos —
            com simplicidade e eficiência.
          </p>

          <Button className="text-lg px-8 py-3 shadow-lg hover:shadow-xl">
            Comece Agora
          </Button>
        </section>

        {/* FEATURES */}
        <section className="px-6 py-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <Feature
              title="Gestão de Vendas"
              description="Acompanhe suas vendas com dashboards intuitivos e relatórios completos."
            />
            <Feature
              title="Cadastro de Clientes"
              description="Tenha o controle dos seus clientes de forma organizada e acessível."
            />
            <Feature
              title="Controle de Produtos"
              description="Gerencie o estoque, preços e catálogo de produtos com facilidade."
            />
          </div>
        </section>

        {/* DEPOIMENTO */}
        <section className="px-6 py-20 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            O que nossos clientes dizem
          </h2>

          <Card className="p-8 shadow-md bg-white">
            <p className="text-gray-600 italic mb-4">
              "O SalesControl transformou a maneira como gerenciamos nosso negócio.
              É intuitivo, rápido e extremamente eficiente!"
            </p>
            <p className="font-semibold text-gray-800">- João Silva, CEO da TechNova</p>
          </Card>
        </section>

      </main>

      <Footer />
    </PageLayout>
  );
};

export default LandingPage;
