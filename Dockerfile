# Use official lightweight Python image
FROM python:3.10-slim

# Set working directory inside container
WORKDIR /app

# Install system dependencies & curl for healthchecks
RUN apt-get update --fix-missing && \
    apt-get install -y --no-install-recommends \
    build-essential \
    curl \
    git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements and install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all application source files into container
COPY . .

# Expose port for enterprise container traffic
EXPOSE 8000

# Healthcheck to ensure container is running smoothly for bank auditors
HEALTHCHECK CMD curl --fail http://localhost:8000/health || exit 1

# Command to run production server via Uvicorn (FastAPI)
ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
