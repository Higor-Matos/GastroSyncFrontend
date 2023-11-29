FROM node:18.10

WORKDIR /app

COPY package.json ./

RUN npm install --force

COPY . .

EXPOSE 4200

CMD ["npm", "start", "--", "--host", "0.0.0.0", "--disable-host-check"]
