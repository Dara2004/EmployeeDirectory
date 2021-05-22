using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nest;
using server.Dto;
using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.ElasticSearch
{
    public class SearchService : ISearchService
    {
        private readonly EmployeeDirectoryContext _context;
        private ElasticClient Client { get; set; }
        public SearchService(EmployeeDirectoryContext context)
        {
            var settings = new ConnectionSettings(new Uri("https://sharp:ae%40CPSC319@search-aetest-ymggkyc66qvw32jmz5g63mtcmm.us-west-2.es.amazonaws.com"))
   .DefaultIndex("empdirectory"); // ElasticSearch index name must be lowercase

            Client = new ElasticClient(settings);
            _context = context;
        }
        public async Task<IEnumerable<SearchDocumentDto>> Autosuggestion(string searchStr, string searchType)
        {
            var searchRequest = new SearchRequest
            {
                Size = 10, //limit to top 10 suggestions
                Query = new MatchBoolPrefixQuery
                {
                    Field = "text",
                    Query = searchStr,
                }
            };
            var searchResponse = await Client.SearchAsync<SearchDocumentDto>(searchRequest);
            var res = searchResponse.Documents;
            if (searchType == "workers")
            {
                return res.Where(doc => doc.Type == "employee" || doc.Type == "contractor");
            } else if (searchType != "") {
                return res.Where(doc => doc.Type == searchType);
            }
            return res;
        }

        public async Task CreateSearchIndex()
        {
            var res = new List<SearchDocumentDto>();

            var companies = await _context.LocationCompanies.Select(c => new SearchDocumentDto
            {
                Id = c.CompanyCode,
                Text = c.Label,
                Type = "company",
                Breadcrumb = $"All companies/{c.Label}",
            }).ToListAsync();

            var offices = await _context.LocationOffices.Select(o => new SearchDocumentDto
            {
                Id = $"{o.CompanyCode}-{o.OfficeCode}",
                Text = o.Label,
                Type = "office",
                Breadcrumb = $"{o.LocationCompany.Label}/{o.Label}",
            }).ToListAsync();

            var groups = await _context.LocationGroups.Select(g => new SearchDocumentDto
            {
                Id = $"{g.CompanyCode}-{g.OfficeCode}-{g.GroupCode}",
                Text = g.Label,
                Type = "group",
                Breadcrumb = $"{g.LocationOffice.LocationCompany.Label}/{g.LocationOffice.Label}/{g.Label}",
            }).ToListAsync();

            var physicalLocations = await _context.LocationPhysicals.Select(loc => new SearchDocumentDto
            {
                Id = loc.PhysicalLocationId,
                Text = loc.Label,
                Type = "physicalLocation",
                Breadcrumb = $"All physical locations/{loc.Label}",
            }).ToListAsync();

            var workers = await _context.Workers.Select(w => new SearchDocumentDto
            {
                Id = w.WorkerNumber,
                Text = $"{w.FirstName} {w.LastName} {w.WorkerNumber} {w.Email}",
                Type = w.Type,
                Breadcrumb = "",
            }).ToListAsync();

            var skillCategories = await _context.SkillCategories.Select(sc => new SearchDocumentDto
            {
                Id = sc.SkillCategoryId,
                Text = sc.Label,
                Type = "skillCategory",
                Breadcrumb = $"All skill categories/{sc.Label}"
            }).ToListAsync();

            var skills = await _context.Skills.Select(s => new SearchDocumentDto
            {
                Id = $"{s.SkillCategoryId}-{s.SkillId}",
                Text = s.Label,
                Type = "skill",
                Breadcrumb = $"{s.SkillCategory.Label}/{s.Label}",
            }).ToListAsync();

            res.AddRange(companies);
            res.AddRange(offices);
            res.AddRange(groups);
            res.AddRange(physicalLocations);
            res.AddRange(workers);
            res.AddRange(skillCategories);
            res.AddRange(skills);

            var asyncIndexResponse = await Client.IndexManyAsync(res);
            Console.WriteLine(asyncIndexResponse);
        }
    }
}
