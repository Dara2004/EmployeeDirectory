using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dto
{
    public class WorkerTreeDto
    {
        public string id { get; set; }
        public OrgChartWorkerDto entity { get; set; }
        public bool hasChild { get; set; }
        public bool hasParent { get; set; }
        public WorkerTreeDto[] children { get; set; }
    }

    public class OrgChartWorkerDto
    {
        public string id { get; set; }
        public string avatar { get; set; }
        public string name { get; set; }
        public string title { get; set; }
        public int totalReports { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public string type { get; set; }
    }

    public class FilteredTreeQuery
    {
        public string[] locationCompanyIds { get; set; }
        public string workerId { get; set; }
    }
}