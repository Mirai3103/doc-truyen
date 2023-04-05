FROM node:18-alpine3.16 as build
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx:1.23.4 as prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
# start nginx port 80
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]