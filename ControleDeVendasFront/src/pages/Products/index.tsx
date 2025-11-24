import { useState, type ChangeEvent, type FormEvent } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';

const categories = ['Bebidas', 'Frios', 'Hortifruti', 'Higiene', 'Limpeza'];

const mockInventory = [
  { id: 'PRD-1023', name: 'Café Gourmet 500g', category: 'Bebidas', stock: 84, price: 'R$ 28,90' },
  { id: 'PRD-0998', name: 'Queijo Minas Frescal', category: 'Frios', stock: 41, price: 'R$ 39,00' },
  { id: 'PRD-0975', name: 'Alface Crespa', category: 'Hortifruti', stock: 132, price: 'R$ 4,20' },
  { id: 'PRD-0959', name: 'Sabonete Líquido 1L', category: 'Higiene', stock: 65, price: 'R$ 21,50' },
];

export default function Products() {
  const [form, setForm] = useState({
    nome: '',
    categoria: categories[0],
    preco: '',
    estoque: '',
    sku: '',
  });

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Produto cadastrado:', form);
    // TODO: integrar com serviço real
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary/70">Catálogo</p>
          <h1 className="text-4xl font-black">Gestão de produtos</h1>
          <p className="text-slate-400 max-w-2xl">
            Cadastre novos itens, acompanhe estoque crítico e ajuste preços estratégicos para manter a margem saudável.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white text-slate-900 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold">Novo produto</h2>
                <p className="text-sm text-slate-500">Preencha os dados básicos para inserir o item no catálogo</p>
              </div>
              <Button variant="ghost" onClick={() => setForm({ nome: '', categoria: categories[0], preco: '', estoque: '', sku: '' })}>
                Limpar campos
              </Button>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-1 text-sm text-slate-600">
                Nome do produto
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  name="nome"
                  placeholder="Ex: Café especial"
                  value={form.nome}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-slate-600">
                Categoria
                <select
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1 text-sm text-slate-600">
                Preço (R$)
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  name="preco"
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.preco}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-slate-600">
                Quantidade em estoque
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  name="estoque"
                  type="number"
                  min="0"
                  value={form.estoque}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="flex flex-col gap-1 text-sm text-slate-600">
                SKU interno
                <input
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900"
                  name="sku"
                  placeholder="Ex: PRD-1203"
                  value={form.sku}
                  onChange={handleChange}
                />
              </label>

              <div className="flex flex-col justify-end">
                <Button variant="primary" type="submit">
                  Adicionar ao catálogo
                </Button>
              </div>
            </form>
          </Card>

          <Card className="bg-white/5 border border-white/10 text-white">
            <h3 className="text-lg font-semibold mb-4">Indicadores rápidos</h3>
            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <p className="uppercase text-[11px] tracking-widest text-slate-400">Itens abaixo do mínimo</p>
                <p className="text-3xl font-bold text-amber-300">8</p>
                <p className="text-slate-400">Alerta de reposição urgente</p>
              </div>
              <div>
                <p className="uppercase text-[11px] tracking-widest text-slate-400">Margem média</p>
                <p className="text-3xl font-bold text-emerald-300">32%</p>
                <p className="text-slate-400">Meta mínima: 28%</p>
              </div>
              <div>
                <p className="uppercase text-[11px] tracking-widest text-slate-400">Novos itens no mês</p>
                <p className="text-3xl font-bold text-secondary">18</p>
                <p className="text-slate-400">Capilaridade em 5 categorias</p>
              </div>
            </div>
          </Card>
        </section>

        <Card className="bg-white border border-white/10 text-slate-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Estoque recente</h2>
              <p className="text-sm text-slate-500">Últimos itens cadastrados e movimentados</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => undefined}>Exportar</Button>
              <Button variant="ghost" onClick={() => undefined}>Ajustar estoque</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-400">
                  <th className="py-3">SKU</th>
                  <th>Produto</th>
                  <th>Categoria</th>
                  <th>Estoque</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {mockInventory.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 font-semibold text-slate-900">{item.id}</td>
                    <td>{item.name}</td>
                    <td className="text-slate-500">{item.category}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.stock < 60 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {item.stock} un
                      </span>
                    </td>
                    <td className="font-semibold text-slate-900">{item.price}</td>
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
