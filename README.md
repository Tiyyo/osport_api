# O'Sport

## Rôles du projet 

- **Product Owner** : Steeve M.
- **Git Master** : Guillaume J.
- **Lead Dev Front** : Thomas G.
- **Project Manager** : Anthony B.

## [Trello](https://trello.com/b/Nkp4wJJY/osport)

## Presentation du projet

Une application autour du sport, réfléchie pour des matchs de foot 5v5 mais pouvant s'appliquer à d'autres sports. L'application regrouperait des utilisateurs, chaque utilisateur aurait une fiche sous forme de tableau de scores par compétences.

L'utilisateur aurait la possibilité, lors de son inscription et uniquement à ce moment-là, de s'attribuer des scores pour chaque compétence. De plus, un utilisateur aurait la possibilité d'attribuer des notes à d'autres utilisateurs, sous certaines conditions à définir, par exemple, en étant présents dans une liste d'amis ou en ayant participé ensemble à au moins un événement sportif.

Le but de l'application serait de permettre à un utilisateur de créer un événement (comme un match par exemple), d'envoyer des invitations à une liste d'utilisateurs, de créer une messagerie instantanée regroupant les invités pour leur permettre de s'organiser. Une fois le nombre de participants atteint, l'application créerait deux équipes équilibrées en fonction du score de chaque participant.

Après chaque événement, les participants pourront élire un MVP (Most Valuable Player et non Minimum Viable Product). Ce MVP verra son score global augmenté. On peut imaginer d'autres éléments qui pourraient incrémenter ou décrémenter le score global d'un utilisateur, comme le fair-play du joueur, etc.

## Public visé

Tous sportifs, tous niveaux. Groupes d'amis voulant se réunir et garder un historique des matchs joués via une interface simple à utiliser, et permettre aux joueurs de s'évaluer entre eux. L'application permettra de générer deux équipes en fonction de la note des joueurs. Le résultat des matchs sera enregistré par l'oganisateur de l'événement.

## Définitions des besoins

Dans une version 1, l'application comprendrait :

- Une authentification via Google (et/ou Apple).
- La possibilité pour l'utilisateur de gérer son profil.
- Plusieurs sports possibles, avec à chaque fois des stats propres au sport choisi
- La possibilité pour l'utilisateur de s'auto-évaluer sur plusieurs critères selon le sport.
- L'ajout d'autres utilisateurs dans une liste d'amis.
- La création d'événements.
- L'envoi d'invitations aux événements.
- La création d'une messagerie par événement.
- La repartition des participants en équipes via  un algorithme (score global en unique paramètre).
- La possibilité de noter les joueurs.
- L'accés à l'historique des matchs disputés.

Bonus :

- Ajout un lien vers Google Agenda (et/ou Google Calendar) automatique.
- Election MVP.


## Technologies utilisées

- React
- PostgreSQL
- NodeJS - Express
- Vitest
- Zod

## Arborescence de l'application

- **Page d'accueil** :
    - Page profil utilisateur (page affichée selon le sport)
    - Historique
- **Liste d'amis** :
    - Evaluation des autres joueurs via leurs profils
-  **Matchmaking** :
    - Résultats
    - Chat

## Liste des routes

- /
- /profil
    - /profil/:id
        - /profil/:id/sport
        - /profil/:id/history
- /friendlist
    - /friendlist/:id
- /matchmaking
    - /matchmaking/résultats
    - /matchmaking/chat

    PS : routes à revoir


## Wireframe

### [Figma](https://www.figma.com/file/iscZuzxtxFLezgHNrOi2E1/Untitled?type=design&node-id=9-2&mode=design&t=H0gntgd6xWjKuWgj-0) 

