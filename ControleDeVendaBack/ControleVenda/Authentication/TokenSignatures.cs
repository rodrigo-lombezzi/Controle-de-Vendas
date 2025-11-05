namespace ControleVenda.Authentication
{ 
    public class TokenSignatures
    {
        public string Issuer { get; } = "Controle de Vendas API";
        public string Audience { get; } = "Controle de Vendas API Website";
        public string Key { get; } = "Controle_Vendas_Barrament_api_Bearer_Authentication";
    }
}