using ControleVenda.Objects.Models;

namespace ControleVenda.Objects.DTOs.Entities
{
    public class ItemVendaDTO
    {
        public int Id { get; set; }
        public int QtdProduto { get; set; }
        public double SubTotal { get; set; }
        public int ProdutoId { get; set; }
        public int VendaId { get; set; }
        public static void Validate(ItemVendaDTO dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto), "Item de venda inválido.");

            if (dto.QtdProduto <= 0)
                throw new ArgumentException("Quantidade do produto deve ser maior que zero.");

            if (dto.SubTotal < 0)
                throw new ArgumentException("SubTotal não pode ser negativo.");
        }
    }
}