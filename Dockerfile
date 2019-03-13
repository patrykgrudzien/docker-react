# I'm providing name of that phase (stage) as "builder"
FROM node:alpine AS builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Inside the container there will be a directory:
# /app/build
# that we care about

# Next phase (this FROM statement simply terminates each successful block, in our case "builder" one)
FROM nginx
# destination path is specified in "nginx" documentation on the hub.docker.com
COPY --from=builder /app/build /usr/share/nginx/html
# default command to start "nginx" will be loaded automatically and we don't need to call is explicitly