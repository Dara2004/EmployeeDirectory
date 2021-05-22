using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Moq;
using server.Controllers;
using server.Dto;
using server.Models;
using Xunit;
using Xunit.Abstractions;
using CreateWorkerSkillDto = server.Dto.CreateWorkerSkillDto;

namespace server.test
{
    public class SqliteInMemoryItemsControllerTests : WorkerControllerTests
    {
        private readonly ITestOutputHelper _testOutputHelper;
        private readonly DbConnection _connection;
        public SqliteInMemoryItemsControllerTests(ITestOutputHelper testOutputHelper)
            : base(
                new DbContextOptionsBuilder<EmployeeDirectoryContext>()
                    .UseSqlite(CreateInMemoryDatabase())
                    .Options)
        {
            _testOutputHelper = testOutputHelper;
            _connection = RelationalOptionsExtension.Extract(ContextOptions).Connection;
        }

        private static DbConnection CreateInMemoryDatabase()
        {
            var connection = new SqliteConnection("Filename=:memory:");
            connection.Open();
            return connection;
        }

        public void Dispose() => _connection.Dispose();

        /// <summary>
        /// Filter workers
        /// </summary>
        [Fact]
        public async void FilterWorkers_ByPhysicalLocation()
        {
            var query = new GetWorkersQuery()
            {
                COGs = new COG[] { },
                PhysicalLocationIds = new string[] { "TEST_LOCATION1" },
                SkillCategories = new Dto.SkillCategory[] { },
                WorkerIds = new string[] { },
            };

            // Use a clean instance of the context to run the test
            await using var context = new EmployeeDirectoryContext(ContextOptions);
            var mockedAuthService = new Mock<server.Auth.IAuthService>();
            var controller = new WorkersController(context, mockedAuthService.Object);

            GetFilteredWorkerDto result = await controller.GetFilteredWorkers(query);
            Assert.Equal(3, result.total);
            Assert.Equal(new string[] { "TEST_WORKER1", "TEST_WORKER3", "TEST_WORKER5" }, result.workers.Select(w => w.WorkerNumber));
        }

        [Fact]
        public async void FilterWorkers_ByCOGs()
        {
            var query = new GetWorkersQuery()
            {
                COGs = new COG[] {
                    new COG() {
                        CompanyCode = "TEST_COMPANY1",
                        Offices = new Office[] {
                            new Office()
                            {
                                OfficeCode = "TEST_OFFICE1",
                                GroupCodes = new string[] { "TEST_GROUP1" },
                            }
                        }
                    },
                },
                PhysicalLocationIds = new string[] { },
                SkillCategories = new Dto.SkillCategory[] { },
                WorkerIds = new string[] { },
            };

            // Use a clean instance of the context to run the test
            await using var context = new EmployeeDirectoryContext(ContextOptions);
            var mockedAuthService = new Mock<server.Auth.IAuthService>();
            var controller = new WorkersController(context, mockedAuthService.Object);

            GetFilteredWorkerDto result = await controller.GetFilteredWorkers(query);
            Assert.Equal(3, result.total);
            Assert.Equal(new string[] { "TEST_WORKER1", "TEST_WORKER3", "TEST_WORKER5" }, result.workers.Select(w => w.WorkerNumber));
        }

        [Fact]
        public async void FilterWorkers_BySkills()
        {
            var query = new GetWorkersQuery()
            {
                COGs = new COG[] { },
                PhysicalLocationIds = new string[] { },
                SkillCategories = new Dto.SkillCategory[]
                {
                    new Dto.SkillCategory()
                    {
                        SkillCategoryId = "TEST_SKILLCATEGORY1",
                        Skills = new WorkerSkillDtoForWorkerQuery[]
                        {
                            new WorkerSkillDtoForWorkerQuery()
                            {
                                SkillId = "TEST_SKILL2",
                                SkillLevels = new string[] { "intermediate" },
                            }
                        }
                    }
                },
                WorkerIds = new string[] { },
            };

            // Use a clean instance of the context to run the test
            await using var context = new EmployeeDirectoryContext(ContextOptions);
            var mockedAuthService = new Mock<server.Auth.IAuthService>();
            var controller = new WorkersController(context, mockedAuthService.Object);

            GetFilteredWorkerDto result = await controller.GetFilteredWorkers(query);
            Assert.Equal(2, result.total);
            Assert.Equal(new string[] { "TEST_WORKER2", "TEST_WORKER4" }, result.workers.Select(w => w.WorkerNumber));
        }

        [Fact]
        public async void FilterWorkers_None()
        {
            var query = new GetWorkersQuery()
            {
                COGs = new COG[] { },
                PhysicalLocationIds = new string[] { },
                SkillCategories = new Dto.SkillCategory[] { },
                WorkerIds = new string[] { },
            };

            // Use a clean instance of the context to run the test
            await using var context = new EmployeeDirectoryContext(ContextOptions);
            var mockedAuthService = new Mock<server.Auth.IAuthService>();
            var controller = new WorkersController(context, mockedAuthService.Object);

            GetFilteredWorkerDto result = await controller.GetFilteredWorkers(query);
            Assert.Equal(5, result.total);
        }

        [Fact]
        public async void FilterWorkers_Combined()
        {
            var query = new GetWorkersQuery()
            {
                COGs = new COG[] {
                    new COG() {
                        CompanyCode = "TEST_COMPANY1",
                        Offices = new Office[] {
                            new Office()
                            {
                                OfficeCode = "TEST_OFFICE1",
                                GroupCodes = new string[] { "TEST_GROUP1" },
                            }
                        }
                    },
                },
                PhysicalLocationIds = new string[] { "TEST_LOCATION1" },
                SkillCategories = new Dto.SkillCategory[]
                {
                    new Dto.SkillCategory()
                    {
                        SkillCategoryId = "TEST_SKILLCATEGORY1",
                        Skills = new WorkerSkillDtoForWorkerQuery[]
                        {
                            new WorkerSkillDtoForWorkerQuery()
                            {
                                SkillId = "TEST_SKILL1",
                                SkillLevels = new string[] { "intermediate" },
                            }
                        }
                    }
                },
                WorkerIds = new string[] { },
            };

            // Use a clean instance of the context to run the test
            await using var context = new EmployeeDirectoryContext(ContextOptions);
            var mockedAuthService = new Mock<server.Auth.IAuthService>();
            var controller = new WorkersController(context, mockedAuthService.Object);

            GetFilteredWorkerDto result = await controller.GetFilteredWorkers(query);
            Assert.Equal(3, result.total);
            Assert.Equal(new[] { "TEST_WORKER1", "TEST_WORKER3", "TEST_WORKER5" }, result.workers.Select(w => w.WorkerNumber));
        }

        /// <summary>
        /// Get workers
        /// </summary>
        [Fact]
        public async void GetWorkers_Ok()
        {
            // Use a clean instance of the context to run the test
            await using var context = new EmployeeDirectoryContext(ContextOptions);
            var mockedAuthService = new Mock<server.Auth.IAuthService>();
            var controller = new WorkersController(context, mockedAuthService.Object);

            var result = (await controller.GetWorkers()).Value.ToList();
            Assert.Equal(5, result.Count);
            for (var i = 1; i <= 5; i++)
            {
                Assert.Contains(result, worker => worker.WorkerNumber == $"TEST_WORKER{i}");
            }
        }

        /// <summary>
        /// Get worker by id
        /// </summary>
        [Fact]
        public async void GetWorkerById_Ok()
        {
            // Use a clean instance of the context to run the test
            await using var context = new EmployeeDirectoryContext(ContextOptions);
            var mockedAuthService = new Mock<server.Auth.IAuthService>();
            var controller = new WorkersController(context, mockedAuthService.Object);

            var result = await controller.GetWorker("TEST_WORKER1");
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var dto = Assert.IsType<GetWorkerDto>(okResult.Value);
            Assert.Equal("TEST_WORKER1", dto.WorkerNumber);
        }

        [Fact]
        public async void GetWorkerById_NotFound()
        {
            // Use a clean instance of the context to run the test
            await using var context = new EmployeeDirectoryContext(ContextOptions);
            var mockedAuthService = new Mock<server.Auth.IAuthService>();
            var controller = new WorkersController(context, mockedAuthService.Object);

            var result = await controller.GetWorker("NonExistent");
            Assert.IsType<NotFoundResult>(result.Result);
        }

        /// <summary>
        /// Create worker
        /// </summary>
        [Fact]
        public async void CreateWorker_Ok()
        {
            //Arrange
            await using var context = new EmployeeDirectoryContext(ContextOptions);
            await using var context2 = new EmployeeDirectoryContext(ContextOptions);
            var mockedAuthService = new Mock<server.Auth.IAuthService>();
            const string token = "mock token";
            mockedAuthService.Setup(mock => mock.AuthorizeAccess(token)).Returns(true);

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = token;
            var controller = new WorkersController(context, mockedAuthService.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext,
                }
            };

            var newWorkerDto = new CreateWorkerDto()
            {
                FirstName = "Test1",
                LastName = "Worker1",
                Email = "test_worker1@ae.ca",
                SupervisorWorkerNumber = "TEST_WORKER1",
                CompanyCode = "TEST_COMPANY2",
                OfficeCode = "TEST_OFFICE2",
                GroupCode = "TEST_GROUP2",
                EmploymentType = "Salary",
                Skills = new List<CreateWorkerSkillDto>(),
                PhotoUrl = "new_photo_url",
                PhysicalLocationId = "TEST_LOCATION2",
                Title = "staff"
            };

            //Act
            var createWorkerRes = await controller.PostWorker(newWorkerDto);

            //Assert
            var okResultCreate = Assert.IsType<OkObjectResult>(createWorkerRes.Result);
            var workerId = Assert.IsType<string>(okResultCreate.Value);
            var result = await controller.GetWorker(workerId);

            var okResultGetWorker = Assert.IsType<OkObjectResult>(result.Result);
            var dto = Assert.IsType<GetWorkerDto>(okResultGetWorker.Value);
            Assert.Equal(workerId, dto.WorkerNumber);
        }

        /// <summary>
        /// Update worker
        /// </summary>
        [Fact]
        public async void UpdateWorker_AddSkills_Ok()
        {
            //Arrange
            await using var context = new EmployeeDirectoryContext(ContextOptions);
            await using var context2 = new EmployeeDirectoryContext(ContextOptions);
            var mockedAuthService = new Mock<server.Auth.IAuthService>();
            const string token = "mock token";
            mockedAuthService.Setup(mock => mock.AuthorizeAccess(token)).Returns(true);

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = token;
            var controller = new WorkersController(context, mockedAuthService.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext,
                }
            };

            var updatedWorkerDto = new CreateWorkerDto()
            {
                FirstName = "Test1",
                LastName = "Worker1",
                Email = "test_worker1@ae.ca",
                SupervisorWorkerNumber = "TEST_WORKER1",
                CompanyCode = "TEST_COMPANY2",
                OfficeCode = "TEST_OFFICE2",
                GroupCode = "TEST_GROUP2",
                EmploymentType = "Salary",
                Skills = new List<CreateWorkerSkillDto>()
                {
                    new CreateWorkerSkillDto()
                    {
                        SkillCategoryId = "TEST_SKILLCATEGORY1",
                        SkillId = "TEST_SKILL1",
                        SkillLevel = "intermediate"
                    },
                    new CreateWorkerSkillDto()
                    {
                        SkillCategoryId = "TEST_SKILLCATEGORY1",
                        SkillId = "TEST_SKILL2",
                        SkillLevel = "expert"
                    }
                },
                PhotoUrl = "new_photo_url",
                PhysicalLocationId = "TEST_LOCATION2",
                Title = "staff"
            };

            //Before update
            var result = await controller.GetWorker("TEST_WORKER1");
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var dto = Assert.IsType<GetWorkerDto>(okResult.Value);
            Assert.Equal("Test Company 1", dto.Company);

            //Act
            var resultPut = await controller.PutWorker("TEST_WORKER1", updatedWorkerDto);

            //Assert
            Assert.IsType<OkObjectResult>(resultPut);
            var workerInDb = await context2.Workers.FindAsync("TEST_WORKER1");
            Assert.Equal("TEST_COMPANY2", workerInDb.CompanyCode);
            _testOutputHelper.WriteLine("Database updated correctly");

            result = await controller.GetWorker("TEST_WORKER1");
            okResult = Assert.IsType<OkObjectResult>(result.Result);
            dto = Assert.IsType<GetWorkerDto>(okResult.Value);
            //check company is updated correctly
            Assert.Equal("Test Company 2", dto.Company);

            //check skills are added correctly
            Assert.Equal(new List<WorkerSkillDto>
            {
                new WorkerSkillDto() { SkillCategoryId = "TEST_SKILLCATEGORY1", SkillId = "TEST_SKILL1", SkillLevel = "intermediate", SkillCategory = "Test Skill Category 1", Skill = "Test Skill 1"},
                new WorkerSkillDto() { SkillCategoryId = "TEST_SKILLCATEGORY1", SkillId = "TEST_SKILL2", SkillLevel = "expert", SkillCategory = "Test Skill Category 1", Skill = "Test Skill 2"}
            }, dto.Skills);
        }


        [Fact]
        public async void UpdateWorker_RemoveSkills_Ok()
        {
            //Arrange
            await using var context = new EmployeeDirectoryContext(ContextOptions);
            await using var context2 = new EmployeeDirectoryContext(ContextOptions);
            var mockedAuthService = new Mock<server.Auth.IAuthService>();
            const string token = "mock token";
            mockedAuthService.Setup(mock => mock.AuthorizeAccess(token)).Returns(true);

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = token;
            var controller = new WorkersController(context, mockedAuthService.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext,
                }
            };

            var updatedWorkerDto = new CreateWorkerDto()
            {
                FirstName = "Test1",
                LastName = "Worker1",
                Email = "test_worker1@ae.ca",
                SupervisorWorkerNumber = "TEST_WORKER1",
                CompanyCode = "TEST_COMPANY2",
                OfficeCode = "TEST_OFFICE2",
                GroupCode = "TEST_GROUP2",
                EmploymentType = "Salary",
                Skills = new List<CreateWorkerSkillDto>() { },
                PhotoUrl = "new_photo_url",
                PhysicalLocationId = "TEST_LOCATION2",
                Title = "staff"
            };

            //Act
            var resultPut = await controller.PutWorker("TEST_WORKER1", updatedWorkerDto);

            //Assert
            Assert.IsType<OkObjectResult>(resultPut);
            var result = await controller.GetWorker("TEST_WORKER1");
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var dto = Assert.IsType<GetWorkerDto>(okResult.Value);

            //check skills are removed correctly
            Assert.Equal(new List<WorkerSkillDto>
            { }, dto.Skills);

            //check skills are updated correctly
            Assert.Equal(new List<WorkerSkillDto>
            { }, dto.Skills);
        }

        [Fact]
        public async void UpdateWorker_UpdateSkillLevel_Ok()
        {
            //Arrange
            await using var context = new EmployeeDirectoryContext(ContextOptions);
            await using var context2 = new EmployeeDirectoryContext(ContextOptions);
            var mockedAuthService = new Mock<server.Auth.IAuthService>();
            const string token = "mock token";
            mockedAuthService.Setup(mock => mock.AuthorizeAccess(token)).Returns(true);

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = token;
            var controller = new WorkersController(context, mockedAuthService.Object)
            {
                ControllerContext = new ControllerContext()
                {
                    HttpContext = httpContext,
                }
            };

            var updatedWorkerDto = new CreateWorkerDto()
            {
                FirstName = "Test1",
                LastName = "Worker1",
                Email = "test_worker1@ae.ca",
                SupervisorWorkerNumber = "TEST_WORKER1",
                CompanyCode = "TEST_COMPANY2",
                OfficeCode = "TEST_OFFICE2",
                GroupCode = "TEST_GROUP2",
                EmploymentType = "Salary",
                Skills = new List<CreateWorkerSkillDto>() {new CreateWorkerSkillDto()
                {
                    SkillCategoryId = "TEST_SKILLCATEGORY1",
                    SkillId = "TEST_SKILL1",
                    SkillLevel = "expert"
                },

                },
                PhotoUrl = "new_photo_url",
                PhysicalLocationId = "TEST_LOCATION2",
                Title = "staff"
            };

            //Act
            var resultPut = await controller.PutWorker("TEST_WORKER1", updatedWorkerDto);

            //Assert
            Assert.IsType<OkObjectResult>(resultPut);
            var result = await controller.GetWorker("TEST_WORKER1");
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var dto = Assert.IsType<GetWorkerDto>(okResult.Value);

            //check skills are updated correctly
            Assert.Equal(new List<WorkerSkillDto>
            {
                new WorkerSkillDto() { SkillCategoryId = "TEST_SKILLCATEGORY1", SkillId = "TEST_SKILL1", SkillLevel = "expert", SkillCategory = "Test Skill Category 1", Skill = "Test Skill 1"},
            }, dto.Skills);
        }
    }
}
