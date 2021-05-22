using Microsoft.AspNetCore.Mvc;
using server.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Nest;

namespace server.ElasticSearch
{
    public interface ISearchService
    {
        public Task CreateSearchIndex();
        public Task<IEnumerable<SearchDocumentDto>> Autosuggestion(string searchStr, string searchType);
    }
}
