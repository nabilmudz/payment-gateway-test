FROM node

WORKDIR /app

COPY package.json /app

RUN npm i

COPY . .

EXPOSE 8001

CMD ["npm", "run", "dev"]