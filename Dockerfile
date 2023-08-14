# Use a Node.js base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application into the container
COPY . .

# Your application's default port
EXPOSE 3000

# Run your application
CMD ["node", "index.js"]