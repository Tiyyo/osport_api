# Routes

## Auth

### POST | /signup | creation d'un compte utilisateur

```text
req.body = {
  username : 'john',
  email : 'john.doe@example.com',
  password : 'test',
}

res.status = 201 
res.json = { message : 'User created successfully' }

```

### POST | /signin | se connecter a l'api et obtenir un cookies

```text
req.body = {
  username : 'john',
  password : 'test'
}

res.cookie =  accessToken httpOnly: true, sameSite: 'none', secure: true
res.status = 200
res.json = {message  :'User logged in successfully'}
```

### GET | /user/validate | renvoi les informations de l'user si un cookie contenant un token jwt valide est attaché a la requete

```text
res.status = 200
res.json = {message : 'User is logged in' , userInfos : userInfos}
```

### POST | /logout | invalide et surpprime le cookie

```text
res.status = 200
res.json = { message : 'User logged out successfully'}

```

## Friendlist

### GET | /user_friends/sent/:id| pour obtenir la liste des invations envoyé toujours en cours de validation

```text
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

### GET | /user_friends/accepted/:id | pour obtenir sa liste d'amis confirmé

```text
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

### GET | /user_friends/pending/:id | pour obtenir la liste des invitations qui demande une action de la part de l'utilisateur

```text
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

### POST | /user_friends/send | envoi un invitation

```text
req.body = {
  userId : 1 // id de la personne connecté 
  askedId : 2 // id de la personne qui va recevoir la demande d'amis

  res.status = 201
  res.json = { message: 'Friend request sent successfully' }
}
```

### POST | user_friends/accept

```text
  req.body = {
    userId : 1 // id de la personne connecté 
    userToAddId : 2 // id de la personne dont la demande d'amis doit être accepté
}

res.status = 204
res.json = { message: 'Friend request accepted successfully' }
```

### POST | user_friends/reject

```text
  req.body = {
    userId : 1 // id de la personne connecté 
    userToAddId : 2 // id de la personne dont la demande d'amis doit être refusé
}

res.status = 204
res.json = { message: 'Friend request rejected successfully' }
```

## User

### | Get one user

```text
    req.body = {
        "id": 4
    }

res.status = 200
res.json = {
    "user": {
        "id": 4,
        "username": "Johnny",
        "imageUrl": "https://picsum.photos/200/300",
        "imageTitle": "avatar-cool guy"
    }
}
```

### | PATCH Update one user

```text
    req.body = {
        "id": 4
    }

res.status = 200
res.json = {
    "message": "The user has been updated",
    "user": {
        "id": 4,
        "username": "Jacky",
        "imageTitle": "avatar-cool guy",
        "imageUrl": "https://picsum.photos/200/300"
    }
}
```

### DELETE | Delete one user (RGPD)

```text
    req.body = {
        "id": 4
    }

res.status = 200
res.json = { "message": "14 has been deleted" }
```

### PATCH | Change the picture of the user

```text
    req.body = {
        "id": 17,
        "imageUrl": "insaneurl"
    }

res.status = 200
res.json = {
    "message": "The user has been updated",
    "user": {
        "id": 17,
        "username": "Danny",
        "imageTitle": "avatar-Danny",
        "imageUrl": "insaneurl"
    }
}
```

### GET | Get sports the user master with rate

```text
    req.body = {
        "id": 2
    }

res.status = 200
res.json = {
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

### PATCH | User creator can validate and close an event

```text
    req.body = {
       "userId": 8,
        "eventId": 2
    }

res.status = 200
res.json = {
    "message": "Event validated",
    "event": {
        "id": 2,
        "date": "2023-08-28T16:38:15.381Z",
        "location": "On sait pas ou",
        "duration": 45,
        "nb_team": 2,
        "nb_max_participant": 12,
        "status": "closed",
        "winner_team": null,
        "creator_id": 8,
        "sport_id": "Football",
        "created_at": "2023-08-28T15:13:07.321Z",
        "updated_at": "2023-08-30T06:45:00.673Z"
    }
}
```

### GET | Get all events from an user

```text
    req.params = {
       "id": 5
    }

res.status = 200
res.json = {
    "message": "Events found",
  "events": [
    {
      "id": 2,
      "date": "2023-08-28T16:38:15.381Z",
      "location": "On sait pas ou",
      "duration": 45,
      "nb_team": 2,
      "nb_max_participant": 12,
      "status": "closed",
      "winner_team": null,
      "creator_id": 5,
      "sport_id": "Football",
      "created_at": "2023-08-28T15:13:07.321Z",
      "updated_at": "2023-08-30T06:45:00.673Z",
      "sport": {
        "name": "Football",
        "image": [
          {
            "image": {
              "url": "https://picsum.photos/seed/XmZoCD9S/128/480",
              "title": "Illum beatae ipsa nemo."
            }
          }
        ]
      },
      "event_on_user": [
        {
          "user": {
            "id": 2,
            "email": "Brad.Boyer@hotmail.com",
            "username": "Maximus",
            "password": "QmS_sGWVgF23OUB",
            "created_at": "2023-08-30T15:05:17.542Z",
            "updated_at": "2023-08-30T15:05:17.542Z",
            "image_url": "https://picsum.photos/seed/uv6rv/128/480"
          }
        },
        {
          "user": {
            "id": 3,
            "email": "Urban.Purdy@yahoo.com",
            "username": "Robert",
            "password": "0yIOEUADvjJqSrC",
            "created_at": "2023-08-30T15:05:17.543Z",
            "updated_at": "2023-08-30T15:05:17.543Z",
            "image_url": "https://picsum.photos/seed/he4jsa/128/480"
          }
        },
      ]
    },
    {
      "id": 3,
      "date": "2056-08-30T15:30:00.000Z",
      "location": "New Location",
      "duration": 120,
      "nb_team": 2,
      "nb_max_participant": 50,
      "status": "Juste créé",
      "winner_team": null,
      "creator_id": 5,
      "sport_id": "Basketball",
      "created_at": "2023-08-28T15:14:17.568Z",
      "updated_at": "2023-08-30T09:52:51.672Z",
      "sport": {
        "name": "Basketball",
        "image": []
      }
    }
  ]
}
```

### PATCH | The creator can save the final results, when the event is finished, scores can't be changed again

```text
    req.body = {
        "userId": 1,
        "eventId": 2,
        "scoreTeam1": 24,
        "scoreTeam2": 12
    }

res.status = 200
res.json = {
  "message": "Result of the event has been saved",
  "eventUpdated": {
    "id": 3,
    "date": "2022-11-13T22:54:56.777Z",
    "location": "East Zolacester",
    "duration": 60,
    "nb_team": 2,
    "nb_max_participant": 10,
    "status": "finished",
    "winner_team": 1,
    "creator_id": 1,
    "score_team_1": 24,
    "score_team_2": 12,
    "sport_id": 1,
    "created_at": "2023-08-30T15:05:17.803Z",
    "updated_at": "2023-08-30T15:53:48.115Z"
  }
}
```
