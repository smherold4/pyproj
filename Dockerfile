# Use an official Python runtime as a base image
FROM python:3.12-slim

# Set working directory inside container
WORKDIR /app

# for production
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# Copy requirements first (for better caching)
COPY requirements.txt .

# Install linux dependencies
RUN apt-get update && apt-get install -y --no-install-recommends build-essential libpq-dev && rm -rf /var/lib/apt/lists/*

# Pip install
RUN pip install --require-hashes --no-cache-dir -r requirements.txt

# Copy the rest of the app code
COPY . .

# Expose the port Flask will run on
EXPOSE 8000

CMD gunicorn \
  --bind 0.0.0.0:${PORT:-8000} \
  --workers ${GUNICORN_WORKERS:-2} \
  --timeout ${GUNICORN_TIMEOUT:-60} \
  wsgi:web_app