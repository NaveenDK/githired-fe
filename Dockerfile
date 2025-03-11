FROM node:latest

WORKDIR /app
#Keep Dockerfile at the root of the project
COPY . .
RUN npm install
EXPOSE 3000
# The cmd to run this project
COPY entrypoint.sh /usr/local/bin/
ENTRYPOINT ["entrypoint.sh"]
