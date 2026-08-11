"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type ComplianceItem = {
  title: string;
  description: string;
};

const COMPLIANCE_ITEMS: ComplianceItem[] = [
  {
    title: "Emissões sob CVM 88",
    description:
      "Toda oferta pública estruturada na plataforma segue a Resolução CVM 88, com dispensa de registro dentro dos limites regulatórios e escrituração completa.",
  },
  {
    title: "Escrituração e custódia na B3",
    description:
      "Os ativos emitidos são escriturados e registrados na B3, com rastreabilidade completa da titularidade do início ao fim da operação.",
  },
  {
    title: "KYC/KYB na originação",
    description:
      "Originador e sacado passam por verificação documental e cadastral antes de qualquer ativo entrar na carteira do investidor.",
  },
  {
    title: "Liquidação auditável on-chain",
    description:
      "Toda liquidação é registrada em blockchain, com trilha auditável e verificável a qualquer momento, sem depender de conciliação manual.",
  },
];

type FloatingCardData = {
  title: string;
  subtitle: string;
  top: string;
  left: string;
  rotate: number;
  width: number;
  icon: React.ReactNode;
};

const FLOATING_CARDS: FloatingCardData[] = [
  {
    title: "Verificação de originador",
    subtitle: "Documentos societários",
    top: "9%",
    left: "2%",
    rotate: -6,
    width: 250,
    icon: (
      <svg {...iconProps}>
        <path d="M4 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16" />
        <path d="M12 10h7a1 1 0 0 1 1 1v10" />
        <path d="M4 21h16" />
        <path d="M8 8h.01M8 12h.01M8 16h.01M15 14h.01M15 17h.01" />
      </svg>
    ),
  },
  {
    title: "Verificação de recebível",
    subtitle: "CERC · CIP · Sefaz",
    top: "33%",
    left: "18%",
    rotate: -2,
    width: 258,
    icon: (
      <svg {...iconProps}>
        <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8Z" />
        <path d="M14 3v5h5" />
        <path d="m9.5 14 2 2 3.5-3.5" />
      </svg>
    ),
  },
  {
    title: "Registro na B3",
    subtitle: "Escrituração e custódia",
    top: "68%",
    left: "3%",
    rotate: -4,
    width: 240,
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="9" r="6" />
        <path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" />
      </svg>
    ),
  },
];

function CheckBadge() {
  return (
    <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_-2px_rgba(20,20,30,0.25)]">
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M12 2 4 5v6c0 5 3.4 8.6 8 11 4.6-2.4 8-6 8-11V5Z"
          fill="var(--blue3)"
          stroke="var(--primary)"
          strokeWidth={1.4}
        />
        <path
          d="m8.7 12.3 2.1 2.1 4.2-4.4"
          stroke="var(--primary)"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function FloatingCard({
  data,
  inView,
  delay,
}: {
  data: FloatingCardData;
  inView: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-xl border border-grey5 bg-white p-3.5 shadow-[0_10px_28px_-14px_rgba(20,20,30,0.25)]"
      style={{ top: data.top, left: data.left, width: data.width }}
      initial={{ opacity: 0, y: 16, rotate: data.rotate, scale: 0.95 }}
      animate={
        inView ? { opacity: 1, y: 0, rotate: data.rotate, scale: 1 } : undefined
      }
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue3 text-primary">
          <div className="h-4.5 w-4.5">{data.icon}</div>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-snug text-grey0">
            {data.title}
          </p>
          <p className="truncate text-xs text-grey7">{data.subtitle}</p>
        </div>
      </div>
      <CheckBadge />
    </motion.div>
  );
}

function ComplianceIllustration({ inView }: { inView: boolean }) {
  return (
    <div className="relative hidden min-h-[440px] w-full grow self-stretch md:block">
      <div className="absolute inset-0 overflow-hidden rounded-[28px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(var(--grey4) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse 75% 80% at 50% 45%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 80% at 50% 45%, black 30%, transparent 100%)",
          }}
        />

        {FLOATING_CARDS.map((card, i) => (
          <FloatingCard
            key={card.title}
            data={card}
            inView={inView}
            delay={0.15 + i * 0.12}
          />
        ))}

        <motion.div
          className="absolute flex h-[104px] w-[104px] items-center justify-center rounded-2xl bg-grey0 shadow-[0_20px_44px_-18px_rgba(2,1,18,0.45)]"
          style={{ top: "40%", left: "44%" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.5, ease: EASE, delay: 0.5 }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-11 w-11 text-white">
            <path
              d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="m9 12 2 2 4-4"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <motion.div
          className="absolute flex h-11 w-11 items-center justify-center rounded-full bg-primary shadow-[0_10px_24px_-8px_rgba(24,85,255,0.5)]"
          style={{ top: "62%", left: "60%" }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.4, ease: EASE, delay: 0.85 }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

function ChevronDown({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4 shrink-0 text-grey2"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: ComplianceItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-grey5 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left"
      >
        <span
          className={`border-l-2 py-1 pl-4 text-base font-semibold leading-snug transition-colors duration-300 sm:text-lg ${
            isOpen ? "border-primary text-grey0" : "border-grey4 text-grey0"
          }`}
        >
          {item.title}
        </span>
        <ChevronDown isOpen={isOpen} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-4 pl-4 text-sm leading-relaxed text-grey2">
              {item.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ComplianceCredentials() {
  const [openIndex, setOpenIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-background py-16 sm:py-24"
    >
      <div className="px-7 md:px-13 lg:px-20">
        <div className="mx-auto flex max-w-[1140px] flex-col items-stretch gap-10 md:flex-row md:items-start md:gap-12 lg:gap-20">
          <ComplianceIllustration inView={inView} />

          <div className="flex w-full shrink-0 flex-col gap-8 md:max-w-[340px] lg:max-w-[420px]">
            <div className="flex flex-col gap-4 text-center md:text-left">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, ease: EASE }}
                className="text-3xl font-semibold text-grey0 sm:text-4xl"
              >
                Regulado desde o primeiro dia.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
                className="text-lg leading-[26px] text-grey2"
              >
                A Capitare opera sob um arcabouço regulatório rígido, pensado
                para originadores e investidores institucionais.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: EASE, delay: 0.16 }}
            >
              {COMPLIANCE_ITEMS.map((item, i) => (
                <AccordionRow
                  key={item.title}
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
