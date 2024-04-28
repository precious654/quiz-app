FROM node:latest

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]

EXPOSE 80