# Usa una imagen base de Node.js
FROM node:18-alpine

# Crea el directorio de la aplicación
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install

COPY . .

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "run", "start"]
