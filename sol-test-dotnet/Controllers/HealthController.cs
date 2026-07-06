namespace SolTestDotNet.Controllers;

using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("hp")]
public partial class HealthController(ILogger<HealthController> logger) : ControllerBase
{
    [HttpGet(Name = "Get Health Check")]
    public IActionResult Get()
    {
        LogHealthCheckRequested(logger);
        return Ok(new { status = "ok" });
    }

    [LoggerMessage(
        EventId = 1,
        Level = LogLevel.Information,
        Message = "Health check requested")]
    private static partial void LogHealthCheckRequested(ILogger logger);
}