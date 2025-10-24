# ==============================
# 1️⃣ Build Stage
# ==============================
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY TasksApi.csproj .
RUN dotnet restore TasksApi.csproj

# Copy the rest of the source code
COPY . .

RUN dotnet publish TasksApi.csproj -c Release -o /app/publish /p:UseAppHost=false

# ==============================
# 2️⃣ Runtime Stage
# ==============================
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "TasksApi.dll"]
