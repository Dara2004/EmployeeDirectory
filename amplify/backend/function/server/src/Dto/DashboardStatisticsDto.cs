using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dto
{
    public class DashboardStatisticsDto
    {
        public int numberOfEmployees { get; set; }

        public int numberOfContractors { get; set; }

        public int numberOfOffices { get; set; }
    }
}