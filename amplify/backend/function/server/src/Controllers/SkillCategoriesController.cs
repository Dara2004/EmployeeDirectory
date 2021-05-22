using System;
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
    public class SkillCategoriesController : ControllerBase
    {
        private readonly EmployeeDirectoryContext _context;

        public SkillCategoriesController(EmployeeDirectoryContext context)
        {
            _context = context;
        }

        // GET: api/SkillCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SkillCategory>>> GetSkillCategories()
        {
            return await _context.SkillCategories.ToListAsync();
        }

        // GET: api/SkillCategories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SkillCategory>> GetSkillCategory(string id)
        {
            var skillCategory = await _context.SkillCategories.FindAsync(id);

            if (skillCategory == null)
            {
                return NotFound();
            }

            return skillCategory;
        }

        // PUT: api/SkillCategories/5
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSkillCategory(string id, SkillCategory skillCategory)
        {
            if (id != skillCategory.SkillCategoryId)
            {
                return BadRequest();
            }

            _context.Entry(skillCategory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SkillCategoryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SkillCategories
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost]
        public async Task<ActionResult<SkillCategory>> PostSkillCategory(SkillCategory skillCategory)
        {
            _context.SkillCategories.Add(skillCategory);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SkillCategoryExists(skillCategory.SkillCategoryId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSkillCategory", new { id = skillCategory.SkillCategoryId }, skillCategory);
        }

        // DELETE: api/SkillCategories/5
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<SkillCategory>> DeleteSkillCategory(string id)
        {
            var skillCategory = await _context.SkillCategories.FindAsync(id);
            if (skillCategory == null)
            {
                return NotFound();
            }

            _context.SkillCategories.Remove(skillCategory);
            await _context.SaveChangesAsync();

            return skillCategory;
        }

        private bool SkillCategoryExists(string id)
        {
            return _context.SkillCategories.Any(e => e.SkillCategoryId == id);
        }

        // GET: api/SkillCategories/addData
        // Order 5 - Total 55 Entries
        // edited for new datbase
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("addData")]
        public void GenerateSkillCategoriesData()
        {
            int randomWord = 0;
            for (int i = 5; i < 56; i++)
            {
                SkillCategory exampleSCData = new SkillCategory()
                {
                    SkillCategoryId = i.ToString(),
                    Label = new ExampleDataFunctions().GenerateReadableString(randomWord),
                    SortValue = new ExampleDataFunctions().GenerateRandomString(1)
                };
                randomWord++;
                _context.SkillCategories.Add(exampleSCData);
            }
            _context.SaveChanges();
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("updateData")]
        public void UpdateSkillCategoriesData()
        {
            int randomWord = 0;
            for (int i = 5; i < 56; i++)
            {
                var skillCategoryEntry = _context.SkillCategories.SingleOrDefault(s => s.SkillCategoryId == i.ToString());
                if (skillCategoryEntry != null)
                {
                    skillCategoryEntry.Label = new ExampleDataFunctions().GenerateReadableString(randomWord);
                }
                randomWord++;
            }
            _context.SaveChanges();
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("updateData2")]
        public void UpdateSkillCategoriesData2()
        {
            int i = 0;
            foreach (SkillCategory skillCategory in _context.SkillCategories)
            {
                skillCategory.Label = new ExampleDataFunctions().GenerateRandomSkillCategory(i++);
            }
            _context.SaveChanges();
        }
    }
}
