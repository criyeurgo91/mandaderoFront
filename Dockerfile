# Use an official Node.js runtime as a parent image
FROM node:latest AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the project
RUN npm run build

# Use Nginx as a lightweight web server for serving static files
FROM nginx:alpine

# Copy built files from the previous stage to the NGINX directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the nginx server in the foreground
CMD ["nginx", "-g", "daemon off;"]