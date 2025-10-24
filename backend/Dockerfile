# ==============================
# 1️⃣ Build Stage
# ==============================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy only the project file first (so restore is cached)
COPY ./TasksApi.csproj ./
RUN dotnet restore TasksApi.csproj

# Copy the rest of the source code
COPY . ./

# Build and publish the app
RUN dotnet publish TasksApi.csproj -c Release -o out

# ==============================
# 2️⃣ Runtime Stage
# ==============================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /app/out ./
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000

ENTRYPOINT ["dotnet", "TasksApi.dll"]
