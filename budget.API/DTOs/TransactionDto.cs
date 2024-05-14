namespace budget.API.DTOs {
    public class TransactionDto {
        public int Id { get; set; }

        public string Date { get; set; } = string.Empty;

        public string Payee { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Memo { get; set; } = string.Empty;

        public decimal Amount { get; set; }

        public bool Cleared { get; set; }

    }
}
