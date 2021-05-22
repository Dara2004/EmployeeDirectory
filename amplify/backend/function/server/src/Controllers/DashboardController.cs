using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using server.Models;
using server.Controllers;
using ExampleData;


namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly EmployeeDirectoryContext _context;

        public DashboardController(EmployeeDirectoryContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get autosuggestion for a given search string
        /// </summary>
        [HttpGet("/api/dashboard")]
        public DashboardStatisticsDto GetDashboardStatistics()
        {
            int numOffices = _context.LocationOffices.Count();
            int numWorkers = _context.Workers.Count();
            int numContractors = _context.Workers.Where(w => w.Type == "contractor").Count();

            return new DashboardStatisticsDto
            {
                numberOfEmployees = numWorkers,
                numberOfContractors = numContractors,
                numberOfOffices = numOffices
            };
        }
    }
}
