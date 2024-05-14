using budget.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace budget.API.Data {
    public class DataContext : DbContext {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { 
        
        }

        public DbSet<BankTransaction> BankTransactions { get; set; }
    }
}
