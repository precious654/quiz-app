FROM node:alphine as build

WORKDIR /app

COPY package*json ./

COPY . .

RUN npm run build --prod

FROM nginx:1.21.0-alphine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/* /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]