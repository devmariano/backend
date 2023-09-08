# M3S06 - Ex 01 a 07 utilizando a API da semana04 crie um container docker e publique no docker hub

## Link Docker hub: https://hub.docker.com/r/alexandremariano/ecommerce

## Modelo utilizado na base de dados
<img src="./SchemaDB.png">

## Iniciar o Projeto

Com o .env devidamente configurado:

primeiro instale as dependencias:
### `npm install`

depois migre o banco de dados:

### `npx sequelize-cli db:migrate`


Anotações:

para configurar novo migrate exemplo:
```sh
npx sequelize-cli migration:create --name create_carts_table
```
