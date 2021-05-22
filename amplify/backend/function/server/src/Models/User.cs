using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("User")]
    public class User
    {
        [Key]
        public string UserId { get; set; }
        [Required]
        [StringLength(20)]
        public string Username { get; set; } //Username should be unique
        public string Email { get; set; }
        public string Salt { get; set; }
        public string Hash { get; set; }
    }
}
