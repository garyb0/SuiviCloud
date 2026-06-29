import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const appPath = path.join(root, "dist", "assets", "app.js");
const marker = "automation-story-upgrade-final";

if (!fs.existsSync(appPath)) {
  console.warn("postbuild automation section skipped: dist/assets/app.js not found");
  process.exit(0);
}

let app = fs.readFileSync(appPath, "utf8");
if (app.includes(marker)) process.exit(0);

function upgradeAutomationStorySectionFinal() {
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

  if (!document.getElementById("automation-story-upgrade-final")) {
    const style = document.createElement("style");
    style.id = "automation-story-upgrade-final";
    style.textContent = `
      .automation-story-upgraded { position: relative; isolation: isolate; align-items: stretch; }
      .automation-story-upgraded::before { content: ""; position: absolute; inset: -2.2rem -1.4rem; z-index: -1; border: 1px solid rgba(18,42,61,.08); border-radius: 22px; background: radial-gradient(circle at 78% 12%, rgba(47,212,199,.14), transparent 25rem), linear-gradient(135deg, rgba(255,255,255,.82), rgba(247,250,248,.92)); box-shadow: 0 24px 80px rgba(7,19,31,.08); }
      .automation-story-upgraded .automation-narrative, .automation-story-upgraded .automation-workflow-panel { top: 6.2rem; }
      .automation-story-upgraded .automation-narrative .section-intro { gap: 1.15rem; margin-bottom: 0; }
      .automation-story-upgraded .automation-narrative .section-intro h2 { max-width: 9ch; letter-spacing: -.04em; }
      .automation-story-upgraded .automation-narrative .section-intro p:last-child { max-width: 30rem; color: var(--muted-strong); font-size: 1.04rem; }
      .automation-story-upgraded .automation-benefits span { gap: .42rem; border-color: rgba(18,42,61,.12); background: rgba(255,255,255,.76); box-shadow: 0 10px 24px rgba(7,19,31,.06); }
      .automation-story-upgraded .automation-benefits i { width: .46rem; height: .46rem; border-radius: 50%; background: var(--teal-dark); box-shadow: 0 0 0 4px rgba(22,143,129,.12); }
      .automation-cta-row { display: flex; flex-wrap: wrap; gap: .7rem; margin-top: 1.4rem; }
      .automation-story-upgraded .automation-cta-row .button { margin-top: 0; }
      .automation-story-upgraded .automation-cta-row .button.primary { color: #fff; background: var(--ink-950); border-color: var(--ink-950); }
      .automation-story-upgraded .automation-cta-row .button.secondary { color: var(--ink-950); background: #fff; border-color: rgba(18,42,61,.16); }
      .automation-story-upgraded .automation-scroll-steps { border-top: 0; gap: .7rem; }
      .automation-story-upgraded .automation-step { position: relative; min-height: 136px; padding: 1.05rem; border: 1px solid rgba(18,42,61,.11); border-radius: 14px; background: rgba(255,255,255,.72); box-shadow: 0 12px 34px rgba(7,19,31,.06); transition: transform var(--motion-fast) var(--ease-feedback), border-color var(--motion-fast) var(--ease-standard), background-color var(--motion-fast) var(--ease-standard), box-shadow var(--motion-fast) var(--ease-standard); }
      .automation-story-upgraded .automation-step::before { content: ""; position: absolute; left: 2.2rem; top: 3.6rem; bottom: -1rem; width: 1px; background: linear-gradient(var(--teal-dark), transparent); opacity: .34; }
      .automation-story-upgraded .automation-step:last-child::before { display: none; }
      .automation-story-upgraded .automation-step span { width: 2.3rem; height: 2.3rem; display: grid; place-items: center; border-radius: 10px; color: var(--teal-dark); background: rgba(22,143,129,.09); font-family: var(--font-mono); }
      .automation-story-upgraded .automation-step h3 { font-size: clamp(1.15rem, 1.7vw, 1.55rem); }
      .automation-story-upgraded .automation-step p { margin-top: .45rem; }
      .automation-story-upgraded .automation-step small { grid-column: 2; width: max-content; max-width: 100%; margin-top: .65rem; padding: .25rem .5rem; border: 1px solid rgba(22,143,129,.18); border-radius: 999px; color: var(--teal-dark); background: rgba(22,143,129,.08); font-size: .72rem; font-weight: 840; text-transform: uppercase; letter-spacing: .04em; }
      .automation-story-upgraded .automation-step.is-active, .automation-story-upgraded .automation-step:hover, .automation-story-upgraded .automation-step:focus-within { border-color: rgba(22,143,129,.4); background: #fff; box-shadow: 0 20px 55px rgba(7,19,31,.12); transform: translateY(-3px); }
      .automation-story-upgraded .automation-workflow-panel { overflow: hidden; border-radius: 20px; border-color: rgba(220,229,236,.18); background: radial-gradient(circle at 78% 12%, rgba(47,212,199,.2), transparent 19rem), linear-gradient(160deg, rgba(12,28,43,.98), rgba(7,19,31,1)); box-shadow: 0 28px 90px rgba(7,19,31,.26); }
      .automation-panel-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; padding: .2rem .15rem .75rem; border-bottom: 1px solid rgba(220,229,236,.12); }
      .automation-panel-head small, .automation-live-readout span { color: rgba(247,249,252,.58); font-family: var(--font-mono); font-size: .72rem; font-weight: 760; text-transform: uppercase; letter-spacing: .05em; }
      .automation-panel-head strong { display: block; color: #fff; font-size: 1.04rem; }
      .automation-panel-status { display: inline-flex; align-items: center; gap: .45rem; color: rgba(247,249,252,.72); font-size: .78rem; font-weight: 820; }
      .automation-panel-status::before { content: ""; width: .55rem; height: .55rem; border-radius: 50%; background: var(--signal-cyan); box-shadow: 0 0 0 5px rgba(47,212,199,.11), 0 0 24px rgba(47,212,199,.56); }
      .automation-story-upgraded .automation-workflow { min-height: 455px; border-radius: 16px; background: linear-gradient(rgba(247,249,252,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(247,249,252,.04) 1px, transparent 1px), radial-gradient(circle at 50% 50%, rgba(47,212,199,.08), transparent 18rem); background-size: 42px 42px, 42px 42px, auto; }
      .automation-story-upgraded .automation-flow-line { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
      .automation-story-upgraded .automation-flow-track { fill: none; stroke: rgba(220,229,236,.24); stroke-width: 2; }
      .automation-story-upgraded .automation-flow-active { fill: none; stroke: var(--signal-cyan); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; filter: drop-shadow(0 0 10px rgba(47,212,199,.72)); animation: automationPathTravelSegmented 11s linear infinite; }
      .automation-story-upgraded .automation-node { border-radius: 14px; backdrop-filter: blur(14px); }
      .automation-story-upgraded .automation-node::before { content: ""; position: absolute; z-index: 3; width: .65rem; height: .65rem; border-radius: 50%; background: var(--signal-cyan); box-shadow: 0 0 0 5px rgba(47,212,199,.12), 0 0 22px rgba(47,212,199,.68); }
      .automation-story-upgraded .automation-node.node-1::before { right: -.34rem; top: calc(50% - .33rem); }
      .automation-story-upgraded .automation-node.node-2::before { left: -.34rem; top: calc(50% - .33rem); }
      .automation-story-upgraded .automation-node.node-3::before { right: -.34rem; top: calc(50% - .33rem); }
      .automation-story-upgraded .automation-node.node-4::before { left: -.34rem; top: calc(50% - .33rem); }
      .automation-story-upgraded .automation-node.node-5::before { left: calc(50% - .33rem); top: -.34rem; }
      .automation-story-upgraded .automation-node strong { font-size: .95rem; }
      .automation-story-upgraded .automation-node small { color: rgba(247,249,252,.54); font-family: var(--font-mono); font-size: .68rem; font-weight: 760; text-transform: uppercase; }
      .automation-story-upgraded .automation-node.is-active { box-shadow: 0 0 0 1px rgba(47,212,199,.2), 0 18px 44px rgba(0,0,0,.28); }
      .automation-live-readout { position: absolute; left: .9rem; right: .9rem; bottom: .9rem; display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: .55rem; }
      .automation-live-readout span { display: grid; gap: .3rem; padding: .6rem; border: 1px solid rgba(220,229,236,.12); border-radius: 12px; background: rgba(255,255,255,.04); }
      .automation-live-readout span::before { content: ""; width: 100%; height: 2px; border-radius: 999px; background: linear-gradient(90deg, var(--signal-cyan), transparent); opacity: .72; }
      .automation-story-upgraded .automation-final-state { border-radius: 14px; border-color: rgba(47,212,199,.3); background: linear-gradient(90deg, rgba(47,212,199,.12), rgba(47,212,199,.04)); }
      .automation-story-upgraded .automation-final-state p { color: rgba(247,249,252,.76); font-weight: 760; }
      @keyframes automationPathTravelSegmented { 0% { stroke-dashoffset: 1; opacity: .52; } 18.18% { stroke-dashoffset: .75; opacity: .86; } 45.45% { stroke-dashoffset: .50; opacity: 1; } 63.64% { stroke-dashoffset: .25; opacity: 1; } 81.82% { stroke-dashoffset: 0; opacity: .92; } 100% { stroke-dashoffset: 0; opacity: .72; } }
      @media (max-width: 1100px) { .automation-story-upgraded { grid-template-columns: 1fr; } .automation-story-upgraded .automation-narrative, .automation-story-upgraded .automation-workflow-panel { position: static; } .automation-story-upgraded .automation-narrative .section-intro h2 { max-width: 14ch; } }
      @media (max-width: 680px) { .automation-story-upgraded::before { inset: -1.4rem -.7rem; border-radius: 18px; } .automation-story-upgraded .automation-step { grid-template-columns: 46px 1fr; min-height: auto; } .automation-story-upgraded .automation-workflow { min-height: auto; display: grid; gap: .72rem; padding: .82rem; } .automation-story-upgraded .automation-flow-line, .automation-story-upgraded .automation-data-lines { display: none; } .automation-story-upgraded .automation-node { position: relative; inset: auto; width: 100%; min-height: 0; opacity: .86; } .automation-story-upgraded .automation-node::before { left: -.34rem !important; right: auto !important; top: calc(50% - .33rem) !important; } .automation-live-readout { position: relative; left: auto; right: auto; bottom: auto; grid-template-columns: 1fr; } .automation-panel-head { display: grid; } }
      @media (prefers-reduced-motion: reduce) { .automation-story-upgraded *, .automation-story-upgraded *::before, .automation-story-upgraded *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .001ms !important; } .automation-story-upgraded .automation-flow-active { stroke-dashoffset: 0; } }
    `;
    document.head.appendChild(style);
  }

  const alignedPath = "M221 72 C247 72 266 132 294 132 C270 132 272 218 247 218 C276 218 274 288 288 288 C276 306 258 321 241 328";
  const segmentDurations = [2000, 3000, 2000, 2000, 2000];
  const totalCycle = segmentDurations.reduce((sum, value) => sum + value, 0);

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
    const nodeEls = [...story.querySelectorAll("[data-workflow-node]")];

    stepEls.forEach((step, index) => {
      const item = copy.steps[index];
      if (!item) return;
      const [title, description, status] = item;
      step.querySelector("h3") && (step.querySelector("h3").textContent = title);
      step.querySelector("p") && (step.querySelector("p").textContent = description);
      let badge = step.querySelector("small");
      if (!badge) {
        badge = document.createElement("small");
        step.appendChild(badge);
      }
      badge.textContent = status;
    });

    nodeEls.forEach((node, index) => {
      const item = copy.steps[index];
      if (!item) return;
      const [title, description, status] = item;
      node.querySelector("strong") && (node.querySelector("strong").textContent = title);
      let badge = node.querySelector("small");
      if (!badge) {
        badge = document.createElement("small");
        node.appendChild(badge);
      }
      badge.textContent = status;
      node.setAttribute("aria-label", `${title}. ${description}`);
    });

    story.querySelectorAll(".automation-flow-track, .automation-flow-active").forEach((path) => path.setAttribute("d", alignedPath));

    const panel = story.querySelector(".automation-workflow-panel");
    if (panel && !panel.querySelector(".automation-panel-head")) {
      panel.insertAdjacentHTML("afterbegin", `<div class="automation-panel-head"><div><small>${copy.panelMeta}</small><strong>${copy.panelTitle}</strong></div><span class="automation-panel-status">stable</span></div>`);
    }

    const workflow = story.querySelector(".automation-workflow");
    if (workflow && !workflow.querySelector(".automation-live-readout")) {
      workflow.insertAdjacentHTML("beforeend", `<div class="automation-live-readout" aria-hidden="true">${copy.readout.map((item) => `<span>${item}</span>`).join("")}</div>`);
    }

    const finalState = story.querySelector(".automation-final-state");
    if (finalState) finalState.innerHTML = `<strong>${copy.finalTitle}</strong><p>${copy.finalText}</p>`;

    const setActive = (index) => {
      stepEls.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index));
      nodeEls.forEach((node, nodeIndex) => node.classList.toggle("is-active", nodeIndex === index));
    };

    const restartLine = () => {
      const activeLine = story.querySelector(".automation-flow-active");
      if (!activeLine) return;
      activeLine.style.animation = "none";
      activeLine.getBoundingClientRect();
      activeLine.style.animation = "automationPathTravelSegmented 11s linear infinite";
    };

    const startCycle = () => {
      clearTimeout(story.__automationCycleTimer);
      (story.__automationStepTimers || []).forEach((timer) => clearTimeout(timer));
      story.__automationStepTimers = [];
      setActive(0);
      restartLine();
      let elapsed = segmentDurations[0];
      story.__automationStepTimers.push(setTimeout(() => setActive(1), elapsed));
      elapsed += segmentDurations[1];
      story.__automationStepTimers.push(setTimeout(() => setActive(2), elapsed));
      elapsed += segmentDurations[2];
      story.__automationStepTimers.push(setTimeout(() => setActive(3), elapsed));
      elapsed += segmentDurations[3];
      story.__automationStepTimers.push(setTimeout(() => setActive(4), elapsed));
      story.__automationCycleTimer = setTimeout(startCycle, totalCycle);
    };

    stepEls.forEach((step, index) => {
      step.addEventListener("pointerenter", () => setActive(index));
      step.addEventListener("focus", () => setActive(index));
    });

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) startCycle();
    else setActive(0);
  }
}

const enhancement = "\n\n(" + upgradeAutomationStorySectionFinal.toString() + ")();\n";

app += enhancement;
fs.writeFileSync(appPath, app);
console.log("postbuild automation section enhancement appended");
