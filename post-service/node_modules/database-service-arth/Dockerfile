# Use Node.js as the base image (based on Debian)
FROM node:22.13.0

WORKDIR /app

# Install system dependencies
RUN apt-get -y update && apt-get install -y \
    mariadb-server \
    mariadb-client \
    nodejs \
    yarn

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the entire project
COPY . .

# Copy and set up entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose MySQL & app ports
EXPOSE 3306 

# Use entrypoint script
CMD ["/entrypoint.sh"]
