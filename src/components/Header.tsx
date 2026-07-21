"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Trade", href: "#" },
  { label: "Explorer", href: "#" },
];

const outlineButtonClasses =
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all border border-grey1 text-grey0 bg-background shadow-xs hover:bg-grey3 active:bg-grey0 active:text-white h-9 px-4 py-[6px] rounded-full";

const solidButtonClasses =
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all bg-primary text-white hover:bg-blue0 active:bg-blue1 h-9 px-4 py-[6px] rounded-full";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="py-4.5 relative">
      <div className="px-7 md:px-13 lg:px-20">
        <div className="max-w-[1140px] m-auto">
          <div className="flex items-center gap-x-8 *:flex-1 *:basis-0">
            <Link
              href="/"
              className="flex items-center transition hover:opacity-50"
              onClick={() => setMenuOpen(false)}
            >
              <Image
                src="/logo.png"
                alt="Capitare"
                width={166}
                height={36}
                priority
                className="h-9 w-auto"
              />
            </Link>

            <div className="flex md:hidden justify-end">
              <motion.button
                type="button"
                aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
                whileTap={{ scale: 0.9 }}
                className="cursor-pointer flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {menuOpen ? (
                    <>
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </>
                  ) : (
                    <>
                      <path d="M4 5h16" />
                      <path d="M4 12h16" />
                      <path d="M4 19h16" />
                    </>
                  )}
                </svg>
              </motion.button>
            </div>

            <div className="hidden md:flex justify-center">
              <nav aria-label="Main">
                <ul className="flex gap-8 items-center text-nowrap">
                  {NAV_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="font-semibold text-grey0 text-sm rounded-sm p-2 transition-all hover:bg-grey6"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="gap-3 hidden md:flex justify-end">
              <motion.a
                href="#"
                className={outlineButtonClasses}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Como funciona
              </motion.a>
              <motion.a
                href="#"
                className={solidButtonClasses}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Falar com a Capitare
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 right-0 z-50 bg-background border-t border-grey5 shadow-lg px-7 py-6"
          >
            <nav aria-label="Main mobile">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block font-semibold text-grey0 text-base rounded-sm px-2 py-3 transition-all hover:bg-grey6"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-3 mt-4">
              <motion.a
                href="#"
                onClick={() => setMenuOpen(false)}
                whileTap={{ scale: 0.96 }}
                className={`${outlineButtonClasses} w-full h-11`}
              >
                Como funciona
              </motion.a>
              <motion.a
                href="#"
                onClick={() => setMenuOpen(false)}
                whileTap={{ scale: 0.96 }}
                className={`${solidButtonClasses} w-full h-11`}
              >
                Falar com a Capitare
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
