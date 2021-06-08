# Local development

## With Docker

1. Install [Docker](https://docs.docker.com/get-docker/) on your local machine.
2. Clone the repository and [configure it](./Dotenv.md) to work.
3. In Dockerfile uncomment line `#EXPOSE 4000`
4. Run `$ docker build -t tsv-backend . ` you create image with tag name `tsv-backend`
4. Run `$ docker run tsv-backend` you start your image container
5. Run `$ docker network ls`

Something like this should turn out

NETWORK ID   | NAME    | DRIVER | SCOPE
------------ | ------- | ------ | -----
3118f59e223b | host    | host   | local
795681ea1a48 | bridge  | bridge | local
0f8c666bd6a6 | none    | null   | local

Get `NETWORK ID` for bridge and run
```
$ docker network inspect 795681ea1a48
```

Find the `Containers` block and get ip address.

Example
```
"Containers": {
    "d4dbf9fa0570df2b9caf8bd13e4f33ddaabf93b9157afe67ec6632b5f8159261": {
        "Name": "admiring_chaum",
        "EndpointID": "e4c512b2c69d33cfc3da557218e1ca62dc39875e8285a52087aa1eaccafe7ce8",
        "MacAddress": "02:42:ac:11:00:02",
        "IPv4Address": "172.17.0.2/16",
        "IPv6Address": ""
    }
},
```
**"IPv4Address": "172.17.0.2/16"**

Open in browser `http://172.17.0.2:4000`

## Without Docker

1. Clone the repository and [configure it](./Dotenv.md) to work.
2. Install dependencies.`$ npm install`
3. Start the server with the command `$ npm run watch`
4. Now your server is located at `http://localhost:4000`
