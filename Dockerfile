FROM node:lts

WORKDIR .
COPY public/ ./public
COPY src ./src
COPY package.json .
run npm i
ENTRYPOINT [ "npm", "start" ]