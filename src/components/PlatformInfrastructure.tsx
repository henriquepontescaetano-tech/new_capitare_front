"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Product = {
  title: string;
  description: string;
  linkLabel: string;
};

const PRODUCTS: Product[] = [
  {
    title: "CVM88 — White label de oferta pública",
    description:
      "Plataforma de oferta pública operando sob a marca da sua empresa. Capte equity ou dívida em rodadas reguladas pela CVM88.",
    linkLabel: "Quero captar pela minha empresa",
  },
  {
    title: "SCF — Supply chain finance",
    description:
      "Opere sua própria mesa de antecipação de recebíveis em vez de pagar spread de banco. Estrutura regulatória e tecnologia ponta a ponta.",
    linkLabel: "Quero montar minha infra",
  },
  {
    title: "Ferramenta FIDC",
    description:
      "Alternativa ao FIDC tradicional. Estruture fundos menores ou reduza o custo de administração, com taxa menor e governança preservada.",
    linkLabel: "Quero estruturar um fundo",
  },
];

const OFFERS = [
  { name: "Debênture SuaEmpresa 2027", tag: "CVM88", rate: "14,2% a.a.", progress: 68 },
  { name: "CRI Recebíveis Imobiliários", tag: "SCF", rate: "12,8% a.a.", progress: 41 },
  { name: "FIDC Multisetorial", tag: "FIDC", rate: "11,4% a.a.", progress: 85 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const solidButtonClasses =
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all bg-primary text-white hover:bg-blue0 active:bg-blue1 h-11 px-6 text-sm rounded-full";

const outlineOnDarkClasses =
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all border border-white/25 text-white hover:bg-white/10 h-11 px-6 text-sm rounded-full";

function PlatformMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative mx-auto w-full max-w-[440px]"
    >
      <div className="rounded-xl overflow-hidden bg-white shadow-2xl">
        <div className="flex items-center gap-1.5 bg-grey6 px-3 py-2.5 border-b border-grey5">
          <span className="h-2.5 w-2.5 rounded-full bg-grey4" />
          <span className="h-2.5 w-2.5 rounded-full bg-grey4" />
          <span className="h-2.5 w-2.5 rounded-full bg-grey4" />
          <div className="ml-2 flex-1 rounded-md bg-white border border-grey5 px-2.5 py-1 font-mono text-[10px] text-grey7 truncate">
            app.suaempresa.com.br
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 py-3 border-b border-grey5">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-grey0 text-[11px] font-bold text-white">
            S
          </div>
          <span className="text-sm font-semibold text-grey0">
            Sua Plataforma
          </span>
          <div className="ml-auto hidden sm:flex gap-3">
            <span className="text-[11px] text-grey7">Ofertas</span>
            <span className="text-[11px] text-grey7">Portfólio</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 p-4">
          {OFFERS.map((offer, i) => (
            <motion.div
              key={offer.name}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.4, ease: EASE, delay: 0.3 + i * 0.1 }}
              className="rounded-lg border border-grey5 p-3"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-semibold text-grey0 truncate">
                  {offer.name}
                </span>
                <span className="shrink-0 font-mono text-[10px] text-primary">
                  {offer.rate}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-grey6 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={inView ? { width: `${offer.progress}%` } : undefined}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.5 + i * 0.1 }}
                />
              </div>
              <div className="mt-1 text-[9px] text-grey7">
                {offer.tag} · captação {offer.progress}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 0.4, ease: EASE, delay: 0.75 }}
        className="absolute -bottom-4 -right-3 sm:-right-6 flex items-center gap-2 rounded-full bg-grey0 border border-white/15 shadow-lg px-3.5 py-2"
      >
        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-trust-blue text-[10px] font-bold text-white">
          C
        </div>
        <span className="text-[11px] font-semibold text-white whitespace-nowrap">
          Infraestrutura Capitare
        </span>
      </motion.div>
    </motion.div>
  );
}

function ProductRow({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 16 }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.12 }}
      className="flex gap-4 py-6 first:pt-0 last:pb-0"
    >
      <motion.span
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : undefined}
        transition={{
          duration: 0.35,
          delay: index * 0.12 + 0.1,
          type: "spring",
          stiffness: 320,
          damping: 18,
        }}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
      >
        {index + 1}
      </motion.span>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1.5">
          {product.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/60 mb-3">
          {product.description}
        </p>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-sm font-semibold text-trust-blue-light hover:text-white transition-colors"
        >
          {product.linkLabel}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export default function PlatformInfrastructure() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="px-7 md:px-13 lg:px-20">
        <div className="max-w-[1140px] mx-auto">
          <div className="rounded-2xl bg-grey0 px-6 sm:px-10 lg:px-[70px] py-10 lg:py-16">
            <div className="max-w-2xl mx-auto text-center mb-14 lg:mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white text-balance"
              >
                Sua Plataforma.{" "}
                <span className="text-trust-blue-light">
                  Nossa Infraestrutura.
                </span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                className="mt-4 text-lg text-white/60 leading-relaxed"
              >
                Conecte-se à Capitare e ofereça produtos de mercado de
                capitais regulados aos seus clientes{" "}
                <strong className="text-white font-semibold">
                  sem construir a estrutura do zero.
                </strong>
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
              >
                <a href="#" className={solidButtonClasses}>
                  Falar com a Capitare
                </a>
                <a href="#" className={outlineOnDarkClasses}>
                  Como funciona
                </a>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
              <PlatformMockup />
              <div className="flex flex-col divide-y divide-white/10">
                {PRODUCTS.map((product, i) => (
                  <ProductRow key={product.title} product={product} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
