#!/bin/bash

# Start MariaDB (MySQL-compatible)
service mariadb start

# Wait for MySQL/MariaDB to be ready
until mysqladmin ping -h "localhost" --silent; do
  echo "Waiting for MariaDB (MySQL) to start..."
  sleep 2
done

echo "MariaDB (MySQL) is up and running!"

# Set the root password (only if not set)
mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '12345'; FLUSH PRIVILEGES;"

# Ensure the changes take effect
export MYSQL_PWD='12345'

# Create the database
mysql -u root -p'12345' -e "CREATE DATABASE IF NOT EXISTS threadhive;"

# Grant privileges to root (use '%' for external access)
mysql -u root -p'12345' -e "GRANT ALL PRIVILEGES ON threadhive.* TO 'root'@'%' IDENTIFIED BY '12345'; FLUSH PRIVILEGES;"

# Run database migrations
yarn migrate

yarn build
# Start the NestJS application
yarn start
