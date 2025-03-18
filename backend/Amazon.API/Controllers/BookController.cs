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

        public IActionResult GetBooks(int pageHowMany = 10, int pageNum = 1, string order = "BookID")
        {
            var something = _context.Books
            .OrderBy(order) // This is the line that allows me to pass in a string as a parameter for OrderBy
            .Skip(pageHowMany * (pageNum - 1)) // This is the line that allows me to skip a certain number of books based on the page that I'm on
            .Take(pageHowMany)
            .ToList();

            var total = _context.Books.Count();

            return Ok(new
            {
                books = something,
                totalBooks = total
            });
        }
            private static object GetPropertyValue<T>(T obj, string propertyName)
        {
            return typeof(T).GetProperty(propertyName, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance)
                            ?.GetValue(obj, null);
        }
    }
}
