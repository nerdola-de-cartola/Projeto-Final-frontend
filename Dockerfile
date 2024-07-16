FROM node:lts

WORKDIR .
COPY public/ ./public
COPY src ./src
COPY package.json .
RUN npm i
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]