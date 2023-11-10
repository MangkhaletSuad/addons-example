ARG BUILD_FROM
FROM ${BUILD_FROM} AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build


FROM nginx:1.13.12-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# คัดลอกไฟล์จาก builder stage
COPY --from=builder /usr/src/app/dist/my-app /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]