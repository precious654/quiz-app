# Build the app in image ‘builder’ (multi-stage builds)
FROM node:latest as build

# Define working directory
WORKDIR /app

# Duplicate the package-lock.json and package.json prior to other files
COPY package*.json ./

RUN npm ci

RUN npm install -g @angular/cli
# Duplicate all necessary files
COPY . .
# Set up project dependencies
RUN npm install

# Compile the Angular application
RUN npm run build –quiz-app

# Use nginx server to deliver the application
FROM nginx:latest

# Transfer the output of the build step
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY –from=build /app/dist/my-angular-app/ /usr/share/nginx/html/

EXPOSE 80
