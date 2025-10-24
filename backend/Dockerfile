# ==============================
# 1️⃣ Build Stage
# ==============================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the backend source code
COPY . ./

# Build the project (Release mode)
RUN dotnet publish -c Release -o out

# ==============================
# 2️⃣ Runtime Stage
# ==============================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy compiled output from build stage
COPY --from=build /app/out ./

# Expose the default port for the API
EXPOSE 5000

# Set environment variable for ASP.NET Core
ENV ASPNETCORE_URLS=http://+:5000

# Start the app
ENTRYPOINT ["dotnet", "TasksApi.dll"]
