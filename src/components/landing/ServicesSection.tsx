export default function ServicesSection() {
    return (
        <section id="servicios" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-[var(--color-primary)] font-bold uppercase tracking-widest text-sm block mb-3">
                        Catálogo de Soluciones
                    </span>
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Nuestros Servicios
                    </h2>
                    <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
                        Implementamos técnicas avanzadas y damos soporte completo en auditorías.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Featured Service: Plagas */}
                    <div className="bg-[var(--color-bg-card)] rounded-3xl border border-[var(--color-glass-border)] overflow-hidden group hover:border-[rgba(56,189,248,0.3)] transition-all duration-300">
                        <div
                            className="h-48 bg-cover bg-center relative"
                            style={{
                                backgroundImage:
                                    "linear-gradient(to bottom, transparent, var(--color-bg-card)), url('https://images.unsplash.com/photo-1588665033731-090623351334?auto=format&fit=crop&q=80')",
                            }}
                        ></div>
                        <div className="p-8">
                            <div className="w-14 h-14 bg-[rgba(56,189,248,0.1)] text-[var(--color-primary)] rounded-xl flex items-center justify-center text-2xl mb-5">
                                <i className="fa-solid fa-bug"></i>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                Control Integral de Plagas
                            </h3>
                            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6">
                                Manejo Integrado de Plagas (MIP) para industrias, hospitales,
                                hoteles y comercio. Licencia Sanitaria{" "}
                                <strong className="text-white">COFEPRIS</strong>.
                            </p>

                            <div className="border-t border-[var(--color-glass-border)] pt-5">
                                <h4 className="text-white text-sm font-semibold mb-3 flex items-center gap-2">
                                    <i className="fa-solid fa-microscope text-[var(--color-accent)]"></i>
                                    Técnicas Especializadas:
                                </h4>
                                <ul className="space-y-2">
                                    {[
                                        "Nebulizaciones en frío y termonebulización.",
                                        "Aspersión de alta/baja presión.",
                                        "Micro-inyección y aplicación de Gel.",
                                        "Control de roedores (Cebado táctico).",
                                    ].map((item, i) => (
                                        <li
                                            key={i}
                                            className="text-[var(--color-text-muted)] text-sm pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[var(--color-accent)] before:font-bold"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Services Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                            {
                                icon: "fa-fire-extinguisher",
                                title: "Extintores (NOM-154)",
                                desc: "Mantenimiento, recarga y pruebas hidrostáticas certificadas. Collarín y holograma oficial.",
                            },
                            {
                                icon: "fa-helmet-safety",
                                title: "Seguridad Industrial",
                                desc: "Consultoría STPS, análisis de riesgos (NOM-002, NOM-017) y capacitación DC-3.",
                            },
                            {
                                icon: "fa-leaf",
                                title: "Gestión Ambiental",
                                desc: "Estudios de Impacto Ambiental, Ruido Perimetral y trámites ante dependencias.",
                            },
                            {
                                icon: "fa-users-rays",
                                title: "Protección Civil",
                                desc: "Elaboración de Programas Internos y formación de brigadas de emergencia.",
                            },
                        ].map((service, i) => (
                            <div key={i} className="service-mini-card">
                                <div className="w-12 h-12 bg-[rgba(56,189,248,0.1)] text-[var(--color-primary)] rounded-xl flex items-center justify-center text-xl mb-4">
                                    <i className={`fa-solid ${service.icon}`}></i>
                                </div>
                                <h4 className="text-white text-base font-semibold mb-2">
                                    {service.title}
                                </h4>
                                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                                    {service.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
