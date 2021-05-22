using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dto
{
    public class SearchDocumentDto
    {
        //pkey of each record --make sure there's no duplicate
        public string Id { get; set; }

        //one of "company", "office", "group", "skill", "skill category", "physical location", employee", or "contractor"
        public string Type { get; set; }

        //Worker's firstname lastname email, Company, Office, Group, Physical location, Skill category, or Skill labels
        public string Text { get; set; }

        public string Breadcrumb { get; set; }
    }
}
