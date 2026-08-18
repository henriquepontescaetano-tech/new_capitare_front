"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
  labelAbove?: boolean;
  icon: React.ReactNode;
};

const HUB_NODES: HubNode[] = [
  {
    x: 190,
    y: 110,
    label: "Motor",
    connected: false,
    labelAbove: true,
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
    x: 600,
    y: 70,
    label: "KYC/KYB",
    connected: false,
    labelAbove: true,
    icon: (
      <svg {...nodeIconProps}>
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 20c.6-3.4 3-5.2 5.5-5.2s4.9 1.8 5.5 5.2" />
        <path d="m15.5 9.5 1.7 1.7L20.5 8" />
      </svg>
    ),
  },
  {
    x: 1000,
    y: 60,
    label: "CVM 88",
    connected: true,
    labelAbove: true,
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
    x: 600,
    y: 360,
    label: "Custódia",
    connected: false,
    icon: (
      <svg {...nodeIconProps}>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        <rect x="9" y="10.5" width="6" height="5" rx="1" />
        <path d="M10.3 10.5V9a1.7 1.7 0 0 1 3.4 0v1.5" />
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

const HUB_LINES = [
  "M190,110 L190,210 L400,210",
  "M190,310 L190,210 L400,210",
  "M600,70 L600,165",
  "M1000,60 L1000,210 L800,210",
  "M1090,210 L800,210",
  "M1000,360 L1000,210 L800,210",
  "M600,360 L600,255",
  "M290,360 L290,210 L400,210",
];

const HUB_LINE_BENDS = [
  { x: 190, y: 210 },
  { x: 1000, y: 210 },
  { x: 290, y: 210 },
  { x: 400, y: 210 },
  { x: 800, y: 210 },
];

const HUB_PULSE_PATHS = [
  { cx: [190, 190, 400], cy: [110, 210, 210], delay: 1.2 },
  { cx: [190, 190, 400], cy: [310, 210, 210], delay: 1.8 },
  { cx: [290, 290, 400], cy: [360, 210, 210], delay: 2.4 },
  { cx: [1000, 1000, 800], cy: [60, 210, 210], delay: 1.5 },
  { cx: [1090, 800], cy: [210, 210], delay: 2.1 },
  { cx: [1000, 1000, 800], cy: [360, 210, 210], delay: 2.7 },
];

function HubGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="relative mx-auto mt-14 mb-4 hidden w-full max-w-[1040px] lg:block"
      style={{ aspectRatio: "1200 / 420" }}
    >
      <div
        className="absolute inset-0 rounded-[28px]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grey5) 1px, transparent 1px), linear-gradient(to bottom, var(--grey5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          maskImage:
            "radial-gradient(ellipse 72% 95% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 72% 95% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[220px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-3xl"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 1, ease: EASE }}
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
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.55 } : undefined}
            transition={{ duration: 0.9, ease: EASE, delay: 0.25 + i * 0.08 }}
          />
        ))}
        {HUB_LINE_BENDS.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={3}
            fill="var(--trust-blue)"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 0.7 } : undefined}
            transition={{ duration: 0.3, delay: 1 + i * 0.06 }}
          />
        ))}
        {HUB_PULSE_PATHS.map((pulse, i) => (
          <motion.circle
            key={i}
            r={4}
            fill="var(--trust-blue)"
            initial={{ opacity: 0 }}
            animate={
              inView
                ? {
                    cx: pulse.cx,
                    cy: pulse.cy,
                    opacity: [0, 1, 1, 0],
                  }
                : undefined
            }
            transition={{
              duration: 2,
              delay: pulse.delay,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "easeInOut",
            }}
            style={{ filter: "drop-shadow(0 0 4px rgba(40,112,189,0.7))" }}
          />
        ))}
      </svg>

      {HUB_NODES.map((node, i) => (
        <motion.div
          key={node.label}
          className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
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
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-white text-primary shadow-[0_6px_18px_-10px_rgba(20,20,30,0.25)]">
            <div className="h-5 w-5">{node.icon}</div>
          </div>
          <span
            className={`absolute left-1/2 w-max -translate-x-1/2 whitespace-nowrap text-[10px] font-medium leading-none text-grey7 ${
              node.labelAbove ? "bottom-full mb-1.5" : "top-full mt-1.5"
            }`}
          >
            {node.label}
          </span>
        </motion.div>
      ))}

      <motion.div
        className="absolute left-1/2 top-1/2 flex h-20 w-[190px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-2xl border border-primary/20 bg-white shadow-[0_16px_40px_-16px_rgba(24,85,255,0.35)]"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
      >
        <span className="text-xl font-bold tracking-tight text-primary">
          Capitare
        </span>
        <span className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-grey7">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Infraestrutura
        </span>
      </motion.div>
    </div>
  );
}

type MosaicSlot = {
  gridClasses: string;
  size: "lg" | "sm";
};

const MOSAIC_SLOTS: MosaicSlot[] = [
  { gridClasses: "lg:col-start-1 lg:col-span-2 lg:row-start-1 lg:row-span-1", size: "lg" },
  { gridClasses: "lg:col-start-3 lg:col-span-1 lg:row-start-1 lg:row-span-1", size: "sm" },
  { gridClasses: "lg:col-start-4 lg:col-span-1 lg:row-start-1 lg:row-span-2", size: "lg" },
  { gridClasses: "lg:col-start-1 lg:col-span-1 lg:row-start-2 lg:row-span-1", size: "sm" },
  { gridClasses: "lg:col-start-2 lg:col-span-1 lg:row-start-2 lg:row-span-1", size: "sm" },
  { gridClasses: "lg:col-start-3 lg:col-span-1 lg:row-start-2 lg:row-span-1", size: "sm" },
];

function MosaicCard({
  segment,
  index,
  slot,
}: {
  segment: Segment;
  index: number;
  slot: MosaicSlot;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isLg = slot.size === "lg";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.45, ease: EASE, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className={`group flex flex-col rounded-2xl border border-grey5 bg-white shadow-[0_8px_30px_-14px_rgba(20,20,30,0.14)] transition-colors duration-300 hover:border-primary/25 ${slot.gridClasses} ${
        isLg ? "justify-center p-8" : "justify-center p-6"
      }`}
    >
      <div
        className={`flex items-center justify-center rounded-xl bg-blue3 text-primary ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-105 ${
          isLg ? "mb-5 h-14 w-14" : "mb-4 h-11 w-11"
        }`}
      >
        <div className={isLg ? "h-7 w-7" : "h-5 w-5"}>{segment.icon}</div>
      </div>
      <h3
        className={`font-semibold text-grey0 ${
          isLg ? "text-xl mb-2.5" : "text-base mb-2"
        }`}
      >
        {segment.name}
      </h3>
      <p
        className={`leading-relaxed text-grey2 ${
          isLg ? "text-sm" : "text-xs"
        }`}
      >
        {segment.description}
      </p>
    </motion.div>
  );
}


export default function ScaleSegments() {
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

        <div className="max-w-[1140px] mx-auto mt-10 lg:mt-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-5">
            {SEGMENTS.map((segment, i) => (
              <MosaicCard
                key={segment.name}
                segment={segment}
                index={i}
                slot={MOSAIC_SLOTS[i]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
