# Imagen base a usar con el tag seguido del : tag
FROM node:19.0.1

# The COPY instruction copies new files or directories from <src> and adds them to the filesystem of the container at the path <dest>.
COPY datasets datasets
COPY src src

#Working directory donde estamos parados
WORKDIR /src
RUN npm install

# init
CMD ["node", "main_map.js"]
