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
  "textarea:not([disabled])",
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

const copy = {
  fr: {
    required: "Ce champ est requis.",
    email: "Entrez une adresse courriel valide.",
    url: "Entrez une adresse web valide, avec https:// si possible.",
    message: "Ajoutez au moins 20 caracteres pour decrire le besoin.",
    consent: "Le consentement est requis pour envoyer la demande.",
    sending: "Envoi en cours...",
    successTitle: "Votre demande a bien été envoyée.",
    success: "Merci. SuiviCloud examinera les renseignements fournis et répondra pendant les jours ouvrables.",
    error: "L'envoi n'a pas fonctionne. Verifiez les champs ou reessayez.",
    unavailable: "Le service d'envoi semble indisponible. Vous pouvez utiliser le courriel de secours ci-dessous.",
    rate: "Trop de tentatives recentes. Reessayez un peu plus tard."
  },
  en: {
    required: "This field is required.",
    email: "Enter a valid email address.",
    url: "Enter a valid web address, with https:// when possible.",
    message: "Add at least 20 characters to describe the need.",
    consent: "Consent is required to send the request.",
    sending: "Sending...",
    successTitle: "Your request has been sent.",
    success: "Thank you. SuiviCloud will review the information provided and reply during business days.",
    error: "Sending did not work. Check the fields or try again.",
    unavailable: "The sending service appears unavailable. You can use the fallback email below.",
    rate: "Too many recent attempts. Please try again a little later."
  }
};

function formLang() {
  return document.documentElement.lang === "en" ? "en" : "fr";
}

function valueOf(form, name) {
  return String(new FormData(form).get(name) || "").trim();
}

function setStatus(form, message, kind = "", title = "") {
  const status = form.querySelector("[data-form-status]");
  if (!status) return;
  status.replaceChildren();
  if (title) {
    const strong = document.createElement("strong");
    strong.textContent = title;
    status.append(strong);
  }
  if (message) {
    const span = document.createElement("span");
    span.textContent = message;
    status.append(span);
  }
  status.classList.toggle("is-error", kind === "error");
  status.classList.toggle("is-success", kind === "success");
  status.classList.toggle("is-sending", kind === "sending");
  if (kind) form.dataset.state = kind;
  else form.dataset.state = "initial";
}

function clearErrors(form) {
  form.querySelectorAll(".field, .checkbox").forEach((field) => field.classList.remove("is-invalid"));
  form.querySelectorAll("[aria-invalid='true']").forEach((input) => input.removeAttribute("aria-invalid"));
  form.querySelectorAll("[data-error-for]").forEach((node) => {
    node.textContent = "";
  });
  form.removeAttribute("aria-busy");
  setStatus(form, "");
}

function setFieldError(form, name, message) {
  const error = form.querySelector(`[data-error-for="${CSS.escape(name)}"]`);
  const input = form.elements[name];
  if (error) error.textContent = message;
  if (input) {
    input.setAttribute("aria-invalid", "true");
    input.closest(".field, .checkbox")?.classList.add("is-invalid");
  }
}

function validateContactForm(form) {
  const lang = formLang();
  const text = copy[lang];
  const errors = {};
  const required = ["name", "email", "language", "need", "message"];

  for (const name of required) {
    if (!valueOf(form, name)) errors[name] = text.required;
  }

  if (valueOf(form, "email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valueOf(form, "email"))) {
    errors.email = text.email;
  }

  const website = valueOf(form, "website");
  if (website) {
    try {
      new URL(/^https?:\/\//i.test(website) ? website : `https://${website}`);
    } catch {
      errors.website = text.url;
    }
  }

  if (valueOf(form, "message") && valueOf(form, "message").length < 20) {
    errors.message = text.message;
  }

  if (!form.elements.consent?.checked) {
    errors.consent = text.consent;
  }

  return errors;
}

function contactPayload(form) {
  const data = new FormData(form);
  const payload = {};
  for (const [key, value] of data.entries()) {
    payload[key] = typeof value === "string" ? value.trim() : value;
  }
  if (payload.website && !/^https?:\/\//i.test(payload.website)) {
    payload.website = `https://${payload.website}`;
  }
  payload.consent = Boolean(form.elements.consent?.checked);
  payload.lang = formLang();
  payload.page = window.location.pathname;
  return payload;
}

const needPrefill = {
  fr: {
    website: "Nouveau site",
    redesign: "Refonte",
    automation: "Automatisation",
    hosting: "Hébergement ou maintenance",
    infrastructure: "Domaine ou DNS",
    support: "Problème technique"
  },
  en: {
    website: "New website",
    redesign: "Website refresh",
    automation: "Automation",
    hosting: "Hosting or maintenance",
    infrastructure: "Domain or DNS",
    support: "Technical issue"
  }
};

for (const form of document.querySelectorAll("[data-contact-form]")) {
  const requestedNeed = new URLSearchParams(window.location.search).get("need");
  const needSelect = form.elements.need;
  const mappedNeed = needPrefill[formLang()]?.[requestedNeed];
  if (needSelect && mappedNeed) {
    needSelect.value = mappedNeed;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors(form);

    const lang = formLang();
    const text = copy[lang];
    const clientErrors = validateContactForm(form);

    if (Object.keys(clientErrors).length) {
      for (const [name, message] of Object.entries(clientErrors)) setFieldError(form, name, message);
      setStatus(form, Object.values(clientErrors)[0], "error");
      const firstInvalid = form.elements[Object.keys(clientErrors)[0]];
      firstInvalid?.focus?.();
      return;
    }

    const submit = form.querySelector('button[type="submit"]');
    submit?.setAttribute("disabled", "disabled");
    form.setAttribute("aria-busy", "true");
    setStatus(form, text.sending, "sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(contactPayload(form))
      });

      let result = {};
      try {
        result = await response.json();
      } catch {
        result = {};
      }

      if (!response.ok || result.ok !== true) {
        if (response.status === 429) setStatus(form, text.rate, "error");
        else setStatus(form, result.message || text.error, "error");

        if (result.errors) {
          for (const [name, message] of Object.entries(result.errors)) setFieldError(form, name, message);
        }
        return;
      }

      form.reset();
      setStatus(form, text.success, "success", text.successTitle);
    } catch {
      setStatus(form, text.unavailable, "error");
    } finally {
      submit?.removeAttribute("disabled");
      form.removeAttribute("aria-busy");
    }
  });
}
