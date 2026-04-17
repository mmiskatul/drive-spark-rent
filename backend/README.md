# Drive Spark Rent Backend

FastAPI backend scaffolded for MongoDB Atlas with a layered architecture:

- `api`: HTTP routing and request/response boundaries.
- `core`: settings, security, logging, and shared infrastructure.
- `db`: MongoDB connection lifecycle, index setup, and dependencies.
- `models`: database document models.
- `schemas`: Pydantic API contracts.
- `repositories`: persistence access.
- `services`: business use cases.

## Quick Start

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -e ".[dev]"
copy .env.example .env
uvicorn app.main:app --reload
```

Set `MONGODB_URI` to your MongoDB Atlas connection string in `.env`.

## Useful Commands

```bash
ruff check .
pytest
uvicorn app.main:app --host 0.0.0.0 --port 8000
docker build -t drive-spark-rent-api .
```

## API Flow

The current scaffold includes production-ready health endpoints and a cars domain:

- `GET /api/v1/health`
- `GET /api/v1/cars`
- `POST /api/v1/cars`
- `GET /api/v1/cars/{car_id}`
- `PATCH /api/v1/cars/{car_id}`
- `DELETE /api/v1/cars/{car_id}`

OpenAPI docs are available at `/docs` outside production.

## MongoDB Atlas Notes

Use an Atlas URI with an application user that has only the required database permissions. Keep the URI in `.env` or your deployment secret manager; never commit real credentials.
