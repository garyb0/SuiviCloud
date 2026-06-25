# Audit de reprise technique SuiviCloud

Date: 2026-06-24

Portée: reprise technique et audit de l'état actuel seulement. Aucune refonte ou correction de design n'a été effectuée.

## État du dépôt

- `git status --short --branch`: échec, `fatal: not a git repository (or any of the parent directories): .git`.
- `git diff --stat`: échec, Git traite le dossier comme hors dépôt.
- `git log --oneline -5`: échec, dépôt Git invalide.
- `git branch --list`: échec, dépôt Git invalide.
- Un dossier `.git` existe dans `C:\Cline\SuiviCloud`, mais il ne contient pas les fichiers attendus d'un dépôt valide (`HEAD`, `objects`, etc.).
- Les fichiers non suivis, changements non commités, derniers commits et branches locales ne peuvent donc pas être déterminés avec certitude.

Artefacts déjà présents ou générés dans l'espace de travail:

- `dist/`: sortie de build statique.
- `.playwright-cli/`: anciennes captures/snapshots Playwright existants.
- `output/playwright/service-local-audit.json`: artefact existant avant cet audit.
- `suivicloud-site.tgz`: archive présente à la racine.
- `output/playwright/design-recovery-audit/`: captures et rapports générés pendant cet audit.

## Pile technique

- Site statique bilingue généré par Node.js maison.
- Entrée principale: `src/build.js`.
- Styles: `src/styles.css`.
- JavaScript client: `src/app.js`.
- Serveur statique local: `scripts/serve.js`, port par défaut `4173`.
- Serveur contact séparé: `server/contact-server.js`.
- Aucune dépendance déclarée dans `package.json`.
- Aucun `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock` ou `node_modules` local détecté.
- Scripts disponibles:
  - `npm run build`
  - `npm run check:links`
  - `npm run audit:site`
  - `npm run serve`
  - `npm run dev`
  - `npm run contact:server`

## Composants existants

Composants/templates centraux dans `src/build.js`:

- Structure globale: `pageShell`, `Header`, `Footer`, `structuredData`, `interiorHero`, `FinalCTA`.
- Accueil: `HeroNetwork`, `BeforeAfterSystem`, `ServiceConstellation`, `AutomationWorkflow`, `TrustManifesto`, `PricingPath`, `ProcessTimeline`, `FounderStory`, `FAQAccordion`.
- Services: `serviceData`, `serviceFlowData`, `serviceDetail`, `ServiceVisual`, `WebsiteServicePage`, `AutomationServicePage`, `HostingServicePage`, `InfrastructureServicePage`, `SupportServicePage`.
- CTA de service: `ServiceContextCTA`, `ServiceFinalCTA`.
- Pages de contenu: `pricingPage`, `methodPage`, `aboutPage`, `resourcesPage`, `contactPage`, `legalPage`.
- Formulaire: `ContactForm`, `field`, `selectField`.

Composants qui semblent appartenir à la dernière passe de refonte:

- Pages détaillées par service avec sections dédiées.
- `WebsitePreview` et ses contrôles responsive.
- `ResourceNotebook`.
- Sections À propos spécifiques: `AboutGary`, `AboutPath`, `AboutWork`, `AboutPrinciples`, `AboutLocal`, `AboutCTA`.
- Nouvelle passe visuelle dans `src/styles.css` à partir du commentaire `/* Artistic finish pass */`.

Composants/classes partiellement utilisés ou hérités:

- Aucune fonction template inutilisée détectée dans `src/build.js`.
- Plusieurs classes CSS définies ne sont pas présentes dans le HTML généré. Certaines sont normales car activées dynamiquement par JS (`js`, `is-open`, `is-scrolled`, `is-visible`, `is-invalid`, `is-error`, `is-success`).
- Classes qui ressemblent à de la dette ou à d'anciens composants non raccordés: `future-list`, `info-grid`, `light`, `local-layout`, `local-rows`, `local-section`, `local-statement`, `mini-network`, `outcome-panel`, `resource-prep`, `scope-panel`, `service-constellation`, `service-detail`, `service-detail-grid`, `service-flow-copy`, `service-flow-layout`, `service-flow-rail`, `service-flow-section`, `service-flow-step`, `service-proof`, `service-star`, `webp`.

## Routes fonctionnelles

Le serveur local a été lancé sur `http://localhost:4173`.

Routes inspectées visuellement et par Playwright aux tailles `390x844`, `768x1024`, `1440x1000`:

- `/fr/`
- `/fr/services/`
- `/fr/services/creation-sites-web/`
- `/fr/services/automatisation-integrations/`
- `/fr/services/hebergement-maintenance/`
- `/fr/services/infrastructure-securite/`
- `/fr/services/depannage-accompagnement/`
- `/fr/forfaits/`
- `/fr/methode/`
- `/fr/a-propos/`
- `/fr/ressources/`
- `/fr/contact/`
- `/en/`
- `/en/services/`
- `/en/services/website-development/`
- `/en/services/automation-integrations/`
- `/en/services/hosting-maintenance/`
- `/en/services/infrastructure-security/`
- `/en/services/technical-support/`
- `/en/pricing/`
- `/en/process/`
- `/en/about/`
- `/en/resources/`
- `/en/contact/`

Résultat automatisé:

- Statut HTTP `200` pour toutes les routes inspectées.
- Aucun débordement horizontal détecté.
- Un seul H1 détecté par route.
- Aucun `pageerror`.
- Aucune erreur console.
- Captures pleine page générées dans `output/playwright/design-recovery-audit/`.
- Planches de premier viewport générées:
  - `output/playwright/design-recovery-audit/first-viewport-sheet-390x844.png`
  - `output/playwright/design-recovery-audit/first-viewport-sheet-768x1024.png`
  - `output/playwright/design-recovery-audit/first-viewport-sheet-1440x1000.png`

## Routes incomplètes ou problématiques

### Cassé visuellement

- `/fr/a-propos/` à `390x844`: le hero conserve une grille en deux colonnes. Le texte est fortement écrasé à gauche.
- `/en/about/` à `390x844`: même problème que la route FR.

Cause probable:

- `.about-page .page-hero-grid` définit `grid-template-columns: minmax(0, 0.9fr) minmax(310px, 0.38fr);`.
- La règle responsive générale `.page-hero-grid { grid-template-columns: 1fr; }` existe à `max-width: 820px`, mais sa spécificité est plus faible que `.about-page .page-hero-grid`.
- À `768px`, la mise en deux colonnes reste lisible; à `390px`, elle casse la hiérarchie.

### Fonctionnel mais peu final

- `/fr/ressources/` et `/en/resources/`: routes fonctionnelles, mais contenu explicitement "en préparation".
- Routes guides/articles générées aussi, mais elles restent dans un état de préparation éditoriale:
  - `/fr/ressources/guides/`
  - `/fr/ressources/articles/`
  - `/en/resources/guides/`
  - `/en/resources/articles/`

### Non vérifié complètement

- Soumission réelle du formulaire de contact vers `/api/contact`.
- Serveur `contact:server` et stockage/routage des messages.
- Audit clavier exhaustif. Les éléments natifs et hooks JS sont présents, mais aucun parcours clavier complet n'a été enregistré dans cette reprise.

## Classement par état

### Terminé

- Génération statique des 36 pages.
- Routes FR/EN principales présentes.
- `canonical`, `hreflang`, métadonnées Open Graph et JSON-LD générés dans `pageShell`.
- Build de production.
- Liens internes après build.
- Respect CSS de `prefers-reduced-motion` présent en fin de feuille.
- Navigation, menu mobile, accordéons et interactions client raccordés dans `src/app.js`.

### Fonctionnel mais peu raffiné

- Accueil FR/EN: stable aux trois largeurs, mais long et très dense sur mobile.
- Pages services: stables et cohérentes, mais plusieurs sections ont une structure répétitive.
- Pages forfaits/méthode/contact: fonctionnelles, visuellement stables.
- Ressources: routes stables, contenu volontairement non final.
- À propos à `768px` et `1440px`: lisible, mais la règle spécifique du hero est fragile.

### Partiellement implémenté

- Ressources/guides/articles: structure en place, contenu non publié.
- CSS: coexistence d'une base initiale et d'une passe `Artistic finish pass`; plusieurs classes semblent héritées.
- `audit:site`: utile, mais pas complètement local dans son comportement actuel, car le sitemap généré contient des URLs absolues `https://suivicloud.xyz/...`.
- Documentation interne inexistante avant cette reprise.

### Cassé ou absent

- Métadonnées Git: dépôt invalide, historique et branches indisponibles.
- Hero mobile À propos/About à `390px`.
- Scripts `lint`, `typecheck` et `test`: absents.
- Dépendances récentes: impossibles à déduire depuis Git; aucune dépendance déclarée dans l'état actuel.

## TODO, FIXME et contenu temporaire

Recherche effectuée:

- `TODO`
- `FIXME`
- `TEMP`
- `temporary`
- `placeholder`
- `WIP`
- `refonte`
- `draft`
- `lorem`
- `ipsum`
- `à faire`
- `a faire`
- `stub`
- `console.log`
- `debugger`

Résultat:

- Aucun TODO/FIXME de refonte trouvé.
- `console.log` légitimes dans les scripts serveur/build/audit.
- La notion de "placeholder" apparaît dans `scripts/audit-site.js` comme contrôle de qualité.
- Le contenu "en préparation" des ressources est volontaire et visible.

## Erreurs de console

Collecte Playwright sur 24 routes x 3 viewports:

- Aucune erreur console.
- Aucun warning console.
- Aucun `pageerror`.
- Aucune requête échouée.

Rapport: `output/playwright/design-recovery-audit/route-results.json`.

## Erreurs de build

Commandes exécutées:

- `npm run build`: OK, `Built 36 pages in dist`.
- `npm run check:links`: OK après build, `Checked 38 HTML files`.
- `npm run audit:site`: OK, `checked: 36`, `issues: []`.

Note: les tentatives de `check:links` lancées en parallèle avec `build` produisent des erreurs transitoires pendant la suppression/régénération de `dist`. Relancé seul après le build, le contrôle passe.

## Dette visuelle

1. Corriger en priorité la grille hero de la page À propos en mobile.
2. Clarifier la couche CSS: base initiale plus passe "Artistic finish pass" rendent l'état de refonte difficile à lire.
3. Nettoyer ou confirmer les classes CSS héritées non présentes dans le HTML généré.
4. Ressources: décider si les pages doivent rester "en préparation" ou recevoir du contenu réel.
5. Contact: vérifier l'expérience complète avec le serveur `/api/contact`, états d'erreur et succès.
6. Vérifier la navigation clavier et le menu mobile avec un protocole explicite.

## Ordre recommandé des prochaines tâches

1. Restaurer ou recréer un dépôt Git valide avant toute refonte.
2. Corriger uniquement le bug mobile de `/fr/a-propos/` et `/en/about/` à `390px`.
3. Relancer captures `390x844`, `768x1024`, `1440x1000` sur les deux routes À propos.
4. Ajouter un audit local fiable des métadonnées à partir de `dist/`, ou ajuster `audit:site` pour ne pas suivre les URLs de production quand `SITE_ORIGIN` est local.
5. Faire un passage de nettoyage CSS ciblé: distinguer classes dynamiques, classes héritées et classes réellement mortes.
6. Tester le formulaire contact avec `contact:server` dans un environnement local contrôlé.
7. Ensuite seulement, poursuivre une éventuelle finition visuelle page par page.
