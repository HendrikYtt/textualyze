FROM node:20-alpine as builder
WORKDIR '/app'
COPY package.json .
RUN yarn install
COPY . .
RUN yarn run build

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html
COPY config.js /usr/share/nginx/html/config.js
COPY nginx.conf /etc/nginx/conf.d/default.conf
