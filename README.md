# Releaf Interview Assessment

This repository contains the codebase for the Releaf Interview Assessment. It includes the frontend and backend components of the application.

## Table of Contents

- [Get Started](#get-started)
- [Features](#features)
- [Deployments](#deployments)
- [Frontend](#frontend)
- [Backend](#backend)
- [Notes](#notes)

## Get Started

To get started with the project, follow these steps:

1. Clone the repository: `git clone https://github.com/marybngozi/releaf-visor.git`
2. Navigate to the project directory: `cd releaf-visor`

## Features

- User authentication and authorization - (disabled)
- CRU operations for mill data
- Interactive map viewer
- Responsive design

## Deployments

This Project is been deployed on [Render](render.com), on a free account, and could experience some downtime, please bear 🥺

- Frontend: https://releaf-visor.onrender.com
- Backend: https://releaf-visor-api.onrender.com
- Postman Docs: https://documenter.getpostman.com/view/28284536/2sAYBPku2Q

## Frontend

### Overview

The frontend is built using Vue.js and is responsible for rendering the user interface and handling user interactions.

### Installation and Setup

Use the [README.md](frontend/README.md) file inside the `frontend` directory as a guide

### Features

- User authentication and authorization - (disabled)
- Interactive map viewer
- Progressive Web App (PWA)
- Responsive design

## Backend

### Overview

The backend is built using Nest.js, (Node.Js) and MongoDB and is responsible for handling API requests and storing data in the database.

### Installation and Setup

Use the [README.md](backend/README.md) file inside the `backend` directory as a guide

### Features

- User authentication and authorization - (disabled)
- Create and Edit mill endpoint
- List mills endpoint with optional pagination

## Notes

1. The frontend could be made more type-safe
2. The frontend could also be updated to a more recent version of Vue.Js, to leverage on the better parts of Vue 3
3. The Authentication module for login and protection of routes is implemented, and disabled, could be easily enabled, by removing some comments
4. The work is not written on stone, and as such, there is room for improvement
