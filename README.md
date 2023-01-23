
# ctf-challenge

This API is a simple Express.js based API that allows users to interact with a MongoDB database.


## Features

- User registration and login
- Token-based authentication
- CRUD operations for user data
- Role-based access control (admin and user)

## Setup

1. Clone the repository and navigate to the project directory

```bash
git clone https://github.com/antoineTsinga/ctf-challenge.git
cd ctf-challenge
```

2. Install dependencies
- server
    ```bash
        cd server
        npm install
    ```
- solutions
    ```bash
        cd malicious
        npm install
    ```
3. Run server
```bash
    npm start
```

## API Reference

#### Get all users

```http
  GET /api/users
```

#### Get user

```http
  GET /api/customer/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of users to fetch |

#### Create user

```http
  POST /api/users
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. username of users to create |
| `password`      | `string` | **Required**. password of users to create |

#### Registration user

```http
  POST /signup
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. username of users to create |
| `password`      | `string` | **Required**. password of users to create |


```http
  POST /signin
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. username of users to login |
| `password`      | `string` | **Required**. password of users to login |

#### Get new token

```http
  GET /api/token
```

## Security

This API uses token-based authentication with JSON Web Tokens (JWT). The secret key used for generating tokens is stored in an environment variable.

Please note that this API is for demonstration purposes only and may have security vulnerabilities. It is not recommended to use this API in a production environment without properly securing it and addressing any identified vulnerabilities.

## Disclaimer
This API is for demonstration purposes only. It should not be used in a production environment without proper security measures in place. The author and contributors shall not be held liable for any damages resulting from the use of this API.
