# SuiviCloud

Site statique bilingue pour SuiviCloud.

## Commandes

```bash
npm run build
npm run check:links
npm run dev
```

Le build génère le site dans `dist/`.

## Déploiement

La production utilise une structure isolée sur le VPS:

```text
/var/www/suivicloud.xyz/
  current -> releases/<timestamp>
  releases/
```

La configuration Nginx dédiée se trouve dans `deploy/nginx/suivicloud.xyz.conf`.
