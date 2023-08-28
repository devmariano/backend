configurar novo migrate exemplo:
```sh
npx sequelize-cli migration:create --name create_carts_table
```
executar migrates no bd 
```sh
npx sequelize-cli db:migrate
```