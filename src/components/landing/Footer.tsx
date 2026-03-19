import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

const footerLinks = [
  {
    title: "Servicios",
    links: [
      { label: "Control de Plagas", href: "#servicios" },
      { label: "Extintores", href: "#servicios" },
      { label: "Gestión Ambiental", href: "#servicios" },
      { label: "Seguridad Industrial", href: "#servicios" },
    ],
  },
  {
    title: "Normatividad",
    links: [
      { label: "COFEPRIS", href: "#normatividad" },
      { label: "STPS", href: "#normatividad" },
      { label: "SEMARNAT", href: "#normatividad" },
      { label: "Protección Civil", href: "#normatividad" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros", href: "#nosotros" },
      { label: "Cobertura", href: "#cobertura" },
      { label: "Contacto", href: "#contacto" },
      { label: "Verificar Certificado", href: "#certificados" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-glass-border)] pt-12 lg:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <Image
              src="/logo-ehsw2.png"
              alt="Logo de EHSW2"
              width={210}
              height={72}
              className="h-11 w-auto mb-4"
            />
            <p className="text-sm text-silver leading-relaxed mb-5">
              Especialistas en higiene, seguridad y medio ambiente para
              empresas de todos los giros.
            </p>
            <div className="flex flex-col gap-2 text-sm text-silver/70">
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" /> {siteConfig.contact.phone}
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> {siteConfig.contact.email}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> México, zona centro
              </span>
            </div>
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm mt-6"
            >
              Cotizar por WhatsApp
            </a>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-silver hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--color-glass-border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-silver/70">
            © {new Date().getFullYear()} EHSW². Todos los derechos reservados.
          </p>
          <p className="text-xs text-silver/70">
            Certificación digital y servicios técnicos para cumplimiento EHS
          </p>
        </div>
      </div>
    </footer>
  );
}
