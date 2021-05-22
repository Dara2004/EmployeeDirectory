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


namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrgChartController : ControllerBase
    {
        private readonly EmployeeDirectoryContext _context;

        public OrgChartController(EmployeeDirectoryContext context)
        {
            _context = context;
        }

        protected static string selectPhone(string phone1, string phone2)
        {
            if (phone1 == "")
            {
                return phone2;
            }
            else
            {
                return phone1;
            }
        }

        protected static OrgChartWorkerDto getEntityFromRecord(Worker worker, int totalReports)
        {
            return new OrgChartWorkerDto
            {
                id = worker.WorkerNumber,
                avatar = worker.PhotoUrl,
                name = $"{worker.FirstName} {worker.LastName}",
                title = worker.Title,
                totalReports = totalReports,
                phone = selectPhone(worker.WorkPhone, worker.WorkCell),
                email = worker.Email,
                type = char.ToUpper(worker.Type[0]) + worker.Type.Substring(1)
            };
        }

        // returns worker or supervisor, never null
        protected async Task<Worker> getHighestSupervisor(Worker worker, Worker[] workers)
        {
            string workerNumber = worker.WorkerNumber;
            string supervisorWorkerNumber = worker.SupervisorWorkerNumber;
            if (supervisorWorkerNumber != workerNumber)
            {
                var supervisor = SelectByWorkerNumber(workers, supervisorWorkerNumber);
                if (supervisor == null)
                {
                    return worker;
                }
                return await getHighestSupervisor(supervisor, workers);
            }
            else
            {
                return worker;
            }
        }

        protected async Task<WorkerTreeDto> getWorkerSubtree(Worker worker, Worker[] workers, int numLevels = -1)
        {
            string id = worker.WorkerNumber;
            var children = SelectChildren(workers, id);

            var entity = getEntityFromRecord(worker, children.Length);
            WorkerTreeDto[] childTreeArray;

            if (numLevels != 1)
            {
                childTreeArray = new WorkerTreeDto[children.Count()];
                for (int i = 0; i < children.Count(); i++)
                {
                    var childTreeDto = await getWorkerSubtree(children.ElementAt(i), workers, numLevels - 1);
                    childTreeArray[i] = childTreeDto;
                }
            }
            else
            {
                childTreeArray = new WorkerTreeDto[0];
            }

            var workerTree = new WorkerTreeDto
            {
                id = id,
                entity = entity,
                hasChild = childTreeArray.Length != 0,
                hasParent = worker.SupervisorWorkerNumber != worker.WorkerNumber,
                children = childTreeArray
            };

            return workerTree;
        }

        public static Worker SelectByWorkerNumber(Worker[] workerArray, string value)
        {
            List<Worker> workers = new List<Worker>();
            foreach (Worker worker in workerArray)
            {
                if (worker.WorkerNumber == value)
                {
                    workers.Add(worker);
                }
            }
            if (workers.Count() == 0)
            {
                return null;
            }
            return workers.ToArray()[0];
        }

        public static Worker[] SelectChildren(Worker[] workerArray, string supervisorId)
        {
            List<Worker> workers = new List<Worker>();
            foreach (Worker worker in workerArray)
            {
                if (worker.SupervisorWorkerNumber == supervisorId && worker.WorkerNumber != supervisorId)
                {
                    workers.Add(worker);
                }
            }
            return workers.ToArray();
        }

        // GET: api/OrgChart/id/tree
        /// <summary>
        /// Get worker tree
        /// </summary>
        [HttpGet("{id}/tree")]
        public async Task<ActionResult<WorkerTreeDto>> GetWorkerTree(string id)
        {
            var peopleQuery = _context.Workers;
            var people = await peopleQuery.ToArrayAsync();
            var person = SelectByWorkerNumber(people, id);
            var highestSupervisor = await getHighestSupervisor(person, people);
            var allTree = await getWorkerSubtree(highestSupervisor, people);

            return allTree;
        }

        // GET: api/OrgChart/id/smalltree
        /// <summary>
        /// Get worker tree
        /// </summary>
        [HttpGet("{id}/smalltree")]
        public async Task<ActionResult<WorkerTreeDto>> GetWorkerSmallTree(string id)
        {
            var peopleQuery = _context.Workers;
            var people = await peopleQuery.ToArrayAsync();
            var person = SelectByWorkerNumber(people, id);
            Worker supervisor = person;
            var numLevels = 2;
            if (person.SupervisorWorkerNumber != person.WorkerNumber)
            {
                supervisor = SelectByWorkerNumber(people, person.SupervisorWorkerNumber);
                numLevels = 3;
            }
            var allTree = await getWorkerSubtree(supervisor, people, numLevels);

            return allTree;
        }

        // GET: api/OrgChart/filteredtree
        /// <summary>
        /// Get worker tree
        /// </summary>
        [HttpPost("filteredtree")]
        public async Task<ActionResult<WorkerTreeDto>> GetFilteredWorkerTree([FromBody] FilteredTreeQuery query)
        {
            var peopleQuery = _context.Workers.Where(w => query.locationCompanyIds.Contains(w.CompanyCode));
            var people = await peopleQuery.ToArrayAsync();
            var person = SelectByWorkerNumber(people, query.workerId);
            if (person == null)
            {
                return null;
            }
            var highestSupervisor = await getHighestSupervisor(person, people);
            var allTree = await getWorkerSubtree(highestSupervisor, people);

            return allTree;
        }

        // GET: api/OrgChart/onefilteredtree
        /// <summary>
        /// Get worker tree
        /// </summary>
        [HttpGet("singlefilteredtree/{companyId}")]
        public async Task<ActionResult<WorkerTreeDto>> GetFilteredWorkerTreeSingle(string companyId)
        {
            // var peopleQuery = _context.Workers.Where(w => companyId == w.CompanyCode);
            Worker[] people;
            if (companyId == "all")
            {
                var peopleQuery = _context.Workers;
                people = await peopleQuery.ToArrayAsync();
            }
            else
            {
                var peopleQuery = _context.Workers.Where(w => companyId == w.CompanyCode);
                people = await peopleQuery.ToArrayAsync();
            }
            // var people = await peopleQuery.ToArrayAsync();
            if (people.Count() == 0)
            {
                return null;
            }
            var person = people[0];
            var highestSupervisor = await getHighestSupervisor(person, people);
            var allTree = await getWorkerSubtree(highestSupervisor, people);

            return allTree;
        }
    }
}
