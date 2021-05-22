using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace server.Models
{
    [Table("Skill")]
    public partial class Skill
    {
        public Skill()
        {
            WorkerSkills = new HashSet<CreateWorkerSkillDto>();
        }

        [Key]
        [StringLength(32)]
        public string SkillCategoryId { get; set; }
        [Key]
        [StringLength(32)]
        public string SkillId { get; set; }
        [Required]
        [StringLength(100)]
        public string Label { get; set; }
        [StringLength(10)]
        public string SortValue { get; set; }

        [ForeignKey(nameof(SkillCategoryId))]
        [InverseProperty("Skills")]
        public virtual SkillCategory SkillCategory { get; set; }
        [InverseProperty(nameof(CreateWorkerSkillDto.Skill))]
        public virtual ICollection<CreateWorkerSkillDto> WorkerSkills { get; set; }
    }
}
