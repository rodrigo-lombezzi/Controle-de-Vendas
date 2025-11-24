import { useState } from "react";

export default function CadastroClientes() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
  });

  function handleChange(e: { target: { name: any; value: any; }; }) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    console.log("Cliente cadastrado:", form);
    alert("Cliente cadastrado com sucesso!");
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Cadastro de Clientes</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="text-gray-600 font-medium">Nome Completo</label>
          <input
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Nome do cliente"
            required
          />
        </div>

        <div>
          <label className="text-gray-600 font-medium">E-mail</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="email@exemplo.com"
            required
          />
        </div>

        <div>
          <label className="text-gray-600 font-medium">Telefone</label>
          <input
            name="telefone"
            type="text"
            value={form.telefone}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="(00) 00000-0000"
            required
          />
        </div>

        <div>
          <label className="text-gray-600 font-medium">Endereço</label>
          <input
            name="endereco"
            type="text"
            value={form.endereco}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg"
            placeholder="Rua, número, bairro..."
            required
          />
        </div>

        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium">
          Cadastrar Cliente
        </button>
      </form>
    </div>
  );
}
