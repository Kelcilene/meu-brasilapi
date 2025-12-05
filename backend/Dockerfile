FROM node:20

WORKDIR /app

# Copia apenas package.json para instalar dependências
COPY package*.json ./
RUN npm install

# Copia todo o código
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
