namespace budget.API.Entities {
    public class BankTransaction {
        public int Id { get; set; }

        public DateOnly Date { get; set; }

        public string Payee { get; set; } = string.Empty;

        public string Category { get; set; } = string.Empty;

        public string Memo { get; set; } = string.Empty;

        public decimal Amount { get; set; }

        public bool Cleared { get; set; }

    }
}
