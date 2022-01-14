using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pagination.DemoService.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
        public Status Status { get; set; }
    }

    public class ClientFilter
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public Status Status { get; set; }
    }

    public enum Status
    {
        InActive=1,
        Active=2
    }
}
