FROM node:18 AS builder
RUN \	
  apk add --no-cache \	
    python3
    
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

EXPOSE 80

FROM nginx:1.13.12-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# คัดลอกไฟล์จาก builder stage
COPY --from=builder /usr/src/app/dist/my-app /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]