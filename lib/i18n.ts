export type Lang = "es" | "en";

export const LANGUAGES: Lang[] = ["en", "es"];
export const DEFAULT_LANG: Lang = "en";

type Leaf = Record<Lang, string>;
type Node = Leaf | { [key: string]: Node };

function isLeaf(node: Node): node is Leaf {
  return typeof (node as Leaf).es === "string";
}

export const DICT = {
  picker: {
    season: { es: "Estación", en: "Season" },
    language: { es: "Idioma", en: "Language" },
  },
  seasons: {
    spring: { es: "Primavera", en: "Spring" },
    summer: { es: "Verano", en: "Summer" },
    autumn: { es: "Otoño", en: "Autumn" },
    winter: { es: "Invierno", en: "Winter" },
  },
  nav: {
    aria: { es: "Secciones", en: "Sections" },
    home: { es: "Inicio", en: "Home" },
    stack: { es: "Stack", en: "Stack" },
    experience: { es: "Experiencia", en: "Experience" },
    project: { es: "Proyecto", en: "Project" },
    contact: { es: "Contacto", en: "Contact" },
  },
  header: {
    availability: {
      es: "Disponible para proyectos y roles",
      en: "Open to brand projects & roles",
    },
  },
  hero: {
    greeting: { es: "Hola, soy", en: "Hi, I am" },
    roleLine: {
      es: "Shopify Merchant & Full-Stack Developer.",
      en: "Shopify Merchant & Full-Stack Developer.",
    },
    tagline: {
      es: "Ayudo a marcas ambiciosas a construir, escalar y dominar su presencia digital.",
      en: "Helping ambitious brands engineer, scale, and master their digital presence.",
    },
    cv: { es: "Ver LinkedIn", en: "View LinkedIn" },
    hire: { es: "Contactarme", en: "Let's talk" },
    scroll: { es: "Scroll para explorar", en: "Scroll to explore" },
    keysHint: {
      es: "· pasa el ratón sobre las teclas",
      en: "· hover over the keys",
    },
  },
  stack: {
    title: { es: "Tech Stack", en: "Tech Stack" },
    hint: {
      es: "(hint: pasa el ratón por una tecla)",
      en: "(hint: hover over a key)",
    },
    hintMobile: {
      es: "Las herramientas con las que construyo.",
      en: "The tools I build with.",
    },
  },
  experience: {
    title: { es: "Experience", en: "Experience" },
    subtitle: {
      es: "Visión de negocio comercial y desarrollo técnico.",
      en: "Commercial brand ownership + full-stack craft.",
    },
  },
  projects: {
    kicker: { es: "proyecto", en: "project" },
    viewMore: { es: "Ver más", en: "View more" },
    openSite: { es: "Abrir sitio", en: "Visit site" },
    viewCode: { es: "Ver código", en: "View code" },
    close: { es: "Cerrar", en: "Close" },
    stackLabel: { es: "Stack", en: "Stack" },
    overview: { es: "Resumen", en: "Overview" },
  },
  contact: {
    kicker: { es: "contacto", en: "contact" },
    title: { es: "¿Hablamos?", en: "Let's talk" },
    body: {
      es: "Tanto si buscas un desarrollador de Shopify con instinto comercial como si necesitas expandir tu equipo full-stack, el teclado está listo.",
      en: "Whether you're looking for a Shopify developer with owner-level business instinct or expanding your full-stack team — the keyboard is ready.",
    },
    copyEmail: { es: "Copiar email", en: "Copy email" },
    openMail: { es: "Abrir mail", en: "Open mailto" },
    github: { es: "GitHub", en: "GitHub" },
    linkedin: { es: "LinkedIn", en: "LinkedIn" },
    emailToast: { es: "Email copiado", en: "Email copied" },
    footer: {
      es: "© 2026 Harshit Raj. Todos los derechos reservados.",
      en: "© 2026 Harshit Raj. All rights reserved.",
    },
  },
  keyboard: {
    taglines: {
      shopify: {
        es: "Tiendas diseñadas para conversión y márgenes saludables.",
        en: "Storefronts built for high conversion and healthy unit economics.",
      },
      nextdotjs: {
        es: "React para producción: SSR, APIs y headless.",
        en: "React for production: SSR, APIs, and headless commerce.",
      },
      react: {
        es: "Arquitectura de componentes e interfaces fluidas.",
        en: "Component architecture and seamless fluid interfaces.",
      },
      typescript: {
        es: "Código tipado con máxima fiabilidad en producción.",
        en: "Typed code with production-grade reliability.",
      },
      javascript: {
        es: "La base interactiva de la web moderna.",
        en: "The interactive foundation of the modern web.",
      },
      tailwindcss: {
        es: "Diseño moderno, rápido y totalmente responsivo.",
        en: "Modern, rapid, and fully responsive design.",
      },
      nodedotjs: {
        es: "Lógica de servidor robusta y APIs REST escalables.",
        en: "Robust server-side logic and scalable REST APIs.",
      },
      mongodb: {
        es: "Esquemas NoSQL flexibles para marketplaces.",
        en: "Flexible NoSQL schemas for modern marketplaces.",
      },
      postgresql: {
        es: "La base de datos relacional para datos críticos.",
        en: "The reliable relational database for business-critical data.",
      },
      html5: {
        es: "Estructura semántica, accesible y bien posicionada.",
        en: "Semantic, accessible structure built for SEO.",
      },
      css: {
        es: "El detalle visual que convierte visitantes en clientes.",
        en: "The visual polish that converts visitors into customers.",
      },
      googleanalytics: {
        es: "Métricas de embudo, atribución y comportamiento de usuario.",
        en: "Funnel metrics, attribution, and user session analysis.",
      },
      git: {
        es: "Control de versiones y despliegues colaborativos.",
        en: "Version control and collaborative deployment workflows.",
      },
      python: {
        es: "Scripts de automatización y backend ágil.",
        en: "Automation scripts and agile backend logic.",
      },
      docker: {
        es: "Entornos consistentes desde local hasta producción.",
        en: "Consistent environments from local dev to production.",
      },
    },
  },
} as const satisfies Record<string, Node>;

// Resolve a dotted path in the dictionary for a given language.
export function translate(path: string, lang: Lang): string {
  const parts = path.split(".");
  let ref: Node = DICT as unknown as Node;
  for (const p of parts) {
    if (isLeaf(ref)) return path;
    ref = (ref as { [key: string]: Node })[p];
    if (ref === undefined) return path;
  }
  if (isLeaf(ref)) return ref[lang] ?? ref.en ?? ref.es ?? path;
  return path;
}
