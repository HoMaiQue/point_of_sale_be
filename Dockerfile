FROM node:19

EXPOSE 3003

WORKDIR /app

RUN npm i npm@latest -g

COPY package.json package-lock.json ./

run npm install

COPY . .

CMD ["node", "server.js"]
