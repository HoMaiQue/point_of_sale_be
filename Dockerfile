FROM node:19

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3055

CMD ["npm", "start"]
