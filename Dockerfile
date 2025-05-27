# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copia package.json e package-lock.json para instalar dependências
COPY package*.json ./

RUN npm install

# Copia todo o código
COPY . .

# Roda o build do Vite (gera a pasta dist)
RUN npm run build

# Stage 2: Serve arquivos estáticos com nginx
FROM nginx:stable-alpine

# Remove o conteúdo default do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos estáticos da build para a pasta onde nginx serve
COPY --from=build /app/dist /usr/share/nginx/html

# Copia o arquivo de configuração nginx customizado (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta 80
EXPOSE 80

# Starta o nginx
CMD ["nginx", "-g", "daemon off;"]
