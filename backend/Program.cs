using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using TasksApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ✅ Register CORS service
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.Configure<JsonOptions>(opts =>
{
    opts.SerializerOptions.WriteIndented = true;
});

var app = builder.Build();

// ✅ Enable CORS middleware before endpoints
app.UseCors("AllowAll");

// In-memory store
var tasks = new List<TaskItem>
{
    // new TaskItem { Id = Guid.NewGuid(), Description = "Sample task 1" },
    // new TaskItem { Id = Guid.NewGuid(), Description = "Sample task 2", IsCompleted = true }
};

// API endpoints
app.MapGet("/api/tasks", () => Results.Ok(tasks));

app.MapPost("/api/tasks", (TaskItem incoming) =>
{
    var item = new TaskItem
    {
        Id = Guid.NewGuid(),
        Description = incoming.Description,
        IsCompleted = incoming.IsCompleted
    };
    tasks.Add(item);
    return Results.Created($"/api/tasks/{item.Id}", item);
});

app.MapPut("/api/tasks/{id:guid}", (Guid id, TaskItem update) =>
{
    var existing = tasks.FirstOrDefault(t => t.Id == id);
    if (existing is null) return Results.NotFound();
    existing.Description = update.Description;
    existing.IsCompleted = update.IsCompleted;
    return Results.NoContent();
});

app.MapDelete("/api/tasks/{id:guid}", (Guid id) =>
{
    var removed = tasks.RemoveAll(t => t.Id == id);
    return removed > 0 ? Results.NoContent() : Results.NotFound();
});

app.Run();
