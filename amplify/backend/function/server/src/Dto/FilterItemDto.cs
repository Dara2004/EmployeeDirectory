using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Dto
{
    public class FilterItemDto
    {
        public string Id { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public virtual List<FilterItemDto> Children { get; set; }
    }
}
