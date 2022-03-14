using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using DogAPI.Models;
using Newtonsoft.Json;

namespace DogAPI.Controllers;

public class HomeController : Controller
{
    public string JsonString { get; set; }
    
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public async Task<IActionResult> Index()
    {
       JsonString = await GetJsonFromApi("https://dog.ceo/api/breeds/image/random");
       DogModel? dml = JsonConvert.DeserializeObject<DogModel>(JsonString);  
       
       return View(dml);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    public async Task<string> GetJsonFromApi(string url)
    {
        HttpClient client = new HttpClient();
        return await client.GetStringAsync(url);
    }
}