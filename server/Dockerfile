FROM node:18-alpine3.16 
# build nestjs app
WORKDIR /app
COPY . /app
RUN yarn
RUN yarn build
# start nestjs app
EXPOSE 3000
CMD ["yarn", "start:prod"]

