FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN apk add --no-cache openssl
RUN npm ci --only=production

COPY . .

EXPOSE 8001

CMD ["npm", "run", "start"]
