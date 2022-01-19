using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pagination.DemoService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pagination.DemoService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private List<Client> clients;

        public ClientController()
        {
            clients = new List<Client>()
            {
                new Client(){Id = 1,FirstName="First1",LastName ="Last1",Email = "email1@gmail.com",Mobile = "+9411111111",Status =Status.Active },
                new Client(){Id = 2,FirstName="First2",LastName ="Last2",Email = "email2@gmail.com",Mobile = "+9422222222",Status =Status.Active },
                new Client(){Id = 3,FirstName="First3",LastName ="Last3",Email = "email3@gmail.com",Mobile = "+9433333333",Status =Status.InActive },
                new Client(){Id = 4,FirstName="First4",LastName ="Last4",Email = "email4@gmail.com",Mobile = "+9444444444",Status =Status.Active },
                new Client(){Id = 5,FirstName="First5",LastName ="Last5",Email = "email5@gmail.com",Mobile = "+9455555555",Status =Status.InActive },
                new Client(){Id = 6,FirstName="First6",LastName ="Last6",Email = "email6@gmail.com",Mobile = "+9466666666",Status =Status.InActive },
                new Client(){Id = 7,FirstName="First7",LastName ="Last7",Email = "email7@gmail.com",Mobile = "+9477777777",Status =Status.Active },
                new Client(){Id = 8,FirstName="First8",LastName ="Last8",Email = "email8@gmail.com",Mobile = "+9488888888",Status =Status.Active },
                new Client(){Id = 9,FirstName="First9",LastName ="Last9",Email = "email9@gmail.com",Mobile = "+9499999999",Status =Status.Active },
                new Client(){Id = 10,FirstName="First10",LastName ="Last10",Email = "email10@gmail.com",Mobile = "+9412121212",Status =Status.InActive }
            };
        }


        [HttpGet]
        [Route("getAllClients")]
        public IActionResult GetAllClients([FromQuery] string searchText, [FromQuery] int currentPage, [FromQuery] int pageSize, [FromQuery] Status status)
        {
            var filteredClients = clients.Where(x => x.Status == status);

            if(!string.IsNullOrEmpty(searchText))
            {
                filteredClients = filteredClients.Where(x => x.FirstName.Contains(searchText) || x.LastName.Contains(searchText) || x.Email.Contains(searchText));
            }

            var totalRecordCount = filteredClients.Count();

            var totalPageCount = (int)Math.Ceiling(Convert.ToDecimal(totalRecordCount) / pageSize);

             filteredClients = filteredClients
                .Skip((currentPage - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var response = new PaginatedItemViewModel<Client>(currentPage, pageSize, totalPageCount, totalRecordCount, filteredClients);

            return Ok(response);
        }
    }
}
