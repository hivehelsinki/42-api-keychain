# Use an official Node.js runtime as the base image
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev --quiet

COPY . .

CMD ["npm", "run", "docker:start"]
