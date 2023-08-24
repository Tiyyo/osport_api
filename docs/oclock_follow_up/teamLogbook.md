# Journal de bord

## Jour 1 - 11/08/2023

- Début du Sprint 0
- Définition des rôles (Product Owner, Git
Master, Lead Dev Front, Project Manager)
- Découverte et compréhension du projet
- Définitions des besoins pour la V.1 de l'application
- Idées de features à rajouter selon l'avancement du projet
- Choix des technologies à utiliser, côté Back & Front
- Ebauche de l'arborescence et des routes de l'application
- Mise en place d'un outil de gestion : Trello

### Jour 1 - A faire

- UserStories
- MCD (Guillaume & Steeve)
- Wireframes

## Jour 2 - 14/08/2023

- Ajout de Tailwind au projet (avec DaisyUI)
- Premières versions des Userstories (Revues par chaque membre)
- Premières propositons du MCD (Revues par chaque membre)
- Intêret d'utiliser MongoDB ou PostgreSQL pour gérer la BDD (possible nécessité d'avoir une table contenant d'autre table) ??
- Convention de nommage des commits

- Redéfinition de la page d'accueil, qui comprendra le chat, les dates des prochaines rencontres et autres informations (profil, historique des rencontres jouées)
- Redéfinition de la page matchmaking, où il sera possible de selectionner les participants, et de les afficher sur un terrain virtuel (image de fond en fonction du sport)

### Jour 2 - A faire

- Revue des UserStories proposées
- Revue des MCD proposés
- Dictionnaire de données

## Jour 3 - 16/08/2023

- Définition des bases de données relatives aux sports :
- Football : passing, pace, dribbling, shot, tackle, strenght
- Basket : dribbling, strength, block, mid-range-shot, long-range-shot, vertical, acceleration
- Revue des Wireframes en vue de modifications futures quand le front sera en cours d'élaboration
- Modification des routes suite aux modifications d'organisation de la structure de l'app (Wireframe)

## Jour 4 - 17/08/2023

Après revision des besoins/fonctionnalités :

- Suppression des fonctionnalités les plus chronophages, à integrer dans une V2 (chat direct, authentification Google, agenda)
- Revues des composants en front à simplifier (remplissage du terrain au fur et à mesure de la séléction des participants et autres optimisations)
- Revue du systeme de note, avec une seule note globale au lieu de plusiers skills.
- Les notes attribuées donneront un niveau à l'utilisateur : 1 à 3 = débutant, 4 à 6 = intermédiaire, 7 et + = confirmé.
- Les notes seront utilisées en back pour donner un niveau à l'utilisateur en front
- L'utilisateur choisira son niveau et ne s'attribuera pas de note au départ
- 2 sports conservés dans la V1 : Foot et Basket
- Finalisation des user stories

- Schéma d'arborescence fait (Thomas)
- Routes côté Backend définies (Steeve & Guillaume)
- Wireframes Desktop & Mobile finalisés (Anthony)
- Mise à jour du Trello, en séparant les tâches à effectuer (Guillaume & Anthony)
- Connexion à un serveur AWS en vue d'un futur déploiement (Steeve & Thomas)

## Jour 5 - 18/08/2023 (& week-end)

- Début de l'intégration page Profile, problème avec daisyUI qui ne prenait pas en compte les changements de CSS pour un élément ni les thèmes choisis. Les 1er éléments sont créés. (Anthony)
- Intégration page Login & Signup, et de la logique de connexion (useEffect), formulaire de connexion et d'inscription fait. Problème avec les sessions ajout de AuthProvider pour plus de sécurité. (Thomas)
- Script pour mettre des users dans la BDD, authentification, ajout de règles sur ESLint (le projet ne démarrait plus, extensions non reconnues). (Steeve)
- Intégration de Vitest, Diffèrentes configutaion ESLint. (Guillaume).

## Jour 6 - 21/08/2023

- Intégration de la page /profile et du menu de navigation du site, mise en place de vitest (Anthony)
- Intégration de la page login, stockage dans le local-storage (pour identifier l'user) via un hook (useLocaleStorage). Les données seront finalement stockées dans les cookies (Thomas)
- Schema Prisma, définition des modèles, BDD Locale, création de user via faker. usercontroller pour la journée (Guillaume)
- Authentification fonctionelle, ajout de la route pour se déconnecter. (Steeve)

## Jour 7 - 22/08/2023

- Validation des features ajoutées hier, controller & router pour les demandes d'amis (modification des routes), implémentation Zod (Steeve)
- Travail sur les routes /user (ajout de target pour cibler un user), travail sur les images des utilisateurs (Guillaume)
- Integration de la page /contact, logique sur l'input search pour récuperer le username du contact à ajouter, ajout du header sur l'app (Anthony)
- Continuation de la logique pour le login et signup (Thomas)

## Jour 8 - 23/08/2023

- Integration des pages event-list, edit-profile, create-event(en cours). Refonte du menu et mise en place d'un header. Probleme sur l'affichage d'un composant avec des avatars (sur create_event) (Anthony)
- Page signup fonctionelle, page login en cours (Thomas)
- Routes user terminées (modifier les infos, delete user, modifier avatar, liste des sports) (Guillaume)
- Script ajouté pour avoir un admin (fictif), création des relations (Steeve)
