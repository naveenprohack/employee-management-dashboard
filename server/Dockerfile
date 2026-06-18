# Upgrade to Node 20
FROM node:20-alpine

WORKDIR /usr/src/app

# Copy the package files explicitly from the server directory context
COPY package*.json ./

# Modern npm flag (replaced --production)
RUN npm install --omit=dev

COPY . .

EXPOSE 5000

CMD ["npm", "run", "server"]