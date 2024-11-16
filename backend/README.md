# Releaf Insight Backend

Nest Js Backend for the Releaf insight, an assessment app

## Project setup

This project is built with `NodeJs v20.15.0`

### Installation

To install the backend dependencies, `cd` into the `backend` directory and run.

```bash
# to maintain the package-lock.json
$ npm ci
```

### Compile and run the project

- Make a copy of the `.env.example` into a `.env` file and populate it with the right values

- Make sure the `MONGO_DATABASE_URL` value in the `.env` points to a valid MongoDB database

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
