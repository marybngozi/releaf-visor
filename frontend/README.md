# Releaf Insight Frontend

## Project setup

This project is built and complied with `NodeJs v16.20.2`

## Installation

To install the frontend dependencies, `cd` into the `frontend` directory and run.

```bash
$ yarn install
```

### Compile and run the project

- Make a copy of the `.env.example` into a `.env` file and populate it with the right values

- Make sure the `VUE_APP_GOOGLE_MAPS_API_KEY` value in the `.env` points to a valid Google Map API Key

- Visit [Google Map API Key](https://developers.google.com/maps/documentation/javascript/get-api-key) to generate a key for the map

```bash
# development and watch
$ yarn serve

# build and complie for production
$ yarn build
```
