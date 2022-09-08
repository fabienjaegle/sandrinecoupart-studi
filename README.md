
# Sandrine Coupart

## Projet pour l'Evaluation Continue de Formation Studi : développement de la partie FrontEnd et BackEnd d'une application web

### Prérequis
- Avoir `node.js` et `npm` installés sur la machine
- Avoir MariaDB ou un serveur MySQL démarré en local

### Installation
Après avoir cloné le projet, ouvrir le projet via Visual Studio Code par exemple et lancer un terminal, puis taper la commande `npm install` dans les dossiers `server` ET `client` pour installer toutes les dépendances du projet.

### Configuration
Le projet nécessite une connexion à la base de données MySQL. La création d'un fichier d'environnement est nécessaire pour la bonne connexion à celle-ci.
Créez un fichier `.env` à la racine du dossier `server`.
Ajoutez-y vos informations de connexion à la base de données :
```
DBHOST='localhost'
DATABASE='databasename'
DBUSERNAME='root'
DBPASSWORD='password'
PORT=5000
```
Exécutez le script SQL contenu dans le dossier `server\db\scoupart.sql`.

### Exécution
L'exécution se fait via deux terminaux de commandes, un pour la partie backend et l'autre pour la partie frontend.
- Backend : se placer dans le dossier `server` et lancer la commande `nodemon index.js`
- Frontend : se placer dans le dossier `client` et lancer la commande `npm start`

### Administration
L'administrateur actuel du site est `admin/toto`. La connexion se fait via le bouton *Se connecter* du site.
L'URL `https://sandrinecoupartstudi.herokuapp.com/admin` permet d'administrer le site (ajout de nouveaux patients, de nouvelles recettes, etc.).