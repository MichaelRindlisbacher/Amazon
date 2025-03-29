using System.Linq;
using System.Reflection;
using Amazon.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Dynamic.Core; // The package that allows me to pass in a string as a parameter for OrderBy

namespace Amazon.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _context;
        public BookController(BookDbContext temp)
        {
            _context = temp;
        }

        [HttpGet("ALLBooks")]
        public IActionResult GetBooks(int pageHowMany = 10, int pageNum = 1, string order = "BookID", [FromQuery] List<string>? BookCategories = null)
        {
            Console.WriteLine($"Received BookCategories: {string.Join(", ", BookCategories ?? new List<string>())}");

            var query = _context.Books.AsQueryable();

            if (BookCategories != null && BookCategories.Any())
            {
                query = query.Where(b => BookCategories.Contains(b.Category));
            }

            var total = query.Count();

            var something = query
            .OrderBy(order) // This is the line that allows me to pass in a string as a parameter for OrderBy
            .Skip(pageHowMany * (pageNum - 1)) // This is the line that allows me to skip a certain number of books based on the page that I'm on
            .Take(pageHowMany)
            .ToList();
            

            return Ok(new
            {
                books = something,
                totalBooks = total
            });
        }
        [HttpGet("GetBookCategories")]
        public ActionResult GetBookCategories()
        {
            var projectTypes = _context.Books
                                   .Select(b => b.Category)
                                   .Distinct()
                                   .ToList();

            return Ok(projectTypes);
        }
        private static object GetPropertyValue<T>(T obj, string propertyName)
        {
            return typeof(T).GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance)
                            ?.GetValue(obj, null);
        }
    }
}
