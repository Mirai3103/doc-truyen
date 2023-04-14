FROM node:18-alpine3.16 
# build nestjs app
WORKDIR /app
COPY . /app
RUN apk add --no-cache make gcc g++ python3
RUN npm install
RUN npm rebuild bcrypt --build-from-source
RUN apk del make gcc g++ python3


RUN yarn
RUN yarn build
EXPOSE 3000

CMD ["yarn", "start:prod"]

