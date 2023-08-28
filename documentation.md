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

### General behavior

This module encapsulates the fundamental behavior of receiving client requests and delivering the corresponding responses. It serves as a foundational structure for handling various operations within the application.

### Authentification

  This module handles user registration, signin, validation, and logout processes.

#### Register
  Registers a new user with the provided email, username, and password. The password is hashed using bcrypt and stored in the database.

Endpoint: `POST /signup`

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
    "message": "User informations : ",
    "user": {
        "id": 12,
        "username": "Steeve",
        "image_url": "/images/e9cae3ff922f054ce450d9e2e205bd0f4a71f73d19806c7d22626fa6fc1a87a3.jpeg"
    }
}
```

#### Update User

Updates user information.

Endpoint: `PATCH /user`

Description

##### Request Body

```json
{ 
"id": 4, // Number
"email"?: "john.do@example.com", // String
"username"?: "john", // String
"password"?: "securePassword",  // String
 }
```

##### Response

Status code : `200 Ok`

```json
{
    "message": "User informations : ",
    "user": {
        "id": 12,
        "username": "New Username",
        "image_url": "/images/e9cae3ff922f054ce450d9e2e205bd0f4a71f73d19806c7d22626fa6fc1a87a3.jpeg"
    }
}
```

#### Delete User

Endpoint: `DELETE /user/:id`

Delete user information.

##### Request 

```json
{ "id": 4 }
```

##### Response

Status code : `200 Ok`

```json
{
  "message": "User has been deleted",
}
```

#### Update image User

Endpoint: `PATCH /user/image`

Change the picture of the user

##### Request Body

Note: The key with the image must be named "image"
Otherwise the request will not work
```json
{
"id": 17,
"image": "insaneurl"
}
```

##### Response

Status code : `200 Ok`

```json
{
    "message": "User informations : ",
    "user": {
        "id": 12,
        "username": "David",
        "image_url": "New url linking to the server"
    }
}
```

#### Sport

Get sports the user master with rating

Endpoint: `GET /user/sport`

##### Request Body

```json
{ "id": 2 } //  Number 

```

##### Response

Status code : `200 Ok`

if the user has not post his own rating for a sport and no user has rated him for this sport the gb_rating will be null
if users have rated him for this sport but he has not rate himself the gb_ratin will be 0
Otherwise the gb_rating will be the average of all the ratings

```json
{
    "message": "Sport(s) that the user master",
    "sports": [
        {
            "name": "Football",
            "gb_rating": null
        },
        {
            "name": "Basketball",
            "gb_rating": null
        }
    ]
}
```

</br>
</br>

### Rating

This module handles operations related to rating user on sports

#### Post your own rating

Endpoint: `POST /user/sport`

User can post his own rating for a sport


##### Request Body

```json
{
    "user_id": 2, // Number
    "sport_id": 1, // Number
    "rating": "Advanced" // " Beginner" | "Intermediate" | "Advanced"
}
```

##### Response

Status Code : `201 Created`

#### User rating other users

Endpoint: `PATCH /user/sport`

User can rate other users on sports

Note : user_id always refers to the user who received the rating
Note : rating can't go below 1 and above 10

##### Request Body

```json
{
    "user_id": 2, // Number
    "sport_id": 1, // Number
    "rating": 4 // Number
    "rater_id": 3 // Number
}
```

##### Response

Status Code : `200 Ok`

```json
{
     "message": "Rating updated "
}
```










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

#### Get Accepted friend requests
Endpoint: `GET /user_friends/accepted/:id`

Retrieves accepted friends of a user.

##### Response

Status Code : `200 Ok`

```json
{
  "id": 1,
  "email": "john.doe@example.com"	
}
```

#### Get friends request received
Endpoint: `GET /user_friends/pending/:id`

Retrieves pending friend requests received by a user.

##### Response

Status Code : `200 Ok`

```json
{
  "id": 1,
  "email": "john.doe@example.com"	
}
```

#### Send friend request
Endpoint: `POST /user_friends/send`

Sends a friend request to a user.

##### Request Body

```json
{
  "userId": 1,
  "friendId": 2 
}
```

##### Response

Status Code : `201 Created`


```json
{ "message": "Friend request sent successfully" }
```

#### Accept friend request
Endpoint: `PATCH /user_friends/accept`

Accept a friend request.

##### Request Body

```json
{
  "userId": 1,
  "friendId": 2 
}
```

##### Response

Status Code : `204 No Content`

```json
{ "message": "Friend request accepted successfully" }
```

#### Accept friend request
Endpoint: `PATCH /user_friends/reject`

Accept a friend request.

##### Request Body

```json
{
  "userId": 1,
  "friendId": 2 
}
```

##### Response

Status Code : `204 No Content`

```json
{ "message": "Friend request rejected successfully" }
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

## Routers

### Routers Structure

Each Router module configures the routing for entity-related endpoints in the application. It defines routes that correspond to various message operations, such as creating, updating, and deleting messages.

### Middlewares Integration

- The `validateSchema` middleware is utilized to ensure that the request data adheres to predefined schemas. It performs validation based on schemas and the specified `canals` object, which indicates which part of the request to validate.

```typescript
export default (schema: AnyZodObject, 
      canal: 'body' | 'params' | 'query') => async (
      req: Request,
      _res: Response, 
      next: NextFunction) => {

  if (!schema) next(new ServerError('No schema provided'));

  try {
    await schema.parseAsync(req[canal]);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const fieldErros: Record<string, string> = {};
      error.issues.forEach((e) => {
        fieldErros[e.path[0]] = e.message;
      });
      next(new ValidationError('Schema is not valid', fieldErros));
    }
    next(error);
  }
}
```

- Incorporating the `factory` middleware with every controller involves encapsulating their operations within a try-catch block. This setup is designed to catch exceptions that might arise during the execution process. When exceptions occur, they are then handed over to the `ErrorHandler` middleware, which has the expertise to manage a variety of error scenarios

```typescript
export default (controller: Controller) => (
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  });
```

- The `cache` middleware is used to cache the response of a request. It is employed for endpoints that are expected to return the same response for a given period of time. This approach helps to reduce the number of requests made to the server, thereby improving performance.

```typescript
export default (key: string) => async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!key) next();
  let paramsKey = key;
  if (req.params.id) paramsKey = key + req.params.id;
  try {
    const cacheValue = await Cache.get(paramsKey);
    if (req.method === 'GET' && cacheValue) {
      return res.status(304).send(cacheValue);
    }
    req.body.cacheKey = paramsKey;
    return next();
  } catch (error) {
    logger.error(error);
    return next();
  }
};
```

We use this utility class to cache data or invalidate cached data.
Cache need to be invalidate on update or delete.

```typescript
export default class Cache {
  static DEFAULT_EXPIRATION = 300; // 5 minutes

  static async get(key: string) {
    const cacheValue = await redis.get(key);
    return cacheValue ? JSON.parse(cacheValue) : null;
  }

  static async set(key: string, data: any, expiration: number = Cache.DEFAULT_EXPIRATION) {
    redis.set(key, JSON.stringify(data), 'EX', expiration);
  }

  static async del(keys: string[]) {
    redis.del(keys);
  }
}

```
- The `upload` middleware is used to handle file uploads. It configures multer to store uploaded files in memory as buffers, allowing you to process the uploaded data without saving files to the filesystem. 

```typescript
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;
```
- The `validateUser` middleware is used to validate the user's token against 
the body of the request. It is used to ensure that the user is authorized to perform the requested operation.

```typescript
const { verify } = jwt;

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  let token: string = '';
  let userInfos: any = {};

  if (req.cookies && req.cookies.accessToken) token = req.cookies.accessToken;

  verify(token, process.env.JWT_TOKEN_KEY as string, (err, decoded) => {
    if (err) next(new AuthorizationError('Unauthorized user'));
    userInfos = decoded[0];
  });
  if (!userInfos) next(new AuthorizationError('Unauthorized user'));
  const headersUserId = userInfos.userId;
  const bodyUserId = req.body.id;

  try {
    const user = await User.getUserInfos(headersUserId);
    if (headersUserId === bodyUserId && user?.id === bodyUserId) {
      return next();
    }
    res.status(401).json({ error: 'Unauthorized' });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    return next(error);
  }
};
```


### Purpose

