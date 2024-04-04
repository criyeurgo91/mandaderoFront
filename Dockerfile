# Use an official Node.js runtime as a parent imagez
FROM node:latest AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pa
COPY package*.json ./


RUN npm install

COPY . .


RUN npm run build


FROM nginx:alpine


COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]
