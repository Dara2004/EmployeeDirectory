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
    public class WorkerSkillsController : ControllerBase
    {
        private readonly EmployeeDirectoryContext _context;

        public WorkerSkillsController(EmployeeDirectoryContext context)
        {
            _context = context;
        }

        // GET: api/WorkerSkills
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CreateWorkerSkillDto>>> GetWorkerSkills()
        {
            return await _context.WorkerSkills.ToListAsync();
        }

        // GET: api/WorkerSkills/5
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("{id}")]
        public async Task<ActionResult<CreateWorkerSkillDto>> GetWorkerSkill(string id)
        {
            var workerSkill = await _context.WorkerSkills.FindAsync(id);

            if (workerSkill == null)
            {
                return NotFound();
            }

            return workerSkill;
        }

        // PUT: api/WorkerSkills/5
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkerSkill(string id, CreateWorkerSkillDto workerSkill)
        {
            if (id != workerSkill.WorkerNumber)
            {
                return BadRequest();
            }

            _context.Entry(workerSkill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkerSkillExists(id))
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

        // POST: api/WorkerSkills
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpPost]
        public async Task<ActionResult<CreateWorkerSkillDto>> PostWorkerSkill(CreateWorkerSkillDto workerSkill)
        {
            _context.WorkerSkills.Add(workerSkill);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (WorkerSkillExists(workerSkill.WorkerNumber))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetWorkerSkill", new { id = workerSkill.WorkerNumber }, workerSkill);
        }

        // DELETE: api/WorkerSkills/5
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<CreateWorkerSkillDto>> DeleteWorkerSkill(string id)
        {
            var workerSkill = await _context.WorkerSkills.FindAsync(id);
            if (workerSkill == null)
            {
                return NotFound();
            }

            _context.WorkerSkills.Remove(workerSkill);
            await _context.SaveChangesAsync();

            return workerSkill;
        }

        // GET: api/WorkerSkills/addData
        // Order 8 - Total 4513 entries
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("addData")]
        public void GenerateWorkerSkillData()
        {
            List<string> SL = new List<string>();
            SL.Add("novice");
            SL.Add("intermediate");
            SL.Add("expert");

            int[] WorkerIds = { 10000, 10001, 10002, 10003, 10004, 10005, 10101, 10102, 10103, 10104, 10105, 10106, 19102,
            20002, 20003, 20004, 20005, 20006, 20102, 20103, 20104, 20105, 20106, 29102, 30008, 30012, 30015, 30023, 30024, 30025, 30112,
            30115, 30123, 30124, 30125, 39123};
            List<int> workerIds = new List<int>(WorkerIds);
            for (int i = 40000; i <= 40562; i++)
            {
                workerIds.Add(i);
            }
            for (int i = 41000; i <= 41210; i++)
            {
                workerIds.Add(i);
            }
            for (int i = 42000; i <= 99000; i += 1000)
            {
                for (int j = 0; j <= 6; j++)
                {
                    workerIds.Add(i + j);
                }
            }
            // Generate 5 skills for  700 newly generated Workers
            foreach (int elem in workerIds)
            {
                for (int j = 1; j < 5; j++)
                {
                    CreateWorkerSkillDto exampleWorkerSkillData = new CreateWorkerSkillDto()
                    {
                        WorkerNumber = elem.ToString(),
                        SkillCategoryId = new ExampleDataFunctions().GenerateRandomNumber(5, 46).ToString(),
                        SkillId = j.ToString(),
                        SkillLevel = SL[new ExampleDataFunctions().GenerateRandomNumber(0, 3)]
                    };
                    _context.WorkerSkills.Add(exampleWorkerSkillData);
                }
            }

            //Generate 10 skills in which each has 10 people with the skill
            // int WorkerId = 60000;
            // for (int i = 46; i < 51; i++)
            // {
            //     for (int j = 1; j < 6; j++)
            //     {
            //         for (int k = 0; k < 10; k++)
            //         {
            //             CreateWorkerSkillDto exampleWorkerSkillData = new CreateWorkerSkillDto()
            //             {
            //                 WorkerNumber = WorkerId.ToString(),
            //                 SkillCategoryId = i.ToString(),
            //                 SkillId = j.ToString(),
            //                 SkillLevel = SL[new ExampleDataFunctions().GenerateRandomNumber(0, 3)]
            //             };
            //             WorkerId++;
            //             _context.WorkerSkills.Add(exampleWorkerSkillData);
            //         }
            //     }
            // }
            _context.SaveChanges();
        }

        private bool WorkerSkillExists(string id)
        {
            return _context.WorkerSkills.Any(e => e.WorkerNumber == id);
        }
    }
}
