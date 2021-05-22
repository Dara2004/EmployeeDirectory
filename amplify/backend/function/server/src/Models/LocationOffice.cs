using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace server.Models
{
    [Table("LocationOffice")]
    public partial class LocationOffice
    {
        public LocationOffice()
        {
            LocationGroups = new HashSet<LocationGroup>();
        }

        [Key]
        [StringLength(2)]
        public string CompanyCode { get; set; }
        [Key]
        [StringLength(2)]
        public string OfficeCode { get; set; }
        [Required]
        [StringLength(20)]
        public string Label { get; set; }
        [StringLength(10)]
        public string ManagerWorkerNumber { get; set; }

        [ForeignKey(nameof(CompanyCode))]
        [InverseProperty(nameof(Models.LocationCompany.LocationOffices))]
        public virtual LocationCompany LocationCompany { get; set; }
        [ForeignKey(nameof(ManagerWorkerNumber))]
        [InverseProperty(nameof(Worker.LocationOffices))]
        public virtual Worker ManagerWorker { get; set; }
        [InverseProperty(nameof(LocationGroup.LocationOffice))]
        public virtual ICollection<LocationGroup> LocationGroups { get; set; }
    }
}
