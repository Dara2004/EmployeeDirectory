using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace server.Models
{
    [Table("LocationPhysical")]
    public partial class LocationPhysical
    {
        public LocationPhysical()
        {
            Workers = new HashSet<Worker>();
        }

        [Key]
        [StringLength(20)]
        public string PhysicalLocationId { get; set; }
        [Required]
        [StringLength(100)]
        public string Label { get; set; }
        [StringLength(100)]
        public string SortValue { get; set; }

        [InverseProperty(nameof(Worker.PhysicalLocation))]
        public virtual ICollection<Worker> Workers { get; set; }
    }
}
