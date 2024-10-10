# Use the official MySQL image from the Docker Hub:
    FROM mysql:8.0

    # Copy the custom database initialization SQL scripts:
    COPY ./vacations.sql /docker-entrypoint-initdb.d/
    