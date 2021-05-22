using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace server.Models
{
    [Table("LocationCompany")]
    public partial class LocationCompany
    {
        public LocationCompany()
        {
            LocationOffices = new HashSet<LocationOffice>();
        }

        [Key]
        [StringLength(2)]
        public string CompanyCode { get; set; }
        [Required]
        [StringLength(20)]
        public string Label { get; set; }
        [StringLength(10)]
        public string ManagerWorkerNumber { get; set; }

        [ForeignKey(nameof(ManagerWorkerNumber))]
        [InverseProperty(nameof(Worker.LocationCompanies))]
        public virtual Worker ManagerWorker { get; set; }
        [InverseProperty(nameof(LocationOffice.LocationCompany))]
        public virtual ICollection<LocationOffice> LocationOffices { get; set; }
    }
}
