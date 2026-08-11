import Image from "next/image";
import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Produtos",
    links: [
      { label: "CVM88", href: "#" },
      { label: "Supply chain finance", href: "#" },
      { label: "Ferramenta FIDC", href: "#" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Como funciona", href: "#" },
      { label: "Mídia", href: "#" },
      { label: "Reconhecimentos", href: "#" },
      { label: "Sobre", href: "#" },
      { label: "Conteúdo", href: "#" },
    ],
  },
  {
    title: "Contato",
    links: [
      { label: "Falar com a Capitare", href: "#contato" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/capitare/",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-grey0 py-14 sm:py-16">
      <div className="px-7 md:px-13 lg:px-20">
        <div className="max-w-[1140px] mx-auto">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Link
                href="/"
                className="inline-flex transition hover:opacity-70"
              >
                <Image
                  src="/logo-white.svg"
                  alt="Capitare"
                  width={150}
                  height={31}
                  className="h-8 w-auto"
                />
              </Link>
              <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-white/50">
                Capital markets as a service. Infraestrutura para originação,
                estruturação e captação no mercado regulado.
              </p>
            </div>

            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title}>
                <h6 className="text-xs font-semibold uppercase tracking-wide text-white/40">
                  {column.title}
                </h6>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Capitare. Todos os direitos reservados.</p>
            <p>São Paulo, Brasil</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
