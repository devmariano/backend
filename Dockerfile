FROM node:18-alpine AS BUILDER

WORKDIR /app
COPY ["./package.json", "./package-lock.json", "/app/"]
RUN npm install

# ----

FROM node:18-alpine

WORKDIR /app

EXPOSE 3333

ENV DB_DIALECT=postgres
ENV DB_HOST=postgres
ENV DB_USERNAME=postgresadmin
ENV DB_PASSWORD=postgres123
ENV DATABASE=postgresdb
ENV DB_PORT=5431
ENV JWT_SECRET=tokenSuperForte

COPY --from=BUILDER ["/app/node_modules/", "/app/node_modules/"]
COPY ./src/ /app/src/

ENTRYPOINT [ "node", "./src/index.js" ]