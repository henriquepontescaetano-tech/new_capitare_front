"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Feature = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const FEATURES: Feature[] = [
  {
    title: "Trilha completa",
    description:
      "Da originação até a liquidação, veja o caminho inteiro de cada ativo tokenizado, sem depender de relatório manual.",
    icon: (
      <svg {...iconProps}>
        <circle cx="5" cy="18" r="2.2" />
        <circle cx="12" cy="6" r="2.2" />
        <circle cx="19" cy="18" r="2.2" />
        <path d="M6.8 16.8 10.3 8M13.7 8l3.5 8.8" />
      </svg>
    ),
  },
  {
    title: "API aberta",
    description:
      "Acesso via API para investidores institucionais integrarem os dados de liquidação direto aos seus sistemas.",
    icon: (
      <svg {...iconProps}>
        <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
      </svg>
    ),
  },
  {
    title: "Verificável on-chain",
    description:
      "Cada registro tem hash e horário verificáveis na blockchain, auditável por qualquer investidor a qualquer momento.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="9" width="7" height="7" rx="1.5" />
        <rect x="14" y="9" width="7" height="7" rx="1.5" />
        <path d="M10 12.5h4" />
      </svg>
    ),
  },
];

type ExplorerRow = {
  asset: string;
  event: string;
  status: "confirmado" | "processando";
  hash: string;
  time: string;
};

const EXPLORER_ROWS: ExplorerRow[] = [
  {
    asset: "REC-04X219",
    event: "Liquidação",
    status: "confirmado",
    hash: "0x8a3f…c21b",
    time: "há 2 min",
  },
  {
    asset: "REC-04X187",
    event: "Originação",
    status: "confirmado",
    hash: "0x1e9d…7f04",
    time: "há 11 min",
  },
  {
    asset: "REC-04X203",
    event: "Amortização",
    status: "processando",
    hash: "0x6b2a…9d3e",
    time: "há 24 min",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.1 }}
      className="flex flex-col gap-1.5 text-left"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center text-trust-blue-light">
          <span className="h-5 w-5">{feature.icon}</span>
        </span>
        <p className="text-lg font-semibold leading-[26px] text-white">
          {feature.title}
        </p>
      </div>
      <p className="text-white/60">{feature.description}</p>
    </motion.div>
  );
}

function StatusBadge({ status }: { status: ExplorerRow["status"] }) {
  const isConfirmed = status === "confirmado";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
        isConfirmed
          ? "bg-emerald-500/15 text-emerald-400"
          : "bg-amber-500/15 text-amber-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${isConfirmed ? "bg-emerald-400" : "bg-amber-400"}`}
      />
      {isConfirmed ? "Confirmado" : "Processando"}
    </span>
  );
}

function ExplorerMockup() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.6, ease: EASE }}
      className="relative mx-auto w-full max-w-[480px]"
    >
      <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-grey5 bg-grey6 px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-grey4" />
          <span className="h-2.5 w-2.5 rounded-full bg-grey4" />
          <span className="h-2.5 w-2.5 rounded-full bg-grey4" />
          <div className="ml-2 flex-1 truncate rounded-md border border-grey5 bg-white px-2.5 py-1 font-mono text-[10px] text-grey7">
            explorer.capitare.io
          </div>
        </div>

        <div className="flex items-center gap-2 border-b border-grey5 px-4 py-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-grey0 text-[11px] font-bold text-white">
            C
          </div>
          <span className="text-sm font-semibold text-grey0">
            Capitare Explorer
          </span>
          <div className="ml-auto hidden gap-3 sm:flex">
            <span className="text-[11px] text-grey7">Recebíveis</span>
            <span className="text-[11px] text-grey7">Liquidações</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4">
          {EXPLORER_ROWS.map((row, i) => (
            <motion.div
              key={row.asset}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{ duration: 0.4, ease: EASE, delay: 0.3 + i * 0.1 }}
              className="flex items-center justify-between gap-3 rounded-lg border border-grey5 p-3"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-grey0">
                    {row.asset}
                  </span>
                  <StatusBadge status={row.status} />
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] text-grey7">
                  <span>{row.event}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{row.hash}</span>
                </div>
              </div>
              <span className="shrink-0 font-mono text-[10px] text-grey7">
                {row.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 0.4, ease: EASE, delay: 0.75 }}
        className="absolute -bottom-4 -left-3 flex items-center gap-2 rounded-full border border-white/15 bg-grey0 px-3.5 py-2 shadow-lg sm:-left-6"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="whitespace-nowrap text-[11px] font-semibold text-white">
          Atualizado em tempo real
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function ExplorerIntro() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="px-7 md:px-13 lg:px-20">
        <div className="max-w-[1140px] mx-auto">
          <div className="rounded-2xl bg-grey0 px-6 py-10 sm:px-10 lg:px-[70px] lg:py-16">
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex h-8 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-white"
                >
                  Em breve
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white"
                >
                  Apresentando o{" "}
                  <span className="text-trust-blue-light">Explorer</span>.
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
                  className="text-lg leading-[26px] text-white/60"
                >
                  Acompanhe cada recebível, cada liquidação e cada trilha
                  auditável da Capitare — em tempo real, direto na blockchain.
                </motion.p>

                <div className="mt-4 flex w-full flex-col gap-8">
                  {FEATURES.map((feature, i) => (
                    <FeatureRow
                      key={feature.title}
                      feature={feature}
                      index={i}
                    />
                  ))}
                </div>
              </div>

              <ExplorerMockup />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
              className="mx-auto mt-12 w-fit max-w-full rounded-full border border-primary bg-primary/10 px-6 py-2 text-center text-base sm:text-lg font-semibold text-trust-blue-light"
            >
              Do dado à liquidação. Tudo auditável, direto na Capitare.
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
