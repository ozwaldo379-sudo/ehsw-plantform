import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-[var(--color-glass-border)] pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div>
                        <h4 className="text-xl font-bold text-white flex items-center gap-1">
                            EHSW<span className="text-[var(--color-primary)]">²</span>
                        </h4>
                        <p className="text-[var(--color-text-muted)] text-sm mt-2">
                            Líderes en Higiene, Seguridad y Medio Ambiente.
                        </p>
                    </div>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a
                            href="#"
                            className="text-[var(--color-text-muted)] text-xl hover:text-[var(--color-primary)] transition-colors"
                        >
                            <i className="fa-brands fa-facebook-f"></i>
                        </a>
                        <a
                            href="#"
                            className="text-[var(--color-text-muted)] text-xl hover:text-[var(--color-primary)] transition-colors"
                        >
                            <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                        <a
                            href="#"
                            className="text-[var(--color-text-muted)] text-xl hover:text-[var(--color-primary)] transition-colors"
                        >
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                    </div>
                </div>

                <div className="text-center text-xs text-[rgba(255,255,255,0.2)] pt-6 border-t border-[rgba(255,255,255,0.05)]">
                    © {new Date().getFullYear()} EHSW². Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}
