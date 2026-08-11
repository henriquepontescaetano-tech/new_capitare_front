"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Segment = {
  name: string;
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

const SEGMENTS: Segment[] = [
  {
    name: "Indústria",
    description:
      "Antecipação de recebíveis de fornecedores e distribuidores, sem depender de spread bancário.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 21V10l5 3v-3l5 3v-3l5 3v8H3Z" />
        <path d="M3 21h18" />
      </svg>
    ),
  },
  {
    name: "Saúde",
    description:
      "Estruturação de recebíveis de operadoras e prestadores, com liquidação automática on-chain.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
  {
    name: "Varejo",
    description:
      "Antecipação de cartão e duplicatas para capital de giro, direto na sua operação.",
    icon: (
      <svg {...iconProps}>
        <path d="M6 8V6a6 6 0 0 1 12 0v2" />
        <rect x="3" y="8" width="18" height="13" rx="2" />
      </svg>
    ),
  },
  {
    name: "Serviços financeiros",
    description:
      "Ferramenta FIDC para fundos mais baratos e captação via CVM88 sob a sua marca.",
    icon: (
      <svg {...iconProps}>
        <path d="M3 10 12 4l9 6" />
        <path d="M5 10v9M9.5 10v9M14.5 10v9M19 10v9" />
        <path d="M3 19h18" />
      </svg>
    ),
  },
  {
    name: "Logística e transporte",
    description:
      "Tokenização de CT-e e recebíveis de frete, com motor de elegibilidade automatizado.",
    icon: (
      <svg {...iconProps}>
        <rect x="1" y="7" width="13" height="10" rx="1" />
        <path d="M14 10h4l3 3v4h-7z" />
        <circle cx="6" cy="19" r="1.8" />
        <circle cx="17.5" cy="19" r="1.8" />
      </svg>
    ),
  },
  {
    name: "Franquias",
    description:
      "Infraestrutura de antecipação para redes de franquia, unificada em uma única plataforma.",
    icon: (
      <svg {...iconProps}>
        <path d="M4 21V9l8-5 8 5v12" />
        <path d="M9 21v-6h6v6" />
        <path d="M4 9h16" />
      </svg>
    ),
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const solidButtonClasses =
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all bg-primary text-white hover:bg-blue0 active:bg-blue1 h-12 md:h-14 px-7 text-base rounded-full";

const nodeIconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

type HubNode = {
  x: number;
  y: number;
  label: string;
  connected: boolean;
  icon: React.ReactNode;
};

const HUB_NODES: HubNode[] = [
  {
    x: 190,
    y: 110,
    label: "Motor",
    connected: false,
    icon: (
      <svg {...nodeIconProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
    ),
  },
  {
    x: 190,
    y: 310,
    label: "Dados oficiais",
    connected: false,
    icon: (
      <svg {...nodeIconProps}>
        <ellipse cx="12" cy="6" rx="7" ry="3" />
        <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
        <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
      </svg>
    ),
  },
  {
    x: 1000,
    y: 60,
    label: "CVM 88",
    connected: true,
    icon: (
      <svg {...nodeIconProps}>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    x: 1090,
    y: 210,
    label: "Controle de PU",
    connected: false,
    icon: (
      <svg {...nodeIconProps}>
        <path
          d="M4 19V9M10 19V5M16 19v-7M22 19V3"
          transform="translate(-2 0)"
        />
      </svg>
    ),
  },
  {
    x: 1000,
    y: 360,
    label: "Blockchain",
    connected: false,
    icon: (
      <svg {...nodeIconProps}>
        <rect x="3" y="9" width="7" height="7" rx="1.5" />
        <rect x="14" y="9" width="7" height="7" rx="1.5" />
        <path d="M10 12.5h4" />
      </svg>
    ),
  },
  {
    x: 290,
    y: 360,
    label: "Recebível",
    connected: true,
    icon: (
      <svg {...nodeIconProps}>
        <path d="M6 3h9l3 3v15H6Z" />
        <path d="M15 3v3h3" />
        <path d="M9 12h6M9 15h6M9 9h3" />
      </svg>
    ),
  },
];

const HUB_LINES = ["M1000,60 L1000,210 L800,210", "M290,360 L290,210 L400,210"];

function HubGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative mx-auto mt-14 mb-4 hidden w-full max-w-[1000px] lg:block"
      style={{ aspectRatio: "1200 / 420" }}
    >
      <div
        className="absolute inset-0 rounded-[28px]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grey5) 1px, transparent 1px), linear-gradient(to bottom, var(--grey5) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          maskImage:
            "radial-gradient(ellipse 65% 88% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 65% 88% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <svg
        viewBox="0 0 1200 420"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {HUB_LINES.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            stroke="var(--trust-blue)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 + i * 0.15 }}
          />
        ))}
        {[
          { x: 1000, y: 210 },
          { x: 290, y: 210 },
        ].map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="var(--trust-blue)"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : undefined}
            transition={{ duration: 0.3, delay: 1.1 + i * 0.15 }}
          />
        ))}
      </svg>

      {HUB_NODES.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{
            left: `${(node.x / 1200) * 100}%`,
            top: `${(node.y / 420) * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{
            duration: 0.4,
            ease: EASE,
            delay: node.connected ? 0.85 : 0.5 + i * 0.08,
          }}
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl border bg-white shadow-[0_6px_18px_-10px_rgba(20,20,30,0.25)] ${
              node.connected
                ? "border-primary/25 text-primary"
                : "border-grey5 text-grey7"
            }`}
          >
            <div className="h-5 w-5">{node.icon}</div>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 flex h-20 w-[190px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-2xl border border-primary/20 bg-white shadow-[0_16px_40px_-16px_rgba(24,85,255,0.35)]"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
      >
        <span className="text-xl font-bold tracking-tight text-primary">
          Capitare
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wide text-grey7">
          Infraestrutura
        </span>
      </motion.div>
    </div>
  );
}

function SegmentCard({ segment, index }: { segment: Segment; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group snap-start shrink-0 w-67.5 sm:w-75 rounded-2xl border border-grey5 bg-white p-7 shadow-[0_8px_30px_-14px_rgba(20,20,30,0.14)] transition-colors duration-300 hover:border-primary/25"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue3 text-primary ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-105">
        <div className="h-6 w-6">{segment.icon}</div>
      </div>
      <h3 className="text-lg font-semibold text-grey0 mb-2.5">
        {segment.name}
      </h3>
      <p className="text-sm leading-relaxed text-grey2">
        {segment.description}
      </p>
    </motion.div>
  );
}

const CARD_STEP = 320;

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d={direction === "left" ? "M14.5 6l-6 6 6 6" : "M9.5 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function useCarouselScroll(scrollRef: React.RefObject<HTMLDivElement | null>) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setAtStart(el.scrollLeft <= 4);
      setAtEnd(el.scrollLeft >= max - 4);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollRef]);

  const scrollByStep = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * CARD_STEP, behavior: "smooth" });
  };

  return { atStart, atEnd, scrollByStep };
}

function EdgeButton({
  side,
  onClick,
  disabled,
}: {
  side: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={
        side === "left" ? "Ver setores anteriores" : "Ver mais setores"
      }
      className={`absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-grey5 bg-white text-grey7 shadow-[0_4px_14px_-8px_rgba(20,20,30,0.2)] transition-all duration-200 hover:border-primary/30 hover:bg-blue3 hover:text-primary disabled:opacity-30 disabled:hover:border-grey5 disabled:hover:bg-white disabled:hover:text-grey7 disabled:cursor-not-allowed cursor-pointer xl:flex ${
        side === "left" ? "-left-[60px]" : "-right-[60px]"
      }`}
    >
      <ChevronIcon direction={side} />
    </button>
  );
}

export default function ScaleSegments() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { atStart, atEnd, scrollByStep } = useCarouselScroll(scrollRef);

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="px-7 md:px-13 lg:px-20">
        <div className="relative max-w-[1140px] mx-auto flex flex-col items-center gap-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative text-3xl sm:text-4xl md:text-5xl font-semibold text-grey0"
          >
            Infraestrutura para todo setor.
          </motion.h2>
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`relative ${solidButtonClasses}`}
          >
            Falar com a Capitare
          </motion.a>
        </div>

        <HubGraphic />

        <div className="max-w-[1140px] mx-auto">
          <div className="relative mt-10 lg:mt-16">
            <EdgeButton
              side="left"
              onClick={() => scrollByStep(-1)}
              disabled={atStart}
            />
            <EdgeButton
              side="right"
              onClick={() => scrollByStep(1)}
              disabled={atEnd}
            />
            <div
              ref={scrollRef}
              className="overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
              style={{
                maskImage:
                  "linear-gradient(to right, black 0, black calc(100% - 40px), transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, black 0, black calc(100% - 40px), transparent 100%)",
              }}
            >
              <div className="flex gap-5">
                {SEGMENTS.map((segment, i) => (
                  <SegmentCard key={segment.name} segment={segment} index={i} />
                ))}
                <div className="shrink-0 w-1" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
