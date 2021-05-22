using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Elasticsearch.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Nest;
using server.Dto;
using server.ElasticSearch;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        public ISearchService SearchService { get; set; }
        public SearchController(ISearchService searchService)
        {
            SearchService = searchService;
        }

        /// <summary>
        /// Get autosuggestion for a given search string
        /// </summary>
        [HttpGet("/api/autosuggestion")]
        public async Task<ActionResult<IEnumerable<SearchDocumentDto>>> Autosuggestion([FromQuery] string searchStr, [FromQuery] string searchType = "")
        {
            try { 
                return Ok(await SearchService.Autosuggestion(searchStr, searchType)); 
            }
            catch (ElasticsearchClientException e)
            {
                Console.WriteLine(e.FailureReason);
                throw e;
            }
        }


        /// <summary>
        /// Combine all data into a single search index
        /// </summary>
        [ApiExplorerSettings(IgnoreApi = true)]
        [HttpGet("/api/createSearchIndex")]
        public async Task<ActionResult> CreateSearchIndex()
        {
            await SearchService.CreateSearchIndex();
            return Ok();
        }
    }
}