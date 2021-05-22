using System;
using System.Text;
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
    [ApiExplorerSettings(IgnoreApi = true)]
    [Route("api/[controller]")]
    [ApiController]
    public class LocationCompaniesController : ControllerBase
    {
        private readonly EmployeeDirectoryContext _context;

        public LocationCompaniesController(EmployeeDirectoryContext context)
        {
            _context = context;
        }

        // GET: api/LocationCompanies/addData
        // Order 2 - Total 65 entries
        // can only add data if foreign Key (ManagerKeyFK) is removed
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("addData")]
        public void GenerateLocationCompanyData()
        {
            int companyName = 0;
            // create new companies and assign first 60 newly created employees as manager
            for (int i = 10; i < 70; i++)
            {
                LocationCompany exampleLCData = new LocationCompany()
                {
                    CompanyCode = i.ToString(),
                    Label = new ExampleDataFunctions().GenerateReadableCompanies(companyName),
                    ManagerWorkerNumber = (30000 + i * 1000).ToString()
                };
                companyName++;
                _context.LocationCompanies.Add(exampleLCData);
            }
            _context.SaveChanges();
            return;
        }

        // GET: api/LocationCompanies
        /// <summary>
        /// Get all companies, locations and offices
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanyDto>>> GetLocationCompanies()
        {
            return await _context.LocationCompanies.Select(c => new CompanyDto
            {
                CompanyCode = c.CompanyCode,
                Label = c.Label,
                ManagerWorkerNumber = c.ManagerWorkerNumber,
                Offices = c.LocationOffices.Select(o => new OfficeDto
                {
                    OfficeCode = o.OfficeCode,
                    Label = o.Label,
                    ManagerWorkerNumber = o.ManagerWorkerNumber,
                    Groups = o.LocationGroups.Select(g => new GroupDto
                    {
                        GroupCode = g.GroupCode,
                        Label = g.Label,
                        ManagerWorkerNumber = g.ManagerWorkerNumber
                    }).ToList(),
                }).ToList(),
            }).ToListAsync();
        }

        // GET: api/LocationCompanies/5
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("{id}")]
        public async Task<ActionResult<LocationCompany>> GetLocationCompany(string id)
        {
            var locationCompany = await _context.LocationCompanies.FindAsync(id);

            if (locationCompany == null)
            {
                return NotFound();
            }

            return locationCompany;
        }
    }
}
