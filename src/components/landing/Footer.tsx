import { Phone, Mail, MapPin } from "lucide-react";

const footerLinks = [
  {
    title: "Servicios",
    links: [
      "Control de Plagas",
      "Extintores",
      "Gestión Ambiental",
      "Seguridad Industrial",
    ],
  },
  {
    title: "Normatividad",
    links: ["COFEPRIS", "STPS", "SEMARNAT", "Protección Civil"],
  },
  {
    title: "Empresa",
    links: ["Nosotros", "Cobertura", "Contacto", "Verificar Certificado"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-glass-border)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <div className="text-xl font-extrabold tracking-tight text-white mb-4">
              EHSW<span className="text-gradient">²</span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-5">
              Especialistas en higiene, seguridad y medio ambiente para
              empresas de todos los giros.
            </p>
            <div className="flex flex-col gap-2 text-sm text-[var(--color-text-subtle)]">
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" /> +52 55 1234 5678
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> contacto@ehsw2.com
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> CDMX, México
              </span>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <span className="text-sm text-[var(--color-text-muted)] hover:text-white transition-colors cursor-pointer">
                      {link}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--color-glass-border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--color-text-subtle)]">
            © {new Date().getFullYear()} EHSW². Todos los derechos reservados.
          </p>
          <p className="text-xs text-[var(--color-text-subtle)]">
            Desarrollado con tecnología de última generación
          </p>
        </div>
      </div>
    </footer>
  );
}
