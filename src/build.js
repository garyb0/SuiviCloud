import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const origin = "https://suivicloud.xyz";
const email = "bonjour@suivicloud.xyz";
const assetVersion = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15);

const serviceData = {
  websites: {
    id: "websites",
    visual: "browser",
    fr: {
      path: "/fr/services/creation-sites-web/",
      title: "Création de sites web",
      seo: "Création de sites web à Rimouski | SuiviCloud",
      description: "Sites web clairs, bilingues et adaptés aux petites entreprises de Rimouski, du Bas-Saint-Laurent et du Québec.",
      kicker: "Site web",
      summary: "Des sites rapides, structurés et faciles à suivre pour présenter votre entreprise et recevoir les bonnes demandes.",
      result: "Un visiteur comprend l’offre, trouve les informations utiles et peut envoyer une demande sans friction.",
      bullets: [
        "Site de présentation ou page de destination",
        "Site bilingue français-anglais",
        "Refonte d’un site existant",
        "Formulaires, prise de rendez-vous et demandes de soumission",
        "Optimisation mobile, structure SEO de base et performance"
      ],
      alt: "/en/services/website-development/"
    },
    en: {
      path: "/en/services/website-development/",
      title: "Website Development",
      seo: "Website development in Rimouski | SuiviCloud",
      description: "Clear, bilingual websites for small businesses in Rimouski, the Lower St. Lawrence and Quebec.",
      kicker: "Website",
      summary: "Fast, structured and easy-to-maintain websites that present your business and receive the right requests.",
      result: "A visitor understands the offer, finds useful information and can send a request without friction.",
      bullets: [
        "Business websites and landing pages",
        "French-English bilingual sites",
        "Existing website refreshes",
        "Forms, booking paths and quote requests",
        "Mobile optimization, basic SEO structure and performance"
      ],
      alt: "/fr/services/creation-sites-web/"
    }
  },
  automation: {
    id: "automation",
    visual: "workflow",
    fr: {
      path: "/fr/services/automatisation-integrations/",
      title: "Automatisation et intégrations",
      seo: "Automatisation PME à Rimouski | SuiviCloud",
      description: "Automatisations simples pour relier formulaires, calendriers, courriels, SMS et outils de suivi.",
      kicker: "Automatisation",
      summary: "Des formulaires, calendriers, courriels, SMS et tableaux de suivi reliés pour réduire les étapes manuelles.",
      result: "Une demande devient une action suivie au bon endroit, sans copier-coller inutile.",
      bullets: [
        "Formulaires reliés à un calendrier ou un tableau de suivi",
        "Confirmations par courriel et rappels SMS",
        "Relances de soumission et tâches internes",
        "Synchronisation entre outils et intégrations API",
        "Automatisations assistées par IA lorsque le besoin le justifie"
      ],
      alt: "/en/services/automation-integrations/"
    },
    en: {
      path: "/en/services/automation-integrations/",
      title: "Automation and Integrations",
      seo: "Small business automation in Rimouski | SuiviCloud",
      description: "Simple automations that connect forms, calendars, email, SMS and tracking tools.",
      kicker: "Automation",
      summary: "Forms, calendars, email, SMS and tracking boards connected to reduce manual steps.",
      result: "A request becomes a tracked action in the right place, without unnecessary copy-paste.",
      bullets: [
        "Forms connected to calendars or tracking boards",
        "Email confirmations and SMS reminders",
        "Quote follow-ups and internal tasks",
        "Tool synchronization and API integrations",
        "AI-assisted automations when the need is clear"
      ],
      alt: "/fr/services/automatisation-integrations/"
    }
  },
  hosting: {
    id: "hosting",
    visual: "health",
    fr: {
      path: "/fr/services/hebergement-maintenance/",
      title: "Hébergement et maintenance",
      seo: "Hébergement web géré au Québec | SuiviCloud",
      description: "Hébergement surveillé, sauvegardes, mises à jour, maintenance et soutien continu pour sites de petites entreprises.",
      kicker: "Maintenance",
      summary: "Un environnement surveillé, sauvegardé et entretenu pour éviter qu’un site soit laissé à lui-même.",
      result: "Le site a des points de contrôle visibles: santé, sauvegarde, mise à jour et restauration.",
      bullets: [
        "Hébergement géré selon les besoins du projet",
        "Certificat SSL, sauvegardes et restauration",
        "Mises à jour, surveillance et rapports de santé",
        "Modifications mineures et soutien récurrent",
        "Migration et reprise d’un site existant"
      ],
      alt: "/en/services/hosting-maintenance/"
    },
    en: {
      path: "/en/services/hosting-maintenance/",
      title: "Hosting and Maintenance",
      seo: "Managed web hosting in Quebec | SuiviCloud",
      description: "Managed hosting, backups, updates, maintenance and ongoing support for small-business websites.",
      kicker: "Maintenance",
      summary: "A monitored, backed-up and maintained environment so a website is not left on its own.",
      result: "The website has visible checkpoints: health, backup, update and recovery.",
      bullets: [
        "Managed hosting based on project needs",
        "SSL certificate, backups and restoration",
        "Updates, monitoring and health reports",
        "Small changes and recurring support",
        "Migration and recovery of an existing website"
      ],
      alt: "/fr/services/hebergement-maintenance/"
    }
  },
  infrastructure: {
    id: "infrastructure",
    visual: "topology",
    fr: {
      path: "/fr/services/infrastructure-securite/",
      title: "Infrastructure et sécurité de base",
      seo: "DNS, Cloudflare et VPS au Québec | SuiviCloud",
      description: "Configuration de domaines, DNS, Cloudflare, VPS, accès et mesures de sécurité de base après évaluation.",
      kicker: "Infrastructure",
      summary: "Des domaines, DNS, serveurs, protections et accès organisés dans une structure lisible.",
      result: "Les fondations techniques sont séparées, documentées et plus simples à reprendre.",
      bullets: [
        "Domaines, DNS et configuration Cloudflare",
        "Déploiement VPS et serveur web",
        "Protection de base et authentification multifacteur",
        "Documentation des accès et responsabilités",
        "Nettoyage ou reprise d’un environnement existant"
      ],
      alt: "/en/services/infrastructure-security/"
    },
    en: {
      path: "/en/services/infrastructure-security/",
      title: "Infrastructure and Basic Security",
      seo: "DNS, Cloudflare and VPS setup in Quebec | SuiviCloud",
      description: "Domain, DNS, Cloudflare, VPS, access and basic security setup after evaluation.",
      kicker: "Infrastructure",
      summary: "Domains, DNS, servers, protections and access organized into a readable structure.",
      result: "Technical foundations are separated, documented and easier to recover.",
      bullets: [
        "Domains, DNS and Cloudflare configuration",
        "VPS deployment and web server setup",
        "Basic protection and multi-factor authentication",
        "Access and responsibility documentation",
        "Cleanup or recovery of an existing environment"
      ],
      alt: "/fr/services/infrastructure-securite/"
    }
  },
  support: {
    id: "support",
    visual: "diagnostic",
    fr: {
      path: "/fr/services/depannage-accompagnement/",
      title: "Dépannage et accompagnement",
      seo: "Dépannage et maintenance de site web à Rimouski | SuiviCloud",
      description: "Petits mandats techniques: formulaires, domaines, DNS, migrations, courriels, erreurs de certificat et conseils.",
      kicker: "Dépannage",
      summary: "Une aide ciblée pour diagnostiquer, corriger et expliquer un problème sans dramatiser.",
      result: "Le problème devient une intervention claire, puis une suite d’actions compréhensible.",
      bullets: [
        "Réparation d’un formulaire ou d’un problème d’affichage",
        "Domaine, DNS, certificat SSL ou courriel professionnel",
        "Migration ou reprise après un ancien fournisseur",
        "Audit technique léger et recommandations",
        "Accompagnement pour choisir les bons outils"
      ],
      alt: "/en/services/technical-support/"
    },
    en: {
      path: "/en/services/technical-support/",
      title: "Troubleshooting and Guidance",
      seo: "Website troubleshooting in Rimouski | SuiviCloud",
      description: "Small technical requests: forms, domains, DNS, migrations, email, certificate errors and guidance.",
      kicker: "Support",
      summary: "Targeted help to diagnose, fix and explain an issue without making it feel alarming.",
      result: "The problem becomes a clear intervention, then an understandable next step.",
      bullets: [
        "Fixing a form or display issue",
        "Domain, DNS, SSL certificate or professional email",
        "Migration or recovery after a previous provider",
        "Light technical audit and recommendations",
        "Guidance to choose the right tools"
      ],
      alt: "/fr/services/depannage-accompagnement/"
    }
  }
};

const serviceFlowData = {
  websites: {
    fr: {
      lens: "Vitrine claire",
      stages: [["Trier", "Offre, pages utiles, informations de contact."], ["Composer", "Hiérarchie mobile, appels à l’action, bilinguisme."], ["Publier", "Performance, SEO de base, formulaire vérifié."]],
      proof: ["Message compris en moins d’une minute", "Contact visible sans chercher", "Pages faciles à reprendre"]
    },
    en: {
      lens: "Clear storefront",
      stages: [["Sort", "Offer, useful pages, contact information."], ["Compose", "Mobile hierarchy, calls to action, bilingual structure."], ["Publish", "Performance, basic SEO, verified form."]],
      proof: ["Message understood in under a minute", "Contact visible without searching", "Pages easy to maintain"]
    }
  },
  automation: {
    fr: {
      lens: "Flux sans copier-coller",
      stages: [["Déclencheur", "Formulaire, demande, rendez-vous ou paiement."], ["Règles", "Qui reçoit quoi, quand, et avec quelle trace."], ["Suivi", "Confirmation, rappel, tâche interne ou tableau."]],
      proof: ["Moins d’oublis", "Réponses plus constantes", "Actions visibles au bon endroit"]
    },
    en: {
      lens: "Flow without copy-paste",
      stages: [["Trigger", "Form, request, booking or payment."], ["Rules", "Who receives what, when, and with which trace."], ["Follow-up", "Confirmation, reminder, internal task or board."]],
      proof: ["Fewer missed items", "More consistent replies", "Actions visible in the right place"]
    }
  },
  hosting: {
    fr: {
      lens: "Site entretenu",
      stages: [["Surveiller", "Certificat, disponibilité, erreurs et mises à jour."], ["Sauvegarder", "Copies datées, restauration possible, accès documentés."], ["Intervenir", "Corrections mineures et suivi régulier."]],
      proof: ["Santé visible", "Sauvegarde vérifiable", "Moins de surprises au lancement"]
    },
    en: {
      lens: "Maintained site",
      stages: [["Watch", "Certificate, availability, errors and updates."], ["Back up", "Dated copies, recovery path, documented access."], ["Act", "Small fixes and regular follow-up."]],
      proof: ["Visible health", "Verifiable backup", "Fewer launch surprises"]
    }
  },
  infrastructure: {
    fr: {
      lens: "Fondations lisibles",
      stages: [["Nommer", "Domaine, DNS, hébergement, courriel et propriétaires."], ["Séparer", "Accès, rôles, clés, tunnel ou serveur."], ["Documenter", "Ce qui pointe où, qui peut agir, quoi restaurer."]],
      proof: ["Accès retrouvables", "DNS compréhensible", "Reprise plus simple"]
    },
    en: {
      lens: "Readable foundations",
      stages: [["Name", "Domain, DNS, hosting, email and owners."], ["Separate", "Access, roles, keys, tunnel or server."], ["Document", "What points where, who can act, what to restore."]],
      proof: ["Findable access", "Understandable DNS", "Simpler recovery"]
    }
  },
  support: {
    fr: {
      lens: "Diagnostic calme",
      stages: [["Constater", "Symptôme, contexte, capture et moment du problème."], ["Isoler", "Domaine, serveur, formulaire, navigateur ou fournisseur."], ["Corriger", "Action courte, explication, prochaine prévention."]],
      proof: ["Problème nommé", "Cause probable isolée", "Suite claire"]
    },
    en: {
      lens: "Calm diagnosis",
      stages: [["Observe", "Symptom, context, screenshot and timing."], ["Isolate", "Domain, server, form, browser or provider."], ["Fix", "Short action, explanation, next prevention step."]],
      proof: ["Problem named", "Likely cause isolated", "Clear next step"]
    }
  }
};

const langData = {
  fr: {
    home: "/fr/",
    switchLabel: "EN",
    skip: "Aller au contenu",
    locale: "fr_CA",
    serviceIntro: "Sites web, automatisations, hébergement, maintenance et accompagnement technique pour petites entreprises.",
    nav: { services: "Services", pricing: "Forfaits", process: "Méthode", about: "À propos", resources: "Ressources", contact: "Contact" },
    servicesPath: "/fr/services/",
    pricingPath: "/fr/forfaits/",
    processPath: "/fr/methode/",
    aboutPath: "/fr/a-propos/",
    resourcesPath: "/fr/ressources/",
    contactPath: "/fr/contact/",
    privacyPath: "/fr/confidentialite/",
    termsPath: "/fr/conditions-de-service/",
    dataPath: "/fr/technologies-et-donnees/",
    accessibilityPath: "/fr/accessibilite/",
    footerTagline: "Des outils fiables. Un suivi humain.",
    based: "Basé à Rimouski. Services offerts partout au Québec.",
    ctaTitle: "Vous n’avez pas besoin de connaître la solution technique.",
    ctaText: "Décrivez simplement ce que vous voulez améliorer. SuiviCloud vous aidera à déterminer la prochaine étape logique.",
    ctaButton: "Décrire mon besoin",
    copyright: "Tous droits réservés."
  },
  en: {
    home: "/en/",
    switchLabel: "FR",
    skip: "Skip to content",
    locale: "en_CA",
    serviceIntro: "Websites, automations, hosting, maintenance and technical guidance for small businesses.",
    nav: { services: "Services", pricing: "Pricing", process: "Process", about: "About", resources: "Resources", contact: "Contact" },
    servicesPath: "/en/services/",
    pricingPath: "/en/pricing/",
    processPath: "/en/process/",
    aboutPath: "/en/about/",
    resourcesPath: "/en/resources/",
    contactPath: "/en/contact/",
    privacyPath: "/en/privacy/",
    termsPath: "/en/terms/",
    dataPath: "/en/technology-and-data/",
    accessibilityPath: "/en/accessibility/",
    footerTagline: "Reliable tools. Personal support.",
    based: "Based in Rimouski. Serving businesses across Quebec.",
    ctaTitle: "You do not need to know the technical solution.",
    ctaText: "Describe what you want to improve. SuiviCloud will help you determine the next logical step.",
    ctaButton: "Describe my need",
    copyright: "All rights reserved."
  }
};

const pathPairs = [
  ["/fr/", "/en/"],
  ["/fr/services/", "/en/services/"],
  ["/fr/services/creation-sites-web/", "/en/services/website-development/"],
  ["/fr/services/automatisation-integrations/", "/en/services/automation-integrations/"],
  ["/fr/services/hebergement-maintenance/", "/en/services/hosting-maintenance/"],
  ["/fr/services/infrastructure-securite/", "/en/services/infrastructure-security/"],
  ["/fr/services/depannage-accompagnement/", "/en/services/technical-support/"],
  ["/fr/forfaits/", "/en/pricing/"],
  ["/fr/methode/", "/en/process/"],
  ["/fr/a-propos/", "/en/about/"],
  ["/fr/ressources/", "/en/resources/"],
  ["/fr/ressources/guides/", "/en/resources/guides/"],
  ["/fr/ressources/guides/relier-outils-avant-ajouter/", "/en/resources/guides/connect-existing-tools-before-adding-more/"],
  ["/fr/ressources/articles/", "/en/resources/articles/"],
  ["/fr/contact/", "/en/contact/"],
  ["/fr/confidentialite/", "/en/privacy/"],
  ["/fr/conditions-de-service/", "/en/terms/"],
  ["/fr/technologies-et-donnees/", "/en/technology-and-data/"],
  ["/fr/accessibilite/", "/en/accessibility/"]
];

const alternatePath = new Map(pathPairs.flatMap(([fr, en]) => [[fr, en], [en, fr]]));
const pages = [];
let heroNetworkCounter = 0;

function esc(value = "") {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function attrs(value = "") {
  return esc(value).replaceAll("\n", " ");
}

function url(route) {
  return `${origin}${route}`;
}

function addPage(page) {
  pages.push({ ...page, alternate: page.alternate || alternatePath.get(page.path) });
}

function brandLogo(mode = "dark") {
  const file = mode === "light" ? "logo-horizontal-light.svg" : "logo-horizontal.svg";
  return `<img src="/assets/brand/${file}" alt="SuiviCloud" width="320" height="80">`;
}

function ShellServiceIcon(id) {
  const icons = {
    websites: `<rect x="8" y="11" width="32" height="24" rx="4"></rect><path d="M8 18h32M17 42h14M24 35v7"></path>`,
    automation: `<path d="M10 16h9c5 0 7 4 10 8s5 8 11 8h8"></path><circle cx="10" cy="16" r="3.5"></circle><circle cx="48" cy="32" r="3.5"></circle><path d="M10 40h8c4 0 7-3 10-8"></path>`,
    hosting: `<path d="M12 32c0-9 7-16 16-16s16 7 16 16"></path><path d="M16 34h24M18 42h20"></path><circle cx="28" cy="16" r="3.5"></circle>`,
    infrastructure: `<path d="M12 14h12v12H12zM36 14h12v12H36zM24 38h12v12H24zM24 20h12M30 26v12"></path>`,
    support: `<path d="M16 20c3-5 8-8 14-8 8 0 14 6 14 14 0 9-7 16-16 16H14"></path><circle cx="14" cy="42" r="3.5"></circle><circle cx="44" cy="26" r="3.5"></circle>`
  };
  return `<svg class="service-menu-symbol" viewBox="0 0 56 56" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${icons[id] || icons.infrastructure}</svg>`;
}

function shellNavLink(currentPath, href, label, className = "") {
  const active = currentPath === href;
  const classes = [className, active ? "is-active" : ""].filter(Boolean).join(" ");
  return `<a${classes ? ` class="${classes}"` : ""} href="${href}"${active ? ` aria-current="page"` : ""}>${esc(label)}</a>`;
}

function LanguageSwitch(lang, currentPath, alternate) {
  const frPath = lang === "fr" ? currentPath : alternate || "/fr/";
  const enPath = lang === "en" ? currentPath : alternate || "/en/";
  const label = lang === "fr" ? "Choix de langue" : "Language selector";
  return `<div class="language-switch" aria-label="${label}">
    <a href="${frPath}" hreflang="fr-CA"${lang === "fr" ? ` class="is-active" aria-current="true"` : ""}>FR</a>
    <a href="${enPath}" hreflang="en-CA"${lang === "en" ? ` class="is-active" aria-current="true"` : ""}>EN</a>
  </div>`;
}

function Header(lang, currentPath, alternate) {
  const t = langData[lang];
  const fr = lang === "fr";
  const serviceActive = currentPath === t.servicesPath || currentPath.includes("/services/");
  const serviceLinks = Object.values(serviceData).map((item, index) => {
    const service = item[lang];
    return `<a class="service-menu-item service-menu-${item.id}" href="${service.path}">
      <span class="service-menu-index">0${index + 1}</span>
      ${ShellServiceIcon(item.id)}
      <span class="service-menu-copy"><strong>${esc(service.title)}</strong><span>${esc(service.result)}</span></span>
    </a>`;
  }).join("");
  const navItems = [
    [t.pricingPath, t.nav.pricing],
    [t.processPath, t.nav.process],
    [t.aboutPath, t.nav.about],
    [t.resourcesPath, t.nav.resources]
  ];
  return `<header class="site-header" data-header>
    <div class="nav-shell">
      <a class="brand" href="${t.home}" aria-label="SuiviCloud">
        ${brandLogo("dark")}
      </a>
      <button class="nav-toggle" type="button" aria-label="${esc(fr ? "Ouvrir le menu" : "Open menu")}" aria-expanded="false" aria-controls="primary-navigation" data-menu-button><span></span></button>
      <nav id="primary-navigation" class="site-nav" aria-label="${fr ? "Navigation principale" : "Main navigation"}" data-site-nav>
        <div class="mobile-menu-head">
          <span>${esc(fr ? "Navigation" : "Navigation")}</span>
          <button class="nav-close" type="button" aria-label="${esc(fr ? "Fermer le menu" : "Close menu")}" data-menu-close><span></span></button>
        </div>
        <details class="mega services-menu">
          <summary class="${serviceActive ? "is-active" : ""}"${serviceActive ? ` aria-current="page"` : ""}>
            <span>${esc(t.nav.services)}</span>
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </summary>
          <div class="mega-menu services-panel">
            <div class="services-panel-head">
              <p class="micro-label">${esc(fr ? "Dispersion vers continuité" : "Dispersion to continuity")}</p>
              <h2>${esc(fr ? "Cinq points d’entrée, un suivi commun." : "Five entry points, one shared follow-up.")}</h2>
              <a class="services-overview-link" href="${t.servicesPath}">${esc(fr ? "Voir la vue d’ensemble" : "View overview")}</a>
            </div>
            <div class="services-panel-grid">
              ${serviceLinks}
            </div>
          </div>
        </details>
        ${navItems.map(([href, label]) => shellNavLink(currentPath, href, label)).join("")}
        ${shellNavLink(currentPath, t.contactPath, t.nav.contact, "nav-cta")}
        ${LanguageSwitch(lang, currentPath, alternate)}
      </nav>
    </div>
  </header>`;
}

function Footer(lang) {
  const t = langData[lang];
  const fr = lang === "fr";
  const statusItems = fr
    ? ["Entrée clarifiée", "Connexion visible", "Suivi lisible"]
    : ["Entry clarified", "Visible connection", "Readable follow-up"];
  return `<footer class="site-footer">
    <div class="footer-network-line" aria-hidden="true"><span></span></div>
    <div class="wrap footer-shell">
      <section class="footer-brand-panel" aria-label="SuiviCloud">
        <a class="footer-logo" href="${t.home}" aria-label="SuiviCloud">${brandLogo("light")}</a>
        <p class="footer-promise">${esc(t.footerTagline)}</p>
        <address>
          <span>${esc(fr ? "Rimouski, Québec" : "Rimouski, Quebec")}</span>
          <a href="mailto:${email}">${email}</a>
        </address>
      </section>
      <nav class="footer-nav" aria-label="${fr ? "Navigation en pied de page" : "Footer navigation"}">
        <h2>${esc(fr ? "Navigation" : "Navigation")}</h2>
        <a href="${t.servicesPath}">${esc(t.nav.services)}</a>
        <a href="${t.pricingPath}">${esc(t.nav.pricing)}</a>
        <a href="${t.processPath}">${esc(t.nav.process)}</a>
        <a href="${t.aboutPath}">${esc(t.nav.about)}</a>
        <a href="${t.resourcesPath}">${esc(t.nav.resources)}</a>
        <a href="${t.contactPath}">${esc(t.nav.contact)}</a>
      </nav>
      <nav class="footer-nav footer-services" aria-label="${fr ? "Services en pied de page" : "Footer services"}">
        <h2>${esc(t.nav.services)}</h2>
        ${Object.values(serviceData).map((item) => `<a href="${item[lang].path}">${esc(item[lang].title)}</a>`).join("")}
      </nav>
      <div class="footer-system">
        <div>
          <h2>${esc(fr ? "Cadre" : "Framework")}</h2>
          <a href="${t.privacyPath}">${esc(fr ? "Confidentialité" : "Privacy")}</a>
          <a href="${t.termsPath}">${esc(fr ? "Conditions" : "Terms")}</a>
          <a href="${t.dataPath}">${esc(fr ? "Technologies et données" : "Technology and data")}</a>
          <a href="${t.accessibilityPath}">${esc(fr ? "Accessibilité" : "Accessibility")}</a>
        </div>
        <div class="footer-languages" aria-label="${fr ? "Langues" : "Languages"}">
          <a class="${lang === "fr" ? "is-active" : ""}" href="/fr/" hreflang="fr-CA">FR</a>
          <a class="${lang === "en" ? "is-active" : ""}" href="/en/" hreflang="en-CA">EN</a>
        </div>
        <div class="footer-status" aria-label="${fr ? "État visuel du système" : "Visual system state"}">
          ${statusItems.map((item) => `<span><i></i>${esc(item)}</span>`).join("")}
        </div>
      </div>
    </div>
    <p class="footer-note wrap">© ${new Date().getFullYear()} SuiviCloud. ${esc(t.copyright)}</p>
  </footer>`;
}

function pageShell(page) {
  const lang = page.lang;
  const t = langData[lang];
  const title = page.title.includes("SuiviCloud") ? page.title : `${page.title} | SuiviCloud`;
  const alternate = page.alternate;
  const robots = page.noindex ? `<meta name="robots" content="noindex, nofollow">` : "";
  const canonical = page.noindex ? "" : `<link rel="canonical" href="${url(page.path)}">`;
  const selfHreflang = page.noindex ? "" : `<link rel="alternate" hreflang="${lang === "fr" ? "fr-CA" : "en-CA"}" href="${url(page.path)}">`;
  const hreflang = page.noindex ? "" : alternate?.startsWith("/en/")
    ? `<link rel="alternate" hreflang="en-CA" href="${url(alternate)}">`
    : alternate?.startsWith("/fr/")
      ? `<link rel="alternate" hreflang="fr-CA" href="${url(alternate)}">`
      : "";
  const xDefault = page.noindex ? "" : `<link rel="alternate" hreflang="x-default" href="${origin}/fr/">`;

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${attrs(page.description || t.serviceIntro)}">
  ${robots}
  ${canonical}
  ${selfHreflang}
  ${hreflang}
  ${xDefault}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="SuiviCloud">
  <meta property="og:locale" content="${t.locale}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${attrs(page.description || t.serviceIntro)}">
  <meta property="og:url" content="${url(page.path)}">
  <meta property="og:image" content="${origin}/assets/images/suivicloud-hero-1200.webp">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="stylesheet" href="/assets/styles.css?v=${assetVersion}">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <script type="application/ld+json">${JSON.stringify(structuredData(lang))}</script>
</head>
<body class="${page.bodyClass || ""}">
  <a class="skip-link" href="#main">${esc(t.skip)}</a>
  ${Header(lang, page.path, alternate)}
  <main id="main">${page.body}</main>
  ${Footer(lang)}
  <script src="/assets/app.js?v=${assetVersion}" defer></script>
</body>
</html>`;
}

function structuredData(lang) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SuiviCloud",
    url: origin,
    email,
    areaServed: ["Rimouski", "Bas-Saint-Laurent", "Québec"],
    address: { "@type": "PostalAddress", addressLocality: "Rimouski", addressRegion: "QC", addressCountry: "CA" },
    description: lang === "fr" ? "Services web, automatisation et accompagnement technique pour petites entreprises." : "Web services, automation and technical guidance for small businesses."
  };
}

function SectionIntro(eyebrow, title, copy, extra = "") {
  return `<div class="section-intro reveal">
    ${eyebrow ? `<p class="micro-label">${esc(eyebrow)}</p>` : ""}
    <h2>${esc(title)}</h2>
    ${copy ? `<p>${esc(copy)}</p>` : ""}
    ${extra}
  </div>`;
}

function SignalNetworkHero(lang) {
  const gridId = `grid-${++heroNetworkCounter}`;
  const modules = [
    { id: "site", fr: "Site web", en: "Website", x: 104, y: 110, dx: -11, dy: -8, status: "stable", path: "M300 250 C236 214 180 152 104 110" },
    { id: "automation", fr: "Automatisation", en: "Automation", x: 300, y: 82, dx: 0, dy: -14, status: "flow", path: "M300 250 C292 196 300 140 300 82" },
    { id: "support", fr: "Support", en: "Support", x: 496, y: 122, dx: 12, dy: -8, status: "ready", path: "M300 250 C366 202 432 154 496 122" },
    { id: "cloud", fr: "Cloud", en: "Cloud", x: 512, y: 282, dx: 16, dy: 2, status: "synced", path: "M300 250 C372 244 448 248 512 282" },
    { id: "dns", fr: "DNS", en: "DNS", x: 430, y: 414, dx: 9, dy: 13, status: "routed", path: "M300 250 C350 298 392 358 430 414" },
    { id: "data", fr: "Données", en: "Data", x: 300, y: 438, dx: 0, dy: 15, status: "stored", path: "M300 250 C308 312 304 376 300 438" },
    { id: "security", fr: "Sécurité", en: "Security", x: 178, y: 178, dx: -10, dy: -4, status: "guarded", path: "M300 250 C258 224 218 200 178 178" }
  ];
  const sequence = lang === "fr"
    ? ["Signal détecté", "Connexion", "Synchronisation", "Système stable"]
    : ["Signal detected", "Connection", "Synchronization", "System stable"];
  const sequenceClasses = ["step-detect", "step-connect", "step-sync", "step-stable"];
  const moduleMarkup = modules.map((module, index) => {
    const label = module[lang];
    return `<g class="network-module module-${module.id}" tabindex="0" role="listitem" aria-label="${esc(label)}" style="--dx:${module.dx}px;--dy:${module.dy}px;--i:${index};">
      <path class="module-connection" pathLength="1" d="${module.path}"></path>
      <circle class="module-orbit" cx="${module.x}" cy="${module.y}" r="28"></circle>
      <circle class="module-point" cx="${module.x}" cy="${module.y}" r="6"></circle>
      <text class="module-label" x="${module.x}" y="${module.y + 4}" text-anchor="middle">${esc(label)}</text>
      <text class="module-status" x="${module.x}" y="${module.y + 43}" text-anchor="middle">${module.status}</text>
    </g>`;
  }).join("");
  return `<div class="hero-network signal-network-hero" data-hero-network data-signal-network aria-label="${esc(lang === "fr" ? "Système vivant SuiviCloud reliant les outils numériques" : "SuiviCloud living system connecting digital tools")}">
    <svg viewBox="0 0 600 520" role="img" aria-labelledby="hero-network-title-${gridId} hero-network-desc-${gridId}">
      <defs>
        <pattern id="${gridId}" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0v40" fill="none" stroke="rgba(247,249,252,.075)" stroke-width="1"/>
        </pattern>
      </defs>
      <title id="hero-network-title-${gridId}">${esc(lang === "fr" ? "Système vivant SuiviCloud" : "SuiviCloud living system")}</title>
      <desc id="hero-network-desc-${gridId}">${esc(lang === "fr" ? "Des modules dispersés se connectent progressivement à un noyau SuiviCloud stable." : "Dispersed modules progressively connect to a stable SuiviCloud core.")}</desc>
      <rect class="network-field" width="600" height="520" rx="24" fill="url(#${gridId})"></rect>
      <path class="topo" d="M54 394 C126 326 196 350 256 396 S396 456 506 354"></path>
      <g class="activation-signal" aria-hidden="true">
        <path class="activation-beam" pathLength="1" d="M510 112 C454 120 412 154 378 190 S332 234 300 250"></path>
        <circle class="activation-spark" r="4"></circle>
      </g>
      <g class="network-modules" role="list">
        ${moduleMarkup}
      </g>
      <g class="network-particles" aria-hidden="true">
        <circle class="network-particle particle-site" r="3">
          <animateMotion dur="5.8s" begin="1.72s" repeatCount="indefinite" path="M300 250 C236 214 180 152 104 110"></animateMotion>
        </circle>
        <circle class="network-particle particle-security" r="3">
          <animateMotion dur="6.2s" begin="2s" repeatCount="indefinite" path="M300 250 C258 224 218 200 178 178"></animateMotion>
        </circle>
        <circle class="network-particle particle-cloud" r="3.4">
          <animateMotion dur="6.6s" begin="2.24s" repeatCount="indefinite" path="M300 250 C372 244 448 248 512 282"></animateMotion>
        </circle>
      </g>
      <g class="network-arrival" aria-hidden="true">
        <path pathLength="1" d="M300 250 C374 278 468 332 536 418"></path>
        <circle cx="536" cy="418" r="8"></circle>
        <text x="536" y="448" text-anchor="middle">${esc(lang === "fr" ? "visible" : "visible")}</text>
      </g>
      <g class="core-node" tabindex="0" aria-label="SuiviCloud">
        <circle class="core-glow" cx="300" cy="250" r="72"></circle>
        <circle class="core-ring" cx="300" cy="250" r="52"></circle>
        <circle class="core-signal" cx="300" cy="250" r="38"></circle>
        <text x="300" y="244" text-anchor="middle">Suivi</text>
        <text x="300" y="268" text-anchor="middle">Cloud</text>
      </g>
    </svg>
    <div class="signal-status-panel" aria-hidden="true">
      <div class="signal-status-head">
        <span class="status-led"></span>
        <strong>${esc(lang === "fr" ? "Flux synchronisé" : "System Online")}</strong>
      </div>
      <ol>
        ${sequence.map((item, index) => `<li class="signal-step ${sequenceClasses[index]}" style="--i:${index}"><span>0${index + 1}</span>${esc(item)}</li>`).join("")}
      </ol>
      <div class="signal-stable-badge">
        <i></i>${esc(lang === "fr" ? "Online / Stable / Synced" : "Online / Stable / Synced")}
      </div>
    </div>
    <div class="network-readout">
      <span><i></i>${lang === "fr" ? "état stable" : "stable state"}</span>
      <span><i></i>${lang === "fr" ? "flux lisible" : "readable flow"}</span>
      <span><i></i>${lang === "fr" ? "arrivée visible" : "visible arrival"}</span>
    </div>
  </div>`;
}

function FlowConnector() {
  return `<svg class="flow-connector" viewBox="0 0 1200 160" aria-hidden="true">
    <path d="M20 80 C230 18 356 142 560 78 S900 50 1180 92"></path>
  </svg>`;
}

function homePage(lang) {
  const fr = lang === "fr";
  const t = langData[lang];
  return `<section class="hero">
    <div class="hero-bg" aria-hidden="true"></div>
    <div class="hero-inner wrap">
      <div class="hero-copy reveal">
        <p class="micro-label">${esc(fr ? "Services web et automatisation pour petites entreprises" : "Web services and automation for small businesses")}</p>
        <h1>${esc(fr ? "Des outils numériques fiables, sans complications inutiles." : "Reliable digital tools, without unnecessary complexity.")}</h1>
        <p class="lead">${esc(fr ? "SuiviCloud crée, connecte et entretient les sites web, automatisations et outils techniques dont votre entreprise a réellement besoin." : "SuiviCloud builds, connects and maintains the websites, automations and technical systems your business actually needs.")}</p>
        <div class="actions">
          <a class="button primary" href="${t.contactPath}">${esc(fr ? "Parler de mon projet" : "Tell us about your project")}</a>
          <a class="button secondary" href="${t.servicesPath}">${esc(fr ? "Explorer les services" : "Explore services")}</a>
        </div>
        <div class="hero-meta">
          <span>Rimouski</span><span>Québec</span><span>Français / English</span>
        </div>
      </div>
      ${SignalNetworkHero(lang)}
    </div>
    <svg class="hero-continuation" viewBox="0 0 1200 150" aria-hidden="true">
      <path d="M742 0 C748 44 704 76 628 94 C534 116 430 102 344 136"></path>
    </svg>
  </section>
  ${BeforeAfterSystem(lang)}
  ${ServiceConstellation(lang)}
  ${AutomationScrollytelling(lang)}
  ${TrustVisibleWork(lang)}
  ${CollaborationTrajectories(lang)}
  ${DeliveryLine(lang)}
  ${GaryEditorial(lang)}
  ${HomeFAQ(lang)}
  ${ResolvedFinalCTA(lang)}`;
}

function BeforeAfterSystem(lang) {
  const fr = lang === "fr";
  const before = fr
    ? [
      ["Boîte A", "Demande client"],
      ["Calendrier", "Suivi manuel"],
      ["Accès", "À retrouver"],
      ["Site", "Sans suivi"],
      ["Copier", "Même info"]
    ]
    : [
      ["Inbox A", "Client request"],
      ["Calendar", "Manual follow-up"],
      ["Access", "Hard to find"],
      ["Website", "No tracking"],
      ["Copy", "Same info"]
    ];
  const after = fr
    ? [
      ["Demandes", "Centralisées"],
      ["Confirmations", "Automatiques"],
      ["Accès", "Documentés"],
      ["Sauvegardes", "Suivies"],
      ["Actions", "Visibles"]
    ]
    : [
      ["Requests", "Centralized"],
      ["Confirmations", "Automatic"],
      ["Access", "Documented"],
      ["Backups", "Tracked"],
      ["Actions", "Visible"]
    ];
  const steps = fr
    ? ["Éléments dispersés", "Points de friction", "Lignes réorganisées", "Flux lisible", "État stabilisé"]
    : ["Scattered pieces", "Friction points", "Lines reorganized", "Readable flow", "Stable state"];
  const editorial = fr
    ? "La clarté n’arrive pas en ajoutant un autre outil partout. Elle apparaît quand les demandes, les accès et les suivis ont enfin un trajet lisible."
    : "Clarity does not come from adding another tool everywhere. It appears when requests, access and follow-up finally have a readable path.";
  return `<section class="section clarity-section">
    <div class="clarity-shell wrap">
      <div class="clarity-copy reveal">
        <p class="micro-label">${esc(fr ? "De la dispersion à la clarté" : "From scattered to clear")}</p>
        <h2>${esc(fr ? "Une transformation visible, pas deux listes." : "A visible transformation, not two lists.")}</h2>
        <p>${esc(editorial)}</p>
        <div class="clarity-progress" aria-label="${esc(fr ? "Progression de la transformation" : "Transformation progress")}">
          ${steps.map((step, index) => `<span style="--i:${index}"><i>0${index + 1}</i>${esc(step)}</span>`).join("")}
        </div>
      </div>
      <div class="clarity-scene reveal" aria-label="${esc(fr ? "Transformation de la dispersion vers un flux suivi" : "Transformation from scattered pieces to tracked flow")}">
        <div class="clarity-stage clarity-stage-before" aria-hidden="true">
          ${before.map(([label, detail], index) => `<article class="clarity-node before-node node-${index + 1}" style="--i:${index}">
            <span>${esc(label)}</span>
            <strong>${esc(detail)}</strong>
            <small>${esc(fr ? "non relié" : "unlinked")}</small>
          </article>`).join("")}
        </div>
        <svg class="clarity-flow" viewBox="0 0 760 460" aria-hidden="true">
          <path class="problem-link link-1" pathLength="1" d="M132 100 C230 54 318 156 402 118"></path>
          <path class="problem-link link-2" pathLength="1" d="M516 78 C438 170 598 224 480 280"></path>
          <path class="problem-link link-3" pathLength="1" d="M126 340 C250 274 330 390 458 352"></path>
          <path class="resolved-flow" pathLength="1" d="M112 232 C230 190 314 210 382 232 S540 274 648 214"></path>
          <circle class="flow-dot dot-1" cx="112" cy="232" r="5"></circle>
          <circle class="flow-dot dot-2" cx="382" cy="232" r="5"></circle>
          <circle class="flow-dot dot-3" cx="648" cy="214" r="7"></circle>
        </svg>
        <div class="clarity-hub">
          <span>${esc(fr ? "Suivi" : "Track")}</span>
          <strong>${esc(fr ? "visible" : "visible")}</strong>
        </div>
        <div class="clarity-stage clarity-stage-after">
          ${after.map(([label, detail], index) => `<article class="clarity-node after-node node-${index + 1}" style="--i:${index}">
            <span>${esc(label)}</span>
            <strong>${esc(detail)}</strong>
            <small>${esc(fr ? "stable" : "stable")}</small>
          </article>`).join("")}
        </div>
        <div class="clarity-microdata" aria-hidden="true">
          <span>${esc(fr ? "trace: complète" : "trace: complete")}</span>
          <span>${esc(fr ? "flux: lisible" : "flow: readable")}</span>
          <span>${esc(fr ? "suite: nommée" : "next: named")}</span>
        </div>
      </div>
    </div>
  </section>`;
}

function ServiceConstellation(lang) {
  const fr = lang === "fr";
  const roles = {
    websites: {
      number: "01",
      role: fr ? "Présence" : "Presence",
      cta: fr ? "Structurer mon site" : "Structure my website",
      signal: fr ? "Entrée lisible" : "Readable entry"
    },
    automation: {
      number: "02",
      role: fr ? "Flux" : "Flow",
      cta: fr ? "Cartographier une tâche" : "Map a task",
      signal: fr ? "Étapes reliées" : "Connected steps"
    },
    hosting: {
      number: "03",
      role: fr ? "Continuité" : "Continuity",
      cta: fr ? "Faire évaluer mon site" : "Have my site reviewed",
      signal: fr ? "Santé suivie" : "Tracked health"
    },
    infrastructure: {
      number: "04",
      role: fr ? "Fondations" : "Foundations",
      cta: fr ? "Clarifier mes accès" : "Clarify my access",
      signal: fr ? "Base documentée" : "Documented base"
    },
    support: {
      number: "05",
      role: fr ? "Intervention" : "Intervention",
      cta: fr ? "Décrire le problème" : "Describe the problem",
      signal: fr ? "Diagnostic nommé" : "Named diagnostic"
    }
  };
  const services = Object.values(serviceData).map((item) => ({ item, service: item[lang], meta: roles[item.id] }));
  const nodeMarkup = services.map(({ item, service, meta }) => `<a class="service-zone service-zone-${item.id}" href="${service.path}">
    <span class="service-zone-number">${meta.number}</span>
    <span class="service-zone-copy">
      <small>${esc(meta.role)}</small>
      <strong>${esc(service.title)}</strong>
      <em>${esc(meta.signal)}</em>
    </span>
  </a>`).join("");
  const previewMarkup = services.map(({ item, service, meta }) => `<article class="service-preview service-preview-${item.id}">
    <div>
      <p class="micro-label">${esc(meta.number)} — ${esc(meta.role)}</p>
      <h3>${esc(service.title)}</h3>
      <p>${esc(service.result)}</p>
      <a class="service-constellation-cta" href="${service.path}">${esc(meta.cta)}</a>
    </div>
    <div class="service-preview-visual" aria-hidden="true">${ServiceVisual(item.visual, lang, "large")}</div>
  </article>`).join("");
  const mobileMarkup = services.map(({ item, service, meta }, index) => `<details class="service-mobile-panel service-mobile-${item.id}"${index === 0 ? " open" : ""}>
    <summary>
      <span>${meta.number}</span>
      <strong>${esc(meta.role)}</strong>
      <small>${esc(service.title)}</small>
    </summary>
    <div class="service-mobile-body">
      <div aria-hidden="true">${ServiceVisual(item.visual, lang, "small")}</div>
      <p>${esc(service.result)}</p>
      <a class="service-constellation-cta" href="${service.path}">${esc(meta.cta)}</a>
    </div>
  </details>`).join("");
  return `<section class="section dark constellation-section" id="services">
    <div class="wrap">
      ${SectionIntro(fr ? "Constellation des services" : "Service constellation", fr ? "Cinq rôles, un même système." : "Five roles, one system.", fr ? "Chaque service occupe une place précise: présence, flux, continuité, fondations et intervention." : "Each service has a precise role: presence, flow, continuity, foundations and intervention.")}
      <div class="service-system reveal" data-service-system data-active-service="websites">
        <div class="service-system-map" aria-label="${esc(fr ? "Carte des services SuiviCloud" : "SuiviCloud service map")}">
          <svg class="service-system-lines" viewBox="0 0 720 520" aria-hidden="true">
            <path d="M158 110 C260 104 292 172 360 258"></path>
            <path d="M554 104 C470 130 440 192 360 258"></path>
            <path d="M140 408 C232 352 282 314 360 258"></path>
            <path d="M570 414 C494 360 438 318 360 258"></path>
            <path d="M360 74 C360 142 360 198 360 258"></path>
          </svg>
          <div class="service-system-hub" aria-hidden="true">
            <span>SC</span>
            <small>${esc(fr ? "système" : "system")}</small>
          </div>
          <div class="service-zones">
            ${nodeMarkup}
          </div>
        </div>
        <div class="service-preview-stack" aria-live="polite">
          ${previewMarkup}
        </div>
      </div>
      <div class="service-mobile-list reveal">
        ${mobileMarkup}
      </div>
    </div>
  </section>`;
}

function ServiceVisual(type, lang, size = "large") {
  const fr = lang === "fr";
  const label = (value) => esc(value);
  const browser = `<div class="visual browser-visual ${size}">
    <div class="browser-bar"><span></span><span></span><span></span></div>
    <div class="browser-layout"><i>${label(fr ? "Accueil" : "Home")}</i><i>${label(fr ? "Services" : "Services")}</i><i>${label(fr ? "Contact" : "Contact")}</i><b>${label(fr ? "Message principal" : "Main message")}</b><em>${label(fr ? "Demande claire" : "Clear request")}</em></div>
    <div class="device-row"><span>mobile</span><span>seo</span><span>form</span></div>
  </div>`;
  const workflow = `<div class="visual workflow-visual ${size}">
    ${(fr ? ["Formulaire", "Suivi", "Courriel", "Rappel"] : ["Form", "Tracking", "Email", "Reminder"]).map((item, i) => `<span class="flow-segment" style="--i:${i}">${label(item)}</span>`).join("")}
  </div>`;
  const health = `<div class="visual health-visual ${size}">
    ${(fr ? ["SSL actif", "Sauvegarde datée", "Mises à jour", "Restauration prévue"] : ["SSL active", "Dated backup", "Updates", "Recovery path"]).map((item) => `<span><b></b>${label(item)}</span>`).join("")}
  </div>`;
  const topology = `<div class="visual topology-visual ${size}">
    <span>${label(fr ? "Domaine" : "Domain")}</span><span>DNS</span><span>${label(fr ? "Serveur" : "Server")}</span><span>${label(fr ? "Accès" : "Access")}</span><i></i>
  </div>`;
  const diagnostic = `<div class="visual diagnostic-visual ${size}">
    <span>${label(fr ? "Symptôme" : "Symptom")}</span><span>${label(fr ? "Cause probable" : "Likely cause")}</span><span>${label(fr ? "Correctif" : "Fix")}</span>
  </div>`;
  return { browser, workflow, health, topology, diagnostic }[type] || browser;
}

function AutomationWorkflow(lang) {
  const fr = lang === "fr";
  const steps = fr
    ? ["Formulaire reçu", "Client ajouté au suivi", "Confirmation envoyée", "Rendez-vous proposé", "Rappel automatique"]
    : ["Form received", "Client added to tracking", "Confirmation sent", "Booking proposed", "Automatic reminder"];
  const benefits = fr
    ? ["moins de copier-coller", "moins d’oublis", "réponse plus constante", "information mieux organisée"]
    : ["less copy-paste", "fewer missed follow-ups", "more consistent replies", "better organized information"];
  return `<section class="section automation-section">
    <div class="wrap automation-layout">
      <div class="sticky-copy reveal">
        ${SectionIntro(fr ? "Démonstration" : "Demonstration", fr ? "Automatiser ce qui se répète." : "Automate what repeats.", fr ? "Le flux reste simple: un événement entrant déclenche des actions utiles, visibles et vérifiables." : "The flow stays simple: an incoming event triggers useful, visible and verifiable actions.")}
        <ul class="benefit-list">${benefits.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
      </div>
      <div class="workflow-steps" data-workflow>
        <div class="workflow-thread" aria-hidden="true"></div>
        ${steps.map((step, index) => `<article class="workflow-card reveal" data-step="${index}">
          <span class="step-index">0${index + 1}</span>
          <h3>${esc(step)}</h3>
          <p>${esc(fr ? "Étape reliée au flux de suivi." : "Step connected to the follow-up flow.")}</p>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function TrustManifesto(lang) {
  const fr = lang === "fr";
  const items = fr
    ? [["01", "Explications sans jargon", "Les décisions sont expliquées dans un langage normal."], ["02", "Portée et prix clarifiés", "Le cadre du mandat est défini avant de construire."], ["03", "Propriété et accès documentés", "Le client garde la maîtrise de son domaine, de son contenu et de ses données."], ["04", "Continuité après la mise en ligne", "Le site n’est pas abandonné une fois publié."]]
    : [["01", "Plain-language explanations", "Decisions are explained in normal language."], ["02", "Clear scope and pricing", "The project frame is defined before building."], ["03", "Ownership and access documented", "The client keeps control of domain, content and data."], ["04", "Continuity after launch", "The site is not abandoned once published."]];
  return `<section class="section trust-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Manifeste opérationnel" : "Operational manifesto", fr ? "La confiance vient du travail visible." : "Trust comes from visible work.", fr ? "SuiviCloud ne promet pas tout. Les limites, les accès et la méthode sont explicités." : "SuiviCloud does not promise everything. Limits, access and method are made explicit.")}
      <div class="manifesto-board">
        <p class="manifesto-lede reveal">${esc(fr ? "Le client doit pouvoir comprendre ce qui a été fait, où ça vit, et quoi faire ensuite." : "The client should understand what was done, where it lives, and what to do next.")}</p>
        <div class="manifesto-list">${items.map(([n, title, copy]) => `<article class="manifesto-item reveal"><span>${n}</span><h3>${esc(title)}</h3><p>${esc(copy)}</p></article>`).join("")}</div>
      </div>
    </div>
  </section>`;
}

function AutomationScrollytelling(lang) {
  const fr = lang === "fr";
  const steps = fr
    ? [
        ["Formulaire reçu", "La demande entre dans le flux."],
        ["Dossier créé ou mis à jour", "L’information rejoint le bon endroit."],
        ["Confirmation envoyée", "Le client sait que sa demande a été reçue."],
        ["Rendez-vous ou prochaine action proposée", "Le suivi peut avancer sans copier-coller."],
        ["Rappel envoyé", "La prochaine étape reste visible."]
      ]
    : [
        ["Form received", "The request enters the flow."],
        ["Record created or updated", "The information reaches the right place."],
        ["Confirmation sent", "The client knows the request was received."],
        ["Appointment or next action proposed", "Follow-up can move forward without copy-paste."],
        ["Reminder sent", "The next step stays visible."]
      ];
  const benefits = fr
    ? ["moins de copier-coller", "moins d’oublis", "réponses plus constantes", "information mieux organisée"]
    : ["less copy-paste", "fewer missed follow-ups", "more consistent replies", "better organized information"];
  const automationPath = serviceData.automation[lang].path;
  return `<section class="section automation-section">
    <div class="wrap automation-story" data-automation-scroll>
      <div class="automation-narrative reveal">
        ${SectionIntro(fr ? "Démonstration" : "Demonstration", fr ? "Automatiser ce qui se répète." : "Automate what repeats.", fr ? "Un flux utile ne remplace pas le jugement. Il rend les étapes récurrentes visibles, confirmées et plus faciles à suivre." : "A useful flow does not replace judgment. It makes recurring steps visible, confirmed and easier to track.")}
        <div class="automation-benefits" aria-label="${esc(fr ? "Bénéfices" : "Benefits")}">
          ${benefits.map((item) => `<span>${esc(item)}</span>`).join("")}
        </div>
        <a class="button secondary automation-story-cta" href="${automationPath}">${esc(fr ? "Voir ce qui peut être automatisé" : "See what can be automated")}</a>
      </div>
      <div class="automation-scroll-steps">
        ${steps.map(([title, copy], index) => `<article class="automation-step reveal ${index === 0 ? "is-active" : ""}" data-automation-step="${index}">
          <span>0${index + 1}</span>
          <h3>${esc(title)}</h3>
          <p>${esc(copy)}</p>
        </article>`).join("")}
      </div>
      <aside class="automation-workflow-panel reveal" aria-label="${esc(fr ? "Workflow automatisé" : "Automated workflow")}">
        <div class="automation-workflow" data-premium-workflow>
          <svg class="automation-flow-line" viewBox="0 0 520 360" aria-hidden="true" focusable="false">
            <path class="automation-flow-track" pathLength="1" d="M92 72 C190 78 282 98 388 132 S258 202 132 210 S270 274 380 292 S330 326 250 328"></path>
            <path class="automation-flow-active" pathLength="1" d="M92 72 C190 78 282 98 388 132 S258 202 132 210 S270 274 380 292 S330 326 250 328"></path>
          </svg>
          <div class="automation-data-lines" aria-hidden="true">
            <i></i><i></i><i></i><i></i><i></i>
          </div>
          ${steps.map(([title], index) => `<div class="automation-node node-${index + 1} ${index === 0 ? "is-active" : ""}" data-workflow-node="${index}">
            <span>0${index + 1}</span>
            <strong>${esc(title)}</strong>
          </div>`).join("")}
        </div>
        <div class="automation-final-state">
          <strong>${esc(fr ? "État final complet" : "Complete final state")}</strong>
          <p>${esc(fr ? "La demande, la confirmation, la suite et le rappel restent au même endroit." : "The request, confirmation, next step and reminder stay in one readable place.")}</p>
        </div>
      </aside>
    </div>
  </section>`;
}

function TrustVisibleWork(lang) {
  const fr = lang === "fr";
  const items = fr
    ? [["01", "Expliquer", "Les décisions sont expliquées en langage normal.", "portée confirmée"], ["02", "Délimiter", "La portée, le prix et les exclusions sont clarifiés.", "accès recensés"], ["03", "Documenter", "Les comptes, accès, responsabilités et actifs restent compréhensibles.", "validation effectuée"], ["04", "Continuer", "La livraison se termine avec une prochaine étape claire.", "prochaine action notée"]]
    : [["01", "Explain", "Decisions are explained in plain language.", "scope confirmed"], ["02", "Define", "Scope, price and exclusions are clarified.", "access listed"], ["03", "Document", "Accounts, access, responsibilities and assets stay understandable.", "validation completed"], ["04", "Continue", "Delivery ends with a clear next step.", "next action noted"]];
  return `<section class="section trust-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Manifeste opérationnel" : "Operational manifesto", fr ? "La confiance vient du travail visible." : "Trust comes from visible work.", fr ? "La méthode doit pouvoir être relue: ce qui a été décidé, ce qui est inclus, ce qui reste accessible et ce qui vient ensuite." : "The method should be readable afterward: what was decided, what is included, what remains accessible and what comes next.")}
      <div class="trust-editorial">
        <div class="trust-manifesto reveal">
          <p>${esc(fr ? "Le client doit pouvoir comprendre ce qui a été fait, où ça vit, et quoi faire ensuite." : "The client should understand what was done, where it lives, and what to do next.")}</p>
        </div>
        <div class="trust-commitments">
          ${items.map(([n, title, copy, proof]) => `<article class="trust-commitment reveal">
            <span>${n}</span>
            <div>
              <h3>${esc(title)}</h3>
              <p>${esc(copy)}</p>
            </div>
            <small><span>${esc(fr ? "méthode" : "method")}</span>${esc(proof)}</small>
          </article>`).join("")}
        </div>
      </div>
    </div>
  </section>`;
}

function PricingPath(lang) {
  const fr = lang === "fr";
  const paths = fr
    ? [["Petit mandat", "Réparation, domaine, migration, formulaire ou problème précis.", "À partir de 150 $"], ["Projet complet", "Site web, automatisation ou intégration conçue autour de votre entreprise.", "À partir de 1 500 $"], ["Suivi mensuel", "Hébergement, maintenance, surveillance et améliorations continues.", "Sur estimation"]]
    : [["Focused request", "Repair, domain, migration, form or precise technical issue.", "From $150"], ["Structured project", "Website, automation or integration designed around your business.", "From $1,500"], ["Ongoing support", "Hosting, maintenance, monitoring and ongoing improvements.", "Estimated"]];
  return `<section class="section pricing-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Modes de collaboration" : "Ways to work together", fr ? "Reconnaître le bon point de départ." : "Recognize the right starting point.", fr ? "Le bon mandat dépend du problème, des accès disponibles et de l’urgence réelle." : "The right scope depends on the problem, available access and real urgency.")}
      <div class="pricing-path" data-pricing-path>
        ${paths.map(([title, copy, price], index) => `<button class="path-option ${index === 0 ? "is-selected" : ""}" type="button" data-pricing-option="${index}">
          <span>${esc(price)}</span><strong>${esc(title)}</strong><small>${esc(copy)}</small>
        </button>`).join("")}
      </div>
      <p class="pricing-note reveal">${esc(fr ? "Les frais externes, licences, domaines et outils payants sont confirmés séparément lorsque nécessaires." : "External fees, licences, domains and paid tools are confirmed separately when needed.")}</p>
    </div>
  </section>`;
}

function ProcessTimeline(lang) {
  const fr = lang === "fr";
  const steps = fr
    ? [["Comprendre", "Identifier le problème, les accès et le résultat attendu."], ["Proposer", "Définir la portée, les outils, le prix et les exclusions."], ["Construire et tester", "Configurer, intégrer, vérifier et ajuster dans un environnement contrôlé."], ["Mettre en ligne", "Valider les accès, le fonctionnement, les sauvegardes et les redirections."], ["Assurer le suivi", "Corriger, documenter et améliorer selon l’entente."]]
    : [["Understand", "Identify the problem, access and expected outcome."], ["Propose", "Define scope, tools, price and exclusions."], ["Build and test", "Configure, integrate, verify and adjust in a controlled environment."], ["Launch", "Validate access, function, backups and redirects."], ["Follow up", "Fix, document and improve according to the agreement."]];
  return `<section class="section process-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Méthode" : "Process", fr ? "Une ligne claire du besoin au suivi." : "A clear line from need to follow-up.", fr ? "Chaque étape laisse une trace utile: proposition, validation, test, documentation ou prochaine action." : "Each step leaves a useful trace: proposal, validation, test, documentation or next action.")}
      <div class="timeline">${steps.map(([title, copy], index) => `<article class="timeline-item reveal"><span>0${index + 1}</span><h3>${esc(title)}</h3><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>`;
}

function FounderStory(lang) {
  const fr = lang === "fr";
  const traits = fr ? ["autonomie", "résolution de problèmes", "organisation", "entrepreneuriat", "explication simple"] : ["autonomy", "problem solving", "organization", "entrepreneurial sense", "plain explanation"];
  return `<section class="section founder-section">
    <div class="wrap founder-layout">
      <div class="founder-mark editorial-mark reveal" aria-hidden="true"><span></span><i></i><b></b></div>
      <div class="reveal">
        ${SectionIntro(fr ? "Derrière SuiviCloud" : "Behind SuiviCloud", fr ? "Gary est l’interlocuteur principal." : "Gary is your main point of contact.", fr ? "Une approche directe: comprendre le problème, simplifier la solution et expliquer le travail réalisé." : "A direct approach: understand the issue, simplify the solution and explain the work delivered.")}
        <div class="trait-cloud">${traits.map((trait) => `<span>${esc(trait)}</span>`).join("")}</div>
        <a class="button outline founder-link" href="${langData[lang].aboutPath}">${esc(fr ? "Lire l’approche" : "Read the approach")}</a>
      </div>
    </div>
  </section>`;
}

function FAQAccordion(lang) {
  const fr = lang === "fr";
  const qas = fr
    ? [
        ["Travaillez-vous seulement à Rimouski?", "Non. SuiviCloud est basé à Rimouski, mais les services peuvent être offerts partout au Québec lorsque le mandat s’y prête."],
        ["Puis-je commencer par un petit mandat?", "Oui. Une réparation, un problème de domaine, un formulaire ou une migration peuvent être traités séparément."],
        ["Pouvez-vous reprendre un site existant?", "Oui, après vérification des accès, de l’état du site et des responsabilités liées aux fournisseurs en place."],
        ["Mon entreprise reste-t-elle propriétaire du domaine?", "Oui. La propriété du domaine, du contenu et des données doit rester claire et documentée."],
        ["Offrez-vous l’hébergement?", "Oui, lorsque le mandat le permet. Les niveaux, frais externes et limites sont confirmés avant le début."],
        ["Utilisez-vous toujours l’IA?", "Non. L’IA est facultative et seulement utilisée lorsqu’elle répond à un besoin réel et proportionné."],
        ["Offrez-vous du soutien d’urgence?", "Pas comme service 24/7 au lancement. Les priorités et délais sont confirmés selon le mandat."]
      ]
    : [
        ["Do you only work in Rimouski?", "No. SuiviCloud is based in Rimouski, but services can be offered across Quebec when the project is a good fit."],
        ["Can I start with a focused request?", "Yes. A repair, domain issue, form problem or migration can be handled separately."],
        ["Can you take over an existing website?", "Yes, after checking access, site condition and responsibilities tied to existing providers."],
        ["Does my business keep domain ownership?", "Yes. Domain, content and data ownership should remain clear and documented."],
        ["Do you offer hosting?", "Yes, when the project is a good fit. Levels, external fees and limits are confirmed before work begins."],
        ["Do you always use AI?", "No. AI is optional and used only when it answers a real and proportionate need."],
        ["Do you offer emergency support?", "Not as a 24/7 service at launch. Priorities and timelines are confirmed according to the request."]
      ];
  return `<section class="section faq-section">
    <div class="wrap">
      ${SectionIntro("FAQ", fr ? "Des réponses sans détour." : "Straight answers.", "")}
      <div class="faq-list">${qas.map(([q, a], index) => `<details class="faq-item reveal" ${index === 0 ? "open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
    </div>
  </section>`;
}

function FinalCTA(lang) {
  const t = langData[lang];
  return `<section class="section final-cta">
    <div class="wrap final-cta-inner">
      <div class="cta-route" aria-hidden="true">
        ${(lang === "fr" ? ["Besoin", "Diagnostic", "Solution", "Suivi"] : ["Need", "Diagnosis", "Solution", "Follow-up"]).map((item) => `<span>${esc(item)}</span>`).join("<i></i>")}
      </div>
      <div>
        <p class="micro-label">SuiviCloud</p>
        <h2>${esc(t.ctaTitle)}</h2>
        <p>${esc(t.ctaText)}</p>
        <a class="button primary" href="${t.contactPath}">${esc(t.ctaButton)}</a>
      </div>
    </div>
  </section>`;
}

function CollaborationTrajectories(lang) {
  const fr = lang === "fr";
  const paths = fr
    ? [
        ["01", "Intervention ciblée", "Une réparation, un accès à clarifier, un formulaire ou un blocage précis.", "court", "Départ → correction"],
        ["02", "Projet structuré", "Un site, une automatisation ou une intégration avec portée, étapes et validation.", "moyen", "Départ → livraison"],
        ["03", "Suivi continu", "Un rythme d’entretien, de surveillance légère et d’améliorations planifiées.", "long", "Départ → continuité"]
      ]
    : [
        ["01", "Targeted intervention", "A repair, access clarification, form issue or precise blocker.", "short", "Start → fix"],
        ["02", "Structured project", "A website, automation or integration with scope, steps and validation.", "medium", "Start → delivery"],
        ["03", "Ongoing support", "A rhythm of maintenance, light monitoring and planned improvements.", "long", "Start → continuity"]
      ];
  return `<section class="section pricing-section collaboration-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Modes de collaboration" : "Ways to work together", fr ? "Trois longueurs de parcours dans le même système." : "Three path lengths in the same system.", fr ? "Le bon mode dépend de la précision du besoin, des accès disponibles et de la continuité souhaitée." : "The right mode depends on the precision of the need, available access and desired continuity.")}
      <div class="collaboration-paths">
        ${paths.map(([number, title, copy, length, route]) => `<article class="collaboration-path collaboration-${length} reveal">
          <span>${number}</span>
          <div>
            <p class="micro-label">${esc(route)}</p>
            <h3>${esc(title)}</h3>
            <p>${esc(copy)}</p>
          </div>
          <i aria-hidden="true"></i>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function DeliveryLine(lang) {
  const fr = lang === "fr";
  const steps = fr
    ? [["Comprendre", "besoin noté"], ["Délimiter", "portée confirmée"], ["Construire", "solution suivie"], ["Vérifier", "validation effectuée"], ["Mettre en ligne", "mise en ligne documentée"], ["Suivre", "prochaine action visible"]]
    : [["Understand", "need noted"], ["Define", "scope confirmed"], ["Build", "solution tracked"], ["Verify", "validation completed"], ["Launch", "launch documented"], ["Follow", "next action visible"]];
  return `<section class="section process-section delivery-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Méthode" : "Process", fr ? "Une ligne de livraison lisible." : "A readable delivery line.", fr ? "Chaque étape produit une trace visible, pour savoir ce qui a été décidé, fait ou validé." : "Each step produces a visible trace, so decisions, work and validation remain readable.")}
      <div class="delivery-line">
        ${steps.map(([title, trace], index) => `<article class="delivery-step reveal">
          <span>0${index + 1}</span>
          <h3>${esc(title)}</h3>
          <p>${esc(trace)}</p>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function GaryEditorial(lang) {
  const fr = lang === "fr";
  const traits = fr ? ["interlocuteur principal", "explication simple", "suivi humain"] : ["main point of contact", "plain explanation", "personal support"];
  return `<section class="section founder-section gary-section">
    <div class="wrap gary-editorial">
      <div class="gary-type reveal">
        <p class="micro-label">${esc(fr ? "Derrière SuiviCloud" : "Behind SuiviCloud")}</p>
        <h2>Gary</h2>
        <p>${esc(fr ? "Interlocuteur principal pour comprendre le besoin, cadrer la solution et expliquer le travail réalisé." : "Main point of contact to understand the need, frame the solution and explain the delivered work.")}</p>
        <div class="trait-cloud">${traits.map((trait) => `<span>${esc(trait)}</span>`).join("")}</div>
        <a class="button outline founder-link" href="${langData[lang].aboutPath}">${esc(fr ? "Lire l’approche" : "Read the approach")}</a>
      </div>
      <div class="gary-photo-slot reveal" aria-label="${esc(fr ? "Zone prévue pour une photo future de Gary" : "Reserved area for a future photo of Gary")}">
        <span>${esc(fr ? "Photo future" : "Future photo")}</span>
        <strong>${esc(fr ? "Aucun faux portrait" : "No synthetic portrait")}</strong>
      </div>
    </div>
  </section>`;
}

function HomeFAQ(lang) {
  const fr = lang === "fr";
  const qas = fr
    ? [
        ["Travaillez-vous seulement à Rimouski?", "Non. SuiviCloud est basé à Rimouski, mais les services peuvent être offerts partout au Québec lorsque le mandat s’y prête."],
        ["Puis-je commencer par un petit mandat?", "Oui. Une réparation, un problème de domaine, un formulaire ou une migration peuvent être traités séparément."],
        ["Pouvez-vous reprendre un site existant?", "Oui, après vérification des accès, de l’état du site et des responsabilités liées aux fournisseurs en place."],
        ["Mon entreprise reste-t-elle propriétaire du domaine?", "Oui. La propriété du domaine, du contenu et des données doit rester claire et documentée."],
        ["Offrez-vous du soutien d’urgence?", "Pas comme service 24/7 au lancement. Les priorités et délais sont confirmés selon le mandat."]
      ]
    : [
        ["Do you only work in Rimouski?", "No. SuiviCloud is based in Rimouski, but services can be offered across Quebec when the project is a good fit."],
        ["Can I start with a focused request?", "Yes. A repair, domain issue, form problem or migration can be handled separately."],
        ["Can you take over an existing website?", "Yes, after checking access, site condition and responsibilities tied to existing providers."],
        ["Does my business keep domain ownership?", "Yes. Domain, content and data ownership should remain clear and documented."],
        ["Do you offer emergency support?", "Not as a 24/7 service at launch. Priorities and timelines are confirmed according to the request."]
      ];
  return `<section class="section faq-section home-faq-section">
    <div class="wrap faq-layout">
      ${SectionIntro("FAQ", fr ? "Des réponses sobres, sans détour." : "Clear answers, no detour.", fr ? "Les questions fréquentes restent accessibles au clavier et lisibles sans mouvement inutile." : "Frequent questions remain keyboard-accessible and readable without unnecessary motion.")}
      <div class="faq-list">${qas.map(([q, a], index) => `<details class="faq-item reveal" ${index === 0 ? "open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
    </div>
  </section>`;
}

function ResolvedFinalCTA(lang) {
  const fr = lang === "fr";
  const t = langData[lang];
  const nodes = fr ? ["besoin", "tri", "solution", "suivi"] : ["need", "sort", "solution", "follow"];
  return `<section class="section final-cta resolved-final-cta">
    <div class="wrap final-cta-inner">
      <div class="resolved-network" aria-hidden="true">
        <svg viewBox="0 0 620 320" fill="none">
          <path d="M76 165 C150 84 245 92 308 160 S466 236 544 140"></path>
          <path d="M128 234 C210 198 252 202 308 160 S414 98 492 82"></path>
          ${nodes.map((node, index) => `<g class="resolved-node node-${index + 1}"><circle r="20"></circle><text text-anchor="middle" y="4">${esc(node)}</text></g>`).join("")}
        </svg>
      </div>
      <div class="resolved-copy">
        <p class="micro-label">SuiviCloud</p>
        <h2>${esc(fr ? "Vous n’avez pas besoin de connaître la solution technique." : "You do not need to know the technical solution.")}</h2>
        <p>${esc(fr ? "Décrivez le besoin, le contexte et ce qui bloque. Le reste peut être clarifié dans l’échange." : "Describe the need, context and what is stuck. The rest can be clarified in the exchange.")}</p>
        <div class="cta-system-state" aria-hidden="true">
          <span>ready</span><span>stable</span><span>connected</span>
        </div>
        <a class="button primary" href="${t.contactPath}">${esc(fr ? "Décrire mon besoin" : "Describe my need")}</a>
      </div>
    </div>
  </section>`;
}

function interiorHero(lang, title, copy, eyebrow, visual = "topology") {
  return `<section class="page-hero">
    <div class="wrap page-hero-grid">
      <div class="reveal">
        <p class="breadcrumb"><a href="${langData[lang].home}">SuiviCloud</a> / ${esc(title)}</p>
        <p class="micro-label">${esc(eyebrow || "Infrastructure vivante")}</p>
        <h1>${esc(title)}</h1>
        <p class="lead">${esc(copy)}</p>
      </div>
      <div class="page-visual reveal">${ServiceVisual(visual, lang)}</div>
    </div>
  </section>`;
}

function servicesOverview(lang) {
  const fr = lang === "fr";
  return `${interiorHero(lang, fr ? "Services" : "Services", fr ? "Cinq services pour créer, connecter, entretenir, sécuriser et accompagner votre système numérique." : "Five services to create, connect, maintain, secure and guide your digital system.", fr ? "Vue d’ensemble" : "Overview", "topology")}
  ${ServiceConstellation(lang)}
  ${TrustManifesto(lang)}
  ${FinalCTA(lang)}`;
}

function servicesEcosystemOverview(lang) {
  return `${ServicesEcosystemHero(lang)}
  ${ServicesDecisionMap(lang)}
  ${ServicesComparison(lang)}
  ${ServiceChoiceHelp(lang)}`;
}

function ServicesEcosystemHero(lang) {
  const fr = lang === "fr";
  const roles = fr
    ? [["presence", "présence"], ["flow", "flux"], ["care", "entretien"], ["base", "infrastructure"], ["help", "intervention"]]
    : [["presence", "presence"], ["flow", "flow"], ["care", "maintenance"], ["base", "infrastructure"], ["help", "intervention"]];
  return `<section class="page-hero services-ecosystem-hero">
    <div class="wrap services-hero-grid">
      <div class="reveal">
        <p class="breadcrumb"><a href="${langData[lang].home}">SuiviCloud</a> / ${esc(fr ? "Services" : "Services")}</p>
        <p class="micro-label">${esc(fr ? "Carte de l’écosystème" : "Ecosystem map")}</p>
        <h1>${esc(fr ? "Cinq services. Un seul système à comprendre." : "Five services. One system to understand.")}</h1>
        <p class="lead">${esc(fr ? "Cette page aide à choisir le bon point d’entrée selon le problème, le résultat attendu et le type de mandat." : "This page helps choose the right entry point based on the problem, expected outcome and type of work.")}</p>
      </div>
      <div class="services-topology reveal" aria-label="${esc(fr ? "Topologie des services SuiviCloud" : "SuiviCloud service topology")}">
        <svg viewBox="0 0 620 420" fill="none" aria-hidden="true">
          <path d="M112 210 C190 112 280 118 310 210 S438 312 510 190"></path>
          <path d="M310 76 V334"></path>
          <path d="M150 326 C230 272 390 146 482 96"></path>
          ${roles.map(([id, label], index) => `<g class="topology-role role-${id}"><circle r="24"></circle><text text-anchor="middle" y="5">${esc(label)}</text></g>`).join("")}
        </svg>
      </div>
    </div>
  </section>`;
}

function ServicesDecisionMap(lang) {
  const fr = lang === "fr";
  const info = {
    websites: fr
      ? ["Votre site ne présente plus clairement l’offre ou ne convertit pas les bonnes demandes.", "Une présence structurée, lisible et prête à recevoir les demandes utiles.", "Reprendre une page d’accueil, clarifier l’offre et vérifier le formulaire.", "Projet structuré", "Structurer mon site"]
      : ["Your website no longer presents the offer clearly or does not convert the right requests.", "A structured, readable presence ready to receive useful requests.", "Rework a home page, clarify the offer and verify the form.", "Structured project", "Structure my website"],
    automation: fr
      ? ["Les demandes, rendez-vous ou suivis demandent trop de copier-coller.", "Un flux où l’information arrive au bon endroit avec confirmations et rappels.", "Relier un formulaire à un tableau de suivi et à une confirmation courriel.", "Projet structuré", "Cartographier une tâche"]
      : ["Requests, appointments or follow-ups require too much copy-paste.", "A flow where information reaches the right place with confirmations and reminders.", "Connect a form to a tracking board and an email confirmation.", "Structured project", "Map a task"],
    hosting: fr
      ? ["Le site existe, mais son état, ses sauvegardes ou ses mises à jour ne sont pas suivis.", "Des points de contrôle visibles pour l’entretien, la sauvegarde et la restauration.", "Vérifier SSL, sauvegardes, mises à jour et chemin de reprise.", "Suivi continu", "Faire évaluer mon site"]
      : ["The site exists, but its health, backups or updates are not tracked.", "Visible checkpoints for maintenance, backup and recovery.", "Check SSL, backups, updates and recovery path.", "Ongoing support", "Have my site reviewed"],
    infrastructure: fr
      ? ["Les domaines, DNS, comptes ou accès sont difficiles à retrouver.", "Des fondations séparées, documentées et plus simples à reprendre.", "Recenser domaine, DNS, hébergement, comptes et responsabilités.", "Intervention ciblée", "Clarifier mes accès"]
      : ["Domain, DNS, login credentials or account ownership are unclear.", "Separated, documented foundations that are easier to recover.", "List domain, DNS, hosting, accounts and responsibilities.", "Targeted intervention", "Clarify my access"],
    support: fr
      ? ["Un problème précis bloque le site, un formulaire, un domaine ou une migration.", "Un diagnostic clair, une correction proportionnée et une prochaine action.", "Identifier la cause d’un formulaire qui ne livre plus les demandes.", "Intervention ciblée", "Décrire le problème"]
      : ["A precise issue blocks the site, a form, a domain or a migration.", "A clear diagnostic, proportionate fix and next action.", "Identify why a form no longer delivers requests.", "Targeted intervention", "Describe the issue"]
  };
  return `<section class="section services-decision-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Choisir" : "Choose", fr ? "Chaque service répond à un type de ralentissement." : "Each service answers a kind of friction.", fr ? "La carte présente le problème reconnaissable, le résultat attendu et un exemple concret pour orienter la demande." : "The map shows the recognizable problem, expected outcome and concrete example to orient the request.")}
      <div class="services-decision-grid">
        ${Object.values(serviceData).map((item, index) => {
          const service = item[lang];
          const [problem, result, example, engagementType, cta] = info[item.id];
          return `<article class="service-choice service-choice-${item.id} reveal">
            <div class="service-choice-head">
              <span>0${index + 1}</span>
              <div><p class="micro-label">${esc(engagementType)}</p><h2>${esc(service.title)}</h2></div>
            </div>
            <dl>
              <div><dt>${esc(fr ? "Problème" : "Problem")}</dt><dd>${esc(problem)}</dd></div>
              <div><dt>${esc(fr ? "Résultat" : "Outcome")}</dt><dd>${esc(result)}</dd></div>
              <div><dt>${esc(fr ? "Exemple" : "Example")}</dt><dd>${esc(example)}</dd></div>
            </dl>
            <a class="service-choice-cta" href="${service.path}">${esc(cta)}</a>
          </article>`;
        }).join("")}
      </div>
    </div>
  </section>`;
}

function ServicesComparison(lang) {
  const fr = lang === "fr";
  const rows = fr
    ? [["Présence", "Quand l’offre doit être comprise et demandée.", "Site, page, formulaire"], ["Flux", "Quand une tâche revient souvent ou se perd.", "Formulaire, courriel, calendrier"], ["Entretien", "Quand le site doit rester vérifiable.", "Santé, sauvegarde, mises à jour"], ["Infrastructure", "Quand les accès ou fondations sont flous.", "Domaine, DNS, comptes"], ["Intervention", "Quand un blocage précis doit être diagnostiqué.", "Erreur, migration, dépannage"]]
    : [["Presence", "When the offer must be understood and requested.", "Website, page, form"], ["Flow", "When a recurring task gets lost.", "Form, email, calendar"], ["Maintenance", "When the site must remain verifiable.", "Health, backup, updates"], ["Infrastructure", "When access or foundations are unclear.", "Domain, DNS, accounts"], ["Intervention", "When a precise blocker needs diagnosis.", "Error, migration, troubleshooting"]];
  return `<section class="section services-compare-section">
    <div class="wrap services-compare">
      <div class="reveal">
        <p class="micro-label">${esc(fr ? "Comparer sans tableau lourd" : "Compare without a heavy table")}</p>
        <h2>${esc(fr ? "Le bon service dépend du ralentissement principal." : "The right service depends on the main friction.")}</h2>
      </div>
      <div class="compare-lines">
        ${rows.map(([role, when, clues], index) => `<article class="compare-line reveal">
          <span>0${index + 1}</span>
          <strong>${esc(role)}</strong>
          <p>${esc(when)}</p>
          <small>${esc(clues)}</small>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function ServiceChoiceHelp(lang) {
  const fr = lang === "fr";
  return `<section class="section service-choice-help">
    <div class="wrap service-choice-help-inner reveal">
      <div>
        <p class="micro-label">${esc(fr ? "Point d’entrée" : "Entry point")}</p>
        <h2>${esc(fr ? "Je ne sais pas quel service choisir" : "I don’t know which service to choose")}</h2>
        <p>${esc(fr ? "Décrivez simplement ce qui vous ralentit. SuiviCloud déterminera avec vous le bon point d’entrée." : "Simply describe what is slowing you down. SuiviCloud will determine the right entry point with you.")}</p>
      </div>
      <a class="button primary" href="${langData[lang].contactPath}">${esc(fr ? "Décrire la situation" : "Describe the situation")}</a>
    </div>
  </section>`;
}

function serviceDetail(lang, service, item) {
  const renderers = {
    websites: WebsiteMessageToRequestPage,
    automation: AutomationTrackedActionPage,
    hosting: HostingContinuityPage,
    infrastructure: InfrastructureTopologyPage,
    support: SupportDiagnosticPage
  };
  return (renderers[item.id] || WebsiteServicePage)(lang, service, item);
}

function contactHref(lang, need) {
  return `${langData[lang].contactPath}?need=${encodeURIComponent(need)}`;
}

function ServiceContextCTA(lang, need, title, copy, label) {
  return `<section class="section service-context-cta">
    <div class="wrap service-context-inner reveal">
      <div>
        <p class="micro-label">SuiviCloud</p>
        <h2>${esc(title)}</h2>
        <p>${esc(copy)}</p>
      </div>
      <a class="button primary" href="${contactHref(lang, need)}">${esc(label)}</a>
    </div>
  </section>`;
}

function ServiceFinalCTA(lang, need, steps, title, copy, label) {
  return `<section class="section final-cta service-final-cta">
    <div class="wrap final-cta-inner">
      <div class="cta-route" aria-hidden="true">
        ${steps.map((item) => `<span>${esc(item)}</span>`).join("<i></i>")}
      </div>
      <div>
        <p class="micro-label">SuiviCloud</p>
        <h2>${esc(title)}</h2>
        <p>${esc(copy)}</p>
        <a class="button primary" href="${contactHref(lang, need)}">${esc(label)}</a>
      </div>
    </div>
  </section>`;
}

function rowArticles(items) {
  return items.map(([title, copy], index) => `<article class="service-row reveal"><span>0${index + 1}</span><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("");
}

function WebsiteMessageToRequestPage(lang, service, item) {
  const fr = lang === "fr";
  const need = "website";
  const understand = fr
    ? [["L’offre", "Ce que vous faites, pour qui, et pourquoi vous contacter."], ["Le contexte", "La zone servie, le type de client et les contraintes utiles."], ["La preuve", "Les détails qui rassurent avant la prise de contact."], ["La demande", "Le formulaire, le courriel ou le rendez-vous arrive sans friction."]]
    : [["The offer", "What you do, who it is for, and why someone should contact you."], ["The context", "Served area, customer type and useful constraints."], ["The proof", "Details that reassure before contact."], ["The request", "The form, email or booking path arrives without friction."]];
  const formats = fr
    ? [["Page de destination", "Une offre claire, un parcours court, une demande précise."], ["Site vitrine", "Quelques pages structurées pour présenter services, preuves et contact."], ["Refonte ciblée", "Reprendre un site existant sans repartir de zéro."], ["Site bilingue", "Une structure FR/EN cohérente, sans dupliquer la confusion."]]
    : [["Landing page", "A clear offer, short path and precise request."], ["Business website", "A few structured pages to present services, proof and contact."], ["Targeted refresh", "Improve an existing website without starting over."], ["Bilingual website", "A coherent FR/EN structure without duplicating confusion."]];
  const delivered = fr
    ? ["Structure des pages", "Hiérarchie du message", "Navigation claire", "Version mobile", "Formulaire ou point de contact", "SEO de base et performance", "Mise en ligne vérifiée"]
    : ["Page structure", "Message hierarchy", "Clear navigation", "Mobile version", "Form or contact point", "Basic SEO and performance", "Verified launch"];
  const scope = fr
    ? ["Nombre de pages", "Contenu prêt ou à structurer", "Bilinguisme", "Formulaire ou rendez-vous", "Reprise d’un site existant", "Intégrations et outils externes"]
    : ["Number of pages", "Content ready or needing structure", "Bilingual depth", "Form or booking", "Existing website refresh", "Integrations and external tools"];
  const process = fr
    ? [["Comprendre", "Message, publics, pages utiles."], ["Structurer", "Ordre des sections et actions."], ["Composer", "Design, mobile, preuves."], ["Vérifier", "Formulaire, liens, performance."], ["Publier", "Mise en ligne et prochaine action."]]
    : [["Understand", "Message, audiences, useful pages."], ["Structure", "Section order and actions."], ["Compose", "Design, mobile, proof."], ["Verify", "Form, links, performance."], ["Launch", "Go-live and next action."]];
  const faqs = fr
    ? [["Faut-il déjà avoir tout le texte?", "Non. Le contenu peut être structuré à partir de notes, d’une ancienne page ou d’une discussion."], ["Pouvez-vous reprendre un site existant?", "Oui, après vérification des accès, du contenu et des limites techniques du site actuel."], ["Le site peut-il être bilingue?", "Oui. La structure peut prévoir le français et l’anglais dès le départ."], ["Est-ce qu’un formulaire est inclus?", "Il peut l’être si le mandat le prévoit. Son objectif, ses champs et sa destination sont clarifiés avant la construction."]]
    : [["Do I need all text ready?", "No. Content can be structured from notes, an older page or a conversation."], ["Can you refresh an existing website?", "Yes, after checking access, content and technical limits of the current site."], ["Can the site be bilingual?", "Yes. The structure can plan French and English from the start."], ["Can a form be included?", "It can be if the scope includes it. Its purpose, fields and destination are clarified before building."]];
  return `${WebsiteStoryHero(lang, service)}
  <section class="section website-understand-section">
    <div class="wrap service-split">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Compréhension" : "Understanding")}</p>
        <h2>${esc(fr ? "Ce que le visiteur doit comprendre." : "What the visitor needs to understand.")}</h2>
        <p>${esc(fr ? "Le site doit transformer un message dispersé en demande claire. Chaque information a une place dans ce parcours." : "The website should turn a scattered message into a clear request. Each piece of information has a place in that path.")}</p>
      </div>
      <div class="website-understand-list">${rowArticles(understand)}</div>
    </div>
  </section>
  <section class="section website-browser-section">
    <div class="wrap website-browser-layout">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Parcours visuel" : "Visual path")}</p>
        <h2>${esc(fr ? "Du visiteur vers la demande." : "From visitor to request.")}</h2>
        <p>${esc(fr ? "Pendant le défilement, le navigateur abstrait montre comment le visiteur comprend, trouve une preuve, puis passe à l’action." : "As the page scrolls, the abstract browser shows how the visitor understands, finds proof, then takes action.")}</p>
      </div>
      ${WebsiteAbstractBrowser(lang)}
    </div>
  </section>
  <section class="section website-formats-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Formats" : "Formats", fr ? "Plusieurs formats, un même objectif." : "Several formats, one objective.", fr ? "Le format dépend du message, du volume de contenu et de la demande à recevoir." : "The format depends on the message, content volume and request to receive.")}
      <div class="website-format-grid">${formats.map(([title, copy], index) => `<article class="website-format reveal"><span>0${index + 1}</span><h3>${esc(title)}</h3><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section website-delivery-section">
    <div class="wrap website-delivery-grid">
      <article class="website-ledger reveal">
        <p class="micro-label">${esc(fr ? "Livré" : "Delivered")}</p>
        <h2>${esc(fr ? "Ce qui est livré." : "What is delivered.")}</h2>
        <ul class="signal-list">${delivered.map((value) => `<li>${esc(value)}</li>`).join("")}</ul>
      </article>
      <article class="website-ledger reveal">
        <p class="micro-label">${esc(fr ? "Portée" : "Scope")}</p>
        <h2>${esc(fr ? "Ce qui influence la portée." : "What affects scope.")}</h2>
        <ul class="signal-list">${scope.map((value) => `<li>${esc(value)}</li>`).join("")}</ul>
      </article>
    </div>
  </section>
  <section class="section website-process-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Déroulement" : "Process", fr ? "Comment le projet se déroule." : "How the project unfolds.", fr ? "Le projet avance par traces visibles: message, structure, validation, mise en ligne." : "The project moves through visible traces: message, structure, validation, launch.")}
      <div class="website-process-line">${process.map(([title, copy], index) => `<article class="reveal"><span>0${index + 1}</span><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section website-faq-section">
    <div class="wrap faq-layout">
      ${SectionIntro("FAQ", fr ? "Questions propres aux sites web." : "Website-specific questions.", "")}
      <div class="faq-list">${faqs.map(([q, a], index) => `<details class="faq-item reveal" ${index === 0 ? "open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
    </div>
  </section>
  ${ServiceFinalCTA(lang, need, fr ? ["Message", "Preuve", "Action", "Suivi"] : ["Message", "Proof", "Action", "Follow-up"], fr ? "Votre site peut guider avant de convaincre." : "Your website can guide before it persuades.", fr ? "Décrivez le site à créer, reprendre ou clarifier." : "Describe the website to create, refresh or clarify.", fr ? "Structurer mon site" : "Structure my website")}`;
}

function WebsiteStoryHero(lang, service) {
  const fr = lang === "fr";
  return `<section class="page-hero website-story-hero">
    <div class="wrap website-story-hero-grid">
      <div class="reveal">
        <p class="breadcrumb"><a href="${langData[lang].servicesPath}">${esc(fr ? "Services" : "Services")}</a> / ${esc(service.title)}</p>
        <p class="micro-label">${esc(fr ? "Du message vers la demande" : "From message to request")}</p>
        <h1>${esc(service.title)}</h1>
        <p class="lead">${esc(fr ? "Un site utile aide le visiteur à comprendre rapidement, à faire confiance progressivement, puis à passer à l’action." : "A useful website helps visitors understand quickly, build trust progressively, then take action.")}</p>
        <a class="button primary" href="${contactHref(lang, "website")}">${esc(fr ? "Structurer mon site" : "Structure my website")}</a>
      </div>
      ${WebsiteAbstractBrowser(lang, "hero")}
    </div>
  </section>`;
}

function WebsiteAbstractBrowser(lang, context = "section") {
  const fr = lang === "fr";
  const parts = fr ? ["Hero", "Navigation", "Preuve", "Service", "Formulaire"] : ["Hero", "Navigation", "Proof", "Service", "Form"];
  const path = fr ? ["visiteur", "compréhension", "confiance", "action"] : ["visitor", "understanding", "trust", "action"];
  return `<div class="website-browser-demo website-browser-${context} reveal" data-website-browser>
    <div class="abstract-browser">
      <div class="abstract-browser-bar"><span></span><span></span><span></span></div>
      <div class="abstract-browser-canvas">
        ${parts.map((part, index) => `<button class="browser-block block-${index + 1}" type="button" data-browser-step="${index}"><span>${esc(part)}</span></button>`).join("")}
        <div class="mobile-wireframe" aria-label="${esc(fr ? "Version mobile" : "Mobile version")}"><i></i><i></i><i></i></div>
      </div>
    </div>
    <div class="browser-path" aria-hidden="true">${path.map((step) => `<span>${esc(step)}</span>`).join("<i></i>")}</div>
  </div>`;
}

function WebsiteServicePage(lang, service, item) {
  const fr = lang === "fr";
  const need = "website";
  const visitor = fr
    ? [["L’offre", "Ce que vous faites, pour qui, et pourquoi vous contacter."], ["Le chemin", "Les pages utiles, la navigation et les appels à l’action restent visibles."], ["La preuve", "Les informations rassurantes sont placées avant la demande de contact."], ["La suite", "Le formulaire, le courriel ou la prise de rendez-vous ne demandent pas d’effort inutile."]]
    : [["The offer", "What you do, who it is for, and why someone should contact you."], ["The path", "Useful pages, navigation and calls to action remain visible."], ["The proof", "Reassuring information appears before the contact request."], ["The next step", "The form, email or booking path does not add unnecessary effort."]];
  const journey = fr
    ? [["Arrivée", "Le visiteur comprend où il est."], ["Compréhension", "L’offre et les services sont triés."], ["Preuve", "Les détails utiles répondent aux hésitations."], ["Contact", "La demande peut partir sans chercher."]]
    : [["Arrival", "The visitor understands where they are."], ["Understanding", "The offer and services are sorted."], ["Proof", "Useful details answer hesitation."], ["Contact", "The request can be sent without searching."]];
  const scope = fr
    ? [["Livrables possibles", service.bullets], ["Ce qui influence la portée et le prix", ["Nombre de pages et niveau de bilinguisme", "Contenu déjà prêt ou à structurer", "Formulaire, rendez-vous ou demande de soumission", "Reprise d’un site existant", "Performance, SEO de base et mise en ligne"]]]
    : [["Possible deliverables", service.bullets], ["What affects scope and price", ["Number of pages and bilingual depth", "Content already ready or needing structure", "Form, booking or quote request", "Existing website refresh", "Performance, basic SEO and launch"]]];
  return `${interiorHero(lang, service.title, service.summary, service.kicker, item.visual)}
  <section class="section service-story service-story-websites">
    <div class="wrap service-split">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Parcours visiteur" : "Visitor path")}</p>
        <h2>${esc(fr ? "Ce que votre visiteur doit comprendre." : "What your visitor needs to understand.")}</h2>
        <p>${esc(fr ? "Un site efficace ne montre pas tout. Il organise les bonnes informations dans le bon ordre, surtout sur mobile." : "An effective website does not show everything. It organizes the right information in the right order, especially on mobile.")}</p>
      </div>
      <div class="service-row-list">${rowArticles(visitor)}</div>
    </div>
  </section>
  <section class="section service-preview-section">
    <div class="wrap website-preview-layout">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Aperçu responsive" : "Responsive preview")}</p>
        <h2>${esc(fr ? "Le même message, trois contraintes d’écran." : "One message, three screen constraints.")}</h2>
      </div>
      ${WebsitePreview(lang)}
    </div>
  </section>
  <section class="section service-journey-section">
    <div class="wrap">
      <div class="service-path visitor-path">${journey.map(([title, copy]) => `<article class="reveal"><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  ${ServiceContextCTA(lang, need, fr ? "Votre site doit guider avant de convaincre." : "Your website should guide before it persuades.", fr ? "On peut commencer par structurer les pages, les messages et le point de contact principal." : "The first step can be structuring pages, messages and the main contact point.", fr ? "Structurer mon site" : "Structure my website")}
  <section class="section service-ledger-section">
    <div class="wrap service-ledger">
      ${scope.map(([title, items]) => `<article class="reveal"><p class="micro-label">${esc(title)}</p><ul class="signal-list">${items.map((value) => `<li>${esc(value)}</li>`).join("")}</ul></article>`).join("")}
    </div>
  </section>
  ${ServiceFinalCTA(lang, need, fr ? ["Pages", "Message", "Mobile", "Contact"] : ["Pages", "Message", "Mobile", "Contact"], fr ? "On structure un site autour d’un parcours réel." : "A website is structured around a real path.", fr ? "Décrivez le site à créer, reprendre ou clarifier." : "Describe the website to create, refresh or clarify.", fr ? "Structurer mon site" : "Structure my website")}`;
}

function WebsitePreview(lang) {
  const fr = lang === "fr";
  const labels = fr ? ["Bureau", "Tablette", "Mobile"] : ["Desktop", "Tablet", "Mobile"];
  const items = fr
    ? ["Message principal", "Navigation", "Sections", "Formulaire", "Bilinguisme", "Performance", "SEO de base"]
    : ["Main message", "Navigation", "Sections", "Form", "Bilingual", "Performance", "Basic SEO"];
  return `<div class="website-preview reveal" data-site-preview data-mode="desktop">
    <div class="preview-controls" role="group" aria-label="${esc(fr ? "Taille de l’aperçu" : "Preview size")}">
      ${["desktop", "tablet", "mobile"].map((mode, index) => `<button type="button" class="${index === 0 ? "is-active" : ""}" data-preview-mode="${mode}">${esc(labels[index])}</button>`).join("")}
    </div>
    <div class="preview-stage">
      ${["desktop", "tablet", "mobile"].map((mode) => `<div class="preview-device preview-${mode}" data-preview-device="${mode}">
        <div class="preview-nav"><span></span><span></span><span></span></div>
        <strong>${esc(items[0])}</strong>
        <div class="preview-blocks">${items.slice(1).map((item, index) => `<span class="preview-item-${index}">${esc(item)}</span>`).join("")}</div>
      </div>`).join("")}
    </div>
  </div>`;
}

function AutomationTrackedActionPage(lang, service, item) {
  const fr = lang === "fr";
  const need = "automation";
  const repeat = fr
    ? [["Demandes entrantes", "Un formulaire, un courriel ou un appel déclenche souvent les mêmes gestes."], ["Rendez-vous", "Une confirmation, une préparation et un rappel doivent rester alignés."], ["Soumissions", "Après l’envoi, la prochaine action se perd facilement."], ["Mises à jour internes", "Une même information est copiée dans plusieurs outils."]]
    : [["Incoming requests", "A form, email or call often triggers the same actions."], ["Appointments", "Confirmation, preparation and reminder need to stay aligned."], ["Quotes", "After sending, the next action can easily get lost."], ["Internal updates", "The same information is copied into several tools."]];
  const scenarios = fr
    ? [["form", "Formulaire vers suivi et confirmation", "Une demande devient une entrée de suivi, puis un message confirme sa réception.", ["Formulaire reçu", "Dossier mis à jour", "Confirmation envoyée", "Action visible"]], ["calendar", "Calendrier vers rappel", "Un rendez-vous confirmé crée une trace et prépare un rappel utile.", ["Rendez-vous réservé", "Contexte ajouté", "Rappel planifié", "Suite notée"]], ["quote", "Soumission vers relance", "Une soumission envoyée garde une prochaine action claire sans relance improvisée.", ["Soumission envoyée", "Délai défini", "Relance préparée", "Réponse suivie"]]]
    : [["form", "Form to tracking and confirmation", "A request becomes a tracking entry, then a message confirms it was received.", ["Form received", "Record updated", "Confirmation sent", "Action visible"]], ["calendar", "Calendar to reminder", "A confirmed appointment creates a trace and prepares a useful reminder.", ["Booking confirmed", "Context added", "Reminder planned", "Next step noted"]], ["quote", "Quote to follow-up", "A sent quote keeps a clear next action without improvised chasing.", ["Quote sent", "Delay defined", "Follow-up prepared", "Reply tracked"]]];
  const modes = fr
    ? [["simple", "Avec automatisation simple", "Règles claires, peu d’outils, suivi plus constant."], ["api", "Avec intégration API", "Connexion directe lorsque les outils le permettent et que l’accès est disponible."], ["ai", "Avec assistance IA facultative", "Aide au tri ou à la rédaction seulement si le besoin le justifie."]]
    : [["simple", "With simple automation", "Clear rules, few tools, steadier follow-up."], ["api", "With API integration", "Direct connection when tools allow it and access is available."], ["ai", "With optional AI assistance", "Sorting or drafting help only when the need justifies it."]];
  const mapping = fr
    ? [["Déclencheur", "Quel événement démarre le flux?"], ["Règles", "Quelles conditions changent le chemin?"], ["Actions", "Quoi créer, envoyer, noter ou proposer?"], ["Contrôle", "Qui valide les cas sensibles ou ambigus?"], ["Journal", "Quelle trace reste disponible après coup?"]]
    : [["Trigger", "What event starts the flow?"], ["Rules", "Which conditions change the path?"], ["Actions", "What should be created, sent, noted or proposed?"], ["Control", "Who reviews sensitive or ambiguous cases?"], ["Log", "What trace remains available afterward?"]];
  const human = fr
    ? [["Décision", "Une automatisation peut préparer une option. Elle ne remplace pas le jugement utile."], ["Ton", "Les messages peuvent être modèles, mais le contexte humain reste important."], ["Exception", "Les cas inhabituels doivent remonter clairement au lieu d’être cachés."]]
    : [["Decision", "Automation can prepare an option. It does not replace useful judgment."], ["Tone", "Messages can use templates, but human context still matters."], ["Exception", "Unusual cases should surface clearly instead of being hidden."]];
  const recovery = fr
    ? [["Données minimales", "On ne transporte que ce qui sert au suivi."], ["Erreurs visibles", "Un échec doit produire une trace compréhensible."], ["Reprise", "Le flux prévoit quoi faire si un outil ne répond pas."], ["Accès", "Les connexions dépendent des comptes et permissions disponibles."]]
    : [["Minimal data", "Only what helps follow-up is carried."], ["Visible errors", "A failure should leave an understandable trace."], ["Recovery", "The flow plans what happens if a tool does not respond."], ["Access", "Connections depend on available accounts and permissions."]];
  const delivered = fr
    ? ["Carte du flux", "Règles et exceptions", "Liste des outils impliqués", "Actions automatisées prévues", "Messages ou modèles utiles", "Points de contrôle humain", "Journal de suivi et reprise"]
    : ["Flow map", "Rules and exceptions", "List of involved tools", "Planned automated actions", "Useful messages or templates", "Human control points", "Tracking and recovery log"];
  const faqs = fr
    ? [["Est-ce que l’IA est nécessaire?", "Non. Elle peut aider dans certains cas, mais une automatisation simple ou une intégration API suffit souvent."], ["Faut-il changer tous les outils?", "Pas forcément. La cartographie sert justement à voir ce qui peut être relié sans tout remplacer."], ["Que se passe-t-il en cas d’erreur?", "Le flux doit prévoir une trace, une reprise possible et un point de contrôle humain."], ["Peut-on commencer petit?", "Oui. Une seule tâche répétitive est souvent le meilleur point de départ."]]
    : [["Is AI required?", "No. It can help in some cases, but simple automation or an API integration is often enough."], ["Do all tools need to change?", "Not necessarily. Mapping helps see what can be connected without replacing everything."], ["What happens when something fails?", "The flow should plan a trace, a recovery path and a human control point."], ["Can we start small?", "Yes. One repeated task is often the best starting point."]];
  return `<section class="page-hero automation-journey-hero">
    <div class="wrap automation-hero-grid">
      <div class="reveal">
        <p class="breadcrumb"><a href="${langData[lang].servicesPath}">${esc(fr ? "Services" : "Services")}</a> / ${esc(service.title)}</p>
        <p class="micro-label">${esc(fr ? "Une demande devient une action suivie" : "A request becomes a tracked action")}</p>
        <h1>${esc(service.title)}</h1>
        <p class="lead">${esc(fr ? "On transforme une répétition concrète en workflow lisible, avec règles, actions, contrôles et journal." : "A concrete repetition becomes a readable workflow with rules, actions, controls and a log.")}</p>
        <a class="button primary" href="${contactHref(lang, need)}">${esc(fr ? "Cartographier une tâche" : "Map a task")}</a>
      </div>
      ${AutomationWorkflowVisual(lang, "hero")}
    </div>
  </section>
  <section class="section automation-repeat-section">
    <div class="wrap service-split">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Répétitions" : "Repeated work")}</p>
        <h2>${esc(fr ? "Où le travail se répète." : "Where work repeats.")}</h2>
        <p>${esc(fr ? "La bonne automatisation commence rarement par un outil. Elle commence par une tâche qui revient souvent et qui mérite une trace." : "Good automation rarely starts with a tool. It starts with a task that repeats and deserves a trace.")}</p>
      </div>
      <div class="service-row-list">${rowArticles(repeat)}</div>
    </div>
  </section>
  <section class="section automation-scenarios-section">
    <div class="wrap automation-scenarios-layout" data-automation-scenarios>
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Scénarios" : "Scenarios")}</p>
        <h2>${esc(fr ? "Trois parcours à explorer." : "Three paths to explore.")}</h2>
        <p>${esc(fr ? "Chaque scénario garde le même principe: une entrée claire, des règles simples, une action suivie." : "Each scenario keeps the same principle: a clear input, simple rules and a tracked action.")}</p>
        <div class="automation-scenario-tabs" role="tablist" aria-label="${esc(fr ? "Scénarios d’automatisation" : "Automation scenarios")}">
          ${scenarios.map(([id, title], index) => `<button type="button" role="tab" aria-selected="${index === 0 ? "true" : "false"}" class="${index === 0 ? "is-active" : ""}" data-scenario-tab="${esc(id)}">${esc(title)}</button>`).join("")}
        </div>
      </div>
      <div class="automation-scenario-stage reveal">
        ${scenarios.map(([id, title, copy, steps], index) => `<article class="automation-scenario-panel ${index === 0 ? "is-active" : ""}" data-scenario-panel="${esc(id)}">
          <p class="micro-label">${esc(title)}</p>
          <h3>${esc(copy)}</h3>
          <div class="automation-scenario-flow">${steps.map((step, stepIndex) => `<span>${esc(step)}</span>${stepIndex < steps.length - 1 ? "<i></i>" : ""}`).join("")}</div>
        </article>`).join("")}
      </div>
    </div>
  </section>
  <section class="section automation-map-section">
    <div class="wrap automation-map-layout">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Cartographie" : "Mapping")}</p>
        <h2>${esc(fr ? "Avant d’automatiser, on dessine le flux." : "Before automating, the flow is mapped.")}</h2>
        <p>${esc(fr ? "La carte évite de brancher des outils trop tôt. Elle montre ce qui entre, ce qui change, ce qui sort et ce qui reste vérifiable." : "The map avoids connecting tools too early. It shows what enters, what changes, what comes out and what remains verifiable.")}</p>
      </div>
      ${AutomationWorkflowVisual(lang, "map")}
      <div class="automation-map-questions">${mapping.map(([title, copy], index) => `<article class="reveal"><span>0${index + 1}</span><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section automation-mode-section">
    <div class="wrap automation-mode-layout" data-automation-modes>
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Niveau de connexion" : "Connection level")}</p>
        <h2>${esc(fr ? "Le bon niveau dépend du besoin." : "The right level depends on the need.")}</h2>
      </div>
      <div class="automation-mode-selector reveal" role="tablist" aria-label="${esc(fr ? "Types d’automatisation" : "Automation types")}">
        ${modes.map(([id, title], index) => `<button type="button" role="tab" aria-selected="${index === 0 ? "true" : "false"}" class="${index === 0 ? "is-active" : ""}" data-mode-tab="${esc(id)}">${esc(title)}</button>`).join("")}
      </div>
      <div class="automation-mode-panels">
        ${modes.map(([id, title, copy], index) => `<article class="automation-mode-panel reveal ${index === 0 ? "is-active" : ""}" data-mode-panel="${esc(id)}"><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}
      </div>
    </div>
  </section>
  <section class="section automation-human-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Humain" : "Human", fr ? "Ce qui demeure humain." : "What stays human.", fr ? "Le système peut préparer le suivi, mais certains choix doivent rester lisibles et validables." : "The system can prepare follow-up, but some choices need to remain readable and reviewable.")}
      <div class="service-example-grid">${human.map(([title, copy]) => `<article class="reveal"><h3>${esc(title)}</h3><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section automation-recovery-section">
    <div class="wrap service-split">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Données et reprise" : "Data and recovery")}</p>
        <h2>${esc(fr ? "Les erreurs doivent être visibles." : "Errors need to be visible.")}</h2>
        <p>${esc(fr ? "Un workflow utile ne cache pas les limites. Il prévoit les données nécessaires, les erreurs possibles et la façon de reprendre." : "A useful workflow does not hide limits. It plans required data, possible errors and how to recover.")}</p>
      </div>
      <div class="service-row-list">${rowArticles(recovery)}</div>
    </div>
  </section>
  <section class="section automation-delivery-section">
    <div class="wrap website-delivery-grid">
      <article class="website-ledger reveal">
        <p class="micro-label">${esc(fr ? "Livrables" : "Deliverables")}</p>
        <h2>${esc(fr ? "Ce qui est livré." : "What is delivered.")}</h2>
        <ul class="signal-list">${delivered.map((value) => `<li>${esc(value)}</li>`).join("")}</ul>
      </article>
      <article class="website-ledger reveal">
        <p class="micro-label">${esc(fr ? "Trace finale" : "Final trace")}</p>
        <h2>${esc(fr ? "Une action suivie, pas une boîte noire." : "A tracked action, not a black box.")}</h2>
        <p>${esc(fr ? "Le résultat attendu est compréhensible: ce qui déclenche, ce qui se passe, qui contrôle et où retrouver le journal." : "The expected result is understandable: what triggers, what happens, who controls it and where the log is found.")}</p>
      </article>
    </div>
  </section>
  <section class="section automation-faq-section">
    <div class="wrap faq-layout">
      ${SectionIntro("FAQ", fr ? "Questions propres à l’automatisation." : "Automation-specific questions.", "")}
      <div class="faq-list">${faqs.map(([q, a], index) => `<details class="faq-item reveal" ${index === 0 ? "open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
    </div>
  </section>
  ${ServiceFinalCTA(lang, need, fr ? ["Déclencheur", "Règles", "Actions", "Journal"] : ["Trigger", "Rules", "Actions", "Log"], fr ? "Une demande peut devenir une action suivie." : "A request can become a tracked action.", fr ? "Décrivez la tâche répétitive, les outils impliqués et ce qui doit rester vérifiable." : "Describe the repeated task, involved tools and what needs to remain verifiable.", fr ? "Cartographier une tâche" : "Map a task")}`;
}

function AutomationWorkflowVisual(lang, context = "hero") {
  const fr = lang === "fr";
  const steps = fr ? ["Déclencheur", "Règles", "Actions", "Contrôle", "Journal"] : ["Trigger", "Rules", "Actions", "Control", "Log"];
  return `<div class="automation-workflow-visual automation-workflow-${context} reveal" data-automation-workflow>
    <div class="automation-workflow-track" aria-label="${esc(fr ? "Workflow navigable" : "Navigable workflow")}">
      ${steps.map((step, index) => `<button class="automation-workflow-node auto-node-${index + 1}" type="button" data-auto-workflow-step="${index}" aria-pressed="${index === 0 ? "true" : "false"}"><span>0${index + 1}</span><strong>${esc(step)}</strong></button>${index < steps.length - 1 ? `<i class="auto-link auto-link-${index + 1}"></i>` : ""}`).join("")}
    </div>
    <p>${esc(fr ? "Entrée claire, règles explicites, action vérifiable." : "Clear input, explicit rules, verifiable action.")}</p>
  </div>`;
}

function AutomationServicePage(lang, service, item) {
  const fr = lang === "fr";
  const need = "automation";
  const repeat = fr
    ? [["Formulaires recopiés", "Une demande arrive, puis doit être déplacée à la main."], ["Rappels oubliés", "Un rendez-vous confirmé n’a pas toujours de suite claire."], ["Relances dispersées", "Les soumissions restent dans une boîte courriel ou une note personnelle."]]
    : [["Copied forms", "A request arrives, then has to be moved by hand."], ["Missed reminders", "A confirmed appointment does not always have a clear next step."], ["Scattered follow-ups", "Quotes stay in an inbox or a personal note."]];
  const steps = fr
    ? [["La demande entre dans le flux.", "Formulaire, rendez-vous ou demande de soumission."], ["Le dossier de suivi est créé ou mis à jour.", "La trace reste au même endroit."], ["Une confirmation est envoyée.", "Le client sait que la demande est reçue."], ["La prochaine action est proposée.", "Tâche, rendez-vous ou relance."], ["Le rappel part au moment prévu.", "Seulement quand le scénario le justifie."]]
    : [["The request enters the flow.", "Form, booking or quote request."], ["The tracking record is created or updated.", "The trace stays in one place."], ["A confirmation is sent.", "The client knows the request was received."], ["The next action is proposed.", "Task, booking or follow-up."], ["The reminder is sent at the planned time.", "Only when the scenario calls for it."]];
  const examples = fr
    ? [["Formulaire vers tableau de suivi", "Chaque demande devient une ligne claire avec statut."], ["Rendez-vous vers confirmation et rappel", "La personne reçoit les informations utiles au bon moment."], ["Soumission vers relance", "Une prochaine action évite que la demande tombe entre deux chaises."]]
    : [["Form to tracking board", "Each request becomes a clear line with a status."], ["Booking to confirmation and reminder", "The person receives useful information at the right time."], ["Quote request to follow-up", "A next action prevents the request from getting lost."]];
  return `${interiorHero(lang, service.title, service.summary, service.kicker, item.visual)}
  <section class="section service-story service-story-automation">
    <div class="wrap service-split">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Répétitions" : "Repeating work")}</p>
        <h2>${esc(fr ? "Où le travail se répète aujourd’hui." : "Where work repeats today.")}</h2>
        <p>${esc(fr ? "L’automatisation commence par repérer les gestes qui reviennent souvent et qui méritent une trace." : "Automation starts by spotting the repeated actions that deserve a trace.")}</p>
      </div>
      <div class="service-row-list">${rowArticles(repeat)}</div>
    </div>
  </section>
  <section class="section flow-compare-section">
    <div class="wrap automation-flow-layout">
      <div class="flow-before-after reveal">
        <p class="micro-label">${esc(fr ? "Avant / Après" : "Before / After")}</p>
        <div><strong>${esc(fr ? "Avant" : "Before")}</strong><span>${esc(fr ? "Copier, répondre, noter, relancer." : "Copy, reply, note, follow up.")}</span></div>
        <div><strong>${esc(fr ? "Après" : "After")}</strong><span>${esc(fr ? "Recevoir, tracer, confirmer, proposer." : "Receive, track, confirm, propose.")}</span></div>
      </div>
      <div class="automation-flow-steps">
        ${steps.map(([title, copy], index) => `<article class="reveal"><span>${String(index + 1).padStart(2, "0")}</span><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}
      </div>
    </div>
  </section>
  <section class="section automation-examples-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Exemples concrets" : "Concrete examples", fr ? "Relier seulement ce qui sert le suivi." : "Connect only what helps follow-up.", "")}
      <div class="service-example-grid">${examples.map(([title, copy]) => `<article class="reveal"><h3>${esc(title)}</h3><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  ${ServiceContextCTA(lang, need, fr ? "Une tâche répétitive peut être cartographiée avant d’être automatisée." : "A repeated task can be mapped before it is automated.", fr ? "On décrit l’entrée, la trace, la réponse et la prochaine action." : "We describe the input, the trace, the reply and the next action.", fr ? "Cartographier une tâche" : "Map a task")}
  <section class="section service-duo-section">
    <div class="wrap service-duo">
      <article class="reveal"><p class="micro-label">${esc(fr ? "Contrôle humain" : "Human control")}</p><h2>${esc(fr ? "La décision importante reste visible." : "Important decisions stay visible.")}</h2><p>${esc(fr ? "Les automatisations peuvent préparer, classer ou rappeler. Les décisions qui ont un impact doivent rester compréhensibles et validables." : "Automations can prepare, sort or remind. Decisions with impact should remain understandable and reviewable.")}</p></article>
      <article class="reveal"><p class="micro-label">${esc(fr ? "Données et limites" : "Data and limits")}</p><h2>${esc(fr ? "Chaque flux a ses conditions." : "Every flow has conditions.")}</h2><p>${esc(fr ? "Les erreurs, les doublons, les accès manquants et les données sensibles sont évalués avant de brancher les outils." : "Errors, duplicates, missing access and sensitive data are assessed before tools are connected.")}</p></article>
    </div>
  </section>
  ${ServiceFinalCTA(lang, need, fr ? ["Entrée", "Trace", "Réponse", "Rappel"] : ["Input", "Trace", "Reply", "Reminder"], fr ? "On peut partir d’une seule tâche." : "We can start with one task.", fr ? "Choisissez une répétition concrète à clarifier." : "Choose one repeated task to clarify.", fr ? "Cartographier une tâche" : "Map a task")}`;
}

function HostingContinuityPage(lang, service, item) {
  const fr = lang === "fr";
  const need = "hosting";
  const visible = fr
    ? [["Disponibilité", "Savoir si le site répond et où noter les incidents visibles."], ["Certificat", "Voir l’état du certificat sans promettre une surveillance avancée."], ["Sauvegarde", "Connaître la dernière copie utile et ce qu’elle couvre."], ["Mises à jour", "Nommer ce qui doit être vérifié selon la plateforme."], ["Prochaine vérification", "Laisser une date ou une action attendue."]]
    : [["Availability", "Know whether the site responds and where visible incidents are noted."], ["Certificate", "See certificate state without promising advanced monitoring."], ["Backup", "Know the latest useful copy and what it covers."], ["Updates", "Name what needs review according to the platform."], ["Next check", "Leave a date or expected action."]];
  const cycle = fr
    ? [["Surveiller", "Voir l’état."], ["Sauvegarder", "Créer ou confirmer une copie utile."], ["Mettre à jour", "Réduire les risques courants."], ["Vérifier", "Tester ce qui doit répondre."], ["Documenter", "Laisser une trace compréhensible."]]
    : [["Monitor", "See the state."], ["Back up", "Create or confirm a useful copy."], ["Update", "Reduce common risks."], ["Verify", "Test what needs to respond."], ["Document", "Leave an understandable trace."]];
  const backup = fr
    ? [["Copie disponible", "La sauvegarde doit être datée et située."], ["Portée connue", "Fichiers, base de données, médias ou configuration sont nommés."], ["Restauration prévue", "Le chemin de reprise est clarifié avant l’urgence."], ["Test selon l’entente", "Un test complet dépend du mandat et de l’environnement."]]
    : [["Available copy", "The backup should be dated and located."], ["Known scope", "Files, database, media or configuration are named."], ["Planned restoration", "The recovery path is clarified before urgency."], ["Test by agreement", "A full test depends on the project and environment."]];
  const responsibilities = fr
    ? [["Client", "Propriété du domaine, décisions, paiements externes et accès autorisés."], ["SuiviCloud", "Suivi convenu, documentation, actions techniques prévues et signalement."], ["Fournisseurs", "Hébergement, registraire, licences, outils tiers et limites de leur service."]]
    : [["Client", "Domain ownership, decisions, external payments and authorized access."], ["SuiviCloud", "Agreed follow-up, documentation, planned technical actions and reporting."], ["Providers", "Hosting, registrar, licences, third-party tools and their service limits."]];
  const included = fr
    ? ["État du site et points visibles", "Vérification de certificat selon l’environnement", "Sauvegardes prévues par l’entente", "Mises à jour planifiées", "Notes de suivi et accès utiles", "Coordination de transfert si prévue"]
    : ["Site state and visible points", "Certificate check according to environment", "Backups planned by agreement", "Scheduled updates", "Follow-up notes and useful access", "Transfer coordination if planned"];
  const excluded = fr
    ? ["Intervention urgente 24/7 non prévue", "Garantie absolue de disponibilité", "Audit de sécurité avancé sans mandat dédié", "Correction d’un fournisseur tiers hors portée", "Restauration garantie si aucune copie utilisable n’existe", "Frais externes, licences ou hébergement tiers"]
    : ["Unplanned 24/7 emergency intervention", "Absolute uptime guarantee", "Advanced security audit without dedicated scope", "Fixing an out-of-scope third-party provider", "Guaranteed restoration if no usable copy exists", "External fees, licences or third-party hosting"];
  const transfer = fr
    ? [["Inventaire", "Domaine, DNS, hébergement, application, sauvegardes et comptes."], ["Accès", "Qui possède quoi, qui peut agir et quels accès manquent."], ["Copie", "Ce qui peut être exporté, sauvegardé ou documenté."], ["Passage", "La séquence de changement, de validation et de repli."]]
    : [["Inventory", "Domain, DNS, hosting, application, backups and accounts."], ["Access", "Who owns what, who can act and which access is missing."], ["Copy", "What can be exported, backed up or documented."], ["Handoff", "The change, validation and fallback sequence."]];
  const faqs = fr
    ? [["Est-ce que l’hébergement inclut une disponibilité garantie?", "Non. Les niveaux, limites et responsabilités sont confirmés selon l’entente et les fournisseurs utilisés."], ["Les sauvegardes sont-elles toujours restaurables?", "Une sauvegarde doit être configurée, datée et idéalement testée selon le mandat. Sans copie utilisable, une restauration ne peut pas être garantie."], ["Pouvez-vous reprendre un site déjà hébergé ailleurs?", "Oui, si les accès, copies et limites techniques permettent une reprise claire."], ["Qu’est-ce qui arrive si un fournisseur tiers bloque une action?", "Le blocage est documenté, puis la prochaine action possible est clarifiée avec vous."]]
    : [["Does hosting include guaranteed uptime?", "No. Levels, limits and responsibilities are confirmed according to the agreement and providers used."], ["Are backups always restorable?", "A backup must be configured, dated and ideally tested according to scope. Without a usable copy, restoration cannot be guaranteed."], ["Can you take over a site already hosted elsewhere?", "Yes, if access, copies and technical limits allow a clear takeover."], ["What happens if a third-party provider blocks an action?", "The blocker is documented, then the next possible action is clarified with you."]];
  return `<section class="page-hero hosting-continuity-hero">
    <div class="wrap hosting-hero-grid">
      <div class="reveal">
        <p class="breadcrumb"><a href="${langData[lang].servicesPath}">${esc(fr ? "Services" : "Services")}</a> / ${esc(service.title)}</p>
        <p class="micro-label">${esc(fr ? "La continuité devient visible" : "Continuity becomes visible")}</p>
        <h1>${esc(service.title)}</h1>
        <p class="lead">${esc(fr ? "Un site plus calme est un site dont l’état, les copies, les accès et les prochaines vérifications restent compréhensibles." : "A calmer site is one where state, copies, access and next checks remain understandable.")}</p>
        <a class="button primary" href="${contactHref(lang, need)}">${esc(fr ? "Faire évaluer mon site" : "Assess my site")}</a>
      </div>
      ${HostingHealthBoard(lang)}
    </div>
  </section>
  <section class="section hosting-visible-section">
    <div class="wrap service-split">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Visibilité" : "Visibility")}</p>
        <h2>${esc(fr ? "Ce qui doit rester visible." : "What needs to stay visible.")}</h2>
        <p>${esc(fr ? "La maintenance sert d’abord à rendre l’état du site reprenable: ce qui fonctionne, ce qui doit être revu, et où retrouver la trace." : "Maintenance first makes the site recoverable: what works, what needs review and where to find the trace.")}</p>
      </div>
      <div class="service-row-list">${rowArticles(visible)}</div>
    </div>
  </section>
  <section class="section hosting-cycle-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Cycle" : "Cycle", fr ? "Cycle d’entretien." : "Maintenance cycle.", fr ? "La continuité n’est pas une action unique. Elle revient par étapes simples et documentées." : "Continuity is not one action. It returns through simple documented steps.")}
      <div class="hosting-cycle-line">${cycle.map(([title, copy], index) => `<article class="reveal"><span>0${index + 1}</span><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section hosting-backup-section">
    <div class="wrap hosting-backup-layout">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Sauvegarde et restauration" : "Backup and restoration")}</p>
        <h2>${esc(fr ? "Une copie n’aide que si elle peut être comprise." : "A copy only helps if it can be understood.")}</h2>
        <p>${esc(fr ? "On distingue la présence d’une sauvegarde, sa portée, son emplacement et la possibilité réelle de reprise." : "We separate the presence of a backup, its scope, its location and the actual recovery path.")}</p>
      </div>
      <div class="hosting-backup-grid">${backup.map(([title, copy], index) => `<article class="reveal"><span>0${index + 1}</span><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section hosting-responsibility-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Responsabilités" : "Responsibilities", fr ? "Chaque rôle doit être nommé." : "Each role needs a name.", fr ? "La continuité dépend aussi de qui possède les accès, qui paie les fournisseurs et qui peut agir." : "Continuity also depends on who owns access, who pays providers and who can act.")}
      <div class="hosting-responsibility-grid">${responsibilities.map(([title, copy]) => `<article class="reveal"><h3>${esc(title)}</h3><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section hosting-scope-section">
    <div class="wrap website-delivery-grid">
      <article class="website-ledger reveal">
        <p class="micro-label">${esc(fr ? "Selon l’entente" : "By agreement")}</p>
        <h2>${esc(fr ? "Ce qui est inclus selon l’entente." : "What is included by agreement.")}</h2>
        <ul class="signal-list">${included.map((value) => `<li>${esc(value)}</li>`).join("")}</ul>
      </article>
      <article class="website-ledger reveal">
        <p class="micro-label">${esc(fr ? "À clarifier" : "To clarify")}</p>
        <h2>${esc(fr ? "Ce qui ne l’est pas automatiquement." : "What is not automatic.")}</h2>
        <ul class="signal-list">${excluded.map((value) => `<li>${esc(value)}</li>`).join("")}</ul>
      </article>
    </div>
  </section>
  <section class="section hosting-transfer-section">
    <div class="wrap hosting-transfer-layout">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Transfert" : "Transfer")}</p>
        <h2>${esc(fr ? "Procédure de transfert." : "Transfer procedure.")}</h2>
        <p>${esc(fr ? "Un transfert sain prépare les accès, les copies et le plan de passage avant de déplacer quoi que ce soit." : "A healthy transfer prepares access, copies and the handoff plan before moving anything.")}</p>
      </div>
      <div class="hosting-transfer-steps">${transfer.map(([title, copy], index) => `<article class="reveal"><span>0${index + 1}</span><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section hosting-faq-section">
    <div class="wrap faq-layout">
      ${SectionIntro("FAQ", fr ? "Questions propres à l’hébergement." : "Hosting-specific questions.", "")}
      <div class="faq-list">${faqs.map(([q, a], index) => `<details class="faq-item reveal" ${index === 0 ? "open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
    </div>
  </section>
  ${ServiceFinalCTA(lang, need, fr ? ["État", "Copie", "Accès", "Suite"] : ["State", "Copy", "Access", "Next"], fr ? "On évalue d’abord ce qui existe vraiment." : "We first assess what truly exists.", fr ? "Décrivez le site, l’hébergement actuel et les accès disponibles." : "Describe the site, current hosting and available access.", fr ? "Faire évaluer mon site" : "Assess my site")}`;
}

function HostingHealthBoard(lang) {
  const fr = lang === "fr";
  const rows = fr
    ? [["Disponibilité", "Démonstration", "Répond"], ["Certificat", "Démonstration", "À vérifier"], ["Dernière sauvegarde", "Démonstration", "Copie datée"], ["Mises à jour", "Démonstration", "Planifiées"], ["Restauration", "Démonstration", "Chemin noté"], ["Prochaine vérification", "Démonstration", "À confirmer"]]
    : [["Availability", "Demonstration", "Responding"], ["Certificate", "Demonstration", "To check"], ["Latest backup", "Demonstration", "Dated copy"], ["Updates", "Demonstration", "Scheduled"], ["Restoration", "Demonstration", "Path noted"], ["Next check", "Demonstration", "To confirm"]];
  return `<div class="hosting-health-board reveal" aria-label="${esc(fr ? "Tableau de santé de démonstration" : "Demonstration health board")}">
    <div class="hosting-health-top">
      <p class="micro-label">${esc(fr ? "Tableau de démonstration" : "Demonstration board")}</p>
      <span>${esc(fr ? "Exemples, pas données de production" : "Examples, not production data")}</span>
    </div>
    <div class="hosting-health-rows">
      ${rows.map(([label, demo, state], index) => `<article class="health-row health-row-${index + 1}">
        <span>${esc(label)}</span>
        <small>${esc(demo)}</small>
        <strong>${esc(state)}</strong>
      </article>`).join("")}
    </div>
  </div>`;
}

function HostingServicePage(lang, service, item) {
  const fr = lang === "fr";
  const need = "hosting";
  const checks = fr
    ? [["Disponibilité", "Le site répond et les erreurs visibles sont notées."], ["Certificat", "Le SSL est présent et surveillé selon l’environnement."], ["Sauvegardes", "Une sauvegarde est utile seulement si elle est configurée, datée et testable."], ["Mises à jour", "Les corrections sont planifiées selon la plateforme et l’entente."], ["Accès", "Les comptes utiles restent documentés."]]
    : [["Availability", "The site responds and visible errors are noted."], ["Certificate", "SSL is present and watched according to the environment."], ["Backups", "A backup is useful only when it is configured, dated and testable."], ["Updates", "Fixes are planned according to the platform and agreement."], ["Access", "Useful accounts stay documented."]];
  const timeline = fr
    ? [["Surveiller", "Voir l’état."], ["Sauvegarder", "Créer une copie utile."], ["Mettre à jour", "Réduire les risques courants."], ["Restaurer", "Tester le chemin lorsque prévu."], ["Documenter", "Laisser une trace."]]
    : [["Watch", "See the state."], ["Back up", "Create a useful copy."], ["Update", "Reduce common risks."], ["Restore", "Test the path when planned."], ["Document", "Leave a trace."]];
  const included = fr ? service.bullets : service.bullets;
  const excluded = fr
    ? ["Intervention urgente 24/7 non prévue", "Sécurité avancée sans analyse dédiée", "Correction d’un fournisseur tiers hors portée", "Sauvegarde garantie si elle n’a pas été configurée et testée"]
    : ["Unplanned 24/7 emergency response", "Advanced security without dedicated review", "Fixing an out-of-scope third-party provider", "Guaranteed backup if it has not been configured and tested"];
  return `${interiorHero(lang, service.title, service.summary, service.kicker, item.visual)}
  <section class="section hosting-health-section">
    <div class="wrap health-board">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Tableau de santé" : "Health board")}</p>
        <h2>${esc(fr ? "Comprendre l’état du site sans jargon." : "Understand site health without jargon.")}</h2>
        <p>${esc(fr ? "La maintenance sert à voir les signaux importants avant qu’ils deviennent difficiles à reprendre." : "Maintenance helps spot important signals before they become hard to recover.")}</p>
      </div>
      <div class="health-checks">${checks.map(([title, copy]) => `<article class="reveal"><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section hosting-timeline-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Continuité" : "Continuity", fr ? "Le suivi se pense dans le temps." : "Follow-up is designed over time.", fr ? "Chaque action dépend de l’entente, de la plateforme et des accès disponibles." : "Each action depends on the agreement, platform and available access.")}
      <div class="maintenance-line">${timeline.map(([title, copy]) => `<article class="reveal"><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  ${ServiceContextCTA(lang, need, fr ? "Un site laissé seul devient plus difficile à reprendre." : "A site left alone becomes harder to recover.", fr ? "On peut commencer par évaluer son état actuel et les accès disponibles." : "We can start by assessing its current state and available access.", fr ? "Faire évaluer mon site" : "Assess my site")}
  <section class="section service-duo-section">
    <div class="wrap service-duo">
      <article class="reveal"><p class="micro-label">${esc(fr ? "Selon l’entente" : "Depending on agreement")}</p><h2>${esc(fr ? "Ce qui peut être inclus." : "What can be included.")}</h2><ul class="signal-list">${included.map((value) => `<li>${esc(value)}</li>`).join("")}</ul></article>
      <article class="reveal"><p class="micro-label">${esc(fr ? "À clarifier" : "To clarify")}</p><h2>${esc(fr ? "Ce qui n’est pas automatique." : "What is not automatic.")}</h2><ul class="signal-list">${excluded.map((value) => `<li>${esc(value)}</li>`).join("")}</ul></article>
    </div>
  </section>
  <section class="section transfer-section">
    <div class="wrap transfer-strip reveal">
      <p class="micro-label">${esc(fr ? "Départ ou transfert" : "Departure or transfer")}</p>
      <h2>${esc(fr ? "Les accès doivent rester reprenables." : "Access should remain recoverable.")}</h2>
      <p>${esc(fr ? "Un transfert se prépare avec les comptes, le domaine, les sauvegardes disponibles et les responsabilités de chaque fournisseur." : "A transfer is prepared with accounts, domain, available backups and each provider’s responsibilities.")}</p>
    </div>
  </section>
  ${ServiceFinalCTA(lang, need, fr ? ["État", "Copies", "Mises à jour", "Trace"] : ["State", "Copies", "Updates", "Trace"], fr ? "On évalue d’abord ce qui existe vraiment." : "We first assess what truly exists.", fr ? "Décrivez le site, l’hébergement actuel et les accès disponibles." : "Describe the site, current hosting and available access.", fr ? "Faire évaluer mon site" : "Assess my site")}`;
}

function InfrastructureTopologyPage(lang, service, item) {
  const fr = lang === "fr";
  const need = "infrastructure";
  const layers = fr
    ? [["Domaine", "Adresse publique du site.", "Client ou registraire confirmé", "Compte registraire", "Renouvellement, délégation et validation.", "Transférable si le compte est accessible."], ["DNS", "Indique où le trafic doit aller.", "Client, DNS externe ou compte Cloudflare", "Compte DNS autorisé", "Entrées, raisons et changements.", "Reprise possible si les zones sont exportables."], ["Protection", "Filtre certains risques courants.", "Compte de protection désigné", "Accès administrateur limité", "Règles actives et limites connues.", "Désactivation ou migration préparée."], ["Serveur", "Héberge le site ou l’application.", "Hébergeur, VPS ou fournisseur choisi", "Accès technique défini", "Chemins, versions et ressources.", "Reprise selon sauvegarde et accès."], ["Application", "Fait fonctionner le site ou l’outil.", "Propriétaire du site ou compte applicatif", "Gestionnaire du site", "Versions, extensions et rôles.", "Migration selon plateforme et données."], ["Sauvegarde", "Permet une reprise documentée.", "Espace de copie défini", "Accès au stockage ou export", "Date, portée et test prévu.", "Restaurable seulement si la copie est utilisable."]]
    : [["Domain", "Public address of the site.", "Client or confirmed registrar", "Registrar account", "Renewal, delegation and validation.", "Transferable if the account is accessible."], ["DNS", "Tells traffic where to go.", "Client, external DNS or Cloudflare account", "Authorized DNS account", "Records, reasons and changes.", "Recoverable if zones can be exported."], ["Protection", "Filters some common risks.", "Assigned protection account", "Limited administrator access", "Active rules and known limits.", "Prepared disablement or migration."], ["Server", "Hosts the site or application.", "Hosting provider, VPS or chosen provider", "Defined technical access", "Paths, versions and resources.", "Recovery depends on backup and access."], ["Application", "Runs the site or business tool.", "Site owner or application account", "Site manager", "Versions, extensions and roles.", "Migration depends on platform and data."], ["Backup", "Enables documented recovery.", "Defined copy storage", "Storage or export access", "Date, scope and planned test.", "Restorable only if the copy is usable."]];
  const ownership = fr
    ? [["Propriétaire", "Le compte ou l’actif doit être associé à une personne ou une organisation claire."], ["Accès", "Les rôles utiles sont nommés sans partager inutilement les comptes."], ["Responsabilité", "Qui paie, qui valide, qui peut modifier et qui doit être informé."], ["Reprise", "La possibilité de reprendre dépend des accès réels, pas de suppositions."]]
    : [["Owner", "The account or asset should be tied to a clear person or organization."], ["Access", "Useful roles are named without unnecessary account sharing."], ["Responsibility", "Who pays, who validates, who can modify and who needs to be informed."], ["Recovery", "Recovery depends on real access, not assumptions."]];
  const auth = fr
    ? [["Comptes nominatifs", "Privilégier des comptes identifiables plutôt que des accès partagés."], ["Rôles limités", "Donner les droits nécessaires selon l’action à faire."], ["MFA lorsque possible", "Activer l’authentification multifacteur quand l’outil le permet."], ["Accès de secours", "Documenter le chemin de reprise sans exposer les secrets."]]
    : [["Named accounts", "Prefer identifiable accounts instead of shared access."], ["Limited roles", "Grant the rights needed for the action."], ["MFA when possible", "Enable multi-factor authentication when the tool allows it."], ["Fallback access", "Document the recovery path without exposing secrets."]];
  const recovery = fr
    ? [["Inventaire", "Lister les comptes, fournisseurs, domaines, zones DNS et applications."], ["Preuves d’accès", "Vérifier ce qui est réellement accessible."], ["Copies", "Repérer les exports, sauvegardes et données nécessaires."], ["Séquence", "Planifier quoi reprendre avant de modifier."], ["Validation", "Confirmer que le site, le DNS et les accès répondent."]]
    : [["Inventory", "List accounts, providers, domains, DNS zones and applications."], ["Access proof", "Check what is actually accessible."], ["Copies", "Find exports, backups and required data."], ["Sequence", "Plan what to recover before changing things."], ["Validation", "Confirm the site, DNS and access respond."]];
  const docs = fr
    ? ["Carte des couches", "Liste des comptes et propriétaires", "Rôles et accès disponibles", "Entrées DNS importantes", "Points de reprise et sauvegardes", "Limites et prochaines actions"]
    : ["Layer map", "List of accounts and owners", "Available roles and access", "Important DNS records", "Recovery points and backups", "Limits and next actions"];
  const limits = fr
    ? [["Sécurité de base", "Ces travaux réduisent les risques courants et rendent l’environnement plus lisible."], ["Pas un audit avancé", "Ils ne remplacent pas un audit de cybersécurité, une réponse à incident ou une conformité spécialisée."], ["Dépendance aux fournisseurs", "Certaines actions dépendent des politiques, permissions et délais des plateformes tierces."], ["Aucune garantie absolue", "La reprise et la protection dépendent des accès, copies et limites techniques existantes."]]
    : [["Basic security", "This work reduces common risks and makes the environment more readable."], ["Not an advanced audit", "It does not replace cybersecurity auditing, incident response or specialized compliance."], ["Provider dependency", "Some actions depend on policies, permissions and timelines of third-party platforms."], ["No absolute guarantee", "Recovery and protection depend on existing access, copies and technical limits."]];
  const faqs = fr
    ? [["Est-ce que SuiviCloud fait de la cybersécurité avancée?", "Non. Cette page couvre les fondations: accès, rôles, DNS, comptes, sauvegardes et limites. Un audit spécialisé est un mandat différent."], ["Pouvez-vous reprendre un environnement sans tous les accès?", "On peut commencer par l’inventaire, mais certaines actions resteront bloquées tant que les accès ou preuves de propriété manquent."], ["Faut-il utiliser Cloudflare?", "Pas nécessairement. Le bon choix dépend du domaine, du DNS existant, du besoin et des accès disponibles."], ["Est-ce que vous conservez les mots de passe?", "Les secrets ne doivent pas être exposés inutilement. Les accès et méthodes de reprise sont documentés selon les outils en place."]]
    : [["Does SuiviCloud provide advanced cybersecurity?", "No. This page covers foundations: login credentials, roles, DNS, accounts, backups and limits. A specialized audit is a different project."], ["Can you recover an environment without all login credentials?", "Inventory can start, but some actions remain blocked until login credentials or ownership proof are available."], ["Do we need to use Cloudflare?", "Not necessarily. The right choice depends on the domain, current DNS, need and available account ownership."], ["Do you store passwords?", "Secrets should not be exposed unnecessarily. Login credentials and recovery methods are documented according to the tools in place."]];
  return `<section class="page-hero infrastructure-topology-hero">
    <div class="wrap infrastructure-hero-grid">
      <div class="reveal">
        <p class="breadcrumb"><a href="${langData[lang].servicesPath}">${esc(fr ? "Services" : "Services")}</a> / ${esc(service.title)}</p>
        <p class="micro-label">${esc(fr ? "Savoir ce qui pointe où, et qui peut agir" : "Know what points where, and who can act")}</p>
        <h1>${esc(service.title)}</h1>
        <p class="lead">${esc(fr ? "Une infrastructure calme montre les couches, les comptes, les responsabilités et les chemins de reprise sans dramatiser la sécurité." : "Calm infrastructure shows layers, accounts, responsibilities and recovery paths without dramatizing security.")}</p>
        <a class="button primary" href="${contactHref(lang, need)}">${esc(fr ? "Clarifier mes accès" : "Clarify my access")}</a>
      </div>
      ${InfrastructureTopologyVisual(lang, layers)}
    </div>
  </section>
  <section class="section infrastructure-layers-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Carte des couches" : "Layer map", fr ? "Domaine, DNS, protection, serveur, application, sauvegarde." : "Domain, DNS, protection, server, application, backup.", fr ? "Chaque couche doit avoir un rôle, un propriétaire, un accès, une responsabilité et un chemin de reprise." : "Each layer needs a role, owner, access, responsibility and recovery path.")}
      <div class="infrastructure-layer-list">${layers.map(([name, role, owner, access, responsibility, recovery], index) => `<article class="reveal"><span>0${index + 1}</span><h3>${esc(name)}</h3><dl><dt>${esc(fr ? "Rôle" : "Role")}</dt><dd>${esc(role)}</dd><dt>${esc(fr ? "Propriétaire" : "Owner")}</dt><dd>${esc(owner)}</dd><dt>${esc(fr ? "Accès" : "Access")}</dt><dd>${esc(access)}</dd><dt>${esc(fr ? "Responsabilité" : "Responsibility")}</dt><dd>${esc(responsibility)}</dd><dt>${esc(fr ? "Reprise" : "Recovery")}</dt><dd>${esc(recovery)}</dd></dl></article>`).join("")}</div>
    </div>
  </section>
  <section class="section infrastructure-ownership-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Propriété et accès" : "Ownership and access", fr ? "Les comptes flous ralentissent chaque correction." : "Unclear accounts slow every fix.", fr ? "La carte sert à distinguer propriété, accès, responsabilité et possibilité de reprise." : "The map separates ownership, access, responsibility and recovery.")}
      <div class="infrastructure-proof-grid">${ownership.map(([title, copy]) => `<article class="reveal"><h3>${esc(title)}</h3><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section infrastructure-auth-section">
    <div class="wrap service-split">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Authentification" : "Authentication")}</p>
        <h2>${esc(fr ? "Moins de comptes partagés, plus de rôles clairs." : "Fewer shared accounts, clearer roles.")}</h2>
        <p>${esc(fr ? "L’objectif n’est pas d’ajouter de la complexité, mais de savoir qui peut agir sans exposer inutilement les accès." : "The goal is not to add complexity, but to know who can act without exposing access unnecessarily.")}</p>
      </div>
      <div class="service-row-list">${rowArticles(auth)}</div>
    </div>
  </section>
  <section class="section infrastructure-recovery-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Reprise" : "Recovery", fr ? "Reprise d’un environnement existant." : "Recovering an existing environment.", fr ? "Avant de déplacer ou corriger, on établit ce qui existe vraiment." : "Before moving or fixing, the actual environment is established.")}
      <div class="infrastructure-recovery-line">${recovery.map(([title, copy], index) => `<article class="reveal"><span>0${index + 1}</span><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section infrastructure-doc-section">
    <div class="wrap website-delivery-grid">
      <article class="website-ledger reveal">
        <p class="micro-label">${esc(fr ? "Documentation" : "Documentation")}</p>
        <h2>${esc(fr ? "Ce qui doit rester lisible." : "What should remain readable.")}</h2>
        <ul class="signal-list">${docs.map((value) => `<li>${esc(value)}</li>`).join("")}</ul>
      </article>
      <article class="website-ledger reveal">
        <p class="micro-label">${esc(fr ? "Utilité" : "Usefulness")}</p>
        <h2>${esc(fr ? "La prochaine personne doit comprendre." : "The next person should understand.")}</h2>
        <p>${esc(fr ? "La documentation n’est pas une vitrine technique. Elle sert à reprendre, expliquer, transférer ou corriger avec moins d’incertitude." : "Documentation is not a technical showcase. It helps recover, explain, transfer or fix with less uncertainty.")}</p>
      </article>
    </div>
  </section>
  <section class="section infrastructure-limits-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Limites" : "Limits", fr ? "Limites de la sécurité de base." : "Limits of basic security.", fr ? "Nommer les limites fait partie du travail: cela évite les fausses garanties." : "Naming limits is part of the work: it avoids false guarantees.")}
      <div class="infrastructure-proof-grid">${limits.map(([title, copy]) => `<article class="reveal"><h3>${esc(title)}</h3><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section infrastructure-faq-section">
    <div class="wrap faq-layout">
      ${SectionIntro("FAQ", fr ? "Questions propres aux accès et fondations." : "Questions about access and foundations.", "")}
      <div class="faq-list">${faqs.map(([q, a], index) => `<details class="faq-item reveal" ${index === 0 ? "open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
    </div>
  </section>
  ${ServiceFinalCTA(lang, need, fr ? ["Domaine", "DNS", "Accès", "Reprise"] : ["Domain", "DNS", "Access", "Recovery"], fr ? "Une carte claire aide chaque futur changement." : "A clear map helps every future change.", fr ? "Décrivez les accès que vous avez, ceux qui manquent et ce qui doit être repris." : "Describe the access you have, what is missing and what needs to be recovered.", fr ? "Clarifier mes accès" : "Clarify my access")}`;
}

function InfrastructureTopologyVisual(lang, layers) {
  const fr = lang === "fr";
  return `<div class="infrastructure-topology-visual reveal" aria-label="${esc(fr ? "Topologie en couches" : "Layered topology")}">
    ${layers.map(([name, role], index) => `<article class="topology-layer topology-layer-${index + 1}"><span>0${index + 1}</span><strong>${esc(name)}</strong><small>${esc(role)}</small></article>${index < layers.length - 1 ? "<i></i>" : ""}`).join("")}
  </div>`;
}

function InfrastructureServicePage(lang, service, item) {
  const fr = lang === "fr";
  const need = "infrastructure";
  const layers = fr
    ? [["Domaine", "Adresse officielle", "Client ou registraire confirmé", "Propriétaire du compte", "Renouvellement et accès"], ["DNS", "Dirige le trafic", "Compte DNS ou Cloudflare", "Personne autorisée", "Entrées et raisons"], ["Protection", "Filtre et réduit certains risques", "Compte de protection", "Responsable désigné", "Règles actives"], ["Serveur", "Héberge l’application", "Compte VPS ou hébergeur", "Accès technique limité", "Chemins et sauvegardes"], ["Application", "Site ou outil métier", "Compte applicatif", "Gestionnaire du site", "Versions et extensions"], ["Sauvegarde", "Permet une reprise", "Espace de copie", "Responsable défini", "Date et test prévu"]]
    : [["Domain", "Official address", "Client or confirmed registrar", "Account owner", "Renewal and access"], ["DNS", "Routes traffic", "DNS or Cloudflare account", "Authorized person", "Records and reasons"], ["Protection", "Filters and reduces some risks", "Protection account", "Assigned owner", "Active rules"], ["Server", "Hosts the application", "VPS or hosting account", "Limited technical access", "Paths and backups"], ["Application", "Website or business tool", "Application account", "Site manager", "Versions and extensions"], ["Backup", "Enables recovery", "Copy storage", "Defined owner", "Date and planned test"]];
  return `${interiorHero(lang, service.title, service.summary, service.kicker, item.visual)}
  <section class="section responsibility-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Carte de responsabilités" : "Responsibility map", fr ? "Savoir ce qui pointe où, et qui peut agir." : "Know what points where, and who can act.", fr ? "Une infrastructure calme n’est pas spectaculaire. Elle est lisible." : "Calm infrastructure is not dramatic. It is readable.")}
      <div class="responsibility-map">${layers.map(([name, role, owner, actor, doc]) => `<article class="reveal"><h3>${esc(name)}</h3><p>${esc(role)}</p><dl><dt>${esc(fr ? "Compte" : "Account")}</dt><dd>${esc(owner)}</dd><dt>${esc(fr ? "Intervention" : "Intervention")}</dt><dd>${esc(actor)}</dd><dt>${esc(fr ? "Documentation" : "Documentation")}</dt><dd>${esc(doc)}</dd></dl></article>`).join("")}</div>
    </div>
  </section>
  ${ServiceContextCTA(lang, need, fr ? "Les accès flous ralentissent tout le reste." : "Unclear access slows everything else down.", fr ? "On peut commencer par nommer les comptes, les rôles et les points de reprise." : "We can start by naming accounts, roles and recovery points.", fr ? "Clarifier mes accès" : "Clarify my access")}
  <section class="section access-section">
    <div class="wrap service-duo">
      <article class="reveal"><p class="micro-label">${esc(fr ? "Accès et authentification" : "Access and authentication")}</p><h2>${esc(fr ? "Moins de comptes partagés, plus de rôles clairs." : "Fewer shared accounts, clearer roles.")}</h2><p>${esc(fr ? "La propriété des comptes, les accès administrateurs et l’authentification multifacteur sont clarifiés selon les outils en place." : "Account ownership, administrator access and multi-factor authentication are clarified according to the tools in place.")}</p></article>
      <article class="reveal"><p class="micro-label">${esc(fr ? "Sécurité de base" : "Basic security")}</p><h2>${esc(fr ? "Des limites nommées sans dramatiser." : "Limits named without alarm.")}</h2><p>${esc(fr ? "Ces mesures réduisent les risques courants, mais ne remplacent pas un audit de sécurité avancé ou une conformité spécialisée." : "These measures reduce common risks, but do not replace an advanced security audit or specialized compliance work.")}</p></article>
    </div>
  </section>
  <section class="section recovery-section">
    <div class="wrap transfer-strip reveal">
      <p class="micro-label">${esc(fr ? "Reprise d’environnement" : "Environment recovery")}</p>
      <h2>${esc(fr ? "On reprend d’abord l’inventaire." : "Recovery starts with inventory.")}</h2>
      <p>${esc(fr ? "Avant de corriger, il faut savoir quels comptes existent, ce qui pointe vers quoi, quelles personnes peuvent agir et quelles copies sont disponibles." : "Before fixing, we need to know which accounts exist, what points where, who can act and which copies are available.")}</p>
    </div>
  </section>
  ${ServiceFinalCTA(lang, need, fr ? ["Domaine", "DNS", "Serveur", "Accès"] : ["Domain", "DNS", "Server", "Access"], fr ? "Une carte claire aide chaque futur changement." : "A clear map helps every future change.", fr ? "Décrivez les accès que vous avez, ceux qui manquent et ce qui doit être repris." : "Describe the access you have, what is missing and what needs to be recovered.", fr ? "Clarifier mes accès" : "Clarify my access")}`;
}

function SupportDiagnosticPage(lang, service, item) {
  const fr = lang === "fr";
  const need = "support";
  const steps = fr
    ? [["Symptôme", "Ce qui est observé, sans supposer la cause."], ["Contexte", "Où, quand, avec quel outil ou fournisseur."], ["Hypothèse", "La piste la plus plausible à vérifier."], ["Vérification", "Le test ou l’accès qui confirme la piste."], ["Correctif", "La correction possible ou l’action suivante."], ["Prévention", "La note ou mesure qui réduit le retour du problème."]]
    : [["Symptom", "What is observed, without assuming the cause."], ["Context", "Where, when, with which tool or provider."], ["Hypothesis", "The most plausible path to verify."], ["Verification", "The test or access that confirms the path."], ["Fix", "The possible correction or next action."], ["Prevention", "The note or measure that reduces recurrence."]];
  const examples = fr
    ? [["Formulaire", "Le message n’arrive plus ou une erreur apparaît."], ["Certificat", "Le navigateur affiche une alerte de certificat."], ["Domaine", "Le site ne répond plus à l’adresse habituelle."], ["DNS", "Un changement ne pointe pas au bon endroit."], ["Migration", "Un transfert doit être repris ou validé."], ["Accès perdu", "Un compte ou fournisseur bloque la suite."], ["Affichage", "Une page se brise sur mobile ou navigateur précis."]]
    : [["Form", "The message no longer arrives or an error appears."], ["Certificate", "The browser shows a certificate warning."], ["Domain", "The site no longer responds at the usual address."], ["DNS", "A change does not point to the right place."], ["Migration", "A transfer needs recovery or validation."], ["Lost access", "An account or provider blocks the next step."], ["Display", "A page breaks on mobile or a specific browser."]];
  const before = fr
    ? ["Adresse du site ou de l’outil", "Capture ou message d’erreur", "Moment où le problème apparaît", "Ce qui a changé récemment", "Fournisseur ou accès disponible", "Urgence réelle et impact observé"]
    : ["Website or tool address", "Screenshot or error message", "When the issue appears", "What recently changed", "Provider or available access", "Real urgency and observed impact"];
  const quick = fr
    ? [["Formulaire simple", "Vérifier destination, configuration et message d’erreur."], ["Certificat expiré ou mal appliqué", "Identifier le fournisseur et le chemin de renouvellement."], ["Affichage ciblé", "Corriger une règle, un bloc ou une mise en page isolée."], ["DNS documentable", "Lire les entrées et repérer une incohérence simple."]]
    : [["Simple form", "Check destination, configuration and error message."], ["Expired or misapplied certificate", "Identify provider and renewal path."], ["Targeted display issue", "Fix an isolated rule, block or layout."], ["Documentable DNS", "Read records and spot a simple inconsistency."]];
  const estimate = fr
    ? [["Accès incomplets", "Le diagnostic peut commencer, mais la correction dépend d’un compte à récupérer."], ["Plusieurs fournisseurs", "Domaine, DNS, hébergement ou courriel doivent être coordonnés."], ["Migration", "La reprise demande une séquence, des copies et des validations."], ["Données ou risque élevé", "Une portée séparée évite les décisions improvisées."]]
    : [["Incomplete access", "Diagnosis can start, but the fix depends on recovering an account."], ["Multiple providers", "Domain, DNS, hosting or email need coordination."], ["Migration", "Recovery needs a sequence, copies and validation."], ["Data or higher risk", "Separate scope avoids improvised decisions."]];
  const access = fr
    ? [["Demande minimale", "Seuls les accès utiles à la vérification sont demandés."], ["Rôle limité", "Quand possible, un rôle temporaire ou restreint suffit."], ["Secrets", "Les mots de passe ne doivent pas être exposés inutilement."], ["Trace", "Les changements et accès utilisés sont notés clairement."]]
    : [["Minimal request", "Only access useful to verification is requested."], ["Limited role", "When possible, a temporary or restricted role is enough."], ["Secrets", "Passwords should not be exposed unnecessarily."], ["Trace", "Changes and access used are clearly noted."]];
  const faqs = fr
    ? [["Pouvez-vous intervenir sans tous les accès?", "On peut souvent commencer par le diagnostic, mais certaines corrections resteront bloquées sans accès ou preuve de propriété."], ["Est-ce que tous les problèmes sont réglés rapidement?", "Non. Certains symptômes cachent une migration, un fournisseur tiers ou une dette technique qui demande estimation."], ["Est-ce une urgence 24/7?", "Non. L’intervention et les délais sont clarifiés selon le contexte et la disponibilité."], ["Dois-je connaître la cause?", "Non. Décrivez le symptôme, le contexte et ce que vous voyez. La cause vient après vérification."]]
    : [["Can you intervene without all access?", "Diagnosis can often start, but some fixes remain blocked without access or proof of ownership."], ["Are all issues fixed quickly?", "No. Some symptoms hide a migration, third-party provider or technical debt that needs estimation."], ["Is this 24/7 emergency support?", "No. Intervention and timelines are clarified according to context and availability."], ["Do I need to know the cause?", "No. Describe the symptom, context and what you see. The cause comes after verification."]];
  return `<section class="page-hero support-diagnostic-hero">
    <div class="wrap support-hero-grid">
      <div class="reveal">
        <p class="breadcrumb"><a href="${langData[lang].servicesPath}">${esc(fr ? "Services" : "Services")}</a> / ${esc(service.title)}</p>
        <p class="micro-label">${esc(fr ? "Du symptôme vers une prochaine action claire" : "From symptom to a clear next action")}</p>
        <h1>${esc(service.title)}</h1>
        <p class="lead">${esc(fr ? "On part de ce qui se voit, on vérifie le contexte, puis on nomme le correctif possible ou la prochaine action." : "We start from what is visible, verify context, then name the possible fix or next action.")}</p>
        <a class="button primary" href="${contactHref(lang, need)}">${esc(fr ? "Décrire le problème" : "Describe the issue")}</a>
      </div>
      ${SupportDiagnosticConsole(lang, steps)}
    </div>
  </section>
  <section class="section support-problems-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Problèmes acceptés" : "Accepted issues", fr ? "Des symptômes concrets, sans dramatiser." : "Concrete symptoms, without dramatizing.", fr ? "Le point de départ peut être petit: une erreur, un affichage, un accès ou une configuration à clarifier." : "The starting point can be small: an error, display issue, access problem or configuration to clarify.")}
      <div class="support-problem-grid">${examples.map(([title, copy]) => `<article class="reveal"><h3>${esc(title)}</h3><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section support-path-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Diagnostic" : "Diagnosis", fr ? "Parcours de diagnostic." : "Diagnostic path.", fr ? "La progression reste pédagogique: chaque étape réduit l’incertitude au lieu d’ajouter de l’alarme." : "The progression stays educational: each step reduces uncertainty instead of adding alarm.")}
      <div class="support-diagnostic-line">${steps.map(([title, copy], index) => `<article class="reveal"><span>0${index + 1}</span><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section support-before-section">
    <div class="wrap service-split">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Avant l’intervention" : "Before intervention")}</p>
        <h2>${esc(fr ? "Les informations utiles avant de commencer." : "Useful information before starting.")}</h2>
        <p>${esc(fr ? "Plus le contexte est précis, plus le diagnostic peut distinguer un correctif rapide d’une estimation nécessaire." : "The clearer the context, the easier it is to separate a quick fix from needed estimation.")}</p>
      </div>
      <ul class="support-info-list reveal">${before.map((value) => `<li>${esc(value)}</li>`).join("")}</ul>
    </div>
  </section>
  <section class="section support-scope-section">
    <div class="wrap website-delivery-grid">
      <article class="website-ledger reveal">
        <p class="micro-label">${esc(fr ? "Rapide" : "Quick")}</p>
        <h2>${esc(fr ? "Ce qui peut être réglé rapidement." : "What can be fixed quickly.")}</h2>
        <div class="support-mini-list">${quick.map(([title, copy]) => `<section><strong>${esc(title)}</strong><p>${esc(copy)}</p></section>`).join("")}</div>
      </article>
      <article class="website-ledger reveal">
        <p class="micro-label">${esc(fr ? "Estimation" : "Estimate")}</p>
        <h2>${esc(fr ? "Ce qui demande une estimation." : "What needs an estimate.")}</h2>
        <div class="support-mini-list">${estimate.map(([title, copy]) => `<section><strong>${esc(title)}</strong><p>${esc(copy)}</p></section>`).join("")}</div>
      </article>
    </div>
  </section>
  <section class="section support-access-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Accès" : "Access", fr ? "Comment les accès sont manipulés." : "How access is handled.", fr ? "L’objectif est de vérifier sans exposer inutilement les comptes ou les secrets." : "The goal is to verify without unnecessarily exposing accounts or secrets.")}
      <div class="support-access-grid">${access.map(([title, copy]) => `<article class="reveal"><h3>${esc(title)}</h3><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section support-faq-section">
    <div class="wrap faq-layout">
      ${SectionIntro("FAQ", fr ? "Questions propres au dépannage." : "Troubleshooting-specific questions.", "")}
      <div class="faq-list">${faqs.map(([q, a], index) => `<details class="faq-item reveal" ${index === 0 ? "open" : ""}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
    </div>
  </section>
  ${ServiceFinalCTA(lang, need, fr ? ["Symptôme", "Contexte", "Vérification", "Suite"] : ["Symptom", "Context", "Verification", "Next"], fr ? "On commence par nommer le problème." : "We start by naming the issue.", fr ? "Décrivez ce qui se passe, depuis quand et avec quel outil." : "Describe what is happening, since when and with which tool.", fr ? "Décrire le problème" : "Describe the issue")}`;
}

function SupportDiagnosticConsole(lang, steps) {
  const fr = lang === "fr";
  return `<div class="support-console reveal" aria-label="${esc(fr ? "Console de diagnostic pédagogique" : "Educational diagnostic console")}">
    <div class="support-console-top">
      <p class="micro-label">${esc(fr ? "Diagnostic guidé" : "Guided diagnosis")}</p>
      <span>${esc(fr ? "Exemple pédagogique" : "Educational example")}</span>
    </div>
    <div class="support-console-steps">
      ${steps.map(([title, copy], index) => `<article><span>0${index + 1}</span><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>${index < steps.length - 1 ? "<i></i>" : ""}`).join("")}
    </div>
  </div>`;
}

function SupportServicePage(lang, service, item) {
  const fr = lang === "fr";
  const need = "support";
  const path = fr
    ? [["Symptôme", "Ce que vous voyez."], ["Contexte", "Quand, où, avec quel outil."], ["Cause probable", "Ce qui semble expliquer le problème."], ["Intervention", "La correction ou la prochaine action."], ["Prévention", "Ce qui réduit le risque de retour."]]
    : [["Symptom", "What you see."], ["Context", "When, where and with which tool."], ["Likely cause", "What seems to explain the issue."], ["Intervention", "The fix or next action."], ["Prevention", "What reduces the chance of recurrence."]];
  const examples = fr
    ? ["Formulaire qui ne part plus", "Domaine ou DNS mal configuré", "Certificat SSL en erreur", "Courriel professionnel à clarifier", "Migration ou reprise après un fournisseur", "Affichage mobile brisé"]
    : ["Form that no longer sends", "Misconfigured domain or DNS", "SSL certificate error", "Professional email to clarify", "Migration or recovery after a provider", "Broken mobile display"];
  const before = fr
    ? ["Adresse du site ou de l’outil", "Capture ou message d’erreur", "Moment où le problème apparaît", "Accès disponibles ou fournisseur concerné"]
    : ["Website or tool address", "Screenshot or error message", "When the issue appears", "Available access or provider involved"];
  const estimate = fr
    ? ["Accès incomplets ou bloqués", "Problème lié à plusieurs fournisseurs", "Migration complète", "Données sensibles ou risque élevé"]
    : ["Incomplete or blocked access", "Issue involving several providers", "Full migration", "Sensitive data or higher risk"];
  return `${interiorHero(lang, service.title, service.summary, service.kicker, item.visual)}
  <section class="section support-intro-section">
    <div class="wrap service-split">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Diagnostic" : "Diagnosis")}</p>
        <h2>${esc(fr ? "Un problème précis n’exige pas toujours un grand projet." : "A precise issue does not always require a large project.")}</h2>
        <p>${esc(fr ? "Le bon premier pas consiste souvent à nommer le symptôme, vérifier le contexte et isoler une cause probable." : "The right first step is often to name the symptom, check context and isolate a likely cause.")}</p>
      </div>
      <div class="diagnostic-path">${path.map(([title, copy]) => `<article class="reveal"><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>
  <section class="section support-examples-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Problèmes acceptés" : "Accepted issues", fr ? "Des interventions courtes, quand le cadre est clair." : "Short interventions when the frame is clear.", "")}
      <div class="problem-cloud">${examples.map((value) => `<span>${esc(value)}</span>`).join("")}</div>
    </div>
  </section>
  ${ServiceContextCTA(lang, need, fr ? "Plus le contexte est précis, plus le diagnostic avance vite." : "The clearer the context, the faster diagnosis moves.", fr ? "Envoyez le symptôme, une capture et les accès déjà disponibles." : "Send the symptom, a screenshot and the access already available.", fr ? "Décrire le problème" : "Describe the issue")}
  <section class="section support-brief-section">
    <div class="wrap service-duo">
      <article class="reveal"><p class="micro-label">${esc(fr ? "Avant l’intervention" : "Before intervention")}</p><h2>${esc(fr ? "Ce qui aide à commencer." : "What helps us start.")}</h2><ul class="signal-list">${before.map((value) => `<li>${esc(value)}</li>`).join("")}</ul></article>
      <article class="reveal"><p class="micro-label">${esc(fr ? "Estimation séparée" : "Separate estimate")}</p><h2>${esc(fr ? "Ce qui peut élargir la portée." : "What can expand the scope.")}</h2><ul class="signal-list">${estimate.map((value) => `<li>${esc(value)}</li>`).join("")}</ul></article>
    </div>
  </section>
  ${ServiceFinalCTA(lang, need, fr ? ["Symptôme", "Cause", "Correctif", "Prévention"] : ["Symptom", "Cause", "Fix", "Prevention"], fr ? "On commence par nommer le problème." : "We start by naming the issue.", fr ? "Décrivez ce qui se passe, depuis quand et avec quel outil." : "Describe what is happening, since when and with which tool.", fr ? "Décrire le problème" : "Describe the issue")}`;
}

function pricingPage(lang) {
  const fr = lang === "fr";
  return `${interiorHero(lang, fr ? "Forfaits" : "Pricing", fr ? "Des points d’entrée clairs, avec estimation lorsque le mandat dépend des accès, fournisseurs ou outils existants." : "Clear entry points, with estimates when the scope depends on existing access, providers or tools.", fr ? "Collaboration" : "Collaboration", "health")}
  ${PricingPath(lang)}
  ${PricingClarifier(lang)}
  ${FinalCTA(lang)}`;
}

function PricingDepthPage(lang) {
  const fr = lang === "fr";
  const paths = fr
    ? [
        ["01", "Courte", "Intervention ciblée", "à partir de 150 $ CA", "Pour un problème précis, un accès à clarifier ou une petite correction.", ["formulaire qui bloque", "certificat à vérifier", "DNS ou domaine à lire"], ["Diagnostic ciblé", "Correction ou prochaine action", "Note courte de suivi"], "Symptôme nommé, cause probable et prochaine action claire.", ["Accès incomplets", "fournisseur tiers", "urgence réelle", "données à préserver"], "Décrire le problème", "/fr/contact/?need=support"],
        ["02", "Structurée", "Projet structuré", "à partir de 1 500 $ CA", "Pour créer, reprendre ou connecter un système avec étapes et validations.", ["site à structurer", "automatisation à cartographier", "migration préparée"], ["Portée confirmée", "livraison par étapes", "tests et documentation"], "Projet livré avec traces, limites et éléments repris.", ["nombre de pages", "bilinguisme", "intégrations", "contenu à structurer"], "Parler de mon projet", "/fr/contact/?need=project"],
        ["03", "Continue", "Suivi continu", "sur estimation", "Pour garder un environnement visible dans le temps, selon l’entente.", ["maintenance", "sauvegardes", "suivi des accès"], ["Cycle de suivi", "vérifications prévues", "documentation continue"], "Cadence de suivi, responsabilités et prochaines vérifications.", ["fréquence", "plateforme", "fournisseurs", "niveau de reprise attendu"], "Faire évaluer mon environnement", "/fr/contact/?need=hosting"]
      ]
    : [
        ["01", "Short", "Targeted intervention", "from CA$150", "For a precise issue, access clarification or small correction.", ["blocked form", "certificate check", "DNS or domain reading"], ["Targeted diagnosis", "Fix or next action", "Short follow-up note"], "Named symptom, likely cause and clear next action.", ["Incomplete access", "third-party provider", "real urgency", "data to preserve"], "Describe the issue", "/en/contact/?need=support"],
        ["02", "Structured", "Structured project", "from CA$1,500", "For creating, recovering or connecting a system with steps and validation.", ["website to structure", "automation to map", "prepared migration"], ["Confirmed scope", "step-by-step delivery", "testing and documentation"], "Delivered project with traces, limits and recovered elements.", ["number of pages", "bilingual depth", "integrations", "content to structure"], "Talk about my project", "/en/contact/?need=project"],
        ["03", "Continuous", "Ongoing support", "by estimate", "For keeping an environment visible over time, according to the agreement.", ["maintenance", "backups", "access review"], ["Support cycle", "planned checks", "ongoing documentation"], "Support cadence, responsibilities and next checks.", ["frequency", "platform", "providers", "expected recovery level"], "Assess my environment", "/en/contact/?need=hosting"]
      ];
  const notes = fr
    ? ["Prix en dollars canadiens", "Avant taxes", "Frais externes séparés", "Portée confirmée avant travail additionnel", "Aucune garantie 24/7"]
    : ["Prices in Canadian dollars", "Before taxes", "External fees separate", "Scope confirmed before additional work", "No 24/7 guarantee"];
  const rows = fr
    ? [["Point de départ", "Symptôme ou tâche précise", "Mandat à définir", "Environnement à suivre"], ["Profondeur", "Correction courte", "Conception et livraison", "Continuité dans le temps"], ["Prix", "à partir de 150 $ CA", "à partir de 1 500 $ CA", "sur estimation"], ["Prochaine étape", "Décrire le problème", "Parler de mon projet", "Faire évaluer mon environnement"]]
    : [["Starting point", "Precise symptom or task", "Scope to define", "Environment to follow"], ["Depth", "Short correction", "Design and delivery", "Continuity over time"], ["Price", "from CA$150", "from CA$1,500", "by estimate"], ["Next step", "Describe the issue", "Talk about my project", "Assess my environment"]];
  return `<section class="page-hero pricing-depth-hero">
    <div class="wrap pricing-depth-hero-grid">
      <div class="reveal">
        <p class="micro-label">${esc(fr ? "Choisir une profondeur d’intervention" : "Choose an intervention depth")}</p>
        <h1>${esc(fr ? "Forfaits" : "Pricing")}</h1>
        <p class="lead">${esc(fr ? "Le bon prix dépend de la profondeur: corriger un point précis, structurer un projet ou suivre un environnement dans le temps." : "The right price depends on depth: fix a precise point, structure a project or follow an environment over time.")}</p>
      </div>
      <div class="pricing-depth-notes reveal">${notes.map((note) => `<span>${esc(note)}</span>`).join("")}</div>
    </div>
  </section>
  <section class="section pricing-depth-section">
    <div class="wrap">
      ${SectionIntro(fr ? "Trajectoires" : "Paths", fr ? "Trois profondeurs, pas trois boîtes identiques." : "Three depths, not three identical boxes.", fr ? "Chaque trajectoire décrit le bon usage, les limites et la prochaine action." : "Each path describes the right use, limits and next action.")}
      <div class="pricing-depth-paths">
        ${paths.map(([number, length, title, price, fit, examples, included, deliverable, modifiers, cta, href]) => `<article class="pricing-depth-card reveal">
          <div class="pricing-depth-head"><span>${esc(number)}</span><small>${esc(length)}</small><h2>${esc(title)}</h2><strong>${esc(price)}</strong></div>
          <section><p class="micro-label">${esc(fr ? "Convient à" : "Best for")}</p><p>${esc(fit)}</p></section>
          <section><p class="micro-label">${esc(fr ? "Exemples" : "Examples")}</p><ul>${examples.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section>
          <section><p class="micro-label">${esc(fr ? "Inclus" : "Included")}</p><ul>${included.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section>
          <section><p class="micro-label">${esc(fr ? "Livrable" : "Deliverable")}</p><p>${esc(deliverable)}</p></section>
          <section><p class="micro-label">${esc(fr ? "Peut modifier le prix" : "Can affect price")}</p><ul>${modifiers.map((item) => `<li>${esc(item)}</li>`).join("")}</ul></section>
          <a class="button secondary" href="${href}">${esc(cta)}</a>
        </article>`).join("")}
      </div>
    </div>
  </section>
  <section class="section pricing-compare-section">
    <div class="wrap pricing-compare-layout">
      <div class="service-copy reveal">
        <p class="micro-label">${esc(fr ? "Comparaison" : "Comparison")}</p>
        <h2>${esc(fr ? "Comparer sans deviner." : "Compare without guessing.")}</h2>
        <p>${esc(fr ? "Les montants sont des points de départ avant taxes. Les frais externes et le travail additionnel sont confirmés séparément." : "Amounts are starting points before taxes. External fees and additional work are confirmed separately.")}</p>
      </div>
      <div class="pricing-depth-table reveal" role="table" aria-label="${esc(fr ? "Comparaison des trajectoires" : "Path comparison")}">
        ${rows.map((row) => `<div role="row">${row.map((cell, index) => `<span role="${index === 0 ? "rowheader" : "cell"}">${esc(cell)}</span>`).join("")}</div>`).join("")}
      </div>
    </div>
  </section>
  ${PricingClarifier(lang)}`;
}

function PricingClarifier(lang) {
  const fr = lang === "fr";
  const rows = fr
    ? [
        ["Prix du travail", "Le montant couvre le temps de diagnostic, de conception, de configuration, de test et d’explication."],
        ["Frais externes", "Domaines, licences, outils payants, hébergement et fournisseurs tiers restent séparés et confirmés avant achat."],
        ["Estimation", "Un mandat dépendant d’accès incomplets, de fournisseurs existants ou d’intégrations doit être évalué avant d’être chiffré."],
        ["Limites", "Aucune promesse 24/7 ni garantie de sécurité avancée n’est incluse sans mandat dédié."]
      ]
    : [
        ["Work price", "The amount covers diagnosis, design, configuration, testing and explanation time."],
        ["External fees", "Domains, licences, paid tools, hosting and third-party providers stay separate and are confirmed before purchase."],
        ["Estimate", "A request that depends on incomplete access, existing providers or integrations must be assessed before pricing."],
        ["Limits", "No 24/7 promise or advanced security guarantee is included without a dedicated scope."]
      ];
  const inputs = fr
    ? ["Accès au domaine et au DNS", "Site ou outil actuel", "Échéancier réel", "Fournisseurs déjà en place"]
    : ["Domain and DNS access", "Current site or tool", "Real timeline", "Existing providers"];
  return `<section class="section pricing-clarity-section">
    <div class="wrap pricing-clarity">
      <div class="pricing-ledger reveal">
        <p class="micro-label">${esc(fr ? "Transparence" : "Transparency")}</p>
        <h2>${esc(fr ? "Ce qui est inclus, séparé ou à estimer." : "What is included, separate or estimated.")}</h2>
        <div class="ledger-rows">
          ${rows.map(([title, copy]) => `<article><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}
        </div>
      </div>
      <aside class="estimate-brief reveal">
        <p class="micro-label">${esc(fr ? "Avant de chiffrer" : "Before pricing")}</p>
        <h3>${esc(fr ? "Les bons accès évitent les mauvaises surprises." : "The right access avoids surprises.")}</h3>
        ${inputs.map((item) => `<span>${esc(item)}</span>`).join("")}
      </aside>
    </div>
  </section>`;
}

function MethodTracePage(lang) {
  const fr = lang === "fr";
  const steps = fr
    ? [
        ["01", "Comprendre", "résumé du besoin", "Ce qui ralentit l'entreprise est reformulé en langage simple, avec le contexte utile et les premières contraintes visibles.", "À confirmer", "SuiviCloud clarifie. Le client valide le portrait."],
        ["02", "Délimiter", "portée et exclusions", "Le mandat indique ce qui est inclus, ce qui ne l'est pas et ce qui dépend d'un accès ou d'un fournisseur.", "Délimité", "SuiviCloud propose les limites. Le client confirme les priorités."],
        ["03", "Proposer", "proposition et coût", "La solution, le prix de départ, les frais externes et les prochaines décisions sont présentés avant le travail.", "À approuver", "SuiviCloud chiffre. Le client décide."],
        ["04", "Construire et vérifier", "environnement de validation", "Le travail avance dans un espace où les pages, flux ou réglages peuvent être vérifiés avant la mise en ligne.", "En validation", "SuiviCloud construit et teste. Le client révise les éléments visibles."],
        ["05", "Mettre en ligne", "validation de lancement", "Le lancement se fait avec les vérifications nécessaires: accès, formulaires, redirections, DNS ou sauvegarde selon le mandat.", "Prêt", "SuiviCloud met en ligne. Le client confirme le résultat."],
        ["06", "Suivre", "documentation et prochaine action", "La livraison garde une trace reprenable: documentation courte, responsabilités, points de surveillance et prochaine action.", "Documenté", "SuiviCloud remet les traces. Le client sait quoi garder."],
      ]
    : [
        ["01", "Understand", "need summary", "What slows the business down is restated plainly, with useful context and early constraints made visible.", "To confirm", "SuiviCloud clarifies. The client validates the picture."],
        ["02", "Define scope", "scope and exclusions", "The project scope states what is included, what is not and what depends on login credentials or a provider.", "Scoped", "SuiviCloud proposes the limits. The client confirms priorities."],
        ["03", "Propose", "proposal and cost", "The solution, starting cost, external fees and next decisions are presented before work begins.", "To approve", "SuiviCloud prices the work. The client decides."],
        ["04", "Build and verify", "validation environment", "Work moves through a place where pages, flows or settings can be checked before launch.", "In validation", "SuiviCloud builds and tests. The client reviews visible elements."],
        ["05", "Launch", "launch validation", "Launch happens with the right checks: login credentials, forms, redirects, DNS or backup depending on the project.", "Ready", "SuiviCloud launches. The client confirms the result."],
        ["06", "Follow up", "documentation and next action", "Delivery leaves recoverable traces: short documentation, responsibilities, watch points and the next action.", "Documented", "SuiviCloud hands over the traces. The client knows what to keep."],
      ];
  const needs = fr
    ? [
        ["Contexte", "Une description courte du besoin, du problème ou du changement attendu."],
        ["Accès", "Les comptes disponibles, les propriétaires connus et les accès à demander."],
        ["Contenus", "Textes, visuels réels, exemples, contraintes et décisions déjà prises."],
        ["Validation", "Des retours aux bons moments pour éviter les suppositions inutiles."],
      ]
    : [
        ["Context", "A short description of the need, issue or expected change."],
        ["Access", "Available accounts, known owners and access that must be requested."],
        ["Content", "Real copy, visuals, examples, constraints and decisions already made."],
        ["Validation", "Feedback at the right moments to avoid unnecessary assumptions."],
      ];
  const documented = fr
    ? [
        ["Portée réalisée", "Ce qui a été fait, ce qui reste exclu et ce qui demanderait un mandat séparé."],
        ["Accès et rôles", "Les comptes, fournisseurs et responsabilités utiles pour reprendre le travail."],
        ["Validations", "Les vérifications effectuées et les points à surveiller après livraison."],
        ["Prochaine action", "La suite recommandée, même lorsqu'il n'y a rien d'urgent à faire."],
      ]
    : [
        ["Completed scope", "What was done, what remains excluded and what would need a separate project."],
        ["Access and roles", "The accounts, providers and responsibilities needed to recover the work."],
        ["Validation", "Checks completed and points to watch after delivery."],
        ["Next action", "The recommended next step, even when nothing urgent is needed."],
      ];
  return `<section class="method-trace-hero">
    <div class="wrap method-trace-hero-grid">
      <div class="method-trace-copy reveal">
        <p class="micro-label">${esc(fr ? "Chaque étape laisse une trace" : "Each step leaves a trace")}</p>
        <h1>${esc(fr ? "Une méthode qui montre ce que vous recevez." : "A process that shows what you receive.")}</h1>
        <p>${esc(fr ? "SuiviCloud transforme une demande floue en livraison reprenable: besoin résumé, portée confirmée, validation visible, documentation et prochaine action." : "SuiviCloud turns an unclear request into recoverable delivery: summarized need, confirmed scope, visible validation, documentation and next action.")}</p>
        <div class="cta-row">
          <a class="button primary" href="${contactHref(lang, "project")}">${esc(fr ? "Commencer par décrire le besoin" : "Start by describing the need")}</a>
          <a class="button secondary" href="#trace-timeline">${esc(fr ? "Voir les traces" : "View the traces")}</a>
        </div>
      </div>
      ${MethodTraceVisual(lang, steps)}
    </div>
  </section>
  <section class="section method-timeline-section" id="trace-timeline">
    <div class="wrap method-timeline-layout">
      <div class="method-timeline-intro reveal">
        <p class="micro-label">${esc(fr ? "Ligne de livraison" : "Delivery line")}</p>
        <h2>${esc(fr ? "Le projet avance par preuves, pas par impressions." : "The project moves through proof, not impressions.")}</h2>
        <p>${esc(fr ? "Chaque étape produit un livrable court et lisible. Les décisions restent reliées aux responsabilités, aux validations et aux limites du mandat." : "Each step produces a short, readable deliverable. Decisions stay tied to responsibilities, validation and scope limits.")}</p>
      </div>
      <div class="method-trace-line" aria-label="${esc(fr ? "Étapes de la méthode SuiviCloud" : "SuiviCloud process steps")}">
        ${steps.map(([number, title, deliverable, copy, status, responsibility], index) => `<article class="method-trace-step reveal" style="--step-index:${index}">
          <div class="method-step-marker"><span>${esc(number)}</span></div>
          <div class="method-step-body">
            <div class="method-step-head">
              <p class="micro-label">${esc(fr ? "Livrable" : "Deliverable")}</p>
              <h3>${esc(title)}</h3>
              <strong>${esc(deliverable)}</strong>
            </div>
            <p>${esc(copy)}</p>
            <div class="method-step-meta">
              <span>${esc(fr ? "État" : "State")}: ${esc(status)}</span>
              <span>${esc(fr ? "Responsabilité" : "Responsibility")}: ${esc(responsibility)}</span>
            </div>
          </div>
          <div class="method-step-document" aria-hidden="true">
            <span></span><span></span><span></span>
            <small>${esc(status)}</small>
          </div>
        </article>`).join("")}
      </div>
    </div>
  </section>
  <section class="section method-client-section">
    <div class="wrap method-support-grid">
      <div class="method-support-copy reveal">
        <p class="micro-label">${esc(fr ? "Côté client" : "Client side")}</p>
        <h2>${esc(fr ? "Ce dont SuiviCloud a besoin du client" : "What SuiviCloud needs from the client")}</h2>
        <p>${esc(fr ? "La méthode reste légère lorsque les bons éléments arrivent au bon moment. Il n'est pas nécessaire de connaître la solution technique." : "The process stays light when the right elements arrive at the right time. Knowing the technical solution is not required.")}</p>
      </div>
      <div class="method-support-list">
        ${needs.map(([title, copy], index) => `<article class="reveal">
          <span>0${index + 1}</span>
          <h3>${esc(title)}</h3>
          <p>${esc(copy)}</p>
        </article>`).join("")}
      </div>
    </div>
  </section>
  <section class="section method-delivery-section">
    <div class="wrap method-support-grid method-support-grid-reverse">
      <div class="method-support-copy reveal">
        <p class="micro-label">${esc(fr ? "À la livraison" : "At delivery")}</p>
        <h2>${esc(fr ? "Ce qui est documenté à la livraison" : "What is documented at delivery")}</h2>
        <p>${esc(fr ? "La livraison doit pouvoir être relue après coup. Les traces ne remplacent pas le travail: elles rendent le travail compréhensible." : "Delivery should be readable afterward. Traces do not replace the work: they make the work understandable.")}</p>
      </div>
      <div class="method-support-list method-document-list">
        ${documented.map(([title, copy], index) => `<article class="reveal">
          <span>${esc(fr ? "trace" : "trace")} 0${index + 1}</span>
          <h3>${esc(title)}</h3>
          <p>${esc(copy)}</p>
        </article>`).join("")}
      </div>
    </div>
  </section>
  <section class="section final-cta method-final-cta">
    <div class="wrap final-cta-inner">
      <div>
        <p class="micro-label">${esc(fr ? "Point d'entrée" : "Starting point")}</p>
        <h2>${esc(fr ? "Commencer par décrire le besoin." : "Start by describing the need.")}</h2>
        <p>${esc(fr ? "SuiviCloud pourra ensuite déterminer la bonne portée, les traces utiles et la prochaine action." : "SuiviCloud can then determine the right scope, useful traces and next action.")}</p>
      </div>
      <a class="button primary" href="${contactHref(lang, "project")}">${esc(fr ? "Commencer par décrire le besoin" : "Start by describing the need")}</a>
    </div>
  </section>`;
}

function MethodTraceVisual(lang, steps) {
  const fr = lang === "fr";
  return `<div class="method-trace-visual reveal" aria-label="${esc(fr ? "Aperçu abstrait des traces de projet" : "Abstract preview of project traces")}">
    <svg viewBox="0 0 520 430" role="img" aria-hidden="true">
      <path class="method-visual-grid" d="M58 66H462M58 154H462M58 242H462M58 330H462M104 44V374M208 44V374M312 44V374M416 44V374" />
      <path class="method-visual-line" d="M86 316C142 252 142 164 210 164C284 164 250 76 332 76C402 76 402 188 350 210C276 242 286 336 438 336" />
      ${steps.map(([number, title, deliverable], index) => {
        const coords = [[86, 316], [172, 198], [298, 94], [372, 204], [318, 302], [438, 336]][index];
        return `<g class="method-visual-node method-visual-node-${index + 1}" transform="translate(${coords[0]} ${coords[1]})">
          <circle r="18"></circle>
          <text y="5">${esc(number)}</text>
        </g>
        <g class="method-visual-doc method-visual-doc-${index + 1}" transform="translate(${coords[0] - 34} ${coords[1] - 72})">
          <rect width="92" height="48" rx="6"></rect>
          <path d="M13 17H68M13 29H54M13 39H74"></path>
          <text x="12" y="62">${esc(deliverable)}</text>
        </g>`;
      }).join("")}
    </svg>
    <div class="method-visual-status">
      <span>${esc(fr ? "besoin résumé" : "need summarized")}</span>
      <span>${esc(fr ? "portée visible" : "scope visible")}</span>
      <span>${esc(fr ? "suite notée" : "next step noted")}</span>
    </div>
  </div>`;
}

function methodPage(lang) {
  const fr = lang === "fr";
  return `${interiorHero(lang, fr ? "Méthode" : "Process", fr ? "Une démarche documentée pour éviter les zones floues: portée, proposition, test, mise en ligne et suivi." : "A documented process to avoid vague zones: scope, proposal, test, launch and follow-up.", fr ? "Livraison" : "Delivery", "workflow")}
  ${ProcessTimeline(lang)}
  ${DeliveryProof(lang)}
  ${FinalCTA(lang)}`;
}

function DeliveryProof(lang) {
  const fr = lang === "fr";
  const rows = fr
    ? [
        ["Portée", "Ce qui est inclus, exclu, attendu du client et dépendant d’un fournisseur."],
        ["Tests", "Formulaire, navigation mobile, redirections, accès, sauvegarde ou automatisation selon le mandat."],
        ["Remise", "Liens utiles, accès confirmés, notes courtes et prochaine action compréhensible."],
        ["Suivi", "Ce qui doit être surveillé, corrigé ou amélioré après la livraison."]
      ]
    : [
        ["Scope", "What is included, excluded, expected from the client and dependent on a provider."],
        ["Tests", "Form, mobile navigation, redirects, access, backup or automation depending on the scope."],
        ["Handoff", "Useful links, confirmed access, short notes and an understandable next action."],
        ["Follow-up", "What should be watched, fixed or improved after delivery."]
      ];
  const limits = fr
    ? ["pas d’outil ajouté sans raison", "pas d’automatisation sans propriétaire", "pas de dépendance cachée"]
    : ["no tool added without reason", "no automation without an owner", "no hidden dependency"];
  return `<section class="section handoff-section">
    <div class="wrap handoff-layout">
      <div class="handoff-copy reveal">
        <p class="micro-label">${esc(fr ? "Preuves de livraison" : "Delivery proof")}</p>
        <h2>${esc(fr ? "À la fin, le mandat doit être reprenable." : "At the end, the work should be recoverable.")}</h2>
        <p>${esc(fr ? "Le travail ne se limite pas à publier. Il doit laisser assez de traces pour comprendre ce qui vit où, qui y a accès et quoi surveiller." : "The work is not only about publishing. It should leave enough trace to understand what lives where, who has access and what to watch.")}</p>
      </div>
      <div class="handoff-rows reveal">
        ${rows.map(([title, copy], index) => `<article><span>0${index + 1}</span><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}
      </div>
      <aside class="method-limits reveal">
        <p class="micro-label">${esc(fr ? "Volontairement sobre" : "Intentionally restrained")}</p>
        ${limits.map((item) => `<strong>${esc(item)}</strong>`).join("")}
      </aside>
    </div>
  </section>`;
}

function aboutPage(lang) {
  const fr = lang === "fr";
  return `${AboutHero(lang)}
  ${AboutGary(lang)}
  ${AboutPath(lang)}
  ${AboutSkills(lang)}
  ${AboutWork(lang)}
  ${AboutIdentity(lang)}
  ${AboutLocal(lang)}
  ${AboutCTA(lang)}`;
}

function AboutHero(lang) {
  const fr = lang === "fr";
  return `<section class="about-hero">
    <div class="wrap about-hero-grid">
      <div class="about-hero-copy reveal">
        <p class="micro-label">${esc(fr ? "Derrière SuiviCloud" : "Behind SuiviCloud")}</p>
        <h1>${esc(fr ? "Une approche technique, expliquée humainement." : "Technical work, explained humanly.")}</h1>
        <p>${esc(fr ? "Gary est l'interlocuteur principal derrière SuiviCloud. La confiance vient ici d'une façon de travailler: comprendre le besoin, nommer les limites et rendre la technique plus lisible." : "Gary is the main point of contact behind SuiviCloud. Trust comes from a way of working: understanding the need, naming limits and making technical work more readable.")}</p>
      </div>
      <div class="about-photo-space reveal" aria-label="${esc(fr ? "Emplacement prévu pour une future vraie photo de Gary" : "Space reserved for a future real photo of Gary")}">
        <span>${esc(fr ? "Photo réelle à venir" : "Real photo to come")}</span>
        <i></i><b></b>
      </div>
    </div>
  </section>`;
}

function AboutGary(lang) {
  const fr = lang === "fr";
  const paragraphs = fr
    ? [
        "Mon parcours n'a pas suivi une seule ligne droite. Il s'est construit à travers plusieurs étapes qui m'ont amené à développer des aptitudes en technologie, en résolution de problèmes, en organisation et en entrepreneuriat.",
        "Ces expériences m'ont appris à chercher la cause réelle d'un problème, à avancer avec autonomie et à expliquer une solution sans la rendre plus compliquée qu'elle ne l'est.",
        "J'ai créé SuiviCloud pour rassembler ces aptitudes autour d'un objectif concret : aider les petites entreprises à mieux comprendre, relier et entretenir leurs outils numériques."
      ]
    : [
        "My path has not followed a single straight line. It was built through several stages that helped me develop aptitudes in technology, problem solving, organization and entrepreneurship.",
        "Those experiences taught me to look for the real cause of a problem, move forward with autonomy and explain a solution without making it more complicated than it is.",
        "I created SuiviCloud to bring those aptitudes together around a concrete goal: helping small businesses better understand, connect and maintain their digital tools."
      ];
  return `<section class="section about-gary-section">
    <div class="wrap about-gary-layout">
      <aside class="about-gary-note reveal">
        <p class="micro-label">${esc(fr ? "Mot personnel" : "Personal note")}</p>
        <strong>${esc(fr ? "La technique doit aider à voir plus clair, pas ajouter une couche de confusion." : "Technical work should make things clearer, not add another layer of confusion.")}</strong>
      </aside>
      <div class="about-gary-copy reveal">
        <h2>${esc(fr ? "Un mot de Gary." : "A note from Gary.")}</h2>
        ${paragraphs.map((copy) => `<p>${esc(copy)}</p>`).join("")}
      </div>
    </div>
  </section>`;
}

function AboutPath(lang) {
  const fr = lang === "fr";
  const steps = fr
    ? [["01", "Parcours non linéaire", "Plusieurs étapes ont nourri une manière pratique d'aborder les problèmes."], ["02", "Observation", "Avant de proposer une solution, il faut comprendre ce qui bloque réellement."], ["03", "Transmission", "Une explication utile doit rester compréhensible pour la personne qui vivra avec l'outil."]]
    : [["01", "Non-linear path", "Several stages shaped a practical way of approaching problems."], ["02", "Observation", "Before proposing a solution, the real blocker has to be understood."], ["03", "Transmission", "A useful explanation should remain understandable for the person who will live with the tool."]];
  return `<section class="section about-path-section">
    <div class="wrap about-path-editorial">
      <div class="about-section-heading reveal">
        <p class="micro-label">${esc(fr ? "Parcours non linéaire" : "Non-linear path")}</p>
        <h2>${esc(fr ? "Pas une grande légende. Une façon de relier les choses." : "Not a grand legend. A way to connect things.")}</h2>
      </div>
      <div class="about-path-line">${steps.map(([number, title, copy]) => `<article class="reveal"><span>${esc(number)}</span><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>`;
}

function AboutSkills(lang) {
  const fr = lang === "fr";
  const skills = fr
    ? [["Technologie", "Comprendre les outils, les accès et les dépendances sans les rendre opaques."], ["Résolution", "Chercher la cause réelle plutôt qu'empiler des correctifs."], ["Organisation", "Mettre de l'ordre dans les étapes, les responsabilités et les traces."], ["Entrepreneuriat", "Garder les solutions proportionnées aux petites entreprises."]]
    : [["Technology", "Understand tools, access and dependencies without making them opaque."], ["Problem solving", "Look for the real cause instead of stacking fixes."], ["Organization", "Bring order to steps, responsibilities and traces."], ["Entrepreneurship", "Keep solutions proportionate for small businesses."]];
  return `<section class="section about-skills-section">
    <div class="wrap about-skills-layout">
      <div class="about-section-heading reveal">
        <p class="micro-label">${esc(fr ? "Aptitudes développées" : "Developed aptitudes")}</p>
        <h2>${esc(fr ? "Des aptitudes utiles quand le numérique devient difficile à suivre." : "Aptitudes that help when digital tools become hard to follow.")}</h2>
      </div>
      <div class="about-skill-stack">
        ${skills.map(([title, copy], index) => `<article class="reveal">
          <span>0${index + 1}</span>
          <h3>${esc(title)}</h3>
          <p>${esc(copy)}</p>
        </article>`).join("")}
      </div>
    </div>
  </section>`;
}

function AboutWork(lang) {
  const fr = lang === "fr";
  const rows = fr
    ? [["Comprendre", "Le besoin, les contraintes et les accès disponibles sont clarifiés avant de choisir un outil."], ["Délimiter", "La portée, le prix, les exclusions et les dépendances sont nommés avant le travail additionnel."], ["Expliquer", "Les décisions techniques sont traduites en langage normal."], ["Documenter", "Les accès, responsabilités et prochaines étapes restent compréhensibles après la livraison."]]
    : [["Understand", "The need, constraints and available access are clarified before choosing a tool."], ["Define", "Scope, price, exclusions and dependencies are named before additional work."], ["Explain", "Technical decisions are translated into plain language."], ["Document", "Access, responsibilities and next steps remain understandable after delivery."]];
  return `<section class="section about-work-section">
    <div class="wrap about-work-layout">
      <div class="about-work-copy reveal">
        <p class="micro-label">${esc(fr ? "Manière de travailler" : "Working approach")}</p>
        <h2>${esc(fr ? "Une méthode calme, directe et documentée." : "A calm, direct and documented method.")}</h2>
      </div>
      <div class="about-work-rows">${rows.map(([title, copy]) => `<article class="reveal"><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}</div>
    </div>
  </section>`;
}

function AboutIdentity(lang) {
  const fr = lang === "fr";
  const isItems = fr
    ? ["une entreprise indépendante basée à Rimouski", "un point de contact direct pour les mandats", "une aide pour comprendre, relier et entretenir les outils numériques", "une approche proportionnée aux petites entreprises"]
    : ["an independent business based in Rimouski", "a direct point of contact for projects", "help understanding, connecting and maintaining digital tools", "an approach proportionate to small businesses"];
  const notItems = fr
    ? ["un centre de soutien disponible 24/7", "une firme de cybersécurité avancée", "un partenaire officiel d'un fournisseur", "une agence qui promet une solution universelle"]
    : ["a 24/7 support center", "an advanced cybersecurity firm", "an official partner of a provider", "an agency promising a universal solution"];
  return `<section class="section about-principles-section">
    <div class="wrap about-principles">
      <article class="reveal">
        <p class="micro-label">${esc(fr ? "Ce que SuiviCloud est" : "What SuiviCloud is")}</p>
        <ul>${isItems.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
      </article>
      <article class="reveal">
        <p class="micro-label">${esc(fr ? "Ce que SuiviCloud ne prétend pas être" : "What SuiviCloud does not claim to be")}</p>
        <ul>${notItems.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
      </article>
    </div>
  </section>`;
}

function AboutLocal(lang) {
  const fr = lang === "fr";
  return `<section class="section about-local-section">
    <div class="wrap about-local-layout">
      <div class="reveal">
        <p class="micro-label">${esc(fr ? "Ancrage à Rimouski" : "Rooted in Rimouski")}</p>
        <h2>${esc(fr ? "Une base locale, une relation simple." : "A local base, a simple relationship.")}</h2>
      </div>
      <p class="reveal">${esc(fr ? "SuiviCloud est basé à Rimouski et travaille avec des petites entreprises qui veulent mieux comprendre leurs sites, leurs automatisations, leurs accès et leurs prochaines actions." : "SuiviCloud is based in Rimouski and works with small businesses that want to better understand their websites, automations, access and next actions.")}</p>
    </div>
  </section>`;
}

function AboutCTA(lang) {
  const fr = lang === "fr";
  return `<section class="section final-cta about-final-cta">
    <div class="wrap final-cta-inner">
      <div class="cta-route" aria-hidden="true">
        ${(fr ? ["Besoin", "Discussion", "Portée", "Suite"] : ["Need", "Discussion", "Scope", "Next step"]).map((item) => `<span>${esc(item)}</span>`).join("<i></i>")}
      </div>
      <div>
        <p class="micro-label">SuiviCloud</p>
        <h2>${esc(fr ? "Parler directement de mon projet." : "Talk directly about my project.")}</h2>
        <p>${esc(fr ? "Expliquez ce que vous voulez clarifier, corriger ou construire. La première étape peut rester simple." : "Explain what you want to clarify, fix or build. The first step can stay simple.")}</p>
        <a class="button primary" href="${langData[lang].contactPath}">${esc(fr ? "Parler directement de mon projet" : "Talk directly about my project")}</a>
      </div>
    </div>
  </section>`;
}

function resourceGuidePath(lang) {
  return lang === "fr"
    ? "/fr/ressources/guides/relier-outils-avant-ajouter/"
    : "/en/resources/guides/connect-existing-tools-before-adding-more/";
}

function resourcesPage(lang, type = "index") {
  const fr = lang === "fr";
  const t = langData[lang];
  const guideHref = resourceGuidePath(lang);
  const title = type === "guides" ? "Guides" : type === "articles" ? "Articles" : (fr ? "Ressources" : "Resources");
  const intro = type === "articles"
    ? (fr ? "Les articles courts ne sont pas encore publiés. Les prochains sujets sont indiqués comme à venir." : "Short articles are not published yet. Upcoming topics are marked as future topics.")
    : type === "guides"
      ? (fr ? "Un premier guide est publié. Les autres pistes restent clairement indiquées comme sujets futurs." : "A first guide is published. Other directions are clearly marked as future topics.")
      : (fr ? "Des ressources pour aider les petites entreprises à mieux comprendre leurs outils avant d'en ajouter d'autres." : "Resources to help small businesses understand their tools before adding more.");
  const labels = {
    index: fr ? "Vue d'ensemble" : "Overview",
    guides: fr ? "Guides" : "Guides",
    articles: fr ? "Articles" : "Articles"
  };
  const topics = fr
    ? [
        ["À venir", "Comprendre domaine, DNS et protection sans tout mélanger"],
        ["À venir", "Reprendre un site laissé par un ancien fournisseur"],
        ["À venir", "Différence entre hébergement, maintenance et soutien"],
        ["À venir", "Quand automatiser, et quand garder une validation humaine"]
      ]
    : [
        ["Coming", "Understand domain, DNS and protection without mixing everything"],
        ["Coming", "Take over a site left by a previous provider"],
        ["Coming", "The difference between hosting, maintenance and support"],
        ["Coming", "When to automate, and when to keep human validation"]
      ];
  const paths = [
    [t.resourcesPath, labels.index, "index"],
    [`${t.resourcesPath}guides/`, labels.guides, "guides"],
    [`${t.resourcesPath}articles/`, labels.articles, "articles"]
  ];
  return `<section class="resources-hero">
    <div class="wrap resources-hero-grid">
      <div class="resources-hero-copy reveal">
        <p class="micro-label">${esc(type === "articles" ? (fr ? "Articles à venir" : "Future articles") : type === "guides" ? "Guides" : title)}</p>
        <h1>${esc(title)}</h1>
        <p>${esc(intro)}</p>
      </div>
      <nav class="resource-tabs reveal" aria-label="${esc(fr ? "Sections des ressources" : "Resource sections")}">
        ${paths.map(([href, label, id]) => `<a class="${id === type ? "is-active" : ""}" href="${href}">${esc(label)}</a>`).join("")}
      </nav>
    </div>
  </section>
  <section class="section resources-feature-section">
    <div class="wrap resources-feature-grid">
      <a class="resource-guide-card reveal" href="${guideHref}">
        <span>${esc(fr ? "Guide publié" : "Published guide")}</span>
        <h2>${esc(fr ? "Pourquoi relier vos outils avant d'en ajouter d'autres" : "Why You Should Connect Your Existing Tools Before Adding More")}</h2>
        <p>${esc(fr ? "Un guide pour reconnaître un système dispersé, cartographier le trajet actuel et décider quoi relier avant d'ajouter une nouvelle plateforme." : "A guide to recognize a scattered system, map the current path and decide what to connect before adding another platform.")}</p>
        <strong>${esc(fr ? "Lire le guide" : "Read the guide")}</strong>
      </a>
      <aside class="resources-future reveal">
        <p class="micro-label">${esc(fr ? "Sujets futurs" : "Future topics")}</p>
        ${topics.map(([label, topic]) => `<article><span>${esc(label)}</span><strong>${esc(topic)}</strong></article>`).join("")}
        <p>${esc(fr ? "Ces sujets ne sont pas publiés. Ils indiquent seulement les prochaines directions possibles." : "These topics are not published. They only indicate possible future directions.")}</p>
      </aside>
    </div>
  </section>
  <section class="section final-cta resources-cta">
    <div class="wrap final-cta-inner">
      <div>
        <p class="micro-label">SuiviCloud</p>
        <h2>${esc(fr ? "Un outil de plus n'est pas toujours la prochaine étape." : "One more tool is not always the next step.")}</h2>
        <p>${esc(fr ? "Décrivez ce qui se perd entre vos formulaires, suivis, rendez-vous ou accès. SuiviCloud peut vous aider à voir le trajet actuel." : "Describe what gets lost between your forms, follow-ups, bookings or access. SuiviCloud can help you see the current path.")}</p>
      </div>
      <a class="button primary" href="${contactHref(lang, "automation")}">${esc(fr ? "Décrire mon système actuel" : "Describe my current system")}</a>
    </div>
  </section>`;
}

function ResourceGuidePage(lang) {
  const fr = lang === "fr";
  const title = fr ? "Pourquoi relier vos outils avant d'en ajouter d'autres" : "Why You Should Connect Your Existing Tools Before Adding More";
  const sections = fr
    ? [
        ["Le problème n'est pas toujours le manque d'outils", "Quand une entreprise perd des demandes, oublie des suivis ou répète les mêmes copier-coller, la première réaction est souvent de chercher une nouvelle application. Pourtant, le problème vient parfois d'un trajet invisible entre les outils déjà en place."],
        ["Cinq signes d'un système dispersé", "Les demandes arrivent à plusieurs endroits, les confirmations sont envoyées manuellement, les rendez-vous ne sont pas liés au suivi, les accès sont difficiles à retrouver, et personne ne sait exactement quelle étape vient ensuite."],
        ["Cartographier le trajet actuel", "Avant d'ajouter un outil, il faut nommer le point d'entrée, l'endroit où l'information est conservée, la personne qui valide, le message envoyé au client et la prochaine action attendue."],
        ["Questions avant d'ajouter un outil", "Quel problème précis doit être réduit? Où vit l'information aujourd'hui? Qui doit pouvoir agir? Quelle trace doit rester disponible? Que se passe-t-il si l'outil ne répond pas?"],
        ["Exemple formulaire → suivi → confirmation → rendez-vous", "Un formulaire peut créer ou mettre à jour une fiche de suivi, envoyer une confirmation simple, puis proposer un rendez-vous ou une prochaine action. Le but n'est pas d'automatiser partout, mais de rendre le trajet lisible."],
        ["Ce qui ne devrait pas être automatisé trop vite", "Les décisions sensibles, les exceptions fréquentes, les messages qui demandent du jugement et les étapes sans propriétaire clair devraient rester humaines jusqu'à ce que le processus soit mieux défini."],
        ["Checklist", "Repérez les points d'entrée, les doublons, les validations humaines, les accès nécessaires, la trace finale et la prochaine action. Si ces éléments sont flous, commencez par les clarifier."]
      ]
    : [
        ["The problem is not always a lack of tools", "When a business loses requests, forgets follow-ups or repeats the same copy-paste work, the first reaction is often to look for a new app. But the problem sometimes comes from an invisible path between tools already in place."],
        ["Five signs of a scattered system", "Requests arrive in several places, confirmations are sent manually, bookings are not linked to follow-up, access is hard to find, and no one knows exactly what step comes next."],
        ["Map the current path", "Before adding a tool, name the entry point, where information is kept, who validates it, what message the client receives and which next action is expected."],
        ["Questions before adding a tool", "Which precise problem should be reduced? Where does the information live today? Who needs to act? What trace should remain available? What happens if the tool does not respond?"],
        ["Example form → follow-up → confirmation → booking", "A form can create or update a follow-up record, send a simple confirmation, then propose a booking or next action. The goal is not to automate everywhere, but to make the path readable."],
        ["What should not be automated too quickly", "Sensitive decisions, frequent exceptions, messages that require judgment and steps without a clear owner should stay human until the process is better defined."],
        ["Checklist", "Identify entry points, duplicates, human validations, required access, the final trace and the next action. If these elements are unclear, start by clarifying them."]
      ];
  const checklist = fr
    ? ["Le point d'entrée est identifié.", "L'information rejoint un seul endroit utile.", "Une personne responsable est nommée.", "Le client reçoit une confirmation claire.", "Les erreurs ou exceptions gardent une trace.", "La prochaine action est visible."]
    : ["The entry point is identified.", "Information reaches one useful place.", "A responsible person is named.", "The client receives a clear confirmation.", "Errors or exceptions leave a trace.", "The next action is visible."];
  return `<article class="resource-guide-page">
    <header class="guide-hero">
      <div class="wrap guide-hero-grid">
        <div class="guide-hero-copy reveal">
          <p class="breadcrumb"><a href="${langData[lang].resourcesPath}">${esc(fr ? "Ressources" : "Resources")}</a> / ${esc(fr ? "Guide" : "Guide")}</p>
          <p class="micro-label">${esc(fr ? "Guide publié" : "Published guide")}</p>
          <h1>${esc(title)}</h1>
          <p>${esc(fr ? "Avant d'ajouter une plateforme, il vaut souvent mieux comprendre comment vos outils actuels se parlent, où le suivi se perd et quelle trace doit rester visible." : "Before adding another platform, it is often better to understand how your current tools connect, where follow-up gets lost and which trace should remain visible.")}</p>
        </div>
        <aside class="guide-summary reveal" aria-label="${esc(fr ? "Sommaire du guide" : "Guide summary")}">
          <p class="micro-label">${esc(fr ? "Sommaire" : "Summary")}</p>
          ${sections.map(([heading], index) => `<a href="#guide-${index + 1}">${String(index + 1).padStart(2, "0")} ${esc(heading)}</a>`).join("")}
        </aside>
      </div>
    </header>
    <div class="guide-progress" aria-hidden="true"><span></span></div>
    <section class="section guide-body-section">
      <div class="wrap guide-layout">
        <aside class="guide-side-note reveal">
          <p class="micro-label">${esc(fr ? "Progression" : "Progress")}</p>
          <p>${esc(fr ? "Lire le trajet avant de choisir l'outil." : "Read the path before choosing the tool.")}</p>
        </aside>
        <div class="guide-article">
          ${sections.map(([heading, copy], index) => `<section class="guide-chapter reveal" id="guide-${index + 1}">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h2>${esc(heading)}</h2>
            <p>${esc(copy)}</p>
            ${index === 4 ? GuideFlowDiagram(lang) : ""}
            ${index === 6 ? `<div class="guide-checklist" aria-label="${esc(fr ? "Checklist imprimable" : "Printable checklist")}">
              <p class="micro-label">${esc(fr ? "Checklist imprimable" : "Printable checklist")}</p>
              ${checklist.map((item) => `<label><input type="checkbox"> <span>${esc(item)}</span></label>`).join("")}
            </div>` : ""}
          </section>`).join("")}
        </div>
      </div>
    </section>
    <section class="section final-cta guide-final-cta">
      <div class="wrap final-cta-inner">
        <div>
          <p class="micro-label">SuiviCloud</p>
          <h2>${esc(fr ? "Votre trajet actuel peut être cartographié avant d'ajouter un outil." : "Your current path can be mapped before adding a tool.")}</h2>
          <p>${esc(fr ? "Décrivez une demande typique, ce qui se passe ensuite et l'endroit où le suivi se perd." : "Describe a typical request, what happens next and where follow-up gets lost.")}</p>
        </div>
        <a class="button primary" href="${contactHref(lang, "automation")}">${esc(fr ? "Cartographier une tâche" : "Map a task")}</a>
      </div>
    </section>
  </article>`;
}

function GuideFlowDiagram(lang) {
  const fr = lang === "fr";
  const nodes = fr
    ? ["Formulaire", "Suivi", "Confirmation", "Rendez-vous"]
    : ["Form", "Follow-up", "Confirmation", "Booking"];
  return `<div class="guide-flow" aria-label="${esc(fr ? "Schéma de flux formulaire vers suivi" : "Flow diagram from form to follow-up")}">
    ${nodes.map((node, index) => `<div><span>0${index + 1}</span><strong>${esc(node)}</strong></div>${index < nodes.length - 1 ? "<i></i>" : ""}`).join("")}
  </div>`;
}

function ContactForm(lang) {
  const fr = lang === "fr";
  return `<form class="contact-form contact-refined-form" data-contact-form novalidate>
    <input type="text" name="company_website" tabindex="-1" autocomplete="off" class="hp-field" aria-hidden="true">
    <div class="contact-form-head">
      <div>
        <p class="micro-label">${esc(fr ? "Formulaire sécurisé" : "Secure form")}</p>
        <h2>${esc(fr ? "Décrire la situation suffit." : "Describing the situation is enough.")}</h2>
      </div>
      <div class="contact-progress" aria-hidden="true"><span></span><span></span><span></span></div>
    </div>
    <fieldset>
      <legend>${esc(fr ? "Coordonnées" : "Contact details")}</legend>
      <div class="form-grid">
        ${field("name", fr ? "Nom" : "Name", "text", true)}
        ${field("company", fr ? "Entreprise" : "Company", "text", false)}
        ${field("email", fr ? "Courriel" : "Email", "email", true)}
        ${field("phone", fr ? "Téléphone facultatif" : "Optional phone", "tel", false)}
        ${selectField("language", fr ? "Langue préférée" : "Preferred language", [fr ? "Français" : "French", fr ? "Anglais" : "English"], true)}
      </div>
    </fieldset>
    <fieldset>
      <legend>${esc(fr ? "Contexte du besoin" : "Need context")}</legend>
      <div class="form-grid">
        ${selectField("need", fr ? "Type de besoin" : "Type of need", fr ? ["Nouveau site", "Refonte", "Automatisation", "Hébergement ou maintenance", "Problème technique", "Domaine ou DNS", "Autre"] : ["New website", "Website refresh", "Automation", "Hosting or maintenance", "Technical issue", "Domain or DNS", "Other"], true)}
        ${field("website", fr ? "Site actuel" : "Current website", "url", false)}
        ${selectField("timeline", fr ? "Échéancier" : "Timeline", fr ? ["Dès que possible", "Ce mois-ci", "1 à 3 mois", "À déterminer"] : ["As soon as possible", "This month", "1 to 3 months", "To be determined"], false)}
        ${selectField("budget", fr ? "Budget approximatif" : "Approximate budget", fr ? ["Moins de 1 000 $", "1 000 à 3 000 $", "3 000 à 7 500 $", "7 500 à 15 000 $", "À déterminer"] : ["Under $1,000", "$1,000 to $3,000", "$3,000 to $7,500", "$7,500 to $15,000", "To be determined"], false)}
        <div class="field full"><label for="message">${esc(fr ? "Description" : "Description")}</label><textarea id="message" name="message" required minlength="20" aria-describedby="message-error" placeholder="${esc(fr ? "Décrivez ce qui se passe, ce que vous souhaitez clarifier et ce qui bloque aujourd'hui." : "Describe what is happening, what you want to clarify and what is blocking you today.")}"></textarea><p class="field-error" id="message-error" data-error-for="message"></p></div>
      </div>
    </fieldset>
    <label class="checkbox"><input type="checkbox" name="consent" required aria-describedby="consent-error"><span>${esc(fr ? "J’autorise SuiviCloud à utiliser ces renseignements pour répondre à ma demande. Ce consentement n’inscrit pas à une infolettre." : "I authorize SuiviCloud to use this information to respond to my request. This consent does not subscribe me to a newsletter.")}</span></label>
    <p class="field-error consent-error" id="consent-error" data-error-for="consent"></p>
    <p class="form-status" role="status" data-form-status></p>
    <div class="contact-submit-row">
      <button class="button primary" type="submit">${esc(fr ? "Envoyer la demande" : "Send request")}</button>
      <p class="fallback-note">${esc(fr ? "Si le service d'envoi est indisponible, écrivez à" : "If the sending service is unavailable, write to")} <a href="mailto:${email}">${email}</a>.</p>
    </div>
  </form>`;
}

function contactPage(lang) {
  const fr = lang === "fr";
  const useful = fr
    ? ["Ce que vous essayez d'obtenir", "Le site, formulaire ou outil concerné", "Ce qui se perd ou se répète", "Les accès déjà disponibles", "L'échéancier réel"]
    : ["What you are trying to achieve", "The site, form or tool involved", "What gets lost or repeated", "Access already available", "The real timeline"];
  const next = fr
    ? [["01", "Lecture", "Les renseignements fournis sont examinés pendant les jours ouvrables."], ["02", "Clarification", "Si nécessaire, SuiviCloud demande les détails manquants avant de proposer une portée."], ["03", "Prochaine étape", "Vous recevez une réponse claire: intervention, projet, suivi ou autre point d'entrée."]]
    : [["01", "Review", "The information provided is reviewed during business days."], ["02", "Clarification", "If needed, SuiviCloud asks for missing details before proposing a scope."], ["03", "Next step", "You receive a clear reply: intervention, project, follow-up or another starting point."]];
  return `<section class="contact-hero">
    <div class="wrap contact-hero-grid">
      <div class="contact-hero-copy reveal">
        <p class="micro-label">${esc(fr ? "Contact" : "Contact")}</p>
        <h1>${esc(fr ? "Décrire la situation suffit pour commencer." : "Describing the situation is enough to start.")}</h1>
        <p>${esc(fr ? "Vous n'avez pas besoin de connaître la solution technique. Le plus utile est de nommer ce qui bloque, ce qui existe déjà et ce qui devrait devenir plus clair." : "You do not need to know the technical solution. The most useful starting point is naming what blocks you, what already exists and what should become clearer.")}</p>
      </div>
      <div class="contact-hero-signal reveal" aria-hidden="true"><span></span><i></i><b></b></div>
    </div>
  </section>
  <section class="section contact-section">
    <div class="wrap contact-layout">
      <aside class="contact-intel reveal">
        <div>
          <p class="micro-label">${esc(fr ? "Informations utiles" : "Useful information")}</p>
          <h2>${esc(fr ? "Commencez par le contexte, pas par la solution." : "Start with context, not the solution.")}</h2>
          <ul>${useful.map((item) => `<li>${esc(item)}</li>`).join("")}</ul>
        </div>
        <div class="contact-after">
          <p class="micro-label">${esc(fr ? "Après l'envoi" : "After sending")}</p>
          ${next.map(([number, title, copy]) => `<article><span>${esc(number)}</span><strong>${esc(title)}</strong><p>${esc(copy)}</p></article>`).join("")}
        </div>
        <div class="contact-meta">
          ${(fr ? [["Rimouski", "Base locale"], ["Québec", "Services à distance lorsque le mandat s'y prête"], ["Langues", "Français et anglais"], ["Courriel", email]] : [["Rimouski", "Local base"], ["Quebec", "Remote service when the scope fits"], ["Languages", "French and English"], ["Email", email]]).map(([label, value]) => `<article><span>${esc(label)}</span><strong>${esc(value)}</strong></article>`).join("")}
        </div>
      </aside>
      ${ContactForm(lang)}
    </div>
  </section>`;
}

function field(name, label, type, required) {
  return `<div class="field"><label for="${name}">${esc(label)}</label><input id="${name}" name="${name}" type="${type}" aria-describedby="${name}-error" ${required ? "required" : ""}><p class="field-error" id="${name}-error" data-error-for="${name}"></p></div>`;
}

function selectField(name, label, options, required) {
  return `<div class="field"><label for="${name}">${esc(label)}</label><select id="${name}" name="${name}" aria-describedby="${name}-error" ${required ? "required" : ""}><option value=""></option>${options.map((option) => `<option>${esc(option)}</option>`).join("")}</select><p class="field-error" id="${name}-error" data-error-for="${name}"></p></div>`;
}

function legalPage(lang, kind) {
  const fr = lang === "fr";
  const texts = {
    privacy: {
      title: fr ? "Politique de confidentialité" : "Privacy Policy",
      copy: fr ? "Cette page explique les renseignements recueillis lorsque vous communiquez avec SuiviCloud et la façon dont ils sont utilisés." : "This page explains the information collected when you communicate with SuiviCloud and how it is used.",
      sections: fr
        ? [["Renseignements recueillis", "Le formulaire de contact peut recueillir votre nom, votre entreprise, vos coordonnées, votre langue préférée, votre type de besoin, votre échéancier, votre budget approximatif et votre message."], ["Utilisation", "Ces renseignements servent à comprendre votre demande, répondre à votre message, préparer une estimation et assurer le suivi du mandat si vous choisissez d’aller plus loin."], ["Conservation", "Les renseignements sont conservés seulement aussi longtemps que nécessaire pour traiter la demande, respecter les obligations applicables et maintenir un historique raisonnable des échanges."], ["Fournisseurs", "SuiviCloud peut utiliser des fournisseurs d’hébergement, de courriel, d’automatisation ou d’analyse limitée. Les fournisseurs retenus doivent être proportionnés au mandat."], ["Vos droits", `Vous pouvez demander l’accès, la correction ou la suppression de vos renseignements en écrivant à ${email}.`]]
        : [["Information collected", "The contact form may collect your name, company, contact details, preferred language, type of need, timeline, approximate budget and message."], ["Use", "This information is used to understand your request, reply to your message, prepare an estimate and follow up if you choose to move forward."], ["Retention", "Information is kept only as long as needed to process the request, meet applicable obligations and maintain a reasonable exchange history."], ["Providers", "SuiviCloud may use hosting, email, automation or limited analytics providers. Providers should be proportionate to the project."], ["Your rights", `You may request access, correction or deletion by writing to ${email}.`]]
    },
    terms: {
      title: fr ? "Conditions de service" : "Terms of Service",
      copy: fr ? "Ces conditions présentent le cadre général des services. Chaque mandat peut être précisé par une proposition ou une entente." : "These terms present the general service framework. Each project may be clarified by a proposal or agreement.",
      sections: fr
        ? [["Portée", "La portée, les livrables, les délais, les exclusions et le prix sont confirmés avant le début du travail."], ["Accès", "Le client demeure responsable de fournir les accès nécessaires et de confirmer qu’il a le droit de les utiliser."], ["Frais externes", "Les domaines, licences, outils payants, services tiers et frais d’hébergement peuvent être facturés séparément ou payés directement par le client."], ["Soutien", "Les demandes sont traitées pendant les jours ouvrables. Le délai prévu et le niveau de priorité sont confirmés selon le mandat."], ["Propriété", "Sauf mention contraire, le client conserve la propriété de son domaine, de son contenu et de ses données."]]
        : [["Scope", "Scope, deliverables, timelines, exclusions and price are confirmed before work begins."], ["Access", "The client remains responsible for providing required access and confirming they have the right to use it."], ["External fees", "Domains, licences, paid tools, third-party services and hosting fees may be billed separately or paid directly by the client."], ["Support", "Requests are handled during business days. Expected timelines and priority levels are confirmed according to the project."], ["Ownership", "Unless stated otherwise, the client keeps ownership of their domain, content and data."]]
    },
    data: {
      title: fr ? "Technologies et données" : "Technology and Data",
      copy: fr ? "SuiviCloud peut intégrer des outils d’automatisation et d’intelligence artificielle lorsque ceux-ci répondent à un besoin réel." : "SuiviCloud may integrate automation and artificial intelligence tools when they address a real need.",
      sections: fr
        ? [["Automatisation et IA", "L’utilisation d’outils d’automatisation ou d’intelligence artificielle est définie avec le client et dépend du type de données traité. Aucun client n’est obligé d’utiliser une fonctionnalité d’IA."], ["Collecte minimale", "Les projets visent à recueillir seulement les renseignements nécessaires au mandat."], ["Validation humaine", "La validation humaine est privilégiée lorsque les résultats peuvent influencer une communication, un classement ou une décision."], ["Fournisseurs", "Les fournisseurs utilisés peuvent inclure hébergement, DNS, courriel, automatisation, API, surveillance et outils d’analyse limitée."], ["Limites", "SuiviCloud n’affiche pas de partenariat technologique officiel sans autorisation et ne promet pas de conformité avancée sans mandat dédié."]]
        : [["Automation and AI", "Use of automation or artificial intelligence tools is defined with the client and depends on the type of data processed. No client is required to use an AI feature."], ["Minimal collection", "Projects aim to collect only the information needed for the scope."], ["Human validation", "Human validation is preferred when outputs can affect a communication, classification or decision."], ["Providers", "Providers may include hosting, DNS, email, automation, APIs, monitoring and limited analytics tools."], ["Limits", "SuiviCloud does not display official technology partnerships without authorization and does not promise advanced compliance without dedicated work."]]
    },
    accessibility: {
      title: fr ? "Accessibilité" : "Accessibility",
      copy: fr ? "SuiviCloud vise une expérience claire, lisible et utilisable au clavier." : "SuiviCloud aims for an experience that is clear, readable and keyboard-usable.",
      sections: fr
        ? [["Objectif", "Le site vise les bonnes pratiques WCAG 2.2 AA lorsque possible: contraste suffisant, structure claire, navigation au clavier et états de focus visibles."], ["Mouvements", "Les préférences de réduction des animations sont respectées."], ["Amélioration continue", `Si vous rencontrez un obstacle d’accessibilité, écrivez à ${email} avec la page concernée et une description du problème.`]]
        : [["Objective", "The site aims for WCAG 2.2 AA best practices where possible: sufficient contrast, clear structure, keyboard navigation and visible focus states."], ["Motion", "Reduced-motion preferences are respected."], ["Continuous improvement", `If you encounter an accessibility barrier, write to ${email} with the page and a description of the issue.`]]
    }
  };
  const data = texts[kind];
  return `${interiorHero(lang, data.title, data.copy, fr ? "Cadre" : "Framework", "topology")}
  <section class="section legal-section"><div class="wrap legal-layout">${data.sections.map(([title, copy]) => `<article class="content-panel reveal"><h2>${esc(title)}</h2><p>${esc(copy)}</p></article>`).join("")}</div></section>`;
}

function designSystemPage() {
  const colors = [
    ["ink-950", "#07131F", "Texte profond"],
    ["ink-900", "#0C1C2B", "Surface sombre"],
    ["ink-800", "#122A3D", "Couche technique"],
    ["cloud-50", "#F7F9FC", "Fond calme"],
    ["cloud-100", "#EFF3F7", "Surface secondaire"],
    ["cloud-200", "#DCE5EC", "Bordure douce"],
    ["slate-500", "#73808C", "Texte secondaire"],
    ["signal-blue", "#5B7CFF", "Connexion active"],
    ["signal-cyan", "#2FD4C7", "Signal stable"],
    ["signal-warm", "#FFB66E", "Accent exceptionnel"]
  ];
  const scale = [
    ["step--1", "Microtexte", "Statuts, labels et microdonnees"],
    ["step-0", "Texte courant", "Lecture confortable et stable"],
    ["step-1", "Intertitre", "Blocs et surfaces professionnelles"],
    ["step-2", "Titre section", "Respiration editoriale"],
    ["step-3", "Titre page", "Presence calme sans effet vitrine"],
    ["step-4", "Titre hero", "Signal principal du systeme"]
  ];
  const spaces = ["2xs", "xs", "s", "m", "l", "xl", "2xl", "3xl"];
  const statuses = [
    ["stable", "Stable", "Flux connecte"],
    ["active", "Actif", "Action en cours"],
    ["watch", "A surveiller", "Verification requise"],
    ["muted", "En attente", "Signal discret"]
  ];

  return `<section class="ds-hero">
    <div class="ds-shell">
      <div class="ds-hero-copy">
        <p class="ds-kicker">Route interne / non indexee</p>
        <h1>Infrastructure vivante &#8212; &eacute;dition op&eacute;rationnelle</h1>
        <p>Fondations du systeme visuel SuiviCloud: precision technique, respiration editoriale, clarte d'outil professionnel et presence humaine discrete.</p>
      </div>
      <div class="ds-system-map" aria-label="Trajet dispersion connexion visibilite continuite">
        <span>Dispersion</span><i></i><span>Connexion</span><i></i><span>Visibilite</span><i></i><span>Continuite</span>
      </div>
    </div>
  </section>

  <section class="ds-section">
    <div class="ds-shell ds-section-head">
      <p class="ds-kicker">Tokens / couleurs</p>
      <h2>Une palette froide, lisible, avec un accent chaud rare.</h2>
      <p>Les variables globales posent les couches d'encre, nuage, signal et statut sans imposer de refonte aux pages publiques.</p>
    </div>
    <div class="ds-shell ds-swatch-grid">
      ${colors.map(([name, value, role]) => `<article class="ds-swatch" style="--swatch:${value}">
        <span></span>
        <strong>--${esc(name)}</strong>
        <code>${esc(value)}</code>
        <p>${esc(role)}</p>
      </article>`).join("")}
    </div>
  </section>

  <section class="ds-section ds-section-quiet">
    <div class="ds-shell ds-type-layout">
      <div>
        <p class="ds-kicker">Typographie</p>
        <h2>Echelle fluide et hierarchie stricte.</h2>
        <p>Le systeme conserve la pile typographique existante et ajoute une monospace legere pour les numeros, statuts et labels techniques.</p>
      </div>
      <div class="ds-type-stack">
        ${scale.map(([token, label, sample]) => `<article class="ds-type-row">
          <code>--${esc(token)}</code>
          <strong class="ds-${token}">${esc(label)}</strong>
          <span>${esc(sample)}</span>
        </article>`).join("")}
      </div>
    </div>
  </section>

  <section class="ds-section">
    <div class="ds-shell ds-section-head">
      <p class="ds-kicker">Grille / alignements</p>
      <h2>12 colonnes sur ordinateur, 8 sur tablette, 4 sur mobile.</h2>
    </div>
    <div class="ds-shell">
      <div class="ds-grid-demo" aria-label="Grille responsive">
        ${Array.from({ length: 12 }, (_, index) => `<span>${String(index + 1).padStart(2, "0")}</span>`).join("")}
      </div>
      <div class="ds-reading-measure">
        <p>Largeur de lecture cible: 680 a 760 px. Les grands espaces negatifs soutiennent la clarte et la priorisation plutot que l'effet decoratif.</p>
      </div>
    </div>
  </section>

  <section class="ds-section ds-section-quiet">
    <div class="ds-shell ds-component-grid">
      <article class="ds-demo-panel">
        <p class="ds-kicker">Boutons et liens</p>
        <div class="ds-actions">
          <button class="ds-button ds-button-primary" type="button"><span class="ds-icon ds-icon-node" aria-hidden="true"></span>Action principale</button>
          <button class="ds-button ds-button-secondary" type="button"><span class="ds-icon ds-icon-route" aria-hidden="true"></span>Action secondaire</button>
          <button class="ds-button ds-button-quiet" type="button">Action calme</button>
        </div>
        <p><a class="ds-link" href="#surfaces">Lien technique contextualise</a></p>
      </article>
      <article class="ds-demo-panel">
        <p class="ds-kicker">Champs</p>
        <label class="ds-field">Nom du flux<input type="text" value="Demande entrante"></label>
        <label class="ds-field">Statut<select><option>Stable</option><option>A surveiller</option></select></label>
        <label class="ds-field">Note<textarea rows="3">Verifier le point de reprise avant publication.</textarea></label>
      </article>
    </div>
  </section>

  <section class="ds-section" id="surfaces">
    <div class="ds-shell ds-section-head">
      <p class="ds-kicker">Surfaces / cartes / statuts</p>
      <h2>Des couches lisibles pour montrer ce qui circule.</h2>
    </div>
    <div class="ds-shell ds-card-grid">
      <article class="ds-card ds-card-soft">
        <span class="ds-microdata">layer 01</span>
        <h3>Surface claire</h3>
        <p>Pour organiser le contenu sans creer un tableau de bord bancaire.</p>
      </article>
      <article class="ds-card ds-card-dark">
        <span class="ds-microdata">layer 02</span>
        <h3>Couche infrastructure</h3>
        <p>Fond sombre reserve aux systemes, cartes de flux et zones de synthese.</p>
      </article>
      <article class="ds-card ds-card-line">
        <span class="ds-microdata">node 03</span>
        <h3>Trajectoire</h3>
        <p>Lignes, points et noeuds signalent une relation sans spectacle.</p>
      </article>
    </div>
    <div class="ds-shell ds-status-row">
      ${statuses.map(([kind, label, copy]) => `<span class="ds-status ds-status-${kind}"><i></i><strong>${esc(label)}</strong>${esc(copy)}</span>`).join("")}
    </div>
  </section>

  <section class="ds-section ds-section-quiet">
    <div class="ds-shell ds-icon-layout">
      <div>
        <p class="ds-kicker">Icones / microdonnees</p>
        <h2>Des signes simples, utiles et discrets.</h2>
      </div>
      <div class="ds-icon-set" aria-label="Icones du systeme">
        <span><i class="ds-icon ds-icon-node"></i>Noeud</span>
        <span><i class="ds-icon ds-icon-route"></i>Trajet</span>
        <span><i class="ds-icon ds-icon-layer"></i>Couche</span>
        <span><i class="ds-icon ds-icon-status"></i>Statut</span>
      </div>
    </div>
  </section>

  <section class="ds-section">
    <div class="ds-shell ds-space-layout">
      <div>
        <p class="ds-kicker">Espacements</p>
        <h2>Respiration genereuse, cadence precise.</h2>
      </div>
      <div class="ds-space-stack">
        ${spaces.map((space) => `<span style="--space:var(--space-${space})"><i></i><code>--space-${space}</code></span>`).join("")}
      </div>
    </div>
  </section>

  <section class="ds-section ds-section-quiet">
    <div class="ds-shell ds-motion-grid">
      <div>
        <p class="ds-kicker">Mouvement reduit</p>
        <h2>Le mouvement informe, puis s'efface.</h2>
        <p>Les animations de circulation sont lentes, non essentielles et neutralisees lorsque prefers-reduced-motion est actif.</p>
      </div>
      <div class="ds-motion-demo" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
    </div>
  </section>`;
}

function logoValidationPage() {
  const asset = (file) => `/assets/brand/${file}`;
  const sizes = [16, 24, 32, 48];

  return `<section class="logo-lab-hero">
    <div class="logo-lab-shell">
      <p class="logo-lab-kicker">Route interne / validation</p>
      <h1>Le fil de suivi</h1>
      <p>Identite de logo extremement simple pour SuiviCloud: trajet continu, point d'entree, point d'arrivee, S subtil et espace negatif pouvant rappeler un C.</p>
    </div>
  </section>

  <section class="logo-lab-section">
    <div class="logo-lab-shell logo-lab-head">
      <div>
        <p class="logo-lab-kicker">Fichiers SVG editables</p>
        <h2>Versions officielles et usages.</h2>
      </div>
      <p>Les logos restent vectoriels. Les PNG generes sont reserves aux favicons et a l'icone Apple touch.</p>
    </div>
    <div class="logo-lab-shell logo-lab-grid">
      <article class="logo-lab-card logo-lab-card-white"><img src="${asset("logo-horizontal.svg")}" alt="SuiviCloud logo horizontal"></article>
      <article class="logo-lab-card logo-lab-card-night"><img src="${asset("logo-horizontal-light.svg")}" alt="SuiviCloud logo horizontal clair"></article>
      <article class="logo-lab-card logo-lab-card-white"><img src="${asset("logo-mark.svg")}" alt="SuiviCloud symbole"></article>
      <article class="logo-lab-card logo-lab-card-night"><img src="${asset("logo-mark-light.svg")}" alt="SuiviCloud symbole clair"></article>
      <article class="logo-lab-card logo-lab-card-white"><img src="${asset("logo-monochrome.svg")}" alt="SuiviCloud logo monochrome"></article>
      <article class="logo-lab-card logo-lab-card-white"><img src="${asset("favicon.svg")}" alt="SuiviCloud favicon SVG"></article>
    </div>
  </section>

  <section class="logo-lab-section logo-lab-quiet">
    <div class="logo-lab-shell logo-lab-head">
      <div>
        <p class="logo-lab-kicker">Lisibilite petite taille</p>
        <h2>Silhouette a 16, 24, 32 et 48 pixels.</h2>
      </div>
    </div>
    <div class="logo-lab-shell logo-size-row">
      ${sizes.map((size) => `<article><span>${size}px</span><img src="${asset("logo-mark.svg")}" alt="Logo mark ${size}px" width="${size}" height="${size}"></article>`).join("")}
    </div>
  </section>

  <section class="logo-lab-section">
    <div class="logo-lab-shell logo-lab-contexts">
      <article class="logo-lab-card logo-lab-card-white">
        <p class="logo-lab-kicker">Fond blanc</p>
        <img src="${asset("logo-horizontal.svg")}" alt="Logo sur fond blanc">
      </article>
      <article class="logo-lab-card logo-lab-card-night">
        <p class="logo-lab-kicker">Fond bleu nuit</p>
        <img src="${asset("logo-horizontal-light.svg")}" alt="Logo sur fond bleu nuit">
      </article>
      <article class="logo-lab-card logo-lab-card-white">
        <p class="logo-lab-kicker">Monochrome</p>
        <img src="${asset("logo-monochrome.svg")}" alt="Logo monochrome">
      </article>
    </div>
  </section>

  <section class="logo-lab-section logo-lab-quiet">
    <div class="logo-lab-shell logo-lab-contexts">
      <article class="logo-lab-mobile-header">
        <p class="logo-lab-kicker">Header mobile</p>
        <div><img src="${asset("logo-horizontal.svg")}" alt="Logo dans un header mobile"><button type="button" aria-label="Menu"><span></span></button></div>
      </article>
      <article class="logo-lab-footer">
        <img src="${asset("logo-horizontal-light.svg")}" alt="Logo dans un footer">
        <p>Des outils fiables. Un suivi humain.</p>
        <nav><a href="/fr/services/">Services</a><a href="/fr/contact/">Contact</a></nav>
      </article>
    </div>
  </section>

  <section class="logo-lab-section">
    <div class="logo-lab-shell">
      <article class="logo-lab-social">
        <div>
          <p class="logo-lab-kicker">Image sociale</p>
          <h2>Le passage d'un besoin vers une solution.</h2>
          <p>Continuite, connexion et suivi sans symbole litteral de nuage, cadenas ou serveur.</p>
        </div>
        <img src="${asset("logo-horizontal-light.svg")}" alt="Logo dans une image sociale">
      </article>
    </div>
  </section>`;
}

function notFound(lang) {
  const fr = lang === "fr";
  return `${interiorHero(lang, fr ? "Page introuvable" : "Page not found", fr ? "La page demandée n’existe pas ou a été déplacée." : "The requested page does not exist or has moved.", "404", "diagnostic")}
  <section class="section"><div class="wrap"><a class="button primary" href="${langData[lang].home}">${esc(fr ? "Retour à l’accueil" : "Back to home")}</a></div></section>`;
}

function definePages() {
  addPage({ lang: "fr", path: "/fr/", title: "Sites web et automatisation à Rimouski | SuiviCloud", description: "SuiviCloud aide les PME de Rimouski et du Québec avec leurs sites web, automatisations, hébergement, maintenance et besoins techniques.", body: homePage("fr"), bodyClass: "home" });
  addPage({ lang: "en", path: "/en/", title: "Web services and automation in Rimouski | SuiviCloud", description: "SuiviCloud helps small businesses in Rimouski and Quebec with websites, automation, hosting, maintenance and technical needs.", body: homePage("en"), bodyClass: "home" });
  addPage({ lang: "fr", path: "/fr/services/", title: "Services", description: "Services web, automatisation, hébergement, maintenance, infrastructure et accompagnement technique pour PME.", body: servicesEcosystemOverview("fr") });
  addPage({ lang: "en", path: "/en/services/", title: "Services", description: "Websites, automation, hosting, maintenance, infrastructure and technical guidance for small businesses.", body: servicesEcosystemOverview("en") });
  for (const item of Object.values(serviceData)) {
    addPage({ lang: "fr", path: item.fr.path, title: item.fr.seo, description: item.fr.description, body: serviceDetail("fr", item.fr, item), bodyClass: `service-page service-page-${item.id}` });
    addPage({ lang: "en", path: item.en.path, title: item.en.seo, description: item.en.description, body: serviceDetail("en", item.en, item), bodyClass: `service-page service-page-${item.id}` });
  }
  addPage({ lang: "fr", path: "/fr/forfaits/", title: "Forfaits", description: "Prix indicatifs, petits mandats, projets complets et accompagnement mensuel pour SuiviCloud.", body: PricingDepthPage("fr") });
  addPage({ lang: "en", path: "/en/pricing/", title: "Pricing", description: "Indicative pricing, focused requests, structured projects and ongoing support for SuiviCloud.", body: PricingDepthPage("en") });
  addPage({ lang: "fr", path: "/fr/methode/", title: "Méthode", description: "Une méthode de travail claire pour comprendre, proposer, construire, mettre en ligne et suivre.", body: MethodTracePage("fr") });
  addPage({ lang: "en", path: "/en/process/", title: "Process", description: "A clear work method to understand, propose, build, launch and follow up.", body: MethodTracePage("en") });
  addPage({ lang: "fr", path: "/fr/a-propos/", title: "À propos de SuiviCloud | Gary, approche et services au Québec", description: "Gary est l'interlocuteur principal derrière SuiviCloud, une entreprise indépendante basée à Rimouski pour sites web, automatisation et suivi technique.", body: aboutPage("fr"), bodyClass: "about-page" });
  addPage({ lang: "en", path: "/en/about/", title: "About SuiviCloud | Gary, Approach and Quebec Services", description: "Gary is the main point of contact behind SuiviCloud, an independent Rimouski business for websites, automation and personal support.", body: aboutPage("en"), bodyClass: "about-page" });
  addPage({ lang: "fr", path: "/fr/ressources/", title: "Ressources", description: "Guides SuiviCloud pour mieux comprendre, relier et entretenir les outils numériques.", body: resourcesPage("fr") });
  addPage({ lang: "en", path: "/en/resources/", title: "Resources", description: "SuiviCloud guides to better understand, connect and maintain digital tools.", body: resourcesPage("en") });
  addPage({ lang: "fr", path: "/fr/ressources/guides/", title: "Guides", description: "Guides SuiviCloud pour expliquer simplement les décisions techniques.", body: resourcesPage("fr", "guides") });
  addPage({ lang: "en", path: "/en/resources/guides/", title: "Guides", description: "SuiviCloud guides that explain technical decisions plainly.", body: resourcesPage("en", "guides") });
  addPage({ lang: "fr", path: "/fr/ressources/guides/relier-outils-avant-ajouter/", title: "Pourquoi relier vos outils avant d’en ajouter d’autres", description: "Guide SuiviCloud pour cartographier vos outils actuels avant d’ajouter une nouvelle plateforme.", body: ResourceGuidePage("fr"), bodyClass: "resource-guide" });
  addPage({ lang: "en", path: "/en/resources/guides/connect-existing-tools-before-adding-more/", title: "Why You Should Connect Your Existing Tools Before Adding More", description: "SuiviCloud guide to map your current tools before adding another platform.", body: ResourceGuidePage("en"), bodyClass: "resource-guide" });
  addPage({ lang: "fr", path: "/fr/ressources/articles/", title: "Articles", description: "Articles SuiviCloud en préparation sur les besoins web et techniques des petites entreprises.", body: resourcesPage("fr", "articles") });
  addPage({ lang: "en", path: "/en/resources/articles/", title: "Articles", description: "SuiviCloud articles in preparation about small-business web and technical needs.", body: resourcesPage("en", "articles") });
  addPage({ lang: "fr", path: "/fr/contact/", title: "Contact", description: "Contactez SuiviCloud pour un site web, une automatisation, un dépannage ou un suivi technique.", body: contactPage("fr") });
  addPage({ lang: "en", path: "/en/contact/", title: "Contact", description: "Contact SuiviCloud for a website, automation, troubleshooting or technical support.", body: contactPage("en") });
  addPage({ lang: "fr", path: "/fr/confidentialite/", title: "Politique de confidentialité", description: "Politique de confidentialité de SuiviCloud.", body: legalPage("fr", "privacy") });
  addPage({ lang: "en", path: "/en/privacy/", title: "Privacy Policy", description: "SuiviCloud privacy policy.", body: legalPage("en", "privacy") });
  addPage({ lang: "fr", path: "/fr/conditions-de-service/", title: "Conditions de service", description: "Conditions de service générales de SuiviCloud.", body: legalPage("fr", "terms") });
  addPage({ lang: "en", path: "/en/terms/", title: "Terms of Service", description: "General SuiviCloud terms of service.", body: legalPage("en", "terms") });
  addPage({ lang: "fr", path: "/fr/technologies-et-donnees/", title: "Technologies et données", description: "Utilisation des technologies, automatisations, IA et données chez SuiviCloud.", body: legalPage("fr", "data") });
  addPage({ lang: "en", path: "/en/technology-and-data/", title: "Technology and Data", description: "Use of technology, automation, AI and data at SuiviCloud.", body: legalPage("en", "data") });
  addPage({ lang: "fr", path: "/fr/accessibilite/", title: "Accessibilité", description: "Déclaration d’accessibilité de SuiviCloud.", body: legalPage("fr", "accessibility") });
  addPage({ lang: "en", path: "/en/accessibility/", title: "Accessibility", description: "SuiviCloud accessibility statement.", body: legalPage("en", "accessibility") });
  addPage({ lang: "fr", path: "/design-system/", title: "Infrastructure vivante - édition opérationnelle", description: "Route interne de demonstration du systeme visuel SuiviCloud.", body: designSystemPage(), bodyClass: "design-system-page", noindex: true });
  addPage({ lang: "fr", path: "/logo-validation/", title: "Le fil de suivi - validation logo", description: "Route interne de validation du logo SuiviCloud.", body: logoValidationPage(), bodyClass: "logo-validation-page", noindex: true });
}

function writeFile(file, contents) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
}

function routeToFile(route) {
  return path.join(dist, route.replace(/^\/+|\/+$/g, ""), "index.html");
}

function copyAssets() {
  fs.mkdirSync(path.join(dist, "assets", "images"), { recursive: true });
  fs.mkdirSync(path.join(dist, "assets", "brand"), { recursive: true });
  fs.copyFileSync(path.join(root, "src", "styles.css"), path.join(dist, "assets", "styles.css"));
  fs.copyFileSync(path.join(root, "src", "app.js"), path.join(dist, "assets", "app.js"));
  for (const file of ["suivicloud-hero-1920.webp", "suivicloud-hero-1200.webp", "suivicloud-hero-800.webp"]) {
    const source = path.join(root, "src", "assets", "images", file);
    if (fs.existsSync(source)) fs.copyFileSync(source, path.join(dist, "assets", "images", file));
  }
  for (const file of fs.readdirSync(path.join(root, "src", "assets", "brand"))) {
    const source = path.join(root, "src", "assets", "brand", file);
    if (fs.statSync(source).isFile()) fs.copyFileSync(source, path.join(dist, "assets", "brand", file));
  }
  writeFile(path.join(dist, "assets", "favicon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="#081521"/><path d="M13 31C13 22.7 19.7 16 28 16h7M35 16l-6-6M35 16l-6 6M35 32c0 4.4-3.6 8-8 8H13M13 40l6-6M13 40l6 6" fill="none" stroke="#35CDB5" stroke-width="3.5" stroke-linecap="round"/><circle cx="24" cy="28" r="3.5" fill="#5C87FF"/></svg>`);
}

function writeSitemap() {
  const items = pages.filter((page) => !page.noindex).map((page) => `  <url><loc>${url(page.path)}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`).join("\n");
  writeFile(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>\n`);
  writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
}

function writeRedirectsAnd404() {
  writeFile(path.join(dist, "index.html"), `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta http-equiv="refresh" content="0; url=/fr/"><link rel="canonical" href="${origin}/fr/"><title>SuiviCloud</title></head><body><a href="/fr/">SuiviCloud</a></body></html>`);
  writeFile(path.join(dist, "404.html"), pageShell({ lang: "fr", path: "/404.html", title: "Page introuvable", description: "Page introuvable.", body: notFound("fr") }));
}

function build() {
  fs.rmSync(dist, { recursive: true, force: true });
  definePages();
  copyAssets();
  for (const page of pages) writeFile(routeToFile(page.path), pageShell(page));
  writeSitemap();
  writeRedirectsAnd404();
  console.log(`Built ${pages.length} pages in ${path.relative(root, dist)}`);
}

build();
