FROM node

WORKDIR /app
COPY ./package.json /app/package.json
RUN yarn
COPY ./src /app/src