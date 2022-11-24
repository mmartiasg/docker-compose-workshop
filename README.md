# docker-compose-workshop
A simple example of using docker compose to get an enviroment with an api and mysql


Crear la red
```
   docker network create mysql_network_bridge
```

Crear los volume
```
  docker volume create mysqldb
```

Comando para levantar todo el ambiente con docker compose:

```
  docker compose -f docker-compose.yaml up --build
```


Comandos para hacerlo "a mano"

Desde el directorio docker-compose-workshop

Armar las imagenes 

API:
ai-api-image va a ser el nombre que quiero para la imagen
```
  docker build -t ai-api-image ai-api
```

Database:

mysql_db_image nombre de la imagen
```
  docker build -t mysql_db_image database
```


Correr las imagenes en containers

Database 
```
  docker run --rm --name mysql_service --network mysql_network_bridge --network-alias mysql-service -p 3306:3306 -v mysqldb:/var/lib/mysql mysql_db_image
```

API
```
  docker run --rm --name ai-api-service --network mysql_network_bridge -p 3000:3000 ai-api-image
```

parametros:
  - --rm : es para que borre el container cuando termina
  - --name : permite darle un nombre en lugar de que docker le asigne uno aleatorio
  - --network : permite determinar a que red pertenece el container
  - -p : <puerto externo>:<puerto docker> es para exponer un puerto del docker
  - --network-alias : permite darle un nombre al container dentro de la red evita tener que adiviar la ip
  - -v : es para determinar que volume usar y donde montarlo dentro del container
  
   
