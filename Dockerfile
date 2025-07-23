# Build stage
FROM node:18-alpine AS build

EXPOSE 8801

WORKDIR /app
COPY dist /app/dist

RUN npm install -g serve

CMD ["serve", "-s", "/app/dist", "--listen", "8801"]