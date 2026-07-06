var builder = WebApplication.CreateBuilder(args);

var allowedOrigins = new List<string>
{
    "https://sol-ng.onrender.com",
};

var isDev = builder.Environment.IsDevelopment();

if (isDev)
{
    allowedOrigins.Add("http://localhost:4200");
}

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

// Logging
builder.Logging.AddConsole();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendCors", policy =>
    {
        policy
            .WithOrigins(allowedOrigins.ToArray())
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (isDev)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("FrontendCors");
app.UseAuthorization();
app.MapControllers();

app.Run();
