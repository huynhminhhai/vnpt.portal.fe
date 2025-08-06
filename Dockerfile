# Build stage
FROM node:18-alpine AS build

EXPOSE 8801

WORKDIR /app
COPY dist /app/dist

RUN npm install -g serve

CMD ["serve", "-s", "/app/dist", "--listen", "8801"]

#docker build -t vnpt_canlua_webadminfe:latest .
#docker tag vnpt_canlua_webadminfe:latest docker.vnpt.me/vnpt_canlua_webadminfe:latest

#docker push docker.vnpt.me/vnpt_canlua_webadminfe:latest