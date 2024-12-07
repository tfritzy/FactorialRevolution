using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using FactorialRevolution;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.Services.AddLogging();

await builder.Build().RunAsync();