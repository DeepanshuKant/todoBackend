FROM node:alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm i


COPY . ./


ENV MONGO_URL = mongodb://CheeseMaster_69:seabirdkant1A@cluster0-shard-00-00.5crnt.mongodb.net:27017,cluster0-shard-00-01.5crnt.mongodb.net:27017,cluster0-shard-00-02.5crnt.mongodb.net:27017/Todo?ssl=true&replicaSet=atlas-ghswrc-shard-0&authSource=admin&retryWrites=true&w=majority

ENV JWT_SECRETKEY = dsdkasghdkjsdghjasdhasjkdhsjkdhskd232dkbasmndbj23jbasjkdk

ENV COOKIE_EXPIRE = 5

ENV NODE_ENV = production
ENV PORT = 4000



CMD ["npm", "run", "start"]