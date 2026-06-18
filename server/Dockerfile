# Use official Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy backend dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the backend files
COPY . .

# Expose backend port
EXPOSE 5000

# Run the server
CMD ["npm", "run", "server"]