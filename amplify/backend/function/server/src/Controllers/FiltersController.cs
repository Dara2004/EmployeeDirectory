using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiltersController : ControllerBase
    {
        private readonly EmployeeDirectoryContext _context;

        public FiltersController(EmployeeDirectoryContext context)
        {
            _context = context;
        }
        // GET: api/Filters
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FilterGroupDto>>> GetFilters()
        {
            var res = new List<FilterGroupDto>();
            var companiesFilter = new FilterGroupDto
            {
                Name = "Companies",
                Filters = await _context.LocationCompanies.Select(c => new FilterItemDto
                {
                    Id = c.CompanyCode,
                    Name = c.Label,
                    Type = "company",
                    Children = c.LocationOffices.Select(o => new FilterItemDto
                    {
                        Id = o.OfficeCode,
                        Name = o.Label,
                        Type = "office",
                        Children = o.LocationGroups.Select(g => new FilterItemDto
                        {
                            Id = g.GroupCode,
                            Name = g.Label,
                            Type = "group",
                            Children = new List<FilterItemDto>(),
                        }).ToList(),
                    }).ToList(),
                }).ToListAsync()
            };

            var skillsFilter = new FilterGroupDto
            {
                Name = "Skills",
                Filters = await _context.SkillCategories.Select(sc => new FilterItemDto
                {
                    Id = sc.SkillCategoryId,
                    Name = sc.Label,
                    Type = "skill category",
                    Children = sc.Skills.Select(s => new FilterItemDto
                    {
                        Id = s.SkillId,
                        Name = s.Label,
                        Type = "skill",
                        Children = new List<FilterItemDto>(),
                    }).ToList(),
                }).ToListAsync()
            };

            var physLocationsFilter = new FilterGroupDto
            {
                Name = "Physical Locations",
                Filters = await _context.LocationPhysicals.Select(loc => new FilterItemDto
                {
                    Id = loc.PhysicalLocationId,
                    Name = loc.Label,
                    Type = "physical location",
                    Children = new List<FilterItemDto>(),
                }).ToListAsync()
            };

            var employeesFilter = new FilterGroupDto
            {
                Name = "Workers",
                Filters = await _context.Workers.Select(w => new FilterItemDto
                {
                    Id = w.WorkerNumber,
                    Name = $"{w.FirstName} {w.LastName}",
                    Type = "workers",
                    Children = new List<FilterItemDto>(),
                }).ToListAsync()
            };

            res.Add(companiesFilter);
            res.Add(skillsFilter);
            res.Add(physLocationsFilter);
            res.Add(employeesFilter);

            return res;
        }
    }
}
