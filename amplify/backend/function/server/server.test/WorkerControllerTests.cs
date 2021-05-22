using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using server.Controllers;
using server.Dto;
using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace server.test
{
    public class WorkerControllerTests
    {
        protected DbContextOptions<EmployeeDirectoryContext> ContextOptions { get; }
        protected WorkerControllerTests(DbContextOptions<EmployeeDirectoryContext> contextOptions)
        {
            ContextOptions = contextOptions;
            Seed();
        }
        private void Seed()
        {
            using var context = new EmployeeDirectoryContext(ContextOptions);
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            var testLocationCompany1 = new LocationCompany() { CompanyCode = "TEST_COMPANY1", Label = "Test Company 1" };
            var testLocationCompany2 = new LocationCompany() { CompanyCode = "TEST_COMPANY2", Label = "Test Company 2" };

            var testLocationOffice1 = new LocationOffice() { CompanyCode = "TEST_COMPANY1", OfficeCode = "TEST_OFFICE1", Label = "Test Office 1" };
            var testLocationOffice2 = new LocationOffice() { CompanyCode = "TEST_COMPANY2", OfficeCode = "TEST_OFFICE2", Label = "Test Office 2" };

            var testLocationGroup1 = new LocationGroup() { CompanyCode = "TEST_COMPANY1", OfficeCode = "TEST_OFFICE1", GroupCode = "TEST_GROUP1", Label = "Test Group 1" };
            var testLocationGroup2 = new LocationGroup() { CompanyCode = "TEST_COMPANY2", OfficeCode = "TEST_OFFICE2", GroupCode = "TEST_GROUP2", Label = "Test Group 2" };

            var testLocationPhysical1 = new LocationPhysical() { PhysicalLocationId = "TEST_LOCATION1", Label = "Test Location 1" };
            var testLocationPhysical2 = new LocationPhysical() { PhysicalLocationId = "TEST_LOCATION2", Label = "Test Location 2" };

            var testSkillCategory = new Models.SkillCategory() { SkillCategoryId = "TEST_SKILLCATEGORY1", Label = "Test Skill Category 1" };
            
            var testSkill1 = new Skill() { SkillCategoryId = "TEST_SKILLCATEGORY1", SkillId = "TEST_SKILL1", Label = "Test Skill 1" };
            var testSkill2 = new Skill() { SkillCategoryId = "TEST_SKILLCATEGORY1", SkillId = "TEST_SKILL2", Label = "Test Skill 2" };

            context.LocationCompanies.Add(testLocationCompany1);
            context.LocationCompanies.Add(testLocationCompany2);
            context.LocationOffices.Add(testLocationOffice1);
            context.LocationOffices.Add(testLocationOffice2);
            context.LocationGroups.Add(testLocationGroup1);
            context.LocationGroups.Add(testLocationGroup2);
            context.LocationPhysicals.Add(testLocationPhysical1);
            context.LocationPhysicals.Add(testLocationPhysical2);
            context.SkillCategories.Add(testSkillCategory);
            context.Skills.Add(testSkill1);
            context.Skills.Add(testSkill2);

            GenerateTestWorkers(context);
            context.SaveChanges();
        }

        private void GenerateTestWorkers(EmployeeDirectoryContext context)
        {
            for (int i = 1; i <= 5; i++)
            {

                var testWorker = new Worker()
                {
                    WorkerNumber = $"TEST_WORKER{i}",
                    FirstName = $"Test{i}",
                    LastName = $"Worker{i}",
                    Email = $"test_worker{i}@ae.ca",
                    CompanyCode = i % 2 == 0 ? "TEST_COMPANY2" : "TEST_COMPANY1",
                    EmploymentType = "TEST_EMPLOYMENT_TYPE",
                    Title = "some_title",
                    WorkPhone = "12345",
                    WorkCell = "12345",
                    PhotoUrl = "some_url",
                    Type = "Employee",
                    OfficeCode = i % 2 == 0 ? "TEST_OFFICE2" : "TEST_OFFICE1",
                    GroupCode = i % 2 == 0 ? "TEST_GROUP2" : "TEST_GROUP1",
                    PhysicalLocationId = i % 2 == 0 ? "TEST_LOCATION2" : "TEST_LOCATION1",
                    WorkerSkills = new Models.CreateWorkerSkillDto[]
                    {
                        new Models.CreateWorkerSkillDto()
                        {
                            SkillCategoryId = "TEST_SKILLCATEGORY1", SkillId = i % 2 == 0 ? "TEST_SKILL2" : "TEST_SKILL1",
                            SkillLevel = "intermediate"
                        }
                    },
                    SupervisorWorkerNumber = $"TEST_WORKER{i}"
                };
                context.Workers.Add(testWorker);

            }
        }
    }
}
