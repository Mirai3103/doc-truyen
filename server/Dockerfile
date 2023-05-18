

FROM node:20-alpine3.16
ENV NODE_ENV production
# build nestjs app
WORKDIR /app
COPY . /app
RUN apk add --no-cache make gcc g++ python3
RUN npm install -g npm@9.6.7
RUN npm i 
RUN npm rebuild bcrypt --build-from-source
RUN npm i -g @nestjs/cli
RUN npm run build
RUN npm ci --only=production
RUN npm cache clean --force
RUN apk del make gcc g++ python3

EXPOSE 3000

CMD ["yarn", "start:prod"]

