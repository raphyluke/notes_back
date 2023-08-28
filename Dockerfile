# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the port that your Next.js app will run on
EXPOSE 3000

# Command to start your Next.js app
CMD ["npm", "run", "start:dev"]