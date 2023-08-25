# Documentation

## Getting Started

Ensure that you are using the Long-Term Support (LTS) version of Node.js
You can check this by running `node -v` in your terminal. If you are not using the LTS version, you can download it from [here](https://nodejs.org/en/).
Or use nvm if you have it installed.

After clone the repository, run the following command to install the dependencies:

```typescript
npm install
```

The project is configured to utilize a PostgreSQL database, but alternatives such as SQLite or MySQL are also supported. To use a different database provider, you will need to modify the URL within the `./prisma/schema.prisma file`.
If you are utilizing SQLite, it is necessary to specify the path of your database file.

```typescript
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Once you have created your database, you can execute `npm run generate` followed by `npm migrate reset` and `npm run dev` to start the development server.

</br>
</br>

## Controllers

### Authentification

  This module handles user registration, signin, validation, and logout processes.

#### Register
  Registers a new user with the provided email, username, and password. The password is hashed using bcrypt and stored in the database.

Endpoint: `POST /register`

##### Request Body

```json
{
  "email": "user@example.com",
  "username": "username123",
  "password": "securePassword"
}
```
##### Response

Status Code : `201 Created`

```json
{
  "id": 1,
  "email": "john.doe@example.com"	
}
```

#### Signin
  Registers a new user with the provided email, username, and password. The password is hashed using bcrypt and stored in the database.

Endpoint: `POST /signin`

#### Request Body

```json
{
  "email": "user@example.com",
  "username": "username123",
}
```
##### Response

```typescript
res.cookie('accessToken', accessToken, {
  httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000,
});
```

res refers to the response object that will be sent back to the client.
.cookie() is a method provided by certain libraries (such as Express.js) to set cookies in the response.
'accessToken':

- The first parameter is the name of the cookie. In this case, it's named 'accessToken'.
accessToken:

- The second parameter is the value of the cookie. This is typically a token or some identifier associated with the user's session.

`options`:
- The third parameter is an options object that specifies various settings for the cookie.

`httpOnly: true`:
- This option ensures that the cookie is only accessible through HTTP requests and not through JavaScript in the browser. This helps prevent cross-site scripting (XSS) attacks.

`sameSite: 'none'`:
- This option controls when the cookie will be sent in cross-origin requests. 'none' means the cookie will be sent in all cross-origin requests. This is often used with secure cookies when dealing with third-party integrations.

`secure: true`:
- This option ensures that the cookie is only sent over secure (HTTPS) connections. This is important for protecting sensitive information.

`maxAge: 24 * 60 * 60 * 1000`:
- This option sets the maximum age of the cookie in milliseconds. In this case, the cookie will expire after 24 hours.

Status Code : `200 Ok`

```json
{
"message" : "User logged in successfully"	
}
```

#### Validate
  Validates user's token and returns his infos .

##### Request 
When the client sends a request to the server with the credentials: 'include' option and includes the accessToken cookie, the server can access the JSON Web Token (JWT) after decoding it. The decoded JWT can then be extracted and passed to the body of the request.

Endpoint: `GET /user/validate`


```typescript
const validateToken = (req: Request, _res: Response, next: NextFunction) => {
  let token: string = '';

  if (req.cookies && req.cookies.accessToken) token = req.cookies.accessToken;

  verify(token, process.env.JWT_TOKEN_KEY as string, (err, decoded) => {
    if (err) throw new AuthorizationError('Unauthorized user');
    req.body.decoded = decoded;
    next();
  });
};
export default validateToken;
```

##### Response Body

Status Code : `200 Ok`

```json
{
  "message": "User is logged in",
  "userInfos": "user_data_here"
}
```

#### Logout

Logs out the user by clearing the access token cookie.

Endpoint: `POST /logout`

##### Request Body

```json
{
  "email": "user@example.com",
  "username": "username123",
  "password": "securePassword"
}
```
##### Response Body

Status Code : `200 Ok`

```json
{
  "message": "User logged out successfully"
}
```
</br>
</br>

### User

This module handles various operations related to user management.

#### Get User

Endpoint: `GET /user`

Retrieves information about a user.

##### Request Body

```json
{"id": 1}
```

##### Response 

Status Code : `200 Ok`

```json
{
  "user": {
        "id": 4,
        "username": "Johnny",
        "imageUrl": "https://picsum.photos/200/300",
        "imageTitle": "avatar-cool guy"
    }
}
```

#### Update User

Updates user information.

Endpoint: `PATCH /user`

Description

##### Request Body

```json
{ "id": 4 }
```

##### Response

Status code : `200 Ok`

```json
{
  "message": "The user has been updated",
  "user": {
        "id": 4,
        "username": "Jacky",
        "imageTitle": "avatar-cool guy",
        "imageUrl": "https://picsum.photos/200/300"
    }
}
```

#### Delete User

Endpoint: `DELETE /user`

Delete user information.

##### Request Body

```json
{ "id": 4 }
```

##### Response

Status code : `200 Ok`

```json
{
  "message": "4 has been deleted",
}
```

#### Update image User

Endpoint: `PATCH /user/image`

Change the picture of the user

##### Request Body

```json
{
"id": 17,
"imageUrl": "insaneurl"
}
```

##### Response

Status code : `200 Ok`

```json
{
  "message": "The user has been updated",
    "user": {
        "id": 17,
        "username": "Danny",
        "imageTitle": "avatar-Danny",
        "imageUrl": "insaneurl",
    }
} 
```

#### Sport

Get sports the user master with rating

Endpoint: `GET /user/sport`

##### Request Body

```json
{ "id": 2 }
```

##### Response

Status code : `200 Ok`

```json
{
    "message": "Sport(s) that the user master",
    "sports": [
        {
        "sportName": "basket",
        "sportRate": 3
        },
        {
        "sportName": "foot",
        "sportRate": 5
        }
    ]
} 
```

</br>
</br>








### Friends 

This module handles operations related to managing user friends and friend requests.

#### Get Pending Friend Requests Sent
Endpoint: `GET /user_friends/sent/:id`

Retrieves pending friend requests sent by an user.

##### Response

Status Code : `201 Created`

```json
{
  "id": 1,
  "email": "john.doe@example.com"	
}
```

</br>
</br>

### Particpant

This module handles operations related to managing particpants of event

#### Get Pending Friend Requests Sent

Endpoint: `GET /participant/event/:id`

Retrieves all participants of an event no matter their status.

##### Response

Status Code : `200 Ok`

```json
{
    "message": "Participant retrieved succesfully",
    "data": [
        {
            "event_id": 1,
            "status": "pending",
            "team": null,
            "created_at": "2023-08-24T19:05:21.094Z",
            "user": {
                "id": 2,
                "username": "Mckenzie",
                "email": "Samir34@hotmail.com",
                "avatar": null
            }
        },
        {
            "event_id": 1,
            "status": "pending",
            "team": null,
            "created_at": "2023-08-24T19:05:21.094Z",
            "user": {
                "id": 3,
                "username": "Keely",
                "email": "Cory35@yahoo.com",
                "avatar": null
            }
        },
    ]
}
```

#### Send invitation to participant

Endpoint: `POST /participant/event/`

Send invitation to participant to an event.

##### Request Body

```json
{
    "event_id": 1, // Number
    "user_id": 2  // Number
}
```

##### Response

Status Code : `204 No Content`

```json
{ "message": "Invitation sent" }
```

#### Update status participant

Endpoint: `PATCH /participant/event`

Update status of an event's participant.

##### Request Body

```json
{
    "event_id": 1, // Number
    "user_id": 2  // Number
    "status": "accepted" // String (accepted, pending, refused)
}
```

##### Response

Status Code : `204 No Content`

```json
{ "message": "status updated" }
```
</br>
</br>

### Message

This module handles operations related to managing messages for events.

#### Get Historic Messages

Endpoint: `PATCH /chat/event/:id`

Retrieves historic messages for a specific event.

##### Response

Status Code : `200 Ok`

```json
{
    "message": "Historic retrieved successfully",
    "data": [
        {
            "id": 5,
            "event_id": 1,
            "message": "Allo ?!\n",
            "created_at": "2023-08-25T12:31:20.308Z",
            "updated_at": "2023-08-25T12:31:20.308Z",
            "user": {
                "id": 23,
                "username": "Jaiden",
                "avatar": null
            }
        },
        {
            "id": 6,
            "event_id": 1,
            "message": "Allo ?!\n",
            "created_at": "2023-08-25T12:31:58.079Z",
            "updated_at": "2023-08-25T12:31:58.079Z",
            "user": {
                "id": 2,
                "username": "Mckenzie",
                "avatar": null
            }
        },
        {
            "id": 7,
            "event_id": 1,
            "message": "Salut",
            "created_at": "2023-08-25T12:32:10.524Z",
            "updated_at": "2023-08-25T12:32:10.524Z",
            "user": {
                "id": 3,
                "username": "Keely",
                "avatar": null
            }
        },
        {
            "id": 8,
            "event_id": 1,
            "message": "sunt eu",
            "created_at": "2023-08-25T12:32:29.398Z",
            "updated_at": "2023-08-25T12:32:29.398Z",
            "user": {
                "id": 4,
                "username": "Marcelina",
                "avatar": null
            }
        },
        {
            "id": 9,
            "event_id": 1,
            "message": "un haiduc",
            "created_at": "2023-08-25T12:32:55.104Z",
            "updated_at": "2023-08-25T12:32:55.104Z",
            "user": {
                "id": 6,
                "username": "Merle",
                "avatar": null
            }
        }
    ]
}
```

#### Create Message

Endpoint: `POST /chat`

Create a new message.

##### Request Body

```json
{
    "event_id": 1, // Number
    "user_id": 2,  // Number
    "message": "Salut" // String max 255 characters
}
```

##### Response

Status Code : `201 Created`

```json
{ "message": "Message created successfully" }
```

#### Update Message

Endpoint: `PATCH /chat`

Update a message.

##### Request Body

```json
{
    "id": 1, // Number
    "message": "Message updated" // String max 255 characters
}
```

##### Response

Status Code : `204 No Content`

```json
{ "message": "Message updated successfully" }
```

#### Delete Message

Endpoint: `Delete /chat/:id`

Delete a message.

##### Response

Status Code : `204 No Content`

```json
{ "message": "Message deleted successfully" }
```

#### Delete Historic

Endpoint: `Delete /chat/event/:id`

Delete all messages of an event.

##### Response

Status Code : `204 No Content`

```json
{ "message": "Historic deleted successfully" }
```

</br>
</br>

.

