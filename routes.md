
# Auth

POST | /signup | creation d'un compte utilisateur

```
req.body = {
  username : 'john',
  email : 'john.doe@example.com',
  password : 'test',
}

res.status = 201 
res.json = { message : 'User created successfully' }

```

POST | /signin | se connecter a l'api et obtenir un cookies

```
req.body = {
  username : 'john',
  password : 'test'
}

res.cookie =  accessToken httpOnly: true, sameSite: 'none', secure: true
res.status = 200
res.json = {message  :'User logged in successfully'}
```

GET | /user/validate | renvoi les informations de l'user si un cookie contenant un token jwt valide est attaché a la requete

```
res.status = 200
res.json = {message : 'User is logged in' , userInfos : userInfos}

```

POST | /logout | invalide et surpprime le cookie 

```
res.status = 200
res.json = { message : 'User logged out successfully'}

```

# Friendlist

GET | /user_friends/sent/:id| pour obtenir la liste des invations envoyé toujours en cours de validation 

```
req.params.id = userId

res = {
    "message": "Friends retrieved successfully",
    "friends": [
        {
            "asked_id": 3,
            "asker_id": 1,
            "status": "pending",
            "createdAt": "2023-08-22T19:59:39.300Z",
            "updatedAt": "2023-08-22T19:59:39.300Z",
            "asked": {
                "id": 3,
                "email": "Bradley_Walter@gmail.com",
                "username": "Nya",
                "password": "sfVMgX02aEouTKF",
                "createdAt": "2023-08-22T18:38:07.816Z",
                "updatedAt": "2023-08-22T18:38:07.816Z",
                "image_id": null
            }
        },
]}
```

GET | /user_friends/accepted/:id | pour obtenir sa liste d'amis confirmé

```
req.params.id = userId

res = {
    "message": "Friends retrieved successfully",
    "friends": [
        {
            "asked_id": 2,
            "asker_id": 1,
            "status": "accepted",
            "createdAt": "2023-08-22T19:59:30.492Z",
            "updatedAt": "2023-08-22T21:50:44.158Z",
            "asked": {
                "id": 2,
                "email": "Matilda.Nicolas@gmail.com",
                "username": "Mariane",
                "password": "5g6jDagW8SzzRmF",
                "createdAt": "2023-08-22T18:38:07.817Z",
                "updatedAt": "2023-08-22T18:38:07.817Z",
                "image_id": null
            }
        }
    ]
}
```

GET | /user_friends/pending/:id | pour obtenir la liste des invitations qui demande une action de la part de l'utilisateur

```
res.params.id = userId

res = {
    "message": "Friends retrieved successfully",
    "friends": [
        {
            "asked_id": 1,
            "asker_id": 3,
            "status": "pending",
            "createdAt": "2023-08-22T19:59:39.300Z",
            "updatedAt": "2023-08-22T19:59:39.300Z",
            "asker": {
                "id": 3,
                "username": "Nya",
                "email": "Bradley_Walter@gmail.com",
                "image": null,
                "createdAt": "2023-08-22T18:38:07.816Z",
                "updatedAt": "2023-08-22T18:38:07.816Z"
            }
        },
        {
            "asked_id": 1,
            "asker_id": 4,
            "status": "pending",
            "createdAt": "2023-08-22T19:59:51.675Z",
            "updatedAt": "2023-08-22T19:59:51.675Z",
            "asker": {
                "id": 4,
                "username": "Albertha",
                "email": "Jovan_Toy@hotmail.com",
                "image": null,
                "createdAt": "2023-08-22T18:38:07.816Z",
                "updatedAt": "2023-08-22T18:38:07.816Z"
            }
        },
    ]
}
```

POST | /user_friends/send | envoi un invitation 

```
req.body = {
  userId : 1 // id de la personne connecté 
  askedId : 2 // id de la personne qui va recevoir la demande d'amis

  res.status = 201
  res.json = { message: 'Friend request sent successfully' }
}
```

POST | user_friends/accept

```
  req.body = {
    userId : 1 // id de la personne connecté 
    userToAddId : 2 // id de la personne dont la demande d'amis doit être accepté
}

res.status = 204
res.json = { message: 'Friend request accepted successfully' }
```

POST | user_friends/reject

```
  req.body = {
    userId : 1 // id de la personne connecté 
    userToAddId : 2 // id de la personne dont la demande d'amis doit être refusé
}

res.status = 204
res.json = { message: 'Friend request rejected successfully' }
```



