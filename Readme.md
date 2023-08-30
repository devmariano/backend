# Iniciar o Projeto

Com o .env devidamente configurado:

1º npm install
2º npx sequelize-cli db:migrate


configurar novo migrate exemplo:
```sh
npx sequelize-cli migration:create --name create_carts_table
```
executar migrates no bd 
```sh
npx sequelize-cli db:migrate
```