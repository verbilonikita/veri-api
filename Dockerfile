FROM alpine:3.17 as build
ENV NODE_VERSION 18.4
RUN apk update && apk add nodejs npm
WORKDIR /api
COPY ./package.json .
RUN npm install
COPY . .
EXPOSE 4200
CMD npm run start:prod
