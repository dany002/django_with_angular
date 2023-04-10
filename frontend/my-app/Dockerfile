# Use the official Node.js runtime as a parent image
FROM alpine:latest AS builder



# Set the working directory to /app
WORKDIR /app

RUN apk add bash nodejs npm

RUN /usr/bin/npm install -g @angular/cli
# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies


RUN /usr/bin/npm install


# Copy the rest of the application code to the container
COPY . .

# Build the Angular app for production
RUN /usr/bin/npm run build --prod

## Use a multi-stage build to create a smaller image

FROM nginx:alpine
COPY --from=builder /app/dist/my-app /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 90
CMD ["nginx", "-g", "daemon off;"]
