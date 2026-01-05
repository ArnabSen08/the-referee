# The Referee API Documentation

## Base URL
```
http://localhost:3000
```

## Endpoints

### GET /
Get API information and available endpoints.

**Response:**
```json
{
  "name": "The Referee API",
  "version": "1.0.0",
  "description": "Smart comparison tool for making informed decisions",
  "endpoints": {
    "/compare": "POST - Compare options with trade-off analysis",
    "/health": "GET - Health check endpoint"
  }
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-05T12:00:00.000Z"
}
```

### POST /compare
Compare multiple options with detailed trade-off analysis.

**Request Body:**
```json
{
  "type": "string",           // Required: comparison type
  "items": ["string"],        // Required: array of items to compare
  "constraints": {},          // Optional: user constraints
  "weights": {}              // Optional: criteria weights
}
```

**Supported Types:**
- `api` - Compare API architectures (REST, GraphQL, gRPC)
- `cloud-service` - Compare cloud providers (AWS, Azure, GCP)
- `tech-stack` - Compare technology stacks (MEAN, MERN, Django)
- `framework` - Compare frontend frameworks (React, Vue, Angular)

**Response:**
```json
{
  "type": "string",
  "items": ["string"],
  "constraints": {},
  "results": [
    {
      "name": "string",
      "scores": {
        "criterion1": 0.8,
        "criterion2": 0.6
      },
      "pros": ["string"],
      "cons": ["string"],
      "bestFor": "string",
      "overallScore": 0.75
    }
  ],
  "recommendation": {
    "recommended": "string",
    "confidence": "high|medium|low",
    "reasoning": "string",
    "alternatives": [
      {
        "name": "string",
        "reason": "string"
      }
    ]
  },
  "timestamp": "2026-01-05T12:00:00.000Z"
}
```

## Example Requests

### API Comparison
```bash
curl -X POST http://localhost:3000/compare \
  -H "Content-Type: application/json" \
  -d '{
    "type": "api",
    "items": ["REST", "GraphQL", "gRPC"],
    "constraints": {
      "performance": "high",
      "team_experience": "intermediate"
    },
    "weights": {
      "performance": 3,
      "ease_of_use": 2,
      "documentation": 1
    }
  }'
```

### Cloud Service Comparison
```bash
curl -X POST http://localhost:3000/compare \
  -H "Content-Type: application/json" \
  -d '{
    "type": "cloud-service",
    "items": ["AWS", "Azure", "GCP"],
    "constraints": {
      "budget": "medium",
      "scale": "startup"
    },
    "weights": {
      "cost": 4,
      "ease_of_use": 3,
      "performance": 2
    }
  }'
```

### Framework Comparison
```bash
curl -X POST http://localhost:3000/compare \
  -H "Content-Type: application/json" \
  -d '{
    "type": "framework",
    "items": ["React", "Vue", "Angular"],
    "constraints": {
      "team_size": "small",
      "project_complexity": "medium"
    },
    "weights": {
      "learning_curve": 3,
      "performance": 2,
      "job_opportunities": 2
    }
  }'
```

## Quick Example Endpoints

### GET /examples/api-comparison
Get a pre-configured API comparison example.

### GET /examples/cloud-comparison
Get a pre-configured cloud service comparison example.

### GET /examples/framework-comparison
Get a pre-configured framework comparison example.

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request. Required: type (string), items (array)"
}
```

### 404 Not Found
```json
{
  "error": "Endpoint not found",
  "availableEndpoints": ["/", "/compare", "/health", "/examples/*"]
}
```

### 500 Internal Server Error
```json
{
  "error": "Comparison failed",
  "message": "Detailed error message"
}
```

## Criteria Weights

When specifying weights, use positive numbers. Higher numbers indicate higher importance:

```json
{
  "weights": {
    "performance": 5,      // Very important
    "cost": 3,            // Important
    "ease_of_use": 2,     // Somewhat important
    "documentation": 1     // Less important
  }
}
```

## Constraints

Constraints help filter and adjust recommendations based on your specific situation:

```json
{
  "constraints": {
    "budget": "low|medium|high",
    "team_experience": "beginner|intermediate|expert",
    "project_scale": "small|medium|large|enterprise",
    "timeline": "tight|moderate|flexible"
  }
}
```