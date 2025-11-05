namespace ControleVenda.Objects.DTOs.Entities
{
    public class ProdutoDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public double ValorUnitario { get; set; }
        public int Quantidade { get; set; }
        public bool Ativo { get; set; }

        public static void Validate(ProdutoDTO dto)
        {
            if (dto == null)
                throw new ArgumentNullException(nameof(dto), "Produto inválido.");

            if (string.IsNullOrWhiteSpace(dto.Nome))
                throw new ArgumentException("Nome do produto é obrigatório.");

            if (string.IsNullOrWhiteSpace(dto.Descricao))
                throw new ArgumentException("Descrição do produto é obrigatória.");

            if (dto.ValorUnitario <= 0)
                throw new ArgumentException("Valor unitário deve ser maior que zero.");

            if (dto.Quantidade < 0)
                throw new ArgumentException("Quantidade não pode ser negativa.");
        }
    }
}