TâcheManager
Présentation

TâcheManager est une application web de gestion de tâches développée avec Angular pour le front-end et Node.js avec SQLite pour le back-end.
Elle propose :

    Un système d’authentification sécurisé avec gestion des rôles (utilisateur, admin)

    Un dashboard personnalisé

    Une gestion complète des tâches : création, modification, suppression, checklist

Technologies utilisées

    Front-end : Angular 15+, TypeScript, Bootstrap, ng2-charts

    Back-end : Node.js, Express, SQLite

    Authentification : JWT (JSON Web Tokens)

    Outils : Git, VSCode, Postman

Installation et lancement
1. Cloner le projet

git clone https://github.com/Ccdrik/Tache-Manager.git
cd Tache-Manager

2. Lancer le backend

cd backend
npm install
node server.js

    Le backend écoute sur : http://localhost:3000

3. Lancer le frontend

Ouvre un autre terminal :

cd frontend
npm install
ng serve

    L’application Angular sera accessible sur : http://localhost:4200

Utilisation

    Inscription et connexion avec rôle utilisateur ou admin

    Accès au dashboard adapté au rôle

    Gestion des tâches : création, édition, suppression, checklist, marquage terminé

    Dashboard admin avec statistiques globales

Workflow Git

    La branche main contient la version stable prête à être déployée

    La branche dev est utilisée pour le développement quotidien

    Chaque nouvelle fonctionnalité ou correction doit être développée dans une branche dédiée créée depuis dev

    Les modifications sont intégrées dans dev via des Pull Requests validées avant d’être fusionnées dans main

Fonctionnalités prévues / roadmap

    Gestion avancée des notifications (email, push)

    Partage de tâches entre utilisateurs

    Interface responsive améliorée et accessibilité renforcée

    Tests unitaires et end-to-end automatisés

    Dockerisation du projet et pipeline CI/CD