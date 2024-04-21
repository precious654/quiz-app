FROM node:16-alpine3.11 as angular

WORKDIR /app

COPY package*json ./

COPY . .

RUN npm install

RUN npm run build 

FROM httpd:alpine3.15

WORKDIR /usr/local/apache2/htdocs

COPY --from=angular /app/dist/quiz-app . 

EXPOSE 80

CMD ["ng", "serve", "--host", "0.0.0.0"]