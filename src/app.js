document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const menuClose = document.querySelector("[data-menu-close]");
const siteNav = document.querySelector("[data-site-nav]");
const mobileMenuQuery = window.matchMedia("(max-width: 980px)");
const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "summary",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea",
  "[tabindex]:not([tabindex='-1'])"
].join(",");
let menuReturnFocus = null;

function focusableInMenu() {
  if (!siteNav) return [];
  return [...siteNav.querySelectorAll(focusableSelector)].filter((item) => item.offsetParent !== null || item === document.activeElement);
}

function closeServiceMenus() {
  document.querySelectorAll(".mega[open]").forEach((details) => details.removeAttribute("open"));
}

function setMenu(open, restoreFocus = true) {
  if (!menuButton || !siteNav) return;
  siteNav.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open
    ? (document.documentElement.lang === "en" ? "Close menu" : "Fermer le menu")
    : (document.documentElement.lang === "en" ? "Open menu" : "Ouvrir le menu"));

  if (open) {
    menuReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : menuButton;
    if (mobileMenuQuery.matches) {
      window.requestAnimationFrame(() => (menuClose || focusableInMenu()[0])?.focus({ preventScroll: true }));
    }
  } else {
    closeServiceMenus();
    if (restoreFocus && menuReturnFocus && mobileMenuQuery.matches) menuReturnFocus.focus({ preventScroll: true });
  }
}

if (header) {
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    setMenu(!siteNav.classList.contains("is-open"));
  });

  menuClose?.addEventListener("click", () => {
    setMenu(false);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false, false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
      closeServiceMenus();
      return;
    }

    if (event.key === "Tab" && siteNav.classList.contains("is-open") && mobileMenuQuery.matches) {
      const focusable = focusableInMenu();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  document.addEventListener("click", (event) => {
    if (!siteNav.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });

  mobileMenuQuery.addEventListener("change", (event) => {
    if (!event.matches) setMenu(false, false);
  });
}

for (const details of document.querySelectorAll(".mega")) {
  details.addEventListener("toggle", () => {
    if (!details.open) return;
    document.querySelectorAll(".mega[open]").forEach((other) => {
      if (other !== details) other.removeAttribute("open");
    });
  });
}

const revealItems = [...document.querySelectorAll(".reveal")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (prefersReducedMotion.matches) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const workflowCards = [...document.querySelectorAll(".workflow-card")];
if (workflowCards.length) {
  let activeStep = 0;
  const markWorkflow = () => {
    workflowCards.forEach((card, index) => card.classList.toggle("is-active", index === activeStep));
    activeStep = (activeStep + 1) % workflowCards.length;
  };
  markWorkflow();
  if (!prefersReducedMotion.matches) window.setInterval(markWorkflow, 2200);
}

for (const path of document.querySelectorAll("[data-pricing-path]")) {
  const options = [...path.querySelectorAll("[data-pricing-option]")];
  for (const option of options) {
    option.addEventListener("click", () => {
      options.forEach((item) => item.classList.toggle("is-selected", item === option));
    });
  }
}

for (const preview of document.querySelectorAll("[data-site-preview]")) {
  const buttons = [...preview.querySelectorAll("[data-preview-mode]")];
  for (const button of buttons) {
    button.addEventListener("click", () => {
      const mode = button.dataset.previewMode || "desktop";
      preview.dataset.mode = mode;
      buttons.forEach((item) => item.classList.toggle("is-active", item === button));
    });
  }
}

const websiteBrowsers = [...document.querySelectorAll("[data-website-browser]")];
if (websiteBrowsers.length) {
  const setWebsiteBrowserStep = (browser, activeIndex) => {
    browser.dataset.activeStep = String(activeIndex);
    browser.querySelectorAll("[data-browser-step]").forEach((button) => {
      button.setAttribute("aria-pressed", String(Number(button.dataset.browserStep || 0) === activeIndex));
    });
  };

  for (const browser of websiteBrowsers) {
    setWebsiteBrowserStep(browser, 0);
    for (const button of browser.querySelectorAll("[data-browser-step]")) {
      const activate = () => setWebsiteBrowserStep(browser, Number(button.dataset.browserStep || 0));
      button.addEventListener("pointerenter", activate);
      button.addEventListener("focus", activate);
    }
  }

  const updateWebsiteBrowsers = () => {
    for (const browser of websiteBrowsers) {
      if (browser.matches(":hover") || browser.contains(document.activeElement)) continue;
      const rect = browser.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight * 0.72 - rect.top) / (rect.height + window.innerHeight * 0.28)));
      setWebsiteBrowserStep(browser, Math.min(4, Math.floor(progress * 5)));
    }
  };

  updateWebsiteBrowsers();
  window.addEventListener("scroll", updateWebsiteBrowsers, { passive: true });
  window.addEventListener("resize", updateWebsiteBrowsers);
}

for (const network of document.querySelectorAll("[data-hero-network]")) {
  network.style.setProperty("--depth-x", "0");
  network.style.setProperty("--depth-y", "0");

  const canUseDepth = !prefersReducedMotion.matches && window.matchMedia("(pointer: fine) and (min-width: 900px)").matches;
  if (!canUseDepth) continue;

  network.addEventListener("pointermove", (event) => {
    const rect = network.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    network.style.setProperty("--depth-x", x.toFixed(3));
    network.style.setProperty("--depth-y", y.toFixed(3));
  });

  network.addEventListener("pointerleave", () => {
    network.style.setProperty("--depth-x", "0");
    network.style.setProperty("--depth-y", "0");
  });
}

for (const system of document.querySelectorAll("[data-service-system]")) {
  for (const zone of system.querySelectorAll(".service-zone")) {
    const match = [...zone.classList].find((name) => name.startsWith("service-zone-") && name !== "service-zone");
    const serviceId = match?.replace("service-zone-", "");
    if (!serviceId) continue;
    zone.addEventListener("pointerenter", () => {
      system.dataset.activeService = serviceId;
    });
    zone.addEventListener("focus", () => {
      system.dataset.activeService = serviceId;
    });
  }
}

for (const list of document.querySelectorAll(".service-mobile-list")) {
  const panels = [...list.querySelectorAll(".service-mobile-panel")];
  panels.forEach((panel) => {
    panel.addEventListener("toggle", () => {
      if (!panel.open) return;
      panels.forEach((other) => {
        if (other !== panel) other.open = false;
      });
    });
  });
}

for (const story of document.querySelectorAll("[data-automation-scroll]")) {
  const steps = [...story.querySelectorAll("[data-automation-step]")];
  const nodes = [...story.querySelectorAll("[data-workflow-node]")];
  const setActiveAutomation = (index) => {
    steps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
    nodes.forEach((node, nodeIndex) => node.classList.toggle("is-active", nodeIndex === index));
  };

  if ("IntersectionObserver" in window && steps.length) {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        setActiveAutomation(Number(visible.target.dataset.automationStep || 0));
      },
      { rootMargin: "-28% 0px -45% 0px", threshold: [0.25, 0.5, 0.75] }
    );
    steps.forEach((step) => stepObserver.observe(step));
  } else {
    setActiveAutomation(0);
  }
}

for (const workflow of document.querySelectorAll("[data-automation-workflow]")) {
  for (const node of workflow.querySelectorAll("[data-auto-workflow-step]")) {
    const activate = () => {
      workflow.querySelectorAll("[data-auto-workflow-step]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === node));
      });
    };
    node.addEventListener("pointerenter", activate);
    node.addEventListener("focus", activate);
  }
}

for (const scenarios of document.querySelectorAll("[data-automation-scenarios]")) {
  const tabs = [...scenarios.querySelectorAll("[data-scenario-tab]")];
  const panels = [...scenarios.querySelectorAll("[data-scenario-panel]")];
  const setScenario = (id) => {
    tabs.forEach((tab) => {
      const selected = tab.dataset.scenarioTab === id;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.scenarioPanel === id));
  };
  tabs.forEach((tab) => tab.addEventListener("click", () => setScenario(tab.dataset.scenarioTab || "")));
}

for (const modes of document.querySelectorAll("[data-automation-modes]")) {
  const tabs = [...modes.querySelectorAll("[data-mode-tab]")];
  const panels = [...modes.querySelectorAll("[data-mode-panel]")];
  const setMode = (id) => {
    tabs.forEach((tab) => {
      const selected = tab.dataset.modeTab === id;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
    panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.modePanel === id));
  };
  tabs.forEach((tab) => tab.addEventListener("click", () => setMode(tab.dataset.modeTab || "")));
}

(function upgradeAutomationStorySection() {
  const stories = [...document.querySelectorAll("[data-automation-scroll]")];
  if (!stories.length) return;

  const lang = document.documentElement.lang?.startsWith("en") ? "en" : "fr";
  const copy = {
    fr: {
      intro: "Une demande entre une seule fois. SuiviCloud la transforme en dossier, confirmation, prochaine action et rappel, pour réduire les copier-coller et garder la suite visible.",
      benefitsLabel: "Bénéfices de l'automatisation",
      benefits: ["moins de copier-coller", "moins d'oublis", "réponses plus constantes", "information mieux organisée"],
      primaryCta: "Voir ce qui peut être automatisé",
      secondaryCta: "Me montrer un exemple simple",
      secondaryHref: "/fr/contact/",
      panelTitle: "Flux opérationnel",
      panelMeta: "Formulaire → dossier → confirmation → suite → rappel",
      finalTitle: "État final",
      finalText: "Demande reçue. Client confirmé. Suite visible. Rappel planifié.",
      readout: ["entrée unique", "confirmation envoyée", "rappel planifié"],
      steps: [
        ["Formulaire reçu", "La demande entre au bon endroit.", "reçu"],
        ["Dossier créé ou mis à jour", "Les informations importantes sont regroupées.", "classé"],
        ["Confirmation envoyée", "Le client sait que sa demande est prise en compte.", "envoyé"],
        ["Prochaine action proposée", "La suite devient claire : appel, rendez-vous ou tâche interne.", "proposé"],
        ["Rappel envoyé", "Le suivi reste visible, même après quelques jours.", "planifié"]
      ]
    },
    en: {
      intro: "A request enters once. SuiviCloud turns it into a record, confirmation, next action and reminder, so copy-paste drops and follow-up stays visible.",
      benefitsLabel: "Automation benefits",
      benefits: ["less copy-paste", "fewer missed follow-ups", "more consistent replies", "better organized information"],
      primaryCta: "See what can be automated",
      secondaryCta: "Show me a simple example",
      secondaryHref: "/en/contact/",
      panelTitle: "Operational flow",
      panelMeta: "Form → record → confirmation → next step → reminder",
      finalTitle: "Final state",
      finalText: "Request received. Client confirmed. Next step visible. Reminder planned.",
      readout: ["single entry", "confirmation sent", "reminder planned"],
      steps: [
        ["Form received", "The request enters the right place.", "received"],
        ["Record created or updated", "Important information is grouped together.", "filed"],
        ["Confirmation sent", "The client knows the request has been taken into account.", "sent"],
        ["Next action proposed", "The next step becomes clear: call, appointment or internal task.", "proposed"],
        ["Reminder sent", "Follow-up stays visible, even after a few days.", "planned"]
      ]
    }
  }[lang];

  const styleId = "automation-story-upgrade-v2";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      .automation-story-upgraded {
        position: relative;
        isolation: isolate;
        align-items: stretch;
      }

      .automation-story-upgraded::before {
        content: "";
        position: absolute;
        inset: -2.2rem -1.4rem;
        z-index: -1;
        border: 1px solid rgba(18, 42, 61, 0.08);
        border-radius: 22px;
        background:
          radial-gradient(circle at 78% 12%, rgba(47, 212, 199, 0.14), transparent 25rem),
          linear-gradient(135deg, rgba(255, 255, 255, 0.82), rgba(247, 250, 248, 0.92));
        box-shadow: 0 24px 80px rgba(7, 19, 31, 0.08);
      }

      .automation-story-upgraded .automation-narrative,
      .automation-story-upgraded .automation-workflow-panel {
        top: 6.2rem;
      }

      .automation-story-upgraded .automation-narrative .section-intro {
        gap: 1.15rem;
        margin-bottom: 0;
      }

      .automation-story-upgraded .automation-narrative .section-intro h2 {
        max-width: 9ch;
        letter-spacing: -0.04em;
      }

      .automation-story-upgraded .automation-narrative .section-intro p:last-child {
        max-width: 30rem;
        color: var(--muted-strong);
        font-size: 1.04rem;
      }

      .automation-story-upgraded .automation-benefits span {
        gap: 0.42rem;
        border-color: rgba(18, 42, 61, 0.12);
        background: rgba(255, 255, 255, 0.76);
        box-shadow: 0 10px 24px rgba(7, 19, 31, 0.06);
      }

      .automation-story-upgraded .automation-benefits i {
        width: 0.46rem;
        height: 0.46rem;
        border-radius: 50%;
        background: var(--teal-dark);
        box-shadow: 0 0 0 4px rgba(22, 143, 129, 0.12);
      }

      .automation-cta-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.7rem;
        margin-top: 1.4rem;
      }

      .automation-story-upgraded .automation-cta-row .button {
        margin-top: 0;
      }

      .automation-story-upgraded .automation-cta-row .button.primary {
        color: #fff;
        background: var(--ink-950);
        border-color: var(--ink-950);
      }

      .automation-story-upgraded .automation-cta-row .button.secondary {
        color: var(--ink-950);
        background: #fff;
        border-color: rgba(18, 42, 61, 0.16);
      }

      .automation-story-upgraded .automation-scroll-steps {
        border-top: 0;
        gap: 0.7rem;
      }

      .automation-story-upgraded .automation-step {
        position: relative;
        min-height: 136px;
        padding: 1.05rem;
        border: 1px solid rgba(18, 42, 61, 0.11);
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.72);
        box-shadow: 0 12px 34px rgba(7, 19, 31, 0.06);
        transition:
          transform var(--motion-fast) var(--ease-feedback),
          border-color var(--motion-fast) var(--ease-standard),
          background-color var(--motion-fast) var(--ease-standard),
          box-shadow var(--motion-fast) var(--ease-standard);
      }

      .automation-story-upgraded .automation-step::before {
        content: "";
        position: absolute;
        left: 1.45rem;
        top: 3.5rem;
        bottom: -1.05rem;
        width: 1px;
        background: linear-gradient(var(--teal-dark), transparent);
        opacity: 0.28;
      }

      .automation-story-upgraded .automation-step:last-child::before {
        display: none;
      }

      .automation-story-upgraded .automation-step span {
        width: 2.3rem;
        height: 2.3rem;
        display: grid;
        place-items: center;
        border-radius: 10px;
        color: var(--teal-dark);
        background: rgba(22, 143, 129, 0.09);
        font-family: var(--font-mono);
      }

      .automation-story-upgraded .automation-step h3 {
        font-size: clamp(1.15rem, 1.7vw, 1.55rem);
      }

      .automation-story-upgraded .automation-step p {
        margin-top: 0.45rem;
      }

      .automation-story-upgraded .automation-step small {
        grid-column: 2;
        width: max-content;
        max-width: 100%;
        margin-top: 0.65rem;
        padding: 0.25rem 0.5rem;
        border: 1px solid rgba(22, 143, 129, 0.18);
        border-radius: 999px;
        color: var(--teal-dark);
        background: rgba(22, 143, 129, 0.08);
        font-size: 0.72rem;
        font-weight: 840;
        text-transform: uppercase;
        letter-spacing: 0.04em;
      }

      .automation-story-upgraded .automation-step.is-active,
      .automation-story-upgraded .automation-step:hover,
      .automation-story-upgraded .automation-step:focus-within {
        border-color: rgba(22, 143, 129, 0.4);
        background: #fff;
        box-shadow: 0 20px 55px rgba(7, 19, 31, 0.12);
        transform: translateY(-3px);
      }

      .automation-story-upgraded .automation-workflow-panel {
        overflow: hidden;
        border-radius: 20px;
        border-color: rgba(220, 229, 236, 0.18);
        background:
          radial-gradient(circle at 78% 12%, rgba(47, 212, 199, 0.2), transparent 19rem),
          linear-gradient(160deg, rgba(12, 28, 43, 0.98), rgba(7, 19, 31, 1));
        box-shadow: 0 28px 90px rgba(7, 19, 31, 0.26);
      }

      .automation-panel-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.2rem 0.15rem 0.75rem;
        border-bottom: 1px solid rgba(220, 229, 236, 0.12);
      }

      .automation-panel-head small,
      .automation-live-readout span {
        color: rgba(247, 249, 252, 0.58);
        font-family: var(--font-mono);
        font-size: 0.72rem;
        font-weight: 760;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }

      .automation-panel-head strong {
        display: block;
        color: #fff;
        font-size: 1.04rem;
      }

      .automation-panel-status {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        color: rgba(247, 249, 252, 0.72);
        font-size: 0.78rem;
        font-weight: 820;
      }

      .automation-panel-status::before {
        content: "";
        width: 0.55rem;
        height: 0.55rem;
        border-radius: 50%;
        background: var(--signal-cyan);
        box-shadow: 0 0 0 5px rgba(47, 212, 199, 0.11), 0 0 24px rgba(47, 212, 199, 0.56);
      }

      .automation-story-upgraded .automation-workflow {
        min-height: 455px;
        border-radius: 16px;
        background:
          linear-gradient(rgba(247, 249, 252, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(247, 249, 252, 0.04) 1px, transparent 1px),
          radial-gradient(circle at 50% 50%, rgba(47, 212, 199, 0.08), transparent 18rem);
        background-size: 42px 42px, 42px 42px, auto;
      }

      .automation-story-upgraded .automation-flow-track {
        fill: none;
        stroke: rgba(220, 229, 236, 0.22);
        stroke-width: 2;
      }

      .automation-story-upgraded .automation-flow-active {
        fill: none;
        stroke: var(--signal-cyan);
        stroke-width: 3;
        stroke-linecap: round;
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
        filter: drop-shadow(0 0 10px rgba(47, 212, 199, 0.72));
        animation: automationPathTravel 5.6s var(--ease-signal) infinite;
      }

      .automation-story-upgraded .automation-node {
        border-radius: 14px;
        backdrop-filter: blur(14px);
      }

      .automation-story-upgraded .automation-node strong {
        font-size: 0.95rem;
      }

      .automation-story-upgraded .automation-node small {
        color: rgba(247, 249, 252, 0.54);
        font-family: var(--font-mono);
        font-size: 0.68rem;
        font-weight: 760;
        text-transform: uppercase;
      }

      .automation-story-upgraded .automation-node.is-active {
        box-shadow: 0 0 0 1px rgba(47, 212, 199, 0.2), 0 18px 44px rgba(0, 0, 0, 0.28);
      }

      .automation-live-readout {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.55rem;
        margin-top: 0.8rem;
      }

      .automation-live-readout span {
        display: grid;
        gap: 0.3rem;
        padding: 0.6rem;
        border: 1px solid rgba(220, 229, 236, 0.12);
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.04);
      }

      .automation-live-readout span::before {
        content: "";
        width: 100%;
        height: 2px;
        border-radius: 999px;
        background: linear-gradient(90deg, var(--signal-cyan), transparent);
        opacity: 0.72;
      }

      .automation-story-upgraded .automation-final-state {
        border-radius: 14px;
        border-color: rgba(47, 212, 199, 0.3);
        background:
          linear-gradient(90deg, rgba(47, 212, 199, 0.12), rgba(47, 212, 199, 0.04));
      }

      .automation-story-upgraded .automation-final-state p {
        color: rgba(247, 249, 252, 0.76);
        font-weight: 760;
      }

      @keyframes automationPathTravel {
        0% { stroke-dashoffset: 1; opacity: 0.52; }
        45% { opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0.82; }
      }

      @media (max-width: 1100px) {
        .automation-story-upgraded {
          grid-template-columns: 1fr;
        }

        .automation-story-upgraded .automation-narrative,
        .automation-story-upgraded .automation-workflow-panel {
          position: static;
        }

        .automation-story-upgraded .automation-narrative .section-intro h2 {
          max-width: 14ch;
        }
      }

      @media (max-width: 680px) {
        .automation-story-upgraded::before {
          inset: -1.4rem -0.7rem;
          border-radius: 18px;
        }

        .automation-story-upgraded .automation-step {
          grid-template-columns: 46px 1fr;
          min-height: auto;
        }

        .automation-story-upgraded .automation-workflow {
          min-height: auto;
          display: grid;
          gap: 0.72rem;
          padding: 0.82rem;
        }

        .automation-story-upgraded .automation-flow-line,
        .automation-story-upgraded .automation-data-lines {
          display: none;
        }

        .automation-story-upgraded .automation-node {
          position: relative;
          inset: auto;
          width: 100%;
          min-height: 0;
          opacity: 0.86;
        }

        .automation-live-readout {
          grid-template-columns: 1fr;
        }

        .automation-panel-head {
          display: grid;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .automation-story-upgraded *,
        .automation-story-upgraded *::before,
        .automation-story-upgraded *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          scroll-behavior: auto !important;
          transition-duration: 0.001ms !important;
        }

        .automation-story-upgraded .automation-flow-active {
          stroke-dashoffset: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  for (const story of stories) {
    story.classList.add("automation-story-upgraded");

    const introCopy = story.querySelector(".automation-narrative .section-intro p:last-child");
    if (introCopy) introCopy.textContent = copy.intro;

    const benefits = story.querySelector(".automation-benefits");
    if (benefits) {
      benefits.setAttribute("aria-label", copy.benefitsLabel);
      benefits.innerHTML = copy.benefits.map((item) => `<span><i aria-hidden="true"></i>${item}</span>`).join("");
    }

    const primaryCta = story.querySelector(".automation-story-cta");
    if (primaryCta) {
      primaryCta.textContent = copy.primaryCta;
      primaryCta.classList.remove("secondary");
      primaryCta.classList.add("primary");

      if (!primaryCta.closest(".automation-cta-row")) {
        const row = document.createElement("div");
        row.className = "automation-cta-row";
        primaryCta.before(row);
        row.appendChild(primaryCta);

        const secondary = document.createElement("a");
        secondary.className = "button secondary automation-example-cta";
        secondary.href = copy.secondaryHref;
        secondary.textContent = copy.secondaryCta;
        row.appendChild(secondary);
      }
    }

    const stepEls = [...story.querySelectorAll("[data-automation-step]")];
    stepEls.forEach((step, index) => {
      const item = copy.steps[index];
      if (!item) return;
      const [title, description, status] = item;
      const heading = step.querySelector("h3");
      const paragraph = step.querySelector("p");
      let badge = step.querySelector("small");

      if (heading) heading.textContent = title;
      if (paragraph) paragraph.textContent = description;
      if (!badge) {
        badge = document.createElement("small");
        step.appendChild(badge);
      }
      badge.textContent = status;
      step.setAttribute("aria-label", `${title}. ${description}`);
    });

    const nodeEls = [...story.querySelectorAll("[data-workflow-node]")];
    nodeEls.forEach((node, index) => {
      const item = copy.steps[index];
      if (!item) return;
      const [title, description, status] = item;
      const label = node.querySelector("strong");
      let badge = node.querySelector("small");
      if (label) label.textContent = title;
      if (!badge) {
        badge = document.createElement("small");
        node.appendChild(badge);
      }
      badge.textContent = status;
      node.setAttribute("aria-label", `${title}. ${description}`);
    });

    const panel = story.querySelector(".automation-workflow-panel");
    if (panel && !panel.querySelector(".automation-panel-head")) {
      panel.insertAdjacentHTML("afterbegin", `
        <div class="automation-panel-head">
          <div>
            <small>${copy.panelMeta}</small>
            <strong>${copy.panelTitle}</strong>
          </div>
          <span class="automation-panel-status">stable</span>
        </div>
      `);
    }

    const workflow = story.querySelector(".automation-workflow");
    if (workflow && !workflow.querySelector(".automation-live-readout")) {
      workflow.insertAdjacentHTML("beforeend", `
        <div class="automation-live-readout" aria-hidden="true">
          ${copy.readout.map((item) => `<span>${item}</span>`).join("")}
        </div>
      `);
    }

    const finalState = story.querySelector(".automation-final-state");
    if (finalState) {
      finalState.innerHTML = `<strong>${copy.finalTitle}</strong><p>${copy.finalText}</p>`;
    }
  }
})();
