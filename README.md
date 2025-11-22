# Nakuma Server

Nakuma est une application de collection de cartes de personnages d'anime.
Les utilisateurs peuvent collecter des cartes en ouvrant des packs, ils en ont droit à un gratuit par jour.
Les informations concernant les personnages sont récupérées à partir de l'[API AniList](https://anilist.gitbook.io/anilist-apiv2-docs/).

## Installation

1. Clonez le repository
2. Installez les dépendances avec `npm install`
4. Lancez le serveur avec `npm start`

## Utilisation

### Fonctionnalités
- Inscription et connexion d'un utilisateur
- Ouverture de pack (avec stockage des cartes obtenues et personnages associés) :
    - Gratuits : un pack offert à l'inscription, puis un par jour
    - Payants : simulation de paiement, permettant à un utilisateur d'ouvrir plus de packs

### Routes de l'API
- Authentification : 
    - `POST /api/auth/signup` : inscription d'un utilisateur
    - `POST /api/auth/login` : connexion d'un utilisateur
- Cartes : 
    - `GET /api/cards/user/:userId` : renvoie la liste des cartes possédées par un utilisateur
    - `GET /api/cards/:id` : renvoie les détails d'une carte
    - `POST /api/cards` : ajout d'une carte
    - `DELETE /api/cards` : suppression de toutes les cartes
    - `DELETE /api/cards/:id` : suppression d'une carte
    - `PUT /api/cards/:id` : mise à jour d'une carte
- Personnages :
    - `GET /api/characters/:id` : renvoie les détails d'un personnage
    - `POST /api/characters` : ajout d'un personnage
    - `PUT /api/characters/:id` : mise à jour d'un personnage
    - `DELETE /api/characters/:id` : suppression d'un personnage
    - `DELETE /api/characters` : suppression de tous les personnages
- Utilisateurs :
    - `GET /api/users/:id` : renvoie les détails d'un utilisateur
    - `PUT /api/users/:id` : mise à jour d'un utilisateur
    - `DELETE /api/users/:id` : suppression d'un utilisateur
- Packs :
    - `POST /api/packs/open` : ouverture d'un pack
    - `POST /api/packs/buy` : simulation d'un paiement de pack
- Accès aux packs :
    - `GET /api/packAccess/:userId` : renvoie les informations sur les packs disponibles pour un utilisateur

## Technologies utilisées
### Principales
- Node.js
- Express
- MongoDB

### Sécurité et performance
- HTTPS
- PassportJS (JWT)
- CORS
- Helmet
- Rate Limiting
- Argon2
