"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Normatividad", href: "#normatividad" },
  { label: "Cobertura", href: "#cobertura" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "glass-nav py-3 shadow-lg shadow-black/20"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* ─── Brand ─── */}
          <a
            href="#inicio"
            className="flex items-center"
            aria-label="EHSW2 Inicio"
          >
            <Image
              src="/logo-ehsw2.png"
              alt="EHSW2"
              width={240}
              height={80}
              priority
              className="h-11 md:h-14 w-auto"
            />
          </a>

          {/* ─── Desktop Links ─── */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-[var(--color-text-muted)] hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm !py-2 !px-5"
            >
              Cotizar
            </a>
          </div>

          {/* ─── Hamburger ─── */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--color-bg-dark)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="text-2xl font-semibold text-white hover:text-[var(--color-primary)] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: navLinks.length * 0.06, duration: 0.4 }}
              className="btn-primary mt-4"
            >
              Cotizar
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
