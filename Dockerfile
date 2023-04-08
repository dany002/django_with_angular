# Use an official Python runtime as a parent image
FROM python:3.9-slim-buster

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip
RUN pip install psycopg2-binary
RUN pip install gunicorn
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Set environment variables
ENV PORT=8000
ENV DEBUG=False

# Expose port 8000 for Gunicorn
EXPOSE 8000

# Run Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:$PORT", "djangoProject.wsgi"]