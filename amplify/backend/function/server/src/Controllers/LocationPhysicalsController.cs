using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using server.Models;
using ExampleData;

namespace server.Controllers
{
    [ApiExplorerSettings(IgnoreApi = true)]
    [Route("api/[controller]")]
    [ApiController]
    public class LocationPhysicalsController : ControllerBase
    {
        private readonly EmployeeDirectoryContext _context;

        public LocationPhysicalsController(EmployeeDirectoryContext context)
        {
            _context = context;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("getAllLocationPhysicall")]
        public List<string> GetLocationPhysical()
        {
            return (List<string>)_context.LocationPhysicals.Select(e => e.PhysicalLocationId).ToList();
        }

        // GET: api/LocationPhysicals/addData
        // Order 1 - Total 68 entries
        // edited for new database
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("addData")]
        public void GenerateLocationPhysicalsData()
        {
            int randomPL = 0;
            for (int i = 10; i < 70; i++)
            {
                LocationPhysical exampleLPData = new LocationPhysical()
                {
                    PhysicalLocationId = new ExampleDataFunctions().GenerateRandomString(10),
                    Label = new ExampleDataFunctions().GenerateReadableLocations(randomPL),
                    SortValue = new ExampleDataFunctions().GenerateRandomString(1)
                };
                _context.LocationPhysicals.Add(exampleLPData);
                randomPL++;
            }
            _context.SaveChanges();
        }

        // GET: api/LocationPhysicals
        /// <summary>
        /// Get all physical locations
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhysicalLocationDto>>> GetLocationPhysicals()
        {
            return await _context.LocationPhysicals.Select(loc => new PhysicalLocationDto
            {
                PhysicalLocationId = loc.PhysicalLocationId,
                Label = loc.Label,
                SortValue = loc.SortValue
            }).ToListAsync();
        }

        // GET: api/LocationPhysicals/5
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("{id}")]
        public async Task<ActionResult<LocationPhysical>> GetLocationPhysical(string id)
        {
            var locationPhysical = await _context.LocationPhysicals.FindAsync(id);

            if (locationPhysical == null)
            {
                return NotFound();
            }

            return locationPhysical;
        }
    }
}
