using Microsoft.AspNetCore.Mvc;

namespace sol_test_dotnet.Controllers;

[ApiController]
[Route("hp")]
public class HealthController : ControllerBase
{
    private readonly ILogger<HealthController> _logger;

    public HealthController(ILogger<HealthController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "/health")]
    public IActionResult Get()
    {
        return Ok(new { status = "ok" });
    }
}
