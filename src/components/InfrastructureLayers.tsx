"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Layer = {
  numeral: string;
  eyebrow: string;
  title: string;
  description: string;
};

const LAYERS: Layer[] = [
  {
    numeral: "01",
    eyebrow: "DADOS",
    title: "Originação verificada na fonte",
    description:
      "O ativo é originado a partir de fontes oficiais como CERC, CIP, registradoras e Sefaz. Não trabalhamos com declaração de tomador nem planilha por email. A existência e a titularidade do recebível são verificadas direto na origem.",
  },
  {
    numeral: "02",
    eyebrow: "ELEGIBILIDADE",
    title: "Motor automatizado",
    description:
      "Cada ativo passa pelas regras do investidor antes de entrar na carteira. Concentração, prazo, performance histórica, sacado, ticket. Se não passa, não entra. Sem revisão manual.",
  },
  {
    numeral: "03",
    eyebrow: "LIQUIDAÇÃO",
    title: "Trilho operacional na blockchain",
    description:
      "Validação e liquidação acontecem na mesma camada. Quando o ativo é aprovado, o dinheiro vai direto pro tomador. Sem back office reconciliando, sem custódia no meio, sem semana de processamento.",
  },
];

const RULES = [
  { label: "Concentração", pass: true },
  { label: "Prazo", pass: true },
  { label: "Performance histórica", pass: true },
  { label: "Sacado", pass: false },
  { label: "Ticket", pass: true },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const SCRAMBLE_CHARS = "0123456789";
const SCRAMBLE_DURATION = 700;
const SCRAMBLE_TICK = 40;

function useScramble(target: string, active: boolean) {
  const [display, setDisplay] = useState(() =>
    target.replace(/[0-9]/g, () => SCRAMBLE_CHARS[0])
  );
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active || doneRef.current) return;
    doneRef.current = true;

    const totalTicks = Math.round(SCRAMBLE_DURATION / SCRAMBLE_TICK);
    let tick = 0;

    const interval = setInterval(() => {
      tick += 1;
      const lockedChars = Math.ceil((tick / totalTicks) * target.length);
      let next = "";
      for (let i = 0; i < target.length; i++) {
        const ch = target[i];
        if (!/[0-9]/.test(ch) || i < lockedChars) {
          next += ch;
        } else {
          next +=
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
      }
      setDisplay(next);

      if (tick >= totalTicks) {
        setDisplay(target);
        clearInterval(interval);
      }
    }, SCRAMBLE_TICK);

    return () => clearInterval(interval);
  }, [active, target]);

  return display;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 5 5 9-9" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-trust-blue shrink-0"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
    </svg>
  );
}

function FunnelIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-trust-blue shrink-0"
      aria-hidden="true"
    >
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z" />
    </svg>
  );
}

function BlockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-trust-blue-light shrink-0"
      aria-hidden="true"
    >
      <path d="m21 8-9-6-9 6 9 6 9-6Z" />
      <path d="M3 8v8l9 6 9-6V8" />
      <path d="M12 14v6" />
    </svg>
  );
}

function DataMockup({ inView }: { inView: boolean }) {
  const sources = ["CERC", "CIP", "SEFAZ", "B3"];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2.5 p-4">
      <div className="flex flex-wrap justify-center gap-1.5">
        {sources.map((label, i) => (
          <motion.span
            key={label}
            initial={{ opacity: 0, y: -6 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.35, ease: EASE, delay: 0.1 + i * 0.08 }}
            className="font-mono text-[11px] text-grey2 bg-white border border-grey4 rounded-full px-2.5 py-1 shadow-xs"
          >
            {label}
          </motion.span>
        ))}
      </div>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : undefined}
        transition={{ duration: 0.3, ease: EASE, delay: 0.45 }}
        style={{ transformOrigin: "top" }}
        className="h-5 w-px bg-trust-blue-light/60"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={inView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.35, ease: EASE, delay: 0.55 }}
        className="relative flex items-center gap-2 rounded-lg border border-trust-blue/25 bg-white shadow-sm px-3 py-2"
      >
        <DocIcon />
        <span className="font-mono text-[11px] text-grey2 whitespace-nowrap">
          Recebível #04X219
        </span>
        <motion.span
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : undefined}
          transition={{
            duration: 0.4,
            delay: 0.8,
            type: "spring",
            stiffness: 320,
            damping: 16,
          }}
          className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-trust-blue text-white"
        >
          <CheckIcon className="h-2.5 w-2.5" />
        </motion.span>
      </motion.div>
    </div>
  );
}

function EligibilityMockup({ inView }: { inView: boolean }) {
  return (
    <div className="flex h-full w-full flex-col justify-center p-4">
      <div className="mx-auto w-full max-w-[230px] rounded-xl border border-grey4/70 bg-white p-3 shadow-sm">
        <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-grey5">
          <FunnelIcon />
          <span className="text-[11px] font-semibold text-grey0">
            Motor de Regras
          </span>
          <span className="relative ml-auto flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trust-blue opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-trust-blue" />
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          {RULES.map((rule, i) => (
            <motion.div
              key={rule.label}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{
                duration: 0.3,
                ease: EASE,
                delay: 0.15 + i * 0.08,
              }}
              className="flex items-center justify-between gap-2"
            >
              <span className="text-[11px] text-grey2 truncate">
                {rule.label}
              </span>
              {rule.pass ? (
                <span className="shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-trust-blue/15 text-trust-blue">
                  <CheckIcon className="h-2.5 w-2.5" />
                </span>
              ) : (
                <span className="shrink-0 text-[9px] font-semibold text-grey7 bg-grey6 rounded-full px-1.5 py-0.5">
                  excluído
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettlementMockup({ inView }: { inView: boolean }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4">
      <div className="flex w-full items-center gap-2">
        <span className="min-w-0 shrink truncate text-[10px] font-semibold text-grey0 bg-white border border-grey4 rounded-full px-2 py-1">
          Ativo aprovado
        </span>
        <div className="relative flex h-6 w-10 shrink-0 items-center justify-center gap-1.5">
          {[0, 1].map((i) => (
            <BlockIcon key={i} />
          ))}
          <motion.span
            className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-trust-blue"
            style={{ left: 0 }}
            initial={{ left: "0%" }}
            animate={inView ? { left: ["0%", "100%"] } : undefined}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "linear",
              delay: 0.3,
            }}
          />
        </div>
        <span className="min-w-0 shrink truncate text-[10px] font-semibold text-white bg-trust-blue rounded-full px-2 py-1">
          Tomador recebe
        </span>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="text-[10px] text-grey7 line-through decoration-grey7/60"
      >
        Custódia intermediária
      </motion.p>
    </div>
  );
}

const MOCKUPS = [DataMockup, EligibilityMockup, SettlementMockup];

function TimelineRow({
  layer,
  index,
  isLast,
}: {
  layer: Layer;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const numeral = useScramble(layer.numeral, inView);
  const Mockup = MOCKUPS[index];

  return (
    <div ref={ref} className="relative flex gap-5 sm:gap-8">
      <div className="relative flex shrink-0 flex-col items-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : undefined}
          transition={{
            duration: 0.4,
            ease: EASE,
            type: "spring",
            stiffness: 320,
            damping: 20,
          }}
          className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-trust-blue bg-white font-mono text-xs font-bold text-trust-blue sm:h-12 sm:w-12 sm:text-sm"
        >
          {numeral}
        </motion.div>
        {!isLast && (
          <div className="relative w-px flex-1 overflow-hidden bg-grey4">
            <motion.div
              className="absolute inset-x-0 top-0 w-px bg-trust-blue"
              style={{ transformOrigin: "top" }}
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : undefined}
              transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
            />
          </div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
        className="grid flex-1 grid-cols-1 gap-5 pb-12 sm:grid-cols-[220px_1fr] sm:gap-8 lg:grid-cols-[260px_1fr]"
      >
        <div
          className={`relative order-2 h-[160px] shrink-0 overflow-hidden rounded-xl bg-grey6 sm:order-1 sm:h-[180px] ${
            index === 2 ? "trace-border" : ""
          }`}
        >
          <Mockup inView={inView} />
        </div>
        <div className="order-1 sm:order-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-grey7">
            {layer.eyebrow}
          </span>
          <h3 className="mt-1.5 mb-2 text-lg font-semibold text-grey0 sm:text-xl">
            {layer.title}
          </h3>
          <p className="text-sm leading-relaxed text-grey2 sm:text-[15px]">
            {layer.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-16 -right-20 h-64 w-64 rounded-full bg-trust-blue-light/10 blur-3xl"
        animate={{ x: [0, -18, 0], y: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -left-16 h-72 w-72 rounded-full bg-trust-blue/[0.05] blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -16, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function InfrastructureLayers() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24">
      <AmbientGlow />

      <div className="relative px-7 md:px-13 lg:px-20">
        <div className="max-w-[1140px] mx-auto">
          <div className="flex flex-col gap-4 mb-10 md:mb-14 mx-auto lg:mx-0 max-w-2xl text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-grey0 leading-tight text-balance"
            >
              Toda operação passa pela mesma{" "}
              <span className="text-trust-blue">infraestrutura</span>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              className="text-lg text-grey2 leading-relaxed"
            >
              Originador, três camadas técnicas, investidor. O que vai pra
              carteira foi{" "}
              <span className="text-grey0 font-medium">
                validado na fonte
              </span>
              , passou pelas{" "}
              <span className="text-grey0 font-medium">
                regras automáticas
              </span>{" "}
              e{" "}
              <span className="text-grey0 font-medium">
                liquida na mesma camada
              </span>{" "}
              onde foi originado.
            </motion.p>
          </div>

          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            {LAYERS.map((layer, i) => (
              <TimelineRow
                key={layer.numeral}
                layer={layer}
                index={i}
                isLast={i === LAYERS.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
