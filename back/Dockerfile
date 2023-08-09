# Use an official Node.js runtime as the base image
FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev --quiet

COPY . .

CMD ["npm", "run", "start"]
