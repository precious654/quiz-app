FROM node:20-alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx
COPY --from=builder /app/dist/angular-docker/browser /usr/share/nginx/html