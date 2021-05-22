using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace server.Models
{
    [Table("WorkerSkill")]
    public partial class CreateWorkerSkillDto
    {
        [Key]
        [StringLength(10)]
        public string WorkerNumber { get; set; }
        [Key]
        [StringLength(32)]
        public string SkillCategoryId { get; set; }
        [Key]
        [StringLength(32)]
        public string SkillId { get; set; }
        [Required]
        [StringLength(12)]
        public string SkillLevel { get; set; }

        [ForeignKey("SkillCategoryId,SkillId")]
        [InverseProperty("WorkerSkills")]
        public virtual Skill Skill { get; set; }
        [ForeignKey(nameof(WorkerNumber))]
        [InverseProperty(nameof(Models.Worker.WorkerSkills))]
        public virtual Worker Worker { get; set; }
    }
}
