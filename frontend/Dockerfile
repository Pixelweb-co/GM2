# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./

COPY . .

RUN rm -rf node_modules package-lock.json

RUN apk add --no-cache bash

# Instalar dependencias
RUN npm install

RUN npm run build


EXPOSE 3000

CMD ["npm run", "start"]
