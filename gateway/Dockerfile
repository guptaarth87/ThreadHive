# Use official Node.js image
FROM node:22.13.0

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --production


# Copy the rest of the application code
COPY . .

#  Ensure TypeScript is compiled before starting the app
RUN yarn build  

# Expose ports (adjust accordingly)
EXPOSE 5000

# Start the application using compiled JavaScript files
CMD ["node", "dist/main.js"]
