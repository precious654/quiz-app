# Step 1: Use an official Node.js runtime as a parent image
FROM node:16-alpine as build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your app's source code
COPY . .

# Step 6: Build your Angular app
RUN ng build --prod

# Step 7: Use nginx to serve the static content
FROM nginx:alpine
COPY --from=build /app/dist/my-angular-app /usr/share/nginx/html

# Step 8: Expose port 80 to the outside world
EXPOSE 80

# Step 9: Configure the container to run as an executable
CMD ["nginx", "-g", "daemon off;"]
