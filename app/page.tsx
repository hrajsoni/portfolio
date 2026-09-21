"use client";

import { useState } from "react";
import FrozenKeyboard from "@/components/FrozenKeyboard";
import SmoothScroll from "@/components/smooth-scroll";
import Reveal from "@/components/Reveal";
import SectionNav from "@/components/SectionNav";
import CopyEmail from "@/components/CopyEmail";
import SeasonPicker from "@/components/SeasonPicker";
import LanguagePicker from "@/components/LanguagePicker";
import ProjectModal, {
  type ProjectDetail,
} from "@/components/ProjectModal";
import { useLanguage } from "@/components/LanguageProvider";
import { useIsMobile } from "@/lib/useIsMobile";
import { SKILLS_FLAT } from "@/lib/skills";
import type { Lang } from "@/lib/i18n";

const EMAIL = "hraj491@gmail.com";

type Localised = { es: string; en: string };

type Project = ProjectDetail & {
  align: "left" | "right";
  section: "project1" | "project2" | "project3" | "project4";
};

const projects: Project[] = [
  {
    num: "01",
    name: {
      es: "Old Loom — Tienda D2C de Moda Artesanal",
      en: "Old Loom — Artisanal D2C Fashion Storefront",
    },
    stack: [
      "Shopify",
      "Liquid",
      "Next.js",
      "Tailwind CSS",
      "Vercel",
      "Google Analytics 4",
      "CRO",
    ],
    desc: {
      es: "Marca y tienda online D2C construida, personalizada y operada desde cero. Secciones Liquid a medida, optimización de AOV y embudo de conversión sin apps innecesarias.",
      en: "Live D2C apparel brand and storefront built, merchandised, and operated from scratch. Bespoke Liquid theme sections, AOV bundling, and zero-bloat conversion optimization.",
    },
    details: {
      es: "Construida y operada desde cero: selección y abastecimiento de productos artesanales, desarrollo de tema Liquid con bloques modulares de storytelling, estructuración de colecciones y merchandising enfocado en márgenes reales. Análisis continuo de Hotjar y GA4 para eliminar puntos de fricción en carrito y checkout, elevando el AOV un 22% mediante bundles estratégicos.",
      en: "Conceived, launched, and operated from the ground up: product sourcing, custom Liquid theme development with modular storytelling sections, merchandising architecture, and conversion diagnostics. Used Hotjar and GA4 session telemetry to eradicate cart-to-checkout friction, lifting AOV by 22% through strategic bundle logic.",
    },
    url: "https://oldloom.vercel.app/",
    github: "https://github.com/hrajsoni",
    media: [
      "/projects/oldloom/landing.png",
      "/projects/oldloom/dashboard.png",
      "/projects/oldloom/alertas.png",
    ],
    highlights: ["shopify", "nextdotjs", "tailwindcss", "googleanalytics"],
    badge: { es: "Tienda en vivo", en: "Live Storefront" },
    align: "left",
    section: "project1",
  },
  {
    num: "02",
    name: {
      es: "CareConnect — Plataforma de Salud Bajo Demanda",
      en: "CareConnect — On-Demand Healthcare Platform",
    },
    stack: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "Express",
      "REST APIs",
      "JWT Auth",
      "Tailwind CSS",
    ],
    desc: {
      es: "Marketplace de salud para reserva de enfermeros bajo demanda con control de acceso por roles, autenticación JWT y emparejamiento por geolocalización.",
      en: "On-demand healthcare marketplace engineered with role-based auth (Patient, Nurse, Admin), real-time geolocation matching, and multi-tier cloud deployments.",
    },
    details: {
      es: "Plataforma web full-stack para conectar pacientes con profesionales sanitarios cercanos. Arquitectura con Node.js y MongoDB para gestión de disponibilidad en tiempo real, autenticación segura con JWT y cookies HTTP-only, cálculo de distancias por geolocalización y despliegue desacoplado en Vercel y Render.",
      en: "Full-stack web application connecting patients with healthcare professionals nearby. Engineered robust Node.js and MongoDB backends for real-time scheduling, secure JWT authentication with role gates, real-time distance calculations via geolocation, and decoupled multi-cloud deployments across Vercel and Render.",
    },
    github: "https://github.com/hrajsoni",
    media: [
      "/projects/careconnect/landing.png",
      "/projects/careconnect/panel.png",
      "/projects/careconnect/registros.png",
    ],
    highlights: ["nextdotjs", "nodedotjs", "mongodb", "tailwindcss"],
    badge: { es: "Full Stack", en: "Full-Stack App" },
    align: "right",
    section: "project2",
  },
  {
    num: "03",
    name: {
      es: "Tienda D2C Headless & Liquid Plus",
      en: "Secondary D2C Brand Storefront",
    },
    stack: [
      "Shopify Plus",
      "Liquid",
      "Next.js",
      "Tailwind CSS",
      "Headless Ready",
      "CRO",
    ],
    desc: {
      es: "Nueva tienda de marca en desarrollo enfocada en componentes headless, descuentos dinámicos por volumen y checkout de máxima velocidad.",
      en: "New brand storefront currently in development focused on headless components, dynamic bundle discounts, and high-throughput checkout velocity.",
    },
    details: {
      es: "Proyecto de comercio electrónico en desarrollo: arquitectura headless ligera combinada con Liquid para máxima velocidad de carga. Incluye cajón de carrito reactivo con venta cruzada en un clic, metafields avanzados para especificaciones técnicas y diseño pensado para escalar volumen de pedidos.",
      en: "E-commerce architecture project in active development: lightweight headless components paired with native Liquid for sub-second page loads. Features dynamic in-cart cross-sells, structured content modeling via metaobjects, and high-volume order throughput design.",
    },
    github: "https://github.com/hrajsoni",
    media: [
      "/projects/d2c-storefront/dashboard.png",
      "/projects/d2c-storefront/wallets.png",
    ],
    highlights: ["shopify", "nextdotjs", "tailwindcss", "typescript"],
    badge: { es: "En desarrollo", en: "In progress" },
    align: "left",
    section: "project3",
  },
  {
    num: "04",
    name: {
      es: "Motor de Optimización de Conversión (CRO)",
      en: "Brand Conversion & Growth Framework",
    },
    stack: [
      "Google Analytics 4",
      "Hotjar",
      "Shopify Liquid",
      "A/B Testing",
      "Tailwind CSS",
    ],
    desc: {
      es: "Metodología y herramientas para auditar embudos de compra, diagnosticar fugas en PDP/carrito y mejorar la retención de clientes.",
      en: "Operating framework and diagnostic tools to audit checkout funnels, eradicate conversion leaks, and maximize repeat customer retention.",
    },
    details: {
      es: "Marco de trabajo integral para marcas de comercio electrónico: auditoría de embudos de compra, diagnóstico de puntos de abandono entre vista de producto y pago, pruebas A/B en llamadas a la acción clave y secuencias de email post-compra para maximizar el valor de vida del cliente (LTV).",
      en: "Comprehensive operating system for eCommerce brands: funnel diagnostics from product discovery to checkout completion, A/B testing on core value propositions, and retention workflows to drive sustainable customer lifetime value (LTV) over acquisition cost (CAC).",
    },
    github: "https://github.com/hrajsoni",
    media: [
      "/projects/cro-framework/packs.png",
      "/projects/cro-framework/catalogo.png",
    ],
    highlights: ["googleanalytics", "shopify", "html5", "css"],
    badge: { es: "Metodología", en: "Framework" },
    align: "right",
    section: "project4",
  },
];

const SKILL_CATEGORIES: Record<string, string> = {
  shopify: "Storefront & Liquid",
  nextdotjs: "Full-Stack React",
  react: "UI Engineering",
  typescript: "Type-Safe Dev",
  javascript: "Core Web",
  tailwindcss: "Styling & Tokens",
  nodedotjs: "Backend Runtimes",
  mongodb: "NoSQL Database",
  postgresql: "Relational DB",
  html5: "Semantic Markup",
  css: "Visual Layouts",
  googleanalytics: "Funnel Analytics",
  git: "Version Control",
  python: "Scripting & Data",
  docker: "Containerization",
};

interface MetricItem {
  value: string;
  label: Localised;
  sub: Localised;
}

const experiences: Array<{
  role: Localised;
  company: string;
  badge: Localised;
  period: Localised;
  location: Localised;
  summary: Localised;
  bullets: Localised[];
  metrics: MetricItem[];
  stack: string[];
  type: "store" | "code";
}> = [
  {
    role: { es: "Fundador & Operador eCommerce", en: "Founder & eCommerce Operator" },
    company: "Old Loom",
    badge: { es: "Marca D2C Activa", en: "Active D2C Brand" },
    period: { es: "2024 — Presente", en: "2024 — Present" },
    location: { es: "Remoto / India", en: "Remote" },
    summary: {
      es: "Creación, lanzamiento y gestión integral de una marca D2C de moda artesanal. Desarrollo de tienda en Shopify con Liquid a medida, estrategia de producto y optimización de conversión y márgenes.",
      en: "Conceived, launched, and operate Old Loom, a live handcrafted D2C apparel brand. Directing end-to-end merchandising, bespoke Liquid theme engineering, unit economics, and conversion optimization.",
    },
    metrics: [
      {
        value: "+22% AOV",
        label: { en: "Dynamic Bundles & Upsells", es: "Bundles dinámicos y upsells" },
        sub: { en: "In-cart tiered discounting", es: "Descuentos escalonados en carrito" },
      },
      {
        value: "95+ Speed",
        label: { en: "Mobile Core Web Vitals", es: "Métricas Core Web Vitals" },
        sub: { en: "Sub-second mobile TTFB", es: "Carga móvil en subsegundos" },
      },
      {
        value: "0 App Bloat",
        label: { en: "100% Native Liquid", es: "Tema Liquid 100% nativo" },
        sub: { en: "Zero recurring plugin fees", es: "Sin costes de apps pesadas" },
      },
      {
        value: "Live D2C",
        label: { en: "Direct Merchandising", es: "Comercio directo y logística" },
        sub: { en: "Bootstrapped unit economics", es: "Márgenes sostenibles" },
      },
    ],
    bullets: [
      {
        es: "Desarrollo de tema Liquid modular — velocidad de carga móvil 95+ sin apps de terceros que ralenticen el rendimiento.",
        en: "Engineered bespoke modular Liquid theme from scratch — maintained 95+ mobile performance score with zero reliance on performance-draining Shopify apps.",
      },
      {
        es: "Estrategia de bundles y merchandising dinámico — incremento medible del valor medio de pedido (AOV) en un 22%.",
        en: "Architected volume tiering & high-conversion cart drawer upsells — lifted Average Order Value (AOV) by 22% across primary SKU families.",
      },
      {
        es: "Diagnóstico de embudo de compra (Hotjar & GA4) — eliminación de fricción entre PDP, carrito y pasarela de pago.",
        en: "Continuous checkout funnel auditing with GA4 and Hotjar — diagnosed drop-off points between product discovery, cart drawer, and payment.",
      },
      {
        es: "Gestión rigurosa de márgenes y P&L unitario — adquisición rentable y enfoque en retención a largo plazo.",
        en: "Strict unit economics management — optimized blended customer acquisition cost (CAC) and customer lifetime value (LTV) through post-purchase flows.",
      },
    ],
    stack: ["Shopify Plus", "Liquid", "Next.js", "Tailwind CSS", "Google Analytics 4", "Vercel"],
    type: "store",
  },
  {
    role: { es: "Desarrollador Full-Stack", en: "Full-Stack Web Developer" },
    company: "CareConnect & Proyectos Digitales",
    badge: { es: "Arquitectura Producción", en: "Production Architecture" },
    period: { es: "2023 — 2024", en: "2023 — 2024" },
    location: { es: "Remoto", en: "Remote" },
    summary: {
      es: "Ingeniería de aplicaciones web interactivas y marketplaces de servicios bajo demanda, implementando arquitecturas seguras con Next.js, Node.js y bases de datos NoSQL.",
      en: "Engineered robust web applications and on-demand healthcare marketplaces, delivering secure full-stack architectures with Next.js, Node.js, and high-throughput NoSQL databases.",
    },
    metrics: [
      {
        value: "RBAC + JWT",
        label: { en: "Role Security Gates", es: "Seguridad y roles protegidos" },
        sub: { en: "Patient, Nurse & Admin tiers", es: "Perfiles Paciente, Enfermero y Admin" },
      },
      {
        value: "Live GPS",
        label: { en: "Haversine Matching", es: "Emparejamiento en tiempo real" },
        sub: { en: "Proximity dispatch engine", es: "Cálculo instantáneo de distancias" },
      },
      {
        value: "Dual Cloud",
        label: { en: "Vercel + Render CI/CD", es: "Despliegue multi-cloud" },
        sub: { en: "Decoupled edge architecture", es: "Frontend edge y API desacoplada" },
      },
      {
        value: "<50ms",
        label: { en: "Indexed MongoDB Queries", es: "Consultas MongoDB optimizadas" },
        sub: { en: "High-concurrency aggregation", es: "Alta concurrencia y velocidad" },
      },
    ],
    bullets: [
      {
        es: "Control de acceso por roles (RBAC) con tokens JWT y cookies seguras con políticas HTTP-only.",
        en: "Engineered end-to-end Role-Based Access Control (RBAC) featuring cryptographically signed JWT tokens and HTTP-only secure cookie sessions.",
      },
      {
        es: "Motor de emparejamiento en tiempo real basado en geolocalización y cálculo de distancias para conectar pacientes con enfermeros cercanos.",
        en: "Built real-time geolocation matching algorithm using Haversine distance calculations to pair incoming patient requests with verified nearby medical staff.",
      },
      {
        es: "Diseño de APIs REST limpias y esquemas MongoDB optimizados para alta concurrencia y consultas rápidas.",
        en: "Designed structured REST APIs and indexed MongoDB collections with aggregation pipelines tuned for sub-50ms query latency under load.",
      },
      {
        es: "Despliegues automatizados y configuración de entornos desacoplados en Vercel (frontend) y Render (backend API).",
        en: "Configured decoupled multi-cloud CI/CD deployment pipelines — deploying edge Next.js frontends to Vercel and containerized Node.js services to Render.",
      },
    ],
    stack: ["Next.js", "React", "Node.js", "MongoDB", "Express", "TypeScript", "REST APIs"],
    type: "code",
  },
];

function pick<T>(loc: { es: T; en: T }, lang: Lang): T {
  return loc[lang];
}

function KineticName({
  firstName = "Harshit",
  lastName = "Raj",
}: {
  firstName?: string;
  lastName?: string;
}) {
  return (
    <div className="hero-name-wrap">
      <div className="hero-name-ambient-glow" aria-hidden />
      <div className="flex flex-col select-none">
        {/* First Name */}
        <div className="hero-char-cluster">
          {firstName.split("").map((char, i) => (
            <span
              key={`fn-${i}`}
              className="hero-char hero-metallic-text"
              style={{
                animationDelay: `${120 + i * 60}ms`,
              }}
              data-cursor="hover"
            >
              {char}
            </span>
          ))}
        </div>
        {/* Last Name */}
        <div className="hero-char-cluster -mt-2 sm:-mt-4 md:-mt-6">
          {lastName.split("").map((char, i) => (
            <span
              key={`ln-${i}`}
              className="hero-char hero-metallic-accent"
              style={{
                animationDelay: `${540 + i * 80}ms`,
              }}
              data-cursor="hover"
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <SmoothScroll>
      <div className="relative">
        {!isMobile && (
          <div className="fixed inset-0 z-0">
            <FrozenKeyboard />
          </div>
        )}

        {/* Header */}
        <header className="fixed top-0 inset-x-0 z-50 px-6 sm:px-10 md:px-14 py-5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              type="button"
              data-cursor="hover"
              data-magnetic
              onClick={() =>
                document
                  .querySelector<HTMLElement>('[data-kb-section="contact"]')
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="keycap-btn keycap-btn--status hover:scale-105 active:scale-95 transition-all"
              title="Click to reach out"
            >
              <span className="keycap-led" aria-hidden />
              <span>{t("header.availability")}</span>
            </button>
          </div>
          <div className="flex items-center gap-2.5 pointer-events-auto">
            <SeasonPicker />
            <span className="hidden md:inline-flex">
              <a
                href="https://github.com/hrajsoni"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                data-magnetic
                className="keycap-btn h-8 !px-3 !text-xs hover:scale-105 active:scale-95 transition-all"
                title="GitHub"
              >
                <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden>
                  <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <span>GitHub</span>
              </a>
            </span>
            <LanguagePicker />
          </div>
        </header>

        <SectionNav />

        <main className="relative z-10 pointer-events-none">
          {/* Hero */}
          <section
            data-kb-section="hero"
            className="min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14"
          >
            {isMobile && (
              <div className="w-full h-[34vh] mt-12 -mb-4 pointer-events-auto">
                <FrozenKeyboard mobile />
              </div>
            )}
            <div className="mt-2 md:mt-20">
              <p
                className="text-[11px] uppercase tracking-[0.3em] text-ice-300 mb-5 fade-in-up"
                style={{ ["--d" as string]: "0ms" }}
              >
                {t("hero.greeting")}
              </p>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold tracking-[-0.03em] leading-[0.92] whitespace-nowrap animate-float-subtle">
                <KineticName firstName="Harshit" lastName="Raj" />
              </h1>
              <p
                className="mt-8 text-base sm:text-lg md:text-xl text-ice-200 max-w-xl leading-relaxed fade-in-up"
                style={{ ["--d" as string]: "520ms" }}
              >
                <span className="text-gradient-shimmer font-semibold">{t("hero.roleLine")}</span>
                <br />
                {t("hero.tagline")}
              </p>

              {/* CTAs */}
              <div
                className="mt-10 flex flex-wrap items-center gap-3 pointer-events-auto fade-in-up"
                style={{ ["--d" as string]: "700ms" }}
              >
                <a
                  href="https://oldloom.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn frost-btn--primary group hover:scale-105 active:scale-95 transition-all"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                  <span>Visit Live Store</span>
                </a>
                <button
                  type="button"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn hover:scale-105 active:scale-95 transition-all"
                  onClick={() =>
                    document
                      .querySelector<HTMLElement>(
                        '[data-kb-section="contact"]'
                      )
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {t("hero.hire")}
                </button>
                <div className="basis-full h-0 md:hidden" aria-hidden />
                <a
                  href="https://www.linkedin.com/in/harshitrajsoni/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon hover:scale-110 hover:-translate-y-1 transition-all"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.59c0-1.57-.03-3.6-2.19-3.6-2.19 0-2.53 1.71-2.53 3.48V22H7.62V8z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/hrajsoni"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon hover:scale-110 hover:-translate-y-1 transition-all"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </div>
            </div>

            <div
              className="mt-10 md:mt-auto flex items-center gap-3 fade-in-up"
              style={{ ["--d" as string]: "900ms" }}
            >
              <span className="scroll-indicator">
                <span>{t("hero.scroll")}</span>
                <span className="scroll-indicator__rail" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-ice-400 hidden sm:inline">
                {t("hero.keysHint")}
              </span>
            </div>
          </section>

          {/* Stack — Interactive Bento & Keycap Showcase */}
          <section
            data-kb-section="stack"
            className="relative p-6 sm:p-10 md:p-14 pb-28"
          >
            <div className="relative max-w-5xl mx-auto">
              <div className="text-center mb-10 sm:mb-14">
                <Reveal>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-ice-400/30 bg-ink-2/70 text-xs font-mono text-ice-200 mb-4 backdrop-blur-md shadow-inner">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                    <span className="tracking-wider uppercase">Production Toolchain & Frameworks</span>
                  </div>
                </Reveal>
                <Reveal delay={60}>
                  <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95] text-gradient-shimmer">
                    {t("stack.title")}
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-3 text-sm sm:text-base text-ice-300 max-w-lg mx-auto">
                    <span className="hidden md:inline">{t("stack.hint")}</span>
                    <span className="md:hidden">{t("stack.hintMobile")}</span>
                  </p>
                </Reveal>
              </div>

              {/* Interactive Skills Showcase Grid — visible on desktop & mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pointer-events-auto">
                {SKILLS_FLAT.map((s, idx) => (
                  <Reveal key={s.slug} delay={Math.min(idx * 35, 350)}>
                    <div
                      className="tech-grid-card group hover:-translate-y-1.5 transition-all duration-300 cursor-default"
                      data-cursor="hover"
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className="tech-icon-container"
                          style={{
                            borderColor: `rgba(${parseInt(s.hex.slice(0, 2) || "ff", 16)}, ${parseInt(s.hex.slice(2, 4) || "ff", 16)}, ${parseInt(s.hex.slice(4, 6) || "ff", 16)}, 0.35)`,
                          }}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            width="22"
                            height="22"
                            fill={s.hex === "000000" ? "#ffffff" : `#${s.hex}`}
                            className="group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
                            aria-hidden
                          >
                            <path d={s.path} />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-ice-50 font-semibold text-sm tracking-tight truncate group-hover:text-ice-200 transition-colors">
                              {s.title}
                            </h3>
                            <span className="text-[10px] font-mono text-ice-400/90 uppercase tracking-wider px-2 py-0.5 rounded bg-ink-0/60 border border-ink-3/80 flex-shrink-0">
                              {SKILL_CATEGORIES[s.slug] || "Tool"}
                            </span>
                          </div>
                          <p className="text-ice-300 text-xs mt-1 leading-relaxed line-clamp-2">
                            {t(`keyboard.taglines.${s.slug}`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Experience — Cybernetic Timeline & High-Impact Metric Cards */}
          <section
            data-kb-section="experience"
            className="relative p-6 sm:p-10 md:p-14 pb-28"
          >
            <div className="sticky top-24 sm:top-28 text-center mb-12 sm:mb-16 z-0">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-ice-400/30 bg-ink-2/70 text-xs font-mono text-ice-200 mb-4 backdrop-blur-md shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_8px_#60a5fa]" />
                  <span className="tracking-wider uppercase">Verified Track Record & Roles</span>
                </div>
              </Reveal>
              <Reveal delay={60}>
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95] text-gradient-shimmer">
                  {t("experience.title")}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 text-sm sm:text-base text-ice-300 max-w-xl mx-auto">
                  {t("experience.subtitle")}
                </p>
              </Reveal>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto experience-timeline">
              {/* Animated Timeline Spine & Laser Beam */}
              <div className="timeline-spine" aria-hidden>
                <div className="timeline-laser-pulse" />
              </div>

              <div className="space-y-12">
                {experiences.map((exp, idx) => (
                  <div key={`${exp.company}-${idx}`} className="relative">
                    {/* Milestone Keycap Node */}
                    <div className="timeline-milestone-node" title={exp.company}>
                      {exp.type === "store" ? (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                          <line x1="3" y1="6" x2="21" y2="6"></line>
                          <path d="M16 10a4 4 0 0 1-8 0"></path>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <polyline points="16 18 22 12 16 6"></polyline>
                          <polyline points="8 6 2 12 8 18"></polyline>
                        </svg>
                      )}
                    </div>

                    <Reveal
                      delay={idx * 140}
                      as="article"
                      className="project-glass-box pointer-events-auto shadow-[0_12px_45px_-15px_rgba(0,0,0,0.7)]"
                    >
                      {/* Top Meta Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-ink-3/60">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="font-mono text-xs uppercase tracking-widest text-ice-300 font-semibold">
                            {pick(exp.badge, lang)}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-ice-100 px-3 py-1 rounded-full border border-ice-700/80 bg-ink-2/70 whitespace-nowrap shadow-inner">
                          {pick(exp.period, lang)}
                        </span>
                      </div>

                      {/* Role and Company Header */}
                      <header className="mb-4">
                        <h3 className="text-2xl sm:text-3xl font-bold text-ice-50 tracking-tight">
                          {pick(exp.role, lang)}
                        </h3>
                        <p className="text-ice-400 font-medium text-base mt-1 flex items-center gap-2">
                          <span className="text-ice-200 font-semibold">{exp.company}</span>
                          <span className="text-ice-500">·</span>
                          <span className="text-ice-400 text-sm">{pick(exp.location, lang)}</span>
                        </p>
                      </header>

                      {/* Summary */}
                      <p className="text-ice-200 leading-relaxed text-sm sm:text-base mb-4">
                        {pick(exp.summary, lang)}
                      </p>

                      {/* High-Impact Metric Cards */}
                      <div className="metric-pill-grid">
                        {exp.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="metric-pill group/m">
                            <div className="metric-pill-val text-ice-50 group-hover/m:text-ice-200 transition-colors">
                              <span>{m.value}</span>
                            </div>
                            <div className="metric-pill-desc font-medium text-ice-200">
                              {pick(m.label, lang)}
                            </div>
                            <div className="text-[10px] text-ice-400 mt-0.5">
                              {pick(m.sub, lang)}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Detailed Bullet Achievements */}
                      <ul className="space-y-3 mb-6">
                        {exp.bullets.map((b, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-ice-100 leading-relaxed text-sm sm:text-[0.9375rem] group/b"
                          >
                            <span className="mt-[0.55em] flex-none w-1.5 h-1.5 rounded-full bg-ice-300 shadow-[0_0_8px_rgba(166,197,228,0.9)] group-hover/b:scale-150 group-hover/b:bg-ice-100 transition-all" />
                            <span className="group-hover/b:text-ice-50 transition-colors">{pick(b, lang)}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-ink-3/60">
                        {exp.stack.map((s) => (
                          <span
                            key={s}
                            data-cursor="hover"
                            className="frost-chip hover:scale-105 hover:-translate-y-0.5 transition-all"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects — Styled in modern frosted glass boxes with hover motion */}
          {projects.map((p) => (
            <section
              key={p.num}
              data-kb-section={p.section}
              data-kb-highlights={(p.highlights ?? []).join(",")}
              className="relative py-20 md:min-h-screen flex items-center p-6 sm:p-10 md:p-14 overflow-hidden"
            >
              <span
                aria-hidden
                className={`watermark animate-float-slow hidden md:block top-1/2 -translate-y-1/2 ${
                  p.align === "left" ? "right-[-2vw]" : "left-[-2vw]"
                }`}
              >
                {p.num}
              </span>

              <div
                className={
                  p.align === "left"
                    ? "max-w-xl relative w-full project-glass-box pointer-events-auto"
                    : "max-w-xl relative w-full project-glass-box pointer-events-auto md:ml-auto md:mr-16 lg:mr-24"
                }
              >
                {/* Box Header Bar */}
                <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-ink-3/60">
                  <Reveal>
                    <span className="font-mono text-xs font-semibold text-ice-400 tracking-wider uppercase">
                      {p.num} · {t("projects.kicker")}
                    </span>
                  </Reveal>
                  {p.badge ? (
                    <Reveal delay={60}>
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-widest text-ice-200 border border-ice-700/80 bg-ink-2/70 rounded-full px-2.5 py-0.5 shadow-inner">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{pick(p.badge, lang)}</span>
                      </span>
                    </Reveal>
                  ) : null}
                </div>

                <Reveal delay={80}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ice-50 leading-tight mb-3.5">
                    {pick(p.name, lang)}
                  </h2>
                </Reveal>

                <Reveal delay={140}>
                  <p className="text-sm sm:text-base text-ice-200 leading-relaxed mb-6">
                    {pick(p.desc, lang)}
                  </p>
                </Reveal>

                <Reveal delay={200}>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip hover:scale-105 hover:-translate-y-0.5 transition-all"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>

                {/* Box Action Footer */}
                <Reveal delay={260}>
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-ink-3/60">
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        data-magnetic
                        className="frost-btn frost-btn--primary group hover:scale-105 active:scale-95 transition-all"
                      >
                        <span>{t("projects.openSite")}</span>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveProject(p)}
                      data-cursor="hover"
                      data-magnetic
                      className="frost-btn group hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>{t("projects.viewMore")}</span>
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden
                        className="group-hover:translate-x-1 transition-transform"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="hover"
                        data-magnetic
                        className="frost-icon hover:scale-110 transition-all ml-auto"
                        title="View Code on GitHub"
                        aria-label="View Code"
                      >
                        <svg viewBox="0 0 16 16" width="15" height="15" fill="currentColor" aria-hidden>
                          <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </Reveal>
              </div>
            </section>
          ))}

          {/* Contact */}
          <section
            data-kb-section="contact"
            className="relative py-24 md:min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14 overflow-hidden"
          >
            <div className="max-w-xl relative">
              <Reveal>
                <p className="font-mono text-sm text-ice-400 mb-3">
                  {t("contact.kicker")}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ice-50 mb-6 text-gradient-shimmer">
                  {t("contact.title")}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-ice-200 mb-10 leading-relaxed">{t("contact.body")}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-wrap gap-3 pointer-events-auto">
                  <CopyEmail
                    email={EMAIL}
                    className="frost-btn frost-btn--primary hover:scale-105 active:scale-95 transition-all"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                    {t("contact.copyEmail")}
                  </CopyEmail>
                  <a
                    href={`mailto:${EMAIL}`}
                    data-cursor="hover"
                    className="frost-btn hover:scale-105 active:scale-95 transition-all"
                  >
                    {t("contact.openMail")}
                  </a>
                  <a
                    href="https://hrajsoni.github.io/portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn hover:scale-105 active:scale-95 transition-all"
                    title="Live Portfolio Demo"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span>Portfolio Link</span>
                  </a>
                  <a
                    href="https://github.com/hrajsoni"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn hover:scale-105 active:scale-95 transition-all"
                  >
                    {t("contact.github")}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/harshitrajsoni/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn hover:scale-105 active:scale-95 transition-all"
                  >
                    {t("contact.linkedin")}
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={320}>
              <p className="mt-14 text-[11px] uppercase tracking-[0.25em] text-ice-400">
                {t("contact.footer")}
              </p>
            </Reveal>
          </section>
        </main>

        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </SmoothScroll>
  );
}
