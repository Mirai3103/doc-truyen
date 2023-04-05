FROM node:18-alpine3.16 as build
WORKDIR /app
COPY . /app
# using yarn
RUN yarn
RUN yarn build
FROM nginx:1.23.4 as prod
COPY --from=build /app/dist /usr/share/nginx/html
# start nginx port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]