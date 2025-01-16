# Imagen base
FROM node:18

# Directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar archivos de configuración
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]

# Etapa de construcción
FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Etapa de producción
FROM node:18
WORKDIR /app
COPY --from=builder /app .
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "src/app.js"]
