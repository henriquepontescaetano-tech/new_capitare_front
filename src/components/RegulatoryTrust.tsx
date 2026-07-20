"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Stat = {
  value: string;
  label: string;
};

const STATS: Stat[] = [
  { value: "R$1bi", label: "Tokenizado em ofertas reguladas" },
  { value: "30+", label: "Empresas ativas na plataforma" },
  { value: "3", label: "Produtos: CVM88, SCF e FIDC" },
  { value: "4+", label: "Tipos de ativos validados" },
];

const EASE = [0.22, 1, 0.36, 1] as const;
const SCRAMBLE_CHARS = "0123456789";
const SCRAMBLE_DURATION = 900;
const SCRAMBLE_TICK = 45;

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

function StatColumn({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const display = useScramble(stat.value, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: EASE, delay: 0.1 + index * 0.1 }}
      className="flex flex-col gap-1.5 sm:gap-2 items-center text-center max-w-[280px] mx-auto px-3 sm:not-first:pl-8 sm:not-last:pr-8"
    >
      <p className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-grey0 tabular-nums">
        {display}
      </p>
      <p className="text-sm sm:text-base leading-snug text-trust-blue">
        {stat.label}
      </p>
    </motion.div>
  );
}

function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-trust-blue/6 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, 16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-28 -right-16 h-80 w-80 rounded-full bg-trust-blue-light/10 blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, -14, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Sheen() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-y-0 w-1/4"
      style={{
        background:
          "linear-gradient(100deg, transparent, rgba(40,112,189,0.08), transparent)",
      }}
      initial={{ left: "-30%" }}
      whileInView={{ left: "110%" }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.3, ease: EASE, delay: 0.5 }}
    />
  );
}

export default function RegulatoryTrust() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24">
      <AmbientGlow />

      <div className="relative px-7 md:px-13 lg:px-20">
        <div className="max-w-[1140px] mx-auto flex flex-col items-center gap-6 sm:gap-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold text-grey0 text-balance"
          >
            Infraestrutura regulada.{" "}
            <span className="text-trust-blue">Resultado comprovado.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="inline-flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-trust-blue opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-trust-blue" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-trust-blue">
                CVM 88 · Ofertas Públicas Reguladas
              </span>
            </div>
            <motion.span
              className="h-px w-24 bg-trust-blue-light/50"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
            />
          </motion.div>

          <div className="relative w-full overflow-hidden border-t border-t-grey5 border-b border-b-grey5 py-9 sm:py-10 mt-2">
            <Sheen />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-9">
              {STATS.map((stat, i) => (
                <StatColumn key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
