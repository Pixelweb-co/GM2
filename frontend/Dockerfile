# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY . .

RUN apk add --no-cache bash

# Instalar dependencias con lockfile
RUN npm install

# Compilar Next.js
RUN npm run build

# Etapa 2: Imagen final
FROM node:18-alpine AS runner

WORKDIR /app

# Crear usuario sin permisos elevados
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copiar archivos necesarios para producción
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Variables opcionales (solo para build-time)
ARG ENV_VARIABLE
ENV ENV_VARIABLE=${ENV_VARIABLE}
ARG NEXT_PUBLIC_ENV_VARIABLE
ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}

# Puerto de la app
EXPOSE 3000

CMD ["node", "server.js"]
