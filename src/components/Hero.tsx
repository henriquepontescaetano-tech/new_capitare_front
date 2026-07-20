"use client";

import { motion } from "framer-motion";
import FlowEmbed from "./FlowEmbed";

const solidButtonClasses =
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all bg-primary text-white hover:bg-blue0 active:bg-blue1 h-12 md:h-14 px-6 py-4 text-base md:text-lg leading-[26px] rounded-full w-full sm:w-[156px]";

const outlineButtonClasses =
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all border border-grey1 text-grey0 bg-background shadow-xs hover:bg-grey3 active:bg-grey0 active:text-white h-12 md:h-14 px-6 py-4 text-base md:text-lg leading-[26px] rounded-full w-full sm:w-auto";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section className="px-7 md:px-13 lg:px-20">
      <div className="flex items-center w-full max-w-[1140px] m-auto flex-col md:flex-row md:gap-5">
        <div className="flex flex-col gap-10 md:w-[45%] z-10 pt-12 pb-6 sm:pt-20 md:!py-37">
          <div className="flex flex-col gap-4 items-center md:items-start">
            <motion.div
              className="text-center md:items-start md:text-start"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-semibold leading-[1.1] lg:leading-[72px] text-grey0">
                <span>Derivatives Infrastructure. </span>
                <br />
                <span className="text-primary text-nowrap">
                  Built for Scale.
                </span>
              </h1>
            </motion.div>
            <motion.p
              className="text-xl text-grey2 leading-8 text-center md:text-start w-[80%] md:w-[98%]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
            >
              We provide the regulatory foundation, the execution layer, and
              the liquidity all through a single integration.
            </motion.p>
          </div>
          <motion.div
            className="flex w-full flex-col sm:flex-row justify-center md:justify-start gap-4"
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
              Trade
            </motion.a>
            <motion.a
              href="#"
              className={outlineButtonClasses}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Read our API docs
            </motion.a>
            <motion.a
              href="#"
              className={outlineButtonClasses}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Us
            </motion.a>
          </motion.div>
        </div>

        <div className="w-[calc(100%+3.5rem)] -mx-7 md:w-[55%] md:mx-0 sm:max-md:mb-6 md:max-lg:mb-20 md:translate-x-5 xl:translate-y-3">
          <FlowEmbed />
        </div>
      </div>
    </section>
  );
}
