using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace server.Models
{
    [Table("SkillCategory")]
    public partial class SkillCategory
    {
        public SkillCategory()
        {
            Skills = new HashSet<Skill>();
        }

        [Key]
        [StringLength(32)]
        public string SkillCategoryId { get; set; }
        [Required]
        [StringLength(100)]
        public string Label { get; set; }
        [StringLength(10)]
        public string SortValue { get; set; }

        [InverseProperty(nameof(Skill.SkillCategory))]
        public virtual ICollection<Skill> Skills { get; set; }
    }
}
