using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace server.Models
{
    [Table("LocationGroup")]
    public partial class LocationGroup
    {
        public LocationGroup()
        {
            Workers = new HashSet<Worker>();
        }

        [Key]
        [StringLength(2)]
        public string CompanyCode { get; set; }
        [Key]
        [StringLength(2)]
        public string OfficeCode { get; set; }
        [Key]
        [StringLength(2)]
        public string GroupCode { get; set; }
        [Required]
        [StringLength(20)]
        public string Label { get; set; }
        [StringLength(10)]
        public string ManagerWorkerNumber { get; set; }

        [ForeignKey("CompanyCode,OfficeCode")]
        [InverseProperty("LocationGroups")]
        public virtual LocationOffice LocationOffice { get; set; }
        [ForeignKey(nameof(ManagerWorkerNumber))]
        [InverseProperty(nameof(Worker.LocationGroups))]
        public virtual Worker ManagerWorker { get; set; }
        [InverseProperty(nameof(Worker.LocationGroup))]
        public virtual ICollection<Worker> Workers { get; set; }
    }
}
