using budget.API.Data;
using budget.API.DTOs;
using budget.API.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace budget.API.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("React")]
    public class TransactionController : ControllerBase {
        private readonly DataContext _context;

        public TransactionController(DataContext context) {
            _context = context;
        }

        // GET: api/transaction
        [HttpGet]
        public async Task<ActionResult<List<BankTransaction>>> GetTransactions() {
            var bankTransactions = await _context.BankTransactions.ToListAsync();

            return Ok(bankTransactions);
        }

        // GET: api/transaction/7
        [HttpGet("{id}")]
        public async Task<ActionResult<BankTransaction>> GetTransaction(int id) {
            var bankTransaction = await _context.BankTransactions.FindAsync(id);

            if (bankTransaction == null) {
                return NotFound("Transaction not found");
            }

            return Ok(bankTransaction);
        }

        // POST: api/transaction
        [HttpPost]
        public async Task<ActionResult<List<BankTransaction>>> AddTransaction(TransactionDto bankDto) {
            BankTransaction bankTransaction = new BankTransaction() {
                Id = bankDto.Id,
                Date = DateOnly.Parse(bankDto.Date),
                Payee = bankDto.Payee,
                Category = bankDto.Category,
                Memo = bankDto.Memo,
                Amount = bankDto.Amount,
                Cleared = bankDto.Cleared
            };

            _context.BankTransactions.Add(bankTransaction);
            await _context.SaveChangesAsync();

            return Ok(await _context.BankTransactions.ToListAsync());
        }

        // PUT: api/transaction
        [HttpPut]
        public async Task<ActionResult<List<BankTransaction>>> UpdateTransaction(TransactionDto bankDto) {
            var bankTransaction = await _context.BankTransactions.FindAsync(bankDto.Id);

            if (bankTransaction == null) {
                return NotFound("Transaction not found");
            }

            bankTransaction.Date = DateOnly.Parse(bankDto.Date);
            bankTransaction.Payee = bankDto.Payee;
            bankTransaction.Category = bankDto.Category;
            bankTransaction.Memo = bankDto.Memo;
            bankTransaction.Amount = bankDto.Amount;
            bankTransaction.Cleared = bankDto.Cleared;

            await _context.SaveChangesAsync();

            return Ok(await _context.BankTransactions.ToListAsync());
        }

        // DELTE: api/transaction/7
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<BankTransaction>>> DeleteTransaction(int id) {
            var bankTransaction = await _context.BankTransactions.FindAsync(id);

            if (bankTransaction == null) {
                return NotFound("Transaction not found");
            }

            _context.BankTransactions.Remove(bankTransaction);
            await _context.SaveChangesAsync();

            return Ok(await _context.BankTransactions.ToListAsync());
        }
    }
}
