# Build stage
FROM node:18-alpine AS build

EXPOSE 8801

WORKDIR /app
COPY dist /app/dist

RUN npm install -g serve

CMD ["serve", "-s", "/app/dist", "--listen", "8801"]

# Build image FE cho web portal
# docker build -t vnpt_webportal_fe:latest .

# Tag image để đẩy lên registry nội bộ
# docker tag vnpt_webportal_fe:latest docker.vnpt.me/vnpt_webportal_fe:latest

# Push image lên registry
# docker push docker.vnpt.me/vnpt_webportal_fe:latest
