# API README

## Description

This is the REST middle-tier layer that sits between the UI and the PostgreSQL database.
The API uses nodejs/express to create JSON REST interfaces used by the UI front-end.

### REST Endpoints

1.  {server}/ - *GET* operation.  Returns a JSON object describing application configuration parameters.  E.g.,

```{"DHS_G28_ENV":"DEV"}```

1.  {server}/user/authenticate - *POST* operation containing a JSON payload, i.e.,

```{ "id": "jcaple", "password": "foo" }```

The server responds either with a failure message:

```{ success: false, message: 'Authentication failed.' }```

Or the server responds with an authentication message:

```
{
    success: true,
    message: 'Your token is valid for 8h',
    user: {
        email : "",
        id : "jcaple",
        password : "",
        authenticated : true,
        jwt : "xxxxxxx"
    }
}
```

### Development 

1.  ```cd API```
1.  ```npm install```
1.  ```npm run server```
1.  Set the 'DHS_G28_ENV' environment variable per environment:
    1.  export DHS_G28_ENV=DEV
1.  The following environment variables are needed for connecting to PostgreSQL:
    1.  PGDATABASE
    1.  PGHOST
    1.  PGPASSWORD
    1.  PGPORT
    1.  PGUSER
1.  Start adding and modifying files

The command ```npm run server``` starts the node server on port 3000 and uses nodemon to 
restart the server automatically when code changes are detected.

#### Testing REST Endpoints

[Use Postman for maual interface testing during development](https://www.getpostman.com/) 

### Dockerize

1.  cd API
1.  docker build -t dhsformg28-api:latest -f ./docker/container/Dockerfile .
1.  Set the 'DHS_G28_ENV' environment variable per environment:
    1.  export DHS_G28_ENV=DEV
1.  The following environment variables are needed for connecting to PostgreSQL:
    1.  PGDATABASE
    1.  PGHOST
    1.  PGPASSWORD
    1.  PGPORT
    1.  PGUSER
1.  docker run -p 3000:3000 -e DHS_G28_ENV -e PGDATABASE -e PGHOST -e PGPASSWORD -e PGPORT -e PGUSER dhsformg28-api:latest