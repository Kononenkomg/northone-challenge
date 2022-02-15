# Challange

To Do List API implementation using Deno

## Run
Only docker needed to run this application

Deno development environment

```bash
docker pull mongo
docker run -d -p 27017:27017 --name mongo -t mongo:latest
deno run --allow-all main.ts
```

Docker

```bash
docker-compose up -d
```

## Test

To run unit test we want to make sure that mongo is running

```bash
deno test --allow-all
```

## APIS

The API is exposed on ``port:4000``
Please check todo.postman_collection for full list of API's

* User can create an account
* User can create/edit/delete a task (account must be created)
* User can create/edit/delete sub-tasks within any task
* User filter tasks by status, category or both
