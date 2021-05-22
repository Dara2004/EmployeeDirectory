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
using server.Auth;
using Microsoft.Net.Http.Headers;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkersController : ControllerBase
    {
        private readonly EmployeeDirectoryContext _context;
        private IAuthService AuthService;

        public WorkersController(EmployeeDirectoryContext context, IAuthService authService)
        {
            _context = context;
            var str = authService.ToString();
            Console.WriteLine(str);
            AuthService = authService;
        }

        protected List<string> GetAllWorkersID()
        {
            return (List<string>)_context.Workers.Select(e => e.WorkerNumber).ToList();
        }

        // GET: api/Workers
        /// <summary>
        /// Get all workers
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetWorkerDto>>> GetWorkers([FromQuery] int take = 5, [FromQuery] int skip = 0, [FromQuery] string sortBy = "")
        {
            var query = _context.Workers.Select(w => new GetWorkerDto
            {
                WorkerNumber = w.WorkerNumber,
                Email = w.Email,
                EmploymentType = w.EmploymentType,
                FirstName = w.FirstName,
                LastName = w.LastName,
                HireDate = w.HireDate,
                Title = w.Title,
                WorkCell = w.WorkCell,
                PhysicalLocation = w.PhysicalLocation.Label,
                PhotoUrl = w.PhotoUrl,
                WorkPhone = w.WorkPhone,
                TerminationDate = w.TerminationDate,
                YearsPriorExperience = w.YearsPriorExperience,
                Company = w.LocationGroup.LocationOffice.LocationCompany.Label,
                Office = w.LocationGroup.LocationOffice.Label,
                Group = w.LocationGroup.Label,
                Skills = w.WorkerSkills.Select(ws => new WorkerSkillDto { SkillCategoryId = ws.Skill.SkillCategoryId, SkillCategory = ws.Skill.SkillCategory.Label, SkillId = ws.Skill.SkillId, Skill = ws.Skill.Label, SkillLevel = ws.SkillLevel }).ToList(),
                SupervisorWorker = $"{w.SupervisorWorker.FirstName} {w.SupervisorWorker.LastName}",
                Type = w.Type,
                CompanyCode = w.CompanyCode,
                OfficeCode = w.OfficeCode,
                GroupCode = w.GroupCode,
                PhysicalLocationId = w.PhysicalLocationId,
                SupervisorWorkerNumber = w.SupervisorWorkerNumber,
                NumChildren = _context.Workers.Where(s => s.SupervisorWorkerNumber == w.WorkerNumber).Count()
            });

            switch (sortBy)
            {
                case "physicalLocation":
                    query = query.OrderBy(w => w.PhysicalLocation);
                    break;

                case "name":
                    query = query.OrderBy(w => w.FirstName);
                    break;

                case "company":
                    query = query.OrderBy(w => w.Company);
                    break;

                case "office":
                    query = query.OrderBy(w => w.Office);
                    break;

                case "group":
                    query = query.OrderBy(w => w.Group);
                    break;

                default:
                    break;
            }

            return await query.Skip(skip).Take(take).ToListAsync();
        }

        // GET: api/Workers
        /// <summary>
        /// Get all workers that match given criteria
        /// </summary>
        [HttpPost("filter")]
        public async Task<GetFilteredWorkerDto> GetFilteredWorkers([FromBody] GetWorkersQuery q, [FromQuery] int take = 5, [FromQuery] int skip = 0, [FromQuery] string sortBy = "")
        {
            var queryCount = _context.Workers.Where(q.Predicate());

            var total = await queryCount.CountAsync();
            var query = queryCount.Select(w => new GetWorkerDto
            {
                WorkerNumber = w.WorkerNumber,
                Email = w.Email,
                EmploymentType = w.EmploymentType,
                FirstName = w.FirstName,
                LastName = w.LastName,
                HireDate = w.HireDate,
                Title = w.Title,
                WorkCell = w.WorkCell,
                PhysicalLocation = w.PhysicalLocation.Label,
                PhotoUrl = w.PhotoUrl,
                WorkPhone = w.WorkPhone,
                TerminationDate = w.TerminationDate,
                YearsPriorExperience = w.YearsPriorExperience,
                Company = w.LocationGroup.LocationOffice.LocationCompany.Label,
                Office = w.LocationGroup.LocationOffice.Label,
                Group = w.LocationGroup.Label,
                Skills = w.WorkerSkills.Select(ws => new WorkerSkillDto { SkillCategoryId = ws.Skill.SkillCategoryId, SkillCategory = ws.Skill.SkillCategory.Label, SkillId = ws.Skill.SkillId, Skill = ws.Skill.Label, SkillLevel = ws.SkillLevel }).ToList(),
                SupervisorWorker = $"{w.SupervisorWorker.FirstName} {w.SupervisorWorker.LastName}",
                Type = w.Type,
                CompanyCode = w.CompanyCode,
                OfficeCode = w.OfficeCode,
                GroupCode = w.GroupCode,
                PhysicalLocationId = w.PhysicalLocationId,
                SupervisorWorkerNumber = w.SupervisorWorkerNumber,
                NumChildren = _context.Workers.Where(s => s.SupervisorWorkerNumber == w.WorkerNumber).Count()
            });

            switch (sortBy)
            {
                case "physicalLocation":
                    query = query.OrderBy(w => w.PhysicalLocation);
                    break;

                case "name":
                    query = query.OrderBy(w => w.FirstName);
                    break;

                case "company":
                    query = query.OrderBy(w => w.Company);
                    break;

                case "office":
                    query = query.OrderBy(w => w.Office);
                    break;

                case "group":
                    query = query.OrderBy(w => w.Group);
                    break;

                default:
                    break;
            }

            var workers = await query.Skip(skip).Take(take).ToListAsync();

            return new GetFilteredWorkerDto
            {
                workers = workers,
                total = total
            };
        }

        // GET: api/Workers/5
        /// <summary>
        /// Get a worker by id
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<GetWorkerDto>> GetWorker(string id)
        {
            var query = _context.Workers.Where(w => w.WorkerNumber == id).Select(w =>
                new GetWorkerDto
                {
                    WorkerNumber = w.WorkerNumber,
                    Email = w.Email,
                    EmploymentType = w.EmploymentType,
                    FirstName = w.FirstName,
                    LastName = w.LastName,
                    HireDate = w.HireDate,
                    Title = w.Title,
                    WorkCell = w.WorkCell,
                    PhysicalLocation = w.PhysicalLocation.Label,
                    PhotoUrl = w.PhotoUrl,
                    WorkPhone = w.WorkPhone,
                    YearsPriorExperience = w.YearsPriorExperience,
                    Company = w.LocationGroup.LocationOffice.LocationCompany.Label,
                    Office = w.LocationGroup.LocationOffice.Label,
                    Group = w.LocationGroup.Label,
                    Skills = w.WorkerSkills.Select(ws => new WorkerSkillDto { SkillCategoryId = ws.Skill.SkillCategoryId, SkillCategory = ws.Skill.SkillCategory.Label, SkillId = ws.Skill.SkillId, Skill = ws.Skill.Label, SkillLevel = ws.SkillLevel }).ToList(),
                    SupervisorWorker = $"{w.SupervisorWorker.FirstName} {w.SupervisorWorker.LastName}",
                    Type = w.Type,
                    CompanyCode = w.CompanyCode,
                    OfficeCode = w.OfficeCode,
                    GroupCode = w.GroupCode,
                    PhysicalLocationId = w.PhysicalLocationId,
                    SupervisorWorkerNumber = w.SupervisorWorkerNumber,
                    NumChildren = _context.Workers.Where(s => s.SupervisorWorkerNumber == w.WorkerNumber).Count()
                }
            );

            var res = await query.FirstOrDefaultAsync();

            if (res == null)
            {
                return NotFound();
            }
            return Ok(res);
        }

        // PUT: api/Workers/5
        /// <summary>
        /// Update a worker
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorker(string id, CreateWorkerDto workerDto)
        {
            //get token from the request's header https://stackoverflow.com/questions/49768774/how-to-get-access-token-from-httpcontext-in-net-core-2-0
            var token = Request.Headers[HeaderNames.Authorization];
            var isValidated = AuthService.AuthorizeAccess(token);
            if (isValidated == false)
            {
                return Unauthorized();
            }

            var foundWorker = await _context.Workers.Include(w => w.WorkerSkills).FirstOrDefaultAsync(w => w.WorkerNumber == id);
            if (foundWorker == null)
            {
                return NotFound();
            }

            foundWorker.WorkerNumber = id;
            foundWorker.CompanyCode = workerDto.CompanyCode;
            foundWorker.OfficeCode = workerDto.OfficeCode;
            foundWorker.GroupCode = workerDto.GroupCode;
            foundWorker.PhysicalLocationId = workerDto.PhysicalLocationId;
            foundWorker.SupervisorWorkerNumber = workerDto.SupervisorWorkerNumber;
            foundWorker.Email = workerDto.Email;
            foundWorker.EmploymentType = workerDto.EmploymentType;
            foundWorker.FirstName = workerDto.FirstName;
            foundWorker.LastName = workerDto.LastName;
            foundWorker.Title = workerDto.Title;
            foundWorker.HireDate = workerDto.HireDate;
            foundWorker.TerminationDate = workerDto.TerminationDate;
            foundWorker.PhotoUrl = workerDto.PhotoUrl;
            foundWorker.WorkPhone = workerDto.WorkPhone;
            foundWorker.WorkCell = workerDto.WorkCell;
            foundWorker.YearsPriorExperience = workerDto.YearsPriorExperience;
            foundWorker.Type = workerDto.Type;

            // update or delete existing skills
            foreach (var existingSkill in foundWorker.WorkerSkills)
            {
                var inDto = workerDto.Skills.Find(s =>
                    s.SkillId == existingSkill.SkillId && s.SkillCategoryId == existingSkill.SkillCategoryId);
                if (inDto == null)
                {
                    _context.WorkerSkills.Remove(existingSkill);
                    continue;
                }

                if (inDto.SkillLevel != existingSkill.SkillLevel)
                {
                    existingSkill.SkillLevel = inDto.SkillLevel;
                }

                workerDto.Skills.Remove(inDto);
            }

            // add new skills
            foreach (var skill in workerDto.Skills)
            {
                foundWorker.WorkerSkills.Add(new Models.CreateWorkerSkillDto()
                {
                    SkillCategoryId = skill.SkillCategoryId,
                    SkillId = skill.SkillId,
                    SkillLevel = skill.SkillLevel
                });
            }

            await _context.SaveChangesAsync();
            return Ok(id);
        }
        
        [HttpGet("checkHasChild/{workerid}")]
        public Result CheckHasChild(string workerId)
        {
            var res = _context.Workers.Where(w => w.SupervisorWorkerNumber == workerId).Count();

            Result result = new Result
            {
                result = res,
            };
            return result;
        }

        // POST: api/Workers
        /// <summary>
        /// Create a worker
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<string>> PostWorker(CreateWorkerDto w)
        {

            //get token from the request's header https://stackoverflow.com/questions/49768774/how-to-get-access-token-from-httpcontext-in-net-core-2-0
            var token = Request.Headers[HeaderNames.Authorization];
            var isValidated = AuthService.AuthorizeAccess(token);
            if (isValidated == false)
            {
                return Unauthorized();
            }
            var worker = new Worker
            {
                WorkerNumber = Guid.NewGuid().ToString().Substring(0, 5),
                CompanyCode = w.CompanyCode,
                OfficeCode = w.OfficeCode,
                GroupCode = w.GroupCode,
                Email = w.Email,
                EmploymentType = w.EmploymentType,
                FirstName = w.FirstName,
                LastName = w.LastName,
                HireDate = w.HireDate,
                Title = w.Title,
                WorkCell = w.WorkCell,
                WorkPhone = w.WorkPhone,
                SupervisorWorkerNumber = w.SupervisorWorkerNumber,
                YearsPriorExperience = w.YearsPriorExperience,
                PhysicalLocationId = w.PhysicalLocationId,
                PhotoUrl = w.PhotoUrl,
                Type = w.Type,
            };
            _context.Workers.Add(worker);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (WorkerExists(worker.WorkerNumber))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            foreach (Dto.CreateWorkerSkillDto s in w.Skills)
            {
                var workerSkill = new Models.CreateWorkerSkillDto
                {
                    WorkerNumber = worker.WorkerNumber,
                    SkillCategoryId = s.SkillCategoryId,
                    SkillId = s.SkillId,
                    SkillLevel = s.SkillLevel,
                };
                _context.WorkerSkills.Add(workerSkill);
            }
            //TODO: add the new worker to ES db
            await _context.SaveChangesAsync();

            return Ok(worker.WorkerNumber);
        }

        // DELETE: api/Workers/5
        /// <summary>
        /// Delete a worker
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult<Worker>> DeleteWorker(string id)
        {
            //get token from the request's header https://stackoverflow.com/questions/49768774/how-to-get-access-token-from-httpcontext-in-net-core-2-0
            var token = Request.Headers[HeaderNames.Authorization];
            var isValidated = AuthService.AuthorizeAccess(token);
            if (isValidated == false)
            {
                return Unauthorized();
            }
            var worker = await _context.Workers.FindAsync(id);
            if (worker == null)
            {
                return NotFound();
            }

            _context.Workers.Remove(worker);
            var workerSkills = _context.WorkerSkills.Where(ws => ws.WorkerNumber == id);
            foreach (var workerSkill in workerSkills)
            {
                _context.WorkerSkills.Remove(workerSkill);
            }
            await _context.SaveChangesAsync();

            return worker;
        }

        private bool WorkerExists(string id)
        {
            return _context.Workers.Any(e => e.WorkerNumber == id);
        }

        private Worker GenerateRandomWorker(string id, string supervisorId, int companyCode)
        {
            string firstName = new ExampleDataFunctions().GenerateWorkerNames(new ExampleDataFunctions().GenerateRandomNumber(0, 199));
            int CodeGroup = new ExampleDataFunctions().GenerateRandomNumber(1, 4);
            var OfficeEntries = new LocationGroupsController(_context).GetAllOfficeEntriesGivenCCGC(companyCode, CodeGroup);
            string CodeOffice = OfficeEntries[new ExampleDataFunctions().GenerateRandomNumber(0, OfficeEntries.Count() - 1)];
            int workernum = int.Parse(id);
            string gender = workernum % 2 == 1 ? "women/" : "men/";
            string picnum = (workernum % 100).ToString();

            return new Worker()
            {
                WorkerNumber = id,
                CompanyCode = companyCode.ToString(),
                OfficeCode = CodeOffice.ToString(),
                GroupCode = CodeGroup.ToString(),
                LastName = new ExampleDataFunctions().GenerateWorkerNames(new ExampleDataFunctions().GenerateRandomNumber(0, 199)),
                FirstName = firstName,
                EmploymentType = "Salary",
                Title = new ExampleDataFunctions().GenerateReadableTitles(new ExampleDataFunctions().GenerateRandomNumber(0, 99)),
                HireDate = new ExampleDataFunctions().GenerateRandomDate(),
                SupervisorWorkerNumber = supervisorId.ToString(),
                YearsPriorExperience = new ExampleDataFunctions().GenerateRandomNumber(0, 16),
                Email = firstName + "@emaildoesntexist.ca",
                WorkPhone = new ExampleDataFunctions().GeneratePhone(new ExampleDataFunctions().GenerateRandomNumber(0, 10)),
                WorkCell = new ExampleDataFunctions().GeneratePhone(new ExampleDataFunctions().GenerateRandomNumber(0, 10)),
                PhysicalLocationId = new LocationPhysicalsController(_context).GetLocationPhysical()[new ExampleDataFunctions().GenerateRandomNumber(0, 67)],
                PhotoUrl = "https://randomuser.me/api/portraits/" + gender + picnum + ".jpg",
                Type = new ExampleDataFunctions().GenerateType(new ExampleDataFunctions().GenerateRandomNumber(0, 2))
            };
        }

        // GET: api/Workers/addData
        // Total 1162 Entries
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("addData")]
        public void GenerateWorkersData()
        {
            // Employees are randomly selected to a specific company, and group. From the given company and group, they are selected to the available offices.
            // Employees can be manager of different companies or locations or groups
            int CodeCompany = 10;
            int baseWorkerNum = 40000;
            int presidentWorkerNum = 10000;
            int workerNumberL1 = baseWorkerNum++;
            int workerNumberL2;
            int workerNumberL3;
            int workerNumberL4;
            int workerNumberL5;
            int workerNumberL6;
            Worker exampleWorkerData;
            exampleWorkerData = GenerateRandomWorker(workerNumberL1.ToString(), presidentWorkerNum.ToString(), CodeCompany);
            _context.Workers.Add(exampleWorkerData);
            _context.SaveChanges();
            for (int addIdL2 = 1; addIdL2 <= 2; addIdL2++)
            {
                workerNumberL2 = baseWorkerNum++;
                exampleWorkerData = GenerateRandomWorker(workerNumberL2.ToString(), workerNumberL1.ToString(), CodeCompany);
                _context.Workers.Add(exampleWorkerData);
                _context.SaveChanges();
                for (int addIdL3 = 1; addIdL3 <= 5; addIdL3++)
                {
                    workerNumberL3 = baseWorkerNum++;
                    exampleWorkerData = GenerateRandomWorker(workerNumberL3.ToString(), workerNumberL2.ToString(), CodeCompany);
                    _context.Workers.Add(exampleWorkerData);
                    _context.SaveChanges();
                    for (int addIdL4 = 1; addIdL4 <= 5; addIdL4++)
                    {
                        workerNumberL4 = baseWorkerNum++;
                        exampleWorkerData = GenerateRandomWorker(workerNumberL4.ToString(), workerNumberL3.ToString(), CodeCompany);
                        _context.Workers.Add(exampleWorkerData);
                        _context.SaveChanges();
                        for (int addIdL5 = 1; addIdL5 <= 5; addIdL5++)
                        {
                            workerNumberL5 = baseWorkerNum++;
                            exampleWorkerData = GenerateRandomWorker(workerNumberL5.ToString(), workerNumberL4.ToString(), CodeCompany);
                            _context.Workers.Add(exampleWorkerData);
                            _context.SaveChanges();
                            for (int addIdL6 = 1; addIdL6 <= 1; addIdL6++)
                            {
                                workerNumberL6 = baseWorkerNum++;
                                exampleWorkerData = GenerateRandomWorker(workerNumberL6.ToString(), workerNumberL5.ToString(), CodeCompany);
                                _context.Workers.Add(exampleWorkerData);
                                _context.SaveChanges();
                            }
                        }
                    }
                }
            }
        }

        // GET: api/Workers/addData2
        // Order 7 - Total 1041 Entries
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("addData2")]
        public void GenerateWorkersData2()
        {
            // Employees are randomly selected to a specific company, and group. From the given company and group, they are selected to the available offices.
            // Employees can be manager of different companies or locations or groups
            int CodeCompany = 11;
            int baseWorkerNum = 41000;
            int presidentWorkerNum = 10000;
            int workerNumberL1 = baseWorkerNum++;
            int workerNumberL2;
            int workerNumberL3;
            int workerNumberL4;
            Worker exampleWorkerData;
            exampleWorkerData = GenerateRandomWorker(workerNumberL1.ToString(), presidentWorkerNum.ToString(), CodeCompany);
            _context.Workers.Add(exampleWorkerData);
            _context.SaveChanges();
            for (int addIdL2 = 1; addIdL2 <= 10; addIdL2++)
            {
                workerNumberL2 = baseWorkerNum++;
                exampleWorkerData = GenerateRandomWorker(workerNumberL2.ToString(), workerNumberL1.ToString(), CodeCompany);
                _context.Workers.Add(exampleWorkerData);
                _context.SaveChanges();
                for (int addIdL3 = 1; addIdL3 <= 10; addIdL3++)
                {
                    workerNumberL3 = baseWorkerNum++;
                    exampleWorkerData = GenerateRandomWorker(workerNumberL3.ToString(), workerNumberL2.ToString(), CodeCompany);
                    _context.Workers.Add(exampleWorkerData);
                    _context.SaveChanges();
                    for (int addIdL4 = 1; addIdL4 <= 1; addIdL4++)
                    {
                        workerNumberL4 = baseWorkerNum++;
                        exampleWorkerData = GenerateRandomWorker(workerNumberL4.ToString(), workerNumberL3.ToString(), CodeCompany);
                        _context.Workers.Add(exampleWorkerData);
                        _context.SaveChanges();
                    }
                }
            }
        }

        // GET: api/Workers/addData3
        // Order 7 - Total 1041 Entries
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("addData3")]
        public void GenerateWorkersData3()
        {
            // Employees are randomly selected to a specific company, and group. From the given company and group, they are selected to the available offices.
            // Employees can be manager of different companies or locations or groups
            int baseWorkerNum = 42000;
            int presidentWorkerNum = 10000;
            int workerNumberL1;
            int workerNumberL2;
            Worker exampleWorkerData;
            for (int companyCode = 12; companyCode <= 69; companyCode++)
            {
                baseWorkerNum = 30000 + companyCode * 1000;
                workerNumberL1 = baseWorkerNum++;
                exampleWorkerData = GenerateRandomWorker(workerNumberL1.ToString(), presidentWorkerNum.ToString(), companyCode);
                _context.Workers.Add(exampleWorkerData);
                _context.SaveChanges();
                for (int addIdL2 = 1; addIdL2 <= 6; addIdL2++)
                {
                    workerNumberL2 = baseWorkerNum++;
                    exampleWorkerData = GenerateRandomWorker(workerNumberL2.ToString(), workerNumberL1.ToString(), companyCode);
                    _context.Workers.Add(exampleWorkerData);
                    _context.SaveChanges();
                }
            }
        }

        // PUT: api/Workers/testdataupdate
        /// <summary>
        /// Update a worker
        /// </summary>
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("testdataupdate")]
        public void UpdateTestData()
        {
            var workers = _context.Workers;
            foreach (Worker oldWorker in workers)
            {
                oldWorker.Email = oldWorker.FirstName + "@emaildoesntexist.ca";
                oldWorker.WorkPhone = new ExampleDataFunctions().GeneratePhone(new ExampleDataFunctions().GenerateRandomNumber(0, 10));
                oldWorker.WorkCell = new ExampleDataFunctions().GeneratePhone(new ExampleDataFunctions().GenerateRandomNumber(0, 10));
            }
            _context.SaveChanges();
        }
    }
}
