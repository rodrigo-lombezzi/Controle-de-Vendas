using ControleVenda.Data.Interfaces;
using ControleVenda.Objects.Models;

namespace ControleVenda.Data.Repositories
{
	public class ClienteRepository : GenericRepository<Cliente>, IClienteRepository
	{
		private readonly AppDBContext _context;

		public ClienteRepository(AppDBContext context) : base(context)
		{
			_context = context;
		}
	}
}