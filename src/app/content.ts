export type Lang = "en" | "lt";

export type Item = { title: string; lead: string; detail: string };

export type Domain = { id: string; title: string; items: Item[] };

export type Copy = {
  lang: Lang;
  path: string;
  locale: string;
  meta: { title: string; description: string; share: string };
  nav: { how: string; menu: string; switchLabel: string; switchLang: Lang };
  hero: { tag: string; h1: [string, string]; sub: string; copy: string; copied: string };
  intro: { tag: string; h: string; p: string };
  domains: Domain[];
  how: { title: string; p1: string; p2: string };
};

export const languages: Record<Lang, Copy> = {
  en: {
    lang: "en",
    path: "/",
    locale: "en_US",
    meta: {
      title: "SPIRALES — Software Solutions & Services",
      description:
        "SPIRALES designs, builds and runs software for companies with complex processes: architecture, UX, engineering, operations and AI automation.",
      share:
        "We design, build and run software for companies with complex processes. Architecture, design and UX, engineering, operations and AI automation.",
    },
    nav: { how: "How we work", menu: "Menu", switchLabel: "LT", switchLang: "lt" },
    hero: {
      tag: "Software Solutions & Services",
      h1: ["Systems built", "to scale."],
      sub: "We design and engineer software for companies navigating complexity.",
      copy: "Copy email address",
      copied: "Email address copied",
    },
    intro: {
      tag: "Services",
      h: "We design, build and run software for companies navigating complexity.",
      p: "One team, end to end: from the first UX sketch to the system running in production.",
    },
    domains: [
      {
        id: "architecture",
        title: "Architecture",
        items: [
          {
            title: "Backend and platform design",
            lead: "We design the system's foundation: the data model, the services and how they connect (DDD, event-driven, CQRS).",
            detail: "The product grows with new features, markets and customers without a rewrite from scratch.",
          },
          {
            title: "Cloud architecture",
            lead: "We design and provision AWS infrastructure: containers, serverless, managed databases, CDN, private networking — all defined as code.",
            detail: "You pay only for what you use, and the system takes growing load without emergency rebuilds.",
          },
          {
            title: "Technical strategy",
            lead: "We assess what to build, what to buy and how to migrate legacy systems, and deliver a plan with timelines and costs.",
            detail: "Leadership decides on numbers, not gut feeling, and avoids expensive mistakes.",
          },
        ],
      },
      {
        id: "design",
        title: "Design & UX",
        items: [
          {
            title: "UX and product design",
            lead: "We find out how people actually work, then design the user journey, prototype and interface around it.",
            detail: "Mistakes surface in the prototype, not after launch. A product people use without training.",
          },
          {
            title: "Design systems",
            lead: "One set of components, colours, typography and behaviours shared by designers and engineers.",
            detail: "New features ship faster, look and behave the same across the product, and a change in one place updates everywhere.",
          },
          {
            title: "Accessibility and localisation",
            lead: "Interfaces usable by people with disabilities, translated into the languages you need, and comfortable on a phone in the field.",
            detail: "You reach every user in every market and meet accessibility requirements without rework.",
          },
        ],
      },
      {
        id: "engineering",
        title: "Engineering",
        items: [
          {
            title: "Web and mobile apps, end to end",
            lead: "We build the whole product: customer portals, worker apps, admin systems and self-serve onboarding — backend, API, interface and deployment.",
            detail: "You get a working product with tests and analytics, not parts that still need assembling.",
          },
          {
            title: "Integrations",
            lead: "We connect payments, banking, messaging, identity, support and translation providers to your system.",
            detail: "Processes run automatically, and a provider outage doesn't stop your business: failures are handled and covered by tests.",
          },
          {
            title: "Data platforms",
            lead: "We bring data from every system into one place (ELT, dbt) and surface it in BI dashboards.",
            detail: "Leadership sees real numbers in real time, and developers test on anonymised data — safely, with no GDPR exposure.",
          },
          {
            title: "Domains",
            lead: "Marketplaces, gig work, fintech, healthcare, mobility, iGaming and e-commerce — domains our team has worked in.",
            detail: "We bring that regulatory and data-sensitivity experience with us, and analyse and adapt when a domain is new to us.",
          },
        ],
      },
      {
        id: "operations",
        title: "Operations",
        items: [
          {
            title: "Infrastructure as code",
            lead: "All infrastructure defined in Terraform and managed through Terraform Cloud.",
            detail: "An environment can be rebuilt in hours, not weeks, and changes roll out with zero downtime.",
          },
          {
            title: "CI/CD and delivery",
            lead: "Automated pipelines that test the code, gate on quality and deploy to production.",
            detail: "A new version reaches users in minutes, not days, and without night shifts.",
          },
          {
            title: "Security and compliance",
            lead: "GDPR implementation (data retention and erasure), penetration testing, network hardening and PII controls.",
            detail: "You pass enterprise customers' security reviews with evidence and avoid fines.",
          },
          {
            title: "Reliability",
            lead: "Monitoring, alerting and incident response for your systems.",
            detail: "We notice problems before your customers do, and the system is up when it matters most.",
          },
        ],
      },
      {
        id: "ai",
        title: "AI Automation",
        items: [
          {
            title: "Agentic engineering",
            lead: "A development process built on Claude Code and local LLMs: from issue to reviewed pull request.",
            detail: "Features ship faster and cheaper, while quality and the final call stay with a human.",
          },
          {
            title: "Knowledge and support automation",
            lead: "We turn your support history into a knowledge base, a chatbot and automatic triage, e.g. on Intercom.",
            detail: "Part of the requests are answered without a human, the rest reach the right person faster — without exposing personal data.",
          },
          {
            title: "Practical AI in products",
            lead: "LLM features in your product, built for specific workflows.",
            detail: "Benefit is measured, cost is controlled, and customer data stays within defined boundaries.",
          },
        ],
      },
    ],
    how: {
      title: "How we work",
      p1: "Small, senior, hands-on. We own the outcome, design the experience, write the code, and stay accountable for it in production.",
      p2: "Fixed-scope projects, ongoing retainers, or embedded engineering inside your team.",
    },
  },

  lt: {
    lang: "lt",
    path: "/lt/",
    locale: "lt_LT",
    meta: {
      title: "SPIRALES — Programinės įrangos sprendimai ir paslaugos",
      description:
        "SPIRALES projektuoja, kuria ir prižiūri programinę įrangą įmonėms su sudėtingais procesais: architektūra, UX, inžinerija, operacijos ir DI automatizavimas.",
      share:
        "Projektuojame, kuriame ir prižiūrime programinę įrangą įmonėms su sudėtingais procesais. Architektūra, dizainas ir UX, inžinerija, operacijos ir DI automatizavimas.",
    },
    nav: { how: "Kaip dirbame", menu: "Meniu", switchLabel: "EN", switchLang: "en" },
    hero: {
      tag: "Programinės įrangos sprendimai ir paslaugos",
      h1: ["Sistemos,", "sukurtos augimui."],
      sub: "Projektuojame ir kuriame programinę įrangą įmonėms su sudėtingais procesais.",
      copy: "Kopijuoti el. pašto adresą",
      copied: "El. pašto adresas nukopijuotas",
    },
    intro: {
      tag: "Paslaugos",
      h: "Projektuojame, kuriame ir prižiūrime programinę įrangą įmonėms su sudėtingais procesais.",
      p: "Viena komanda nuo pradžios iki galo: nuo pirmo UX eskizo iki produkcinėje aplinkoje veikiančios sistemos.",
    },
    domains: [
      {
        id: "architecture",
        title: "Architektūra",
        items: [
          {
            title: "Backend ir platformos architektūra",
            lead: "Suprojektuojame sistemos pagrindą: duomenų modelį, servisus ir jų ryšius (DDD, event-driven, CQRS).",
            detail: "Produktas auga naujomis funkcijomis, rinkomis ir klientais be perrašymo nuo nulio.",
          },
          {
            title: "Debesų architektūra",
            lead: "Suprojektuojame ir paruošiame AWS infrastruktūrą: konteineriai, serverless, valdomos duomenų bazės, CDN, privatūs tinklai — viskas aprašyta kodu.",
            detail: "Mokate tik už tai, ką naudojate, o sistema atlaiko augančią apkrovą be skubių perstatymų.",
          },
          {
            title: "Technologijų strategija",
            lead: "Įvertiname, ką kurti patiems, ką pirkti ir kaip migruoti senas sistemas, ir pateikiame planą su terminais ir kaštais.",
            detail: "Vadovai sprendžia remdamiesi skaičiais, o ne nuojauta, ir išvengia brangių klaidų.",
          },
        ],
      },
      {
        id: "design",
        title: "Dizainas ir UX",
        items: [
          {
            title: "UX ir produkto dizainas",
            lead: "Išsiaiškiname, kaip žmonės iš tikrųjų dirba, ir pagal tai suprojektuojame naudotojo kelią, prototipą ir sąsają.",
            detail: "Klaidos randamos prototipe, o ne po paleidimo. Produktas, kurį žmonės naudoja be apmokymų.",
          },
          {
            title: "Dizaino sistemos",
            lead: "Vienas komponentų, spalvų, tipografikos ir elgsenos rinkinys, kurį naudoja ir dizaineriai, ir programuotojai.",
            detail: "Naujos funkcijos kuriamos greičiau, atrodo ir veikia vienodai visame produkte, o pakeitimas vienoje vietoje atsinaujina visur.",
          },
          {
            title: "Prieinamumas ir lokalizacija",
            lead: "Sąsajos, pritaikytos žmonėms su negalia, išverstos į reikiamas kalbas ir patogios naudoti telefonu lauko sąlygomis.",
            detail: "Pasiekiate visus naudotojus visose rinkose ir atitinkate prieinamumo reikalavimus be perdarymų.",
          },
        ],
      },
      {
        id: "engineering",
        title: "Inžinerija",
        items: [
          {
            title: "Web ir mobiliosios programėlės nuo idėjos iki paleidimo",
            lead: "Sukuriame visą produktą: klientų portalus, darbuotojų programėles, administravimo sistemas ir savitarnos registraciją — backend, API, sąsają ir diegimą.",
            detail: "Gaunate veikiantį produktą su testais ir analitika, o ne dalis, kurias dar reikia sujungti.",
          },
          {
            title: "Integracijos",
            lead: "Prijungiame mokėjimų, bankų, pranešimų, tapatybės, klientų aptarnavimo ir vertimo paslaugas prie jūsų sistemos.",
            detail: "Procesai vyksta automatiškai, o tiekėjo gedimas nesustabdo verslo: klaidos apdorojamos ir padengtos testais.",
          },
          {
            title: "Duomenų platformos",
            lead: "Surenkame duomenis iš visų sistemų į vieną vietą (ELT, dbt) ir pateikiame juos BI ataskaitose.",
            detail: "Vadovai mato tikrus skaičius realiu laiku, o kūrėjai testuoja su anonimizuotais duomenimis — saugiai ir be BDAR rizikos.",
          },
          {
            title: "Sritys",
            lead: "Prekyvietės, gig ekonomika, fintech, sveikatos priežiūra, mobilumas, iGaming ir el. komercija — sritys, kuriose mūsų komanda yra dirbusi.",
            detail: "Atsinešame šių sričių reguliavimo ir jautrių duomenų patirtį, o naują sritį išanalizuojame ir prisitaikome.",
          },
        ],
      },
      {
        id: "operations",
        title: "Operacijos",
        items: [
          {
            title: "Infrastruktūra kaip kodas",
            lead: "Visa infrastruktūra aprašyta Terraform kodu ir valdoma per Terraform Cloud.",
            detail: "Aplinką galima atkurti per valandas, o ne savaites, o pokyčiai diegiami be prastovų.",
          },
          {
            title: "CI/CD ir diegimas",
            lead: "Automatiniai procesai, kurie testuoja kodą, tikrina kokybę ir diegia į produkcinę aplinką.",
            detail: "Nauja versija pasiekia naudotojus per minutes, o ne dienas, ir be naktinių darbų.",
          },
          {
            title: "Saugumas ir atitiktis",
            lead: "BDAR reikalavimų įgyvendinimas (duomenų saugojimas ir ištrynimas), įsilaužimų testavimas, tinklo apsauga ir asmens duomenų kontrolė.",
            detail: "Praeinate įmonių klientų saugumo patikras su įrodymais ir išvengiate baudų.",
          },
          {
            title: "Patikimumas",
            lead: "Stebėsena, įspėjimai ir incidentų valdymas jūsų sistemoms.",
            detail: "Problemas pastebime anksčiau nei klientai, o sistema veikia tada, kai jos labiausiai reikia.",
          },
        ],
      },
      {
        id: "ai",
        title: "DI automatizavimas",
        items: [
          {
            title: "Agentinis programavimas",
            lead: "Kūrimo procesas su Claude Code ir lokaliais LLM: nuo užduoties iki peržiūrėto pull request.",
            detail: "Funkcijos pristatomos greičiau ir pigiau, o kokybę ir galutinį sprendimą išlaiko žmogus.",
          },
          {
            title: "Žinių bazės ir aptarnavimo automatizavimas",
            lead: "Iš klientų aptarnavimo istorijos sukuriame žinių bazę, pokalbių robotą ir automatinį užklausų rūšiavimą, pvz., Intercom platformoje.",
            detail: "Dalis užklausų atsakoma be žmogaus, likusios greičiau pasiekia tinkamą darbuotoją — neatskleidžiant asmens duomenų.",
          },
          {
            title: "Praktinis DI produktuose",
            lead: "LLM funkcijos jūsų produkte, sukurtos konkretiems darbo procesams.",
            detail: "Nauda matuojama, kaštai kontroliuojami, o klientų duomenys neišeina už nustatytų ribų.",
          },
        ],
      },
    ],
    how: {
      title: "Kaip dirbame",
      p1: "Maža ir patyrusi komanda, kuri dirba pati. Atsakome už rezultatą: kuriame UX, rašome kodą ir prižiūrime jį produkcinėje aplinkoje.",
      p2: "Fiksuotos apimties projektai, nuolatinis bendradarbiavimas arba mūsų inžinieriai jūsų komandoje.",
    },
  },
};
