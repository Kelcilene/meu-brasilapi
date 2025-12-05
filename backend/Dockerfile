FROM node:18

WORKDIR /app

# Dependências nativas para sqlite3 e bcrypt
RUN apt-get update && apt-get install -y python3 g++ make

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
