# Usa Node 18 com Alpine removido (Alpine quebra o Vite)
FROM node:18-bullseye

WORKDIR /app

# Copia apenas os arquivos de dependências primeiro
COPY package.json package-lock.json ./

# Instala tudo (incluindo o Vite)
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta do Vite
EXPOSE 5173

# Comando para rodar o Vite corretamente
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
