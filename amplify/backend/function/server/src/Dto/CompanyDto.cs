using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dto
{
    public class CompanyDto
    {
        public string CompanyCode { get; set; }
        public string Label { get; set; }
        public string ManagerWorkerNumber { get; set; }
        public virtual List<OfficeDto> Offices { get; set; }
    }
}
