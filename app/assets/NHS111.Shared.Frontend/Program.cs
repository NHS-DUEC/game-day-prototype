using Microsoft.AspNetCore.Rewrite;
using Microsoft.Extensions.FileProviders;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseHttpsRedirection();

app.UseStaticFiles(new StaticFileOptions {
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "dist")),
    OnPrepareResponse = ctx => {
      ctx.Context.Response.Headers[HeaderNames.CacheControl] =
          "public,max-age=" + 0;
    }
});

app.Run();
