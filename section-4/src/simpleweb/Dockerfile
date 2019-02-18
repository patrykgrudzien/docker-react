# Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Copy "package.json" from current directory to "root" location of Docker container
COPY ./package.json ./
# Install some dependencies
RUN npm install
# Copy rest of the file(s) after "npm" to working directory (dividing that copying
# will increase performance as there is no need to execute "npm install" each time
# e.g. after changing something inside "index.js")
COPY ./ ./

# Default command
CMD ["npm", "start"]