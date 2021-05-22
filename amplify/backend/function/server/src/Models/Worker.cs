using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace server.Models
{
    [Table("Worker")]
    public partial class Worker
    {
        public Worker()
        {
            InverseSupervisorWorkerNumberNavigation = new HashSet<Worker>();
            LocationCompanies = new HashSet<LocationCompany>();
            LocationGroups = new HashSet<LocationGroup>();
            LocationOffices = new HashSet<LocationOffice>();
            WorkerSkills = new HashSet<CreateWorkerSkillDto>();
        }

        [Key]
        [StringLength(10)]
        public string WorkerNumber { get; set; }
        [Required]
        [StringLength(2)]
        public string CompanyCode { get; set; }
        [Required]
        [StringLength(2)]
        public string OfficeCode { get; set; }
        [Required]
        [StringLength(2)]
        public string GroupCode { get; set; }
        [StringLength(50)]
        public string LastName { get; set; }
        [StringLength(25)]
        public string FirstName { get; set; }
        [StringLength(10)]
        public string EmploymentType { get; set; }
        [StringLength(50)]
        public string Title { get; set; }
        [Column(TypeName = "date")]
        public DateTime? HireDate { get; set; }
        [Column(TypeName = "date")]
        public DateTime? TerminationDate { get; set; }
        [Required]
        [StringLength(10)]
        public string SupervisorWorkerNumber { get; set; }
        [Column(TypeName = "numeric(3, 1)")]
        public decimal? YearsPriorExperience { get; set; }
        [StringLength(50)]
        public string Email { get; set; }
        [StringLength(24)]
        public string WorkPhone { get; set; }
        [StringLength(24)]
        public string WorkCell { get; set; }
        [Required]
        [StringLength(20)]
        public string PhysicalLocationId { get; set; }
        [StringLength(255)]
        public string PhotoUrl { get; set; }
        [StringLength(15)]
        public string Type { get; set; }

        [ForeignKey("CompanyCode,OfficeCode,GroupCode")]
        [InverseProperty("Workers")]
        public virtual LocationGroup LocationGroup { get; set; }
        [ForeignKey(nameof(PhysicalLocationId))]
        [InverseProperty(nameof(LocationPhysical.Workers))]
        public virtual LocationPhysical PhysicalLocation { get; set; }
        [ForeignKey(nameof(SupervisorWorkerNumber))]
        [InverseProperty(nameof(Worker.InverseSupervisorWorkerNumberNavigation))]
        public virtual Worker SupervisorWorker { get; set; }
        [InverseProperty(nameof(Worker.SupervisorWorker))]
        public virtual ICollection<Worker> InverseSupervisorWorkerNumberNavigation { get; set; }
        //Manager worker can manage multiple companies, groups and offices, but can only belong to one company/office/group
        [InverseProperty(nameof(LocationCompany.ManagerWorker))]
        public virtual ICollection<LocationCompany> LocationCompanies { get; set; }
        [InverseProperty("ManagerWorker")]
        public virtual ICollection<LocationGroup> LocationGroups { get; set; }
        [InverseProperty(nameof(LocationOffice.ManagerWorker))]
        public virtual ICollection<LocationOffice> LocationOffices { get; set; }
        [InverseProperty(nameof(CreateWorkerSkillDto.Worker))]
        public virtual ICollection<CreateWorkerSkillDto> WorkerSkills { get; set; }
    }
}
