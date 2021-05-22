using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using ExampleData;

namespace server.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [Route("api/[controller]")]
    [ApiController]
    public class LocationOfficesController : ControllerBase
    {
        private readonly EmployeeDirectoryContext _context;

        public LocationOfficesController(EmployeeDirectoryContext context)
        {
            _context = context;
        }

        // GET: api/LocationOffices/addData
        // Order 3 - Total 189 entries
        // Must remove FK before adding
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("addData")]
        public void GenerateLocationOfficesData()
        {
            // For each company, create 4 office locations for it and assign employees from 30200 as manaager.
            // Employees can be maanger of different companies or locations or groups
            int workerIDs;
            int officeName = 0;
            for (int i = 10; i < 70; i++)
            {
                workerIDs = 30000 + i * 1000;
                for (int j = 1; j < 4; j++)
                {
                    LocationOffice exampleLOData = new LocationOffice()
                    {
                        CompanyCode = i.ToString(),
                        OfficeCode = j.ToString(),
                        Label = new ExampleDataFunctions().GenerateReadableOffices(officeName),
                        ManagerWorkerNumber = (workerIDs + j).ToString()
                    };
                    officeName++;
                    _context.LocationOffices.Add(exampleLOData);
                }
            }
            _context.SaveChanges();
        }


        // GET: api/LocationOffices
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocationOffice>>> GetLocationOffices()
        {
            return await _context.LocationOffices.ToListAsync();
        }

        // GET: api/LocationOffices/5
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("{id}")]
        public async Task<ActionResult<LocationOffice>> GetLocationOffice(string id)
        {
            var locationOffice = await _context.LocationOffices.FindAsync(id);

            if (locationOffice == null)
            {
                return NotFound();
            }

            return locationOffice;
        }

        // Get: api/LocationOffices
        /// <summary>
        /// Get the total number of offices
        /// </summary>
        [HttpGet("count")]
        public async Task<int> GetNumberOfOffices()
        {
            return _context.LocationOffices.Count();
        }
    }
}
