FROM node:20

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y openssl \
    && npm install

COPY . .

RUN npx prisma generate

EXPOSE 8001

CMD ["npm", "run", "dev"]
