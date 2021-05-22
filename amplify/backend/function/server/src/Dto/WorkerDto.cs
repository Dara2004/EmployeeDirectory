using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using LinqKit;
using Newtonsoft.Json;
using System.Diagnostics.CodeAnalysis;

namespace server.Dto
{
    public class WorkerSkillDto : IEquatable<WorkerSkillDto>
    {
        public string SkillCategory { get; set; }
        public string Skill { get; set; }
        public string SkillLevel { get; set; }
        public string SkillCategoryId { get; set; }
        public string SkillId { get; set; }

        public bool Equals([AllowNull] WorkerSkillDto other)
        {
            if (other == null)
            {
                return false;
            }

            return SkillCategory == other.SkillCategory && Skill == other.Skill && SkillLevel == other.SkillLevel &&
                   SkillCategoryId == other.SkillCategoryId && SkillId == other.SkillId;
        }
    }

    public class WorkerSkillDtoForWorkerQuery
    {
        public string SkillId { get; set; }
        public string[] SkillLevels { get; set; }
    }

    public class Result
    {
        public int result { get; set; }
    }

    public class GetFilteredWorkerDto
    {
        public List<GetWorkerDto> workers { get; set; }
        public int total { get; set; }
    }
    public class GetWorkerDto
    {
        public string WorkerNumber { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string EmploymentType { get; set; }
        public string Title { get; set; }
        public DateTime? HireDate { get; set; }
        public DateTime? TerminationDate { get; set; }
        public string SupervisorWorker { get; set; }
        public decimal? YearsPriorExperience { get; set; }
        public string Email { get; set; }
        public string WorkPhone { get; set; }
        public string WorkCell { get; set; }
        public string PhotoUrl { get; set; }
        public string Company { get; set; }
        public string Office { get; set; }
        public string Group { get; set; }
        public List<WorkerSkillDto> Skills { get; set; }
        public string PhysicalLocation { get; set; }
        public string Type { get; set; }
        public string CompanyCode { get; set; }
        public string OfficeCode { get; set; }
        public string GroupCode { get; set; }
        public string PhysicalLocationId { get; set; }
        public string SupervisorWorkerNumber { get; set; }
        public int NumChildren { get; set; }
    }

    public class CreateWorkerSkillDto
    {
        public string SkillCategoryId { get; set; }
        public string SkillId { get; set; }
        public string SkillLevel { get; set; }
    }

    public class CreateWorkerDto
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string EmploymentType { get; set; }
        public string Title { get; set; }
        public DateTime? HireDate { get; set; }
        public DateTime? TerminationDate { get; set; } //used for update worker
        public string SupervisorWorkerNumber { get; set; }
        public decimal? YearsPriorExperience { get; set; }
        public string Email { get; set; }
        public string WorkPhone { get; set; }
        public string WorkCell { get; set; }
        public string PhotoUrl { get; set; }
        public string CompanyCode { get; set; }
        public string OfficeCode { get; set; }
        public string GroupCode { get; set; }
        public List<CreateWorkerSkillDto> Skills { get; set; }
        public string PhysicalLocationId { get; set; }
        public string Type { get; set; }
    }

    public class WorkerDetail
    {
        public string WorkerNumber { get; set; }
        public string EmploymentType { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Type { get; set; }
    }

    public class GetWorkersQuery
    {
        //structure inside query body
        public COG[] COGs { get; set; }
        public string[] PhysicalLocationIds { get; set; }
        public SkillCategory[] SkillCategories { get; set; }
        public string[] WorkerIds { get; set; }
        public WorkerDetail[] WorkerDetails { get; set; }

        public Expression<Func<Worker, bool>> Predicate()
        {
            var expr = PredicateBuilder.New<Worker>(true);

            // Match the COGs
            if (COGs.Length > 0)
            {
                var cogsExpr = PredicateBuilder.New<Worker>(false);
                foreach (COG cog in COGs)
                {
                    cogsExpr = cogsExpr.Or(cog.Predicate());
                }
                expr = expr.And(cogsExpr);
            }

            // Match the Physical Locations
            if (PhysicalLocationIds.Length > 0)
            {
                var locExpr = PredicateBuilder.New<Worker>(false);
                locExpr = locExpr.Or((w) => PhysicalLocationIds.Contains(w.PhysicalLocationId));
                expr = expr.And(locExpr);
            }

            // Match the Skill categories
            if (SkillCategories.Length > 0)
            {
                var skExpr = PredicateBuilder.New<Worker>(false);
                foreach (SkillCategory sk in SkillCategories)
                {
                    skExpr = skExpr.Or(sk.Predicate());
                }
                expr = expr.And(skExpr);

            }

            // Math the Workers
            if (WorkerIds.Length > 0)
            {
                var workerExpr = PredicateBuilder.New<Worker>(false);
                workerExpr = workerExpr.Or((w) => WorkerIds.Contains(w.WorkerNumber));
                expr = expr.And(workerExpr);
            }

            // Math Worker details
            if (WorkerDetails.Length > 0)
            {
                var workerDetailExpr = PredicateBuilder.New<Worker>(false);
                WorkerDetail trimmed = new WorkerDetail
                {
                    WorkerNumber = WorkerDetails[0].WorkerNumber.Trim(' '),
                    EmploymentType = WorkerDetails[0].EmploymentType.Trim(' ').ToLower(),
                    Title = WorkerDetails[0].Title.Trim(' ').ToLower(),
                    Email = WorkerDetails[0].Email.Trim(' ').ToLower(),
                    Phone = WorkerDetails[0].Phone.Trim(' '),
                    Type = WorkerDetails[0].Type.Trim(' ').ToLower()
                };
                workerDetailExpr = workerDetailExpr.Or((w) => w.WorkerNumber.Contains(trimmed.WorkerNumber));
                workerDetailExpr = workerDetailExpr.And((w) => w.EmploymentType.ToLower().Contains(trimmed.EmploymentType));
                workerDetailExpr = workerDetailExpr.And((w) => w.Title.ToLower().Contains(trimmed.Title));
                workerDetailExpr = workerDetailExpr.And((w) => w.Email.ToLower().Contains(trimmed.Email));
                workerDetailExpr = workerDetailExpr.And((w) => (w.WorkCell.Contains(trimmed.Phone) || w.WorkPhone.Contains(trimmed.Phone)));
                workerDetailExpr = workerDetailExpr.And((w) => w.Type.ToLower().Contains(trimmed.Type));
                expr = expr.And(workerDetailExpr);
            }

            return expr;
        }
    }

    //Company, Office, Group
    public class COG
    {
        public string CompanyCode { get; set; }
        public Office[] Offices { get; set; }

        public Expression<Func<Worker, bool>> Predicate()
        {
            var expr = PredicateBuilder.New<Worker>(true);
            expr = expr.And(w => w.CompanyCode == CompanyCode);

            //Match the offices
            if (Offices.Length > 0)
            {
                var officesExpr = PredicateBuilder.New<Worker>(false);
                foreach (Office office in Offices)
                {
                    officesExpr = officesExpr.Or(office.Predicate());
                }

                expr = expr.And(officesExpr);
            }

            return expr;

        }
    }

    public class Office
    {
        public string OfficeCode { get; set; }
        public string[] GroupCodes { get; set; }

        public Expression<Func<Worker, bool>> Predicate()
        {

            var expr = PredicateBuilder.New<Worker>(true);
            expr = expr.And(w => w.OfficeCode == OfficeCode);

            //Match the groups
            if (GroupCodes.Length > 0)
            {
                expr = expr.And(w => GroupCodes.Contains(w.GroupCode));
            }

            return expr;
        }
    }

    public class SkillCategory
    {
        public string SkillCategoryId { get; set; }
        public WorkerSkillDtoForWorkerQuery[] Skills { get; set; }

        public Expression<Func<Worker, bool>> Predicate()
        {
            var expr = PredicateBuilder.New<Worker>(true);
            expr = expr.And(w => w.WorkerSkills.Any(wk => wk.SkillCategoryId == SkillCategoryId));

            if (Skills.Length > 0)
            {
                var skillsExpr = PredicateBuilder.New<Worker>(false);
                foreach (WorkerSkillDtoForWorkerQuery skill in Skills)
                {
                    skillsExpr = skillsExpr.Or(w => w.WorkerSkills.Any(wk => wk.SkillId == skill.SkillId && wk.SkillCategoryId == SkillCategoryId && skill.SkillLevels.Any(sl => sl == wk.SkillLevel)));
                }
                expr = expr.And(skillsExpr);
            }

            return expr;
        }
    }
}
