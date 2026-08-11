"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const PRODUTO_OPTIONS = [
  { value: "cvm88", label: "CVM88 (captação via oferta pública)" },
  { value: "scf", label: "SCF (antecipação de recebíveis)" },
  { value: "fidc", label: "Ferramenta para FIDCs" },
  { value: "nao-sei", label: "Ainda não sei, quero entender" },
];

const VOLUME_OPTIONS = [
  { value: "ate5m", label: "Até R$ 5 milhões" },
  { value: "5a20m", label: "R$ 5 a R$ 20 milhões" },
  { value: "20a100m", label: "R$ 20 a R$ 100 milhões" },
  { value: "acima100m", label: "Acima de R$ 100 milhões" },
  { value: "indefinido", label: "Ainda em definição" },
];

const inputClasses =
  "w-full rounded-xl border border-grey5 bg-white px-4 py-3 text-sm text-grey0 placeholder:text-grey7 outline-none transition-colors focus:border-primary";

const labelClasses =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-grey7";

function ChevronDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-grey7"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5.5 w-5.5">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="flex flex-col items-center justify-center gap-4 py-16 text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: EASE,
          delay: 0.1,
          type: "spring",
          stiffness: 260,
          damping: 18,
        }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-primary">
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, ease: EASE, delay: 0.35 }}
          />
        </svg>
      </motion.div>
      <div>
        <p className="text-lg font-semibold text-grey0">Mensagem enviada.</p>
        <p className="mt-1 text-sm text-grey7">
          Respondemos em até 1 dia útil, direto no seu email.
        </p>
      </div>
    </motion.div>
  );
}

function ContactFormCard({ inView }: { inView: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
      className="rounded-2xl border border-grey5 bg-white p-6 shadow-[0_8px_30px_-14px_rgba(20,20,30,0.14)] sm:p-8"
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <SuccessState key="success" />
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className={labelClasses}>
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Seu nome"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="empresa" className={labelClasses}>
                  Empresa
                </label>
                <input
                  id="empresa"
                  name="empresa"
                  type="text"
                  autoComplete="organization"
                  placeholder="Nome da empresa"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email corporativo
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="voce@empresa.com"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="telefone" className={labelClasses}>
                  Telefone
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(11) 99999-9999"
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label htmlFor="produto" className={labelClasses}>
                Qual produto interessa
              </label>
              <div className="relative">
                <select
                  id="produto"
                  name="produto"
                  defaultValue=""
                  className={`${inputClasses} appearance-none pr-10`}
                >
                  <option value="" disabled className="text-grey7">
                    Selecione um produto
                  </option>
                  {PRODUTO_OPTIONS.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="text-grey0"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon />
              </div>
            </div>

            <div>
              <label htmlFor="volume" className={labelClasses}>
                Volume ou ticket pretendido
              </label>
              <div className="relative">
                <select
                  id="volume"
                  name="volume"
                  defaultValue=""
                  className={`${inputClasses} appearance-none pr-10`}
                >
                  <option value="" disabled className="text-grey7">
                    Selecione uma faixa
                  </option>
                  {VOLUME_OPTIONS.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="text-grey0"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon />
              </div>
            </div>

            <div>
              <label htmlFor="mensagem" className={labelClasses}>
                Conta um pouco
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={3}
                placeholder="Em qual momento você está e o que precisa resolver"
                className={`${inputClasses} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="cursor-pointer inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-base font-semibold text-white transition-all hover:bg-blue0 active:bg-blue1 md:h-14"
            >
              Falar com a Capitare
            </button>

            <p className="text-center text-xs leading-relaxed text-grey7 sm:text-left">
              Respondemos em até 1 dia útil. Suas informações são tratadas
              conforme nossa política de privacidade.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contato"
      ref={ref}
      className="relative overflow-hidden bg-background py-16 sm:py-24"
    >
      <div className="px-7 md:px-13 lg:px-20">
        <div className="mx-auto grid max-w-[1140px] grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:justify-center lg:gap-9 lg:text-left lg:self-stretch">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-sm font-semibold uppercase tracking-widest text-primary"
            >
              Fale com a Capitare
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-grey0 text-balance leading-[1.1]"
            >
              Veja como sua empresa acessa o{" "}
              <span className="text-primary">mercado de capitais</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
              className="text-xl lg:text-2xl leading-relaxed text-grey2"
            >
              Conta um pouco sobre sua operação e qual produto faz sentido pro
              seu momento. Respondemos rápido e marcamos uma conversa direta com
              quem entende do assunto.
            </motion.p>

            <motion.a
              href="https://www.linkedin.com/company/capitare/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
              className="group mt-2 flex items-center gap-4"
            >
              <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl border border-grey5 bg-white text-grey7 transition-colors group-hover:border-primary/40 group-hover:text-primary">
                <LinkedInIcon />
              </span>
              <span className="text-left">
                <span className="block text-xs font-semibold uppercase tracking-wide text-grey7">
                  LinkedIn
                </span>
                <span className="block text-base font-semibold text-grey0">
                  Acompanhe a Capitare
                </span>
              </span>
            </motion.a>
          </div>

          <ContactFormCard inView={inView} />
        </div>
      </div>
    </section>
  );
}
