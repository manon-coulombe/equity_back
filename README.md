# Equity Back - API

![GitHub repo](https://img.shields.io/badge/GitHub-Repo-blue?style=flat-square&logo=github)

Bienvenue dans **Equity Back**, l'API qui alimente l'application mobile [Equity](https://github.com/manon-coulombe/equity). Cette API fournit les services nécessaires à la gestion et au bon fonctionnement de l'application.

## 🚀 Fonctionnalités
- Création, modification et suppression des comptes
- Ajout et gestion des transactions
- Ajout et gestion des participants

## 📦 Installation
### Prérequis
- [Node.js](https://nodejs.org/) >= 14
- Base de données [PostgreSQL](https://www.postgresql.org/)
- Un fichier `.env` configuré avec les bonnes variables d'environnement

### Étapes d'installation
```sh
# Cloner le dépôt
git clone https://github.com/manon-coulombe/equity_back.git
cd equity_back

# Installer les dépendances
npm install

# Configurer la base de données PostgreSQL
# Copier le fichier .env.example et le renommer .env puis renseigner les informations de la base de données

# Lancer les migrations
npm run migrate

# Démarrer le serveur
npm run dev
```

## 🛠️ Utilisation
L'API tourne par défaut sur `http://localhost:3000`. Voici quelques endpoints utiles :

### Comptes
```http
GET /
```
> Récupérer la liste des comptes

```http
GET /compte/:id
```
> Récupérer le détail d'un compte

```http
POST /compte
```
> Ajouter un compte avec ses transactions et participants

### Transactions
```http
POST /transaction
```
> Ajouter une transaction

```http
GET /transaction/:id
```
> Récupérer une transaction

Consulte la documentation complète de l'API pour plus de détails.


## 🏗️ Contribution
Les contributions sont les bienvenues ! Merci de soumettre une issue ou une pull request sur le dépôt GitHub.

## 📧 Contact
Si tu as des questions ou des suggestions, n'hésite pas à me contacter via [GitHub](https://github.com/manon-coulombe/equity_back/issues).

