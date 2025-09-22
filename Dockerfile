# Use an official Python runtime as a base image
FROM python:3.12-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements first (for better caching)
COPY requirements.txt .

# Install dependencies
RUN apt-get update && apt-get install -y build-essential libpq-dev
RUN pip install --require-hashes --no-cache-dir -r requirements.txt

# Copy the rest of the app code
COPY . .

# Expose the port Flask will run on
EXPOSE 5000

# Run the Flask app
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "wsgi:web_app"]

