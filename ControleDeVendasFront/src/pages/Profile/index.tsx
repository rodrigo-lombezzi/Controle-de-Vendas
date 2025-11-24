import ProfileForm from "../../components/ProfileForm";

export default function Perfil() {
  const user = {
    name: "João Pedro",
    email: "joao@example.com",
    role: "Administrador",
  };

  return (
    <section>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="col-span-1 p-6 bg-white/5 rounded-md">
          <h2 className="text-xl font-bold mb-2">{user.name}</h2>
          <p className="text-sm text-gray-400">{user.role}</p>
          <p className="mt-4 text-gray-300">{user.email}</p>
        </div>

        <div className="md:col-span-2 p-6 bg-white/5 rounded-md">
          <h3 className="font-semibold mb-3">Editar Perfil</h3>
          <ProfileForm user={user} />
        </div>
      </div>
    </section>
  );
}
