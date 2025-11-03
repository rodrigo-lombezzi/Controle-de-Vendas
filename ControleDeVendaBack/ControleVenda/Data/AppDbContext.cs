using ControleVenda.Data.Builders;
using ControleVenda.Objetcs.Models;
using Microsoft.EntityFrameworkCore;

namespace ControleVenda.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<ItemVenda> ItemVendas { get; set; }
        public DbSet<Parcela> Parcelas { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Venda> Vendas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)

        {
            base.OnModelCreating(modelBuilder);
            ClienteBuilder.Build(modelBuilder);
            ItemVendaBuilder.Build(modelBuilder);
            ParcelaBuilder.Build(modelBuilder);
            ProdutoBuilder.Build(modelBuilder);
            UsuarioBuilder.Build(modelBuilder);
            VendaBuilder.Build(modelBuilder);
        }
    }
}