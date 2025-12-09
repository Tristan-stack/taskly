# Taskly monorepo (Symfony 8 + Next.js + PostgreSQL)

Monorepo prêt pour Render free tier : API Symfony dockerisée, front Next.js (Node natif) et base PostgreSQL managée.

## Structure
- `api/` : Symfony 8.0 (runtime Docker, php-fpm + nginx).
- `client/` : Next.js App Router (Node, npm).
- `render.yaml` : déclaration des services Render (API, front, DB).

## Pré-requis locaux
- Docker / Docker Compose (pour construire l’image API si besoin).
- Node 18+ et npm (pour le front).
- PHP 8.4+ si vous exécutez Symfony en local sans Docker.

## Démarrage rapide
```bash
# Front
cd client
npm install
npm run dev

# API (exécution locale simple via PHP built-in)
cd ../api
composer install
php -S localhost:8000 -t public
```

## Build de l’image API (optionnel)
```bash
cd api
docker build -t taskly-api .
docker run -p 8080:8080 taskly-api
```

## Variables d’environnement clés
- `DATABASE_URL` (API) : fournie par Render via la base Postgres (`fromDatabase`). Exemple local : `postgresql://symfony:symfony@localhost:5432/symfony?serverVersion=16&charset=utf8`.
- `APP_ENV=prod`, `APP_DEBUG=0` (API Docker).
- `PORT` (API) : Render l’injecte, nginx écoute dessus (défaut 8080 pour tests locaux).
- `NEXT_PUBLIC_API_URL` (front) : URL publique Render de l’API (ex. `https://symfony-api.onrender.com`).

## Render (render.yaml)
- Service `symfony-api` : `runtime: docker`, `rootDir: api`, porte `$PORT`, `DATABASE_URL` via `taskly-postgres`.
- Service `next-client` : `env: node`, `rootDir: client`, `buildCommand`/`startCommand` npm.
- Base `taskly-postgres` : plan free, injecte `connectionString` vers l’API.

## Notes
- Le pack `webapp` Symfony n’est pas installé (le front est dans Next.js).
- L’image Docker embarque nginx + php-fpm + opcache, configurée pour Render.
