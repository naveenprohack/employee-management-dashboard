# Use official Node.js image
FROM node:18-alpine

# Set working directory for frontend
WORKDIR /usr/src/app

# Copy package files from root
COPY package*.json ./
RUN npm install

# Copy all root folders/files (except what's in .dockerignore)
COPY . .

# Expose Vite's port (usually 5173 or 3000 depending on your package.json script)
EXPOSE 5173

# Run Vite dev server
CMD ["npm", "run", "dev"]