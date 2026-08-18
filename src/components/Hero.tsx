"use client";

import { motion } from "framer-motion";
import FlowEmbed from "./FlowEmbed";

const solidButtonClasses =
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all bg-primary text-white hover:bg-blue0 active:bg-blue1 h-12 md:h-14 px-6 py-4 text-base md:text-lg leading-[26px] rounded-full w-full sm:w-auto";

const outlineButtonClasses =
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all border border-grey1 text-grey0 bg-background shadow-xs hover:bg-grey3 active:bg-grey0 active:text-white h-12 md:h-14 px-6 py-4 text-base md:text-lg leading-[26px] rounded-full w-full sm:w-auto";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="px-7 md:px-13 lg:px-20">
      <div className="flex w-full max-w-[1140px] flex-col items-center gap-10 m-auto pt-12 pb-8 sm:pt-20 sm:pb-10 text-center">
        <div className="flex flex-col gap-4 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-semibold leading-[1.1] lg:leading-[72px] text-grey0">
              <span>O Pix fez isso com o dinheiro, nós </span>
              <br />
              <span className="text-primary">
                estamos fazendo isso com o crédito.
              </span>
            </h1>
          </motion.div>
          <motion.p
            className="text-xl text-grey2 leading-8 max-w-[600px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
          >
            A infraestrutura que conecta originadores e investidores com
            menos intermediários, mais segurança e custo operacional menor.
          </motion.p>
        </div>
        <motion.div
          className="flex w-full flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
        >
          <motion.a
            href="#"
            className={solidButtonClasses}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Falar com a Capitare
          </motion.a>
          <motion.a
            href="#"
            className={outlineButtonClasses}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Como funciona
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        className="w-full max-w-[1140px] m-auto pb-12 sm:pb-20"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
      >
        <FlowEmbed />
      </motion.div>
    </section>
  );
}
