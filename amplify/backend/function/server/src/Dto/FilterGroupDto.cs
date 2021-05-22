using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dto
{
    public class FilterGroupDto
    {
        public string Name { get; set; }
        public virtual List<FilterItemDto> Filters { get; set; }
    }
}
