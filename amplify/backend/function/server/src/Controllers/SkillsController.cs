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
    public class SkillsController : ControllerBase
    {
        private readonly EmployeeDirectoryContext _context;

        public SkillsController(EmployeeDirectoryContext context)
        {
            _context = context;
        }

        // GET: api/Skills/addData
        // Order 6 - Total 269 entries
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("addData")]
        public void GenerateSkillsData()
        {
            int randomWord = 0;
            for (int i = 5; i <= 55; i++)
            {
                for (int j = 1; j < 5; j++)
                {
                    Skill exampleSkillData = new Skill()
                    {
                        SkillCategoryId = i.ToString(),
                        SkillId = j.ToString(),
                        Label = new ExampleDataFunctions().GenerateRandomSkills(randomWord),
                        SortValue = new ExampleDataFunctions().GenerateRandomString(1)
                    };
                    _context.Skills.Add(exampleSkillData);
                    randomWord++;
                }
            }
            _context.SaveChanges();
        }

        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("updateData")]
        public void UpdateSkillsData()
        {
            int randomWord = 55;
            for (int i = 5; i < 56; i++)
            {
                for (int j = 1; j < 6; j++)
                {
                    var skillEntry = _context.Skills.SingleOrDefault(s => s.SkillCategoryId == i.ToString() && s.SkillId == j.ToString());
                    if (skillEntry != null)
                    {
                        skillEntry.Label = new ExampleDataFunctions().GenerateReadableString(randomWord);
                    }
                    if (randomWord == 298)
                    {
                        randomWord = 0;
                    }
                    else randomWord++;
                }
                _context.SaveChanges();
            }
        }


        // GET: api/Skills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skill>>> GetSkills()
        {
            return await _context.Skills.ToListAsync();
        }

        // GET: api/Skills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Skill>> GetSkill(string id)
        {
            var skill = await _context.Skills.FindAsync(id);

            if (skill == null)
            {
                return NotFound();
            }

            return skill;
        }

        // PUT: api/Skills/5
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSkill(string id, Skill skill)
        {
            if (id != skill.SkillCategoryId)
            {
                return BadRequest();
            }

            _context.Entry(skill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SkillExists(id))
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

        // POST: api/Skills
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost]
        public async Task<ActionResult<Skill>> PostSkill(Skill skill)
        {
            _context.Skills.Add(skill);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SkillExists(skill.SkillCategoryId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSkill", new { id = skill.SkillCategoryId }, skill);
        }

        // DELETE: api/Skills/5
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Skill>> DeleteSkill(string id)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill == null)
            {
                return NotFound();
            }

            _context.Skills.Remove(skill);
            await _context.SaveChangesAsync();

            return skill;
        }

        private bool SkillExists(string id)
        {
            return _context.Skills.Any(e => e.SkillCategoryId == id);
        }
    }
}
