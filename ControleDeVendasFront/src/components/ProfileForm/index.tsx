export default function ProfileForm({ user }: { user: { name: string; email: string } }) {
  return (
    <form className="space-y-3">
      <label className="block">
        <span className="text-sm text-gray-300">Nome</span>
        <input defaultValue={user.name} className="mt-1 w-full p-2 rounded-md bg-transparent border border-white/10" />
      </label>

      <label className="block">
        <span className="text-sm text-gray-300">Email</span>
        <input defaultValue={user.email} className="mt-1 w-full p-2 rounded-md bg-transparent border border-white/10" />
      </label>

      <button className="px-4 py-2 bg-indigo-600 rounded-md">Salvar</button>
    </form>
  );
}
