# Use an official Node.js runtime as a parent image
FROM node:22

# Set the working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json files to the working directory
COPY package.json package.json
COPY package-lock.json package-lock.json

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port your app runs on (adjust this to the actual port if different)
EXPOSE 3000

# Define the command to run your app in development mode
CMD ["npm", "run", "start:dev"]
