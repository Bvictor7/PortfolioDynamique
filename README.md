# Portfolio Dynamique avec Dashboard

## Description

Ce projet est un portfolio dynamique avec un dashboard sécurisé permettant à l'utilisateur (ou à l'administrateur) d'ajouter, modifier ou supprimer des compétences via une interface utilisateur intuitive. Le projet intègre un frontend en React, un backend avec Express et une base de données MongoDB pour stocker les informations sur les compétences. L'application inclut également des fonctionnalités de sécurité telles que l'authentification JWT, la gestion des rôles, et la conformité RGPD.

## Technologies utilisées

### Frontend
- **React** : pour la gestion dynamique du contenu et l'interactivité des pages.
- **Tailwind CSS** (ou **Bootstrap**) : pour la mise en page responsive et le design mobile-first.
- **React Router** : pour gérer la navigation entre les différentes pages de l'application.
- **Axios** : pour effectuer des appels API entre le frontend et le backend.

### Backend
- **Node.js + Express** : pour le développement de l'API RESTful.
- **MongoDB + Mongoose** : pour la gestion de la base de données NoSQL.
- **JSON Web Token (JWT)** : pour l'authentification sécurisée des utilisateurs.
- **bcrypt.js** : pour le hachage des mots de passe utilisateurs.
- **Cloudinary** : pour la gestion des images uploadées (compétences, photos de profil, etc.).

### Sécurité
- **Helmet** : pour sécuriser les en-têtes HTTP.
- **CORS** : pour gérer les accès cross-origin.
- **Tarteaucitron.js** : pour gérer les cookies et la conformité RGPD.
- **Google reCAPTCHA** : pour éviter les abus via des robots (bots).

## Fonctionnalités

- **Portfolio dynamique** : Affiche les compétences sous forme de cartes interactives.
- **Dashboard sécurisé** : Les utilisateurs peuvent se connecter pour gérer leurs compétences.
- **Ajout/Modification/Suppression de compétences** : En tant qu'administrateur, vous pouvez ajouter, modifier ou supprimer des compétences.
- **Authentification avec JWT** : Les utilisateurs doivent se connecter via un formulaire sécurisé.
- **Gestion des rôles** : Deux rôles disponibles : administrateur et utilisateur (admin peut gérer les compétences).
- **Responsive Design** : L'application est entièrement responsive et optimisée pour les appareils mobiles.
- **Cookies et RGPD** : L'application respecte les règles de confidentialité avec un gestionnaire de cookies.

## Installation

### Prérequis

- Node.js
- npm (Node Package Manager)
- MongoDB (ou une instance MongoDB Cloud)

### Étapes d'installation

1. **Clonez ce dépôt** :
   ```bash
   git clone https://github.com/Bvictor7/Portfolio-Dynamique-avec-Dashboard.git
# PortfolioDynamique
