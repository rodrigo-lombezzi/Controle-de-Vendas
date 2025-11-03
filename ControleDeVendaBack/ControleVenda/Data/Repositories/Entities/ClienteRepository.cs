using ControleVenda.WebAPI.Data.Interfaces;
using ControleVenda.WebAPI.Objects.Models;

namespace ControleVenda.Data.Repositories
{
	public class ClienteRepository : GenericRepository<Cliente>, IClienteRepository
	{
		private readonly AppDbContext _context;

		public ClienteRepository(AppDbContext context) : base(context)
		{
			_context = context;
		}
	}
}