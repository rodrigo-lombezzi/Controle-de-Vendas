import { useState } from "react";

export default function CadastroProdutos() {
  const [form, setForm] = useState({
    nome: "",
    categoria: "",
    preco: "",
    estoque: "",
  });

  function handleChange(e: { target: { name: any; value: any; }; }) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    console.log("Produto cadastrado:", form);
    alert("Produto cadastrado com sucesso!");
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Cadastro de Produtos</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-gray-600 font-medium">Nome do Produto</label>
          <input
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Nome do produto"
            required
          />
        </div>

        <div>
          <label className="text-gray-600 font-medium">Categoria</label>
          <input
            name="categoria"
            type="text"
            value={form.categoria}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Categoria do produto"
            required
          />
        </div>

        <div>
          <label className="text-gray-600 font-medium">Preço (R$)</label>
          <input
            name="preco"
            type="number"
            step="0.01"
            min="0"
            value={form.preco}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Preço"
            required
          />
        </div>

        <div>
          <label className="text-gray-600 font-medium">Estoque</label>
          <input
            name="estoque"
            type="number"
            value={form.estoque}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Quantidade em estoque"
            required
          />
        </div>

        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium">
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
}
