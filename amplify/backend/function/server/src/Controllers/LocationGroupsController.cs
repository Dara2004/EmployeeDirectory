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
    public class LocationGroupsController : ControllerBase
    {
        private readonly EmployeeDirectoryContext _context;

        public LocationGroupsController(EmployeeDirectoryContext context)
        {
            _context = context;
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("getallOfficeEntriesGivenCCGC/{companyCode}/{groupCode}")]
        public List<string> GetAllOfficeEntriesGivenCCGC(int companyCode, int groupCode)
        {
            return (List<string>)_context.LocationGroups.Where(e => e.CompanyCode == companyCode.ToString() && e.GroupCode == groupCode.ToString()).Select(e => e.OfficeCode).ToList();
        }

        // GET: api/LocationGroups/addData
        // Order 4 - Total 200 Entrires
        // remove FK before adding
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("addData")]
        public void GenerateLocationGroupsData()
        {
            // For each company, create 6 groups within and assign employees from 30380 as manager
            // Employees can be manger of different companies or locations or groups
            int workerIDs;
            int groupNames = 0;
            for (int i = 10; i < 70; i++)
            {
                for (int j = 1; j < 6; j++)
                {
                    workerIDs = 30000 + i * 1000;
                    LocationGroup exampleLGData = new LocationGroup()
                    {
                        CompanyCode = i.ToString(),
                        OfficeCode = new ExampleDataFunctions().GenerateRandomNumber(1, 4).ToString(),
                        GroupCode = j.ToString(),
                        Label = new ExampleDataFunctions().GenerateReadableGroups(groupNames),
                        ManagerWorkerNumber = (workerIDs + j).ToString(),
                    };
                    if (groupNames == 149)
                    {
                        groupNames = 0;
                    }
                    else
                    {
                        groupNames++;
                    }
                    _context.LocationGroups.Add(exampleLGData);

                }
            }
            _context.SaveChanges();
        }

        // GET: api/LocationGroups
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocationGroup>>> GetLocationGroups()
        {
            return await _context.LocationGroups.ToListAsync();
        }

        // GET: api/LocationGroups/5
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("{id}")]
        public async Task<ActionResult<LocationGroup>> GetLocationGroup(string id)
        {
            var locationGroup = await _context.LocationGroups.FindAsync(id);

            if (locationGroup == null)
            {
                return NotFound();
            }

            return locationGroup;
        }
    }
}