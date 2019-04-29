# rest-api

## Resource Endpoints

- Auth
    - [Signup](#signup): `GET /api/signup`
    - [Signin](#signin): `GET /api/signin`
- Todos
    - [Get all Todos](#get-all-todos): `GET /api/todos`
    - [Get a Todo](#get-a-todos): `GET /api/todos/:id`
    - [Create a Todo](#create-a-todo): `POST /api/todos`
    - [Update a Todo](#update-a-todo): `PUT /api/todos/:id`
    - [Delete a Todo](#delete-a-todo): `DELETE /api/todos/:id`



### Signup

<hr>

**Method**: `POST`

**URL**: `/api/signup`

**Response Success**

**Status**: `201`

**Body**:
```javascript
{
    email: String,
    password: String
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```



### Signin

<hr>

**Method**: `POST`

**URL**: `/api/signin`

**Response Success**

**Status**: `201`

**Body**:
```javascript
{
    token: String
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```



### Get All Todos

<hr>

**Method**: `GET`

**URL**: `/api/todos`

**Request Headers**:
```javascript
{
    Authorization: String
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    todos: [
        {
            id: String,
            title: String,
            description: String
        }
    ]
}
```

**Response Failure**

**Status**: `500`

**Body**;
```javascript
{
    message: "Internal Server Error"
}
```



### Get a Todo

<hr>

**Method**: `GET`

**URL**: `/api/todos/:id`

**Request Headers**:
```javascript
{
    Authorization: String
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    todo: {
        id: String,
        title: String,
        description: String,
        authorId: Number
    }
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```



### Create a Todo

<hr>

**Method**: `POST`

**URL**: `/api/todos`

**Request Headers**:
```javascript
{
    Authorization: String
}
```

**Request Body**:
```javascript
{
    title: String,
    description: String
}
```

**Response Success**

**Status**: `201`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```



### Update a Todo

<hr>

**Method**: `PUT`

**URL**: `/api/todos/:todo_id`

**Request Headers**:
```javascript
{
    Authorization: String
}
```

**Request Body**:
```javascript
{
    title: String,
    description: String
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    todo: {
        id: String,
        title: String,
        description: String,
        authorId: Number
    }
}
```

**Response Error**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```



### Delete a Todo

<hr>

**Method**: `DELETE`

**URL**: `/api/todos/:todo_id`

**Request Headers**:
```javascript
{
    Authorization: String
}
```

**Response Success**

**Status**: `200`

**Body**:
```javascript
{
    todo: {
        id: String
    }
}
```

**Response Failure**

**Status**: `500`

**Body**:
```javascript
{
    message: "Internal Server Error"
}
```
