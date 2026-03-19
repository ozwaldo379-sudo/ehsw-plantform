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
                        <img
                            src="/Images/Servicios/control-integral-de-plagas.png"
                            alt="Control Integral de Plagas"
                            className="w-full h-[220px] object-cover rounded-t-[24px]"
                        />
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

                    {/* Secondary Services Container */}
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                            {
                                icon: "fa-shield-virus",
                                title: "Desinfección",
                                desc: "Servicios profesionales de desinfección en instalaciones industriales y corporativas.",
                                img: "/Images/Servicios/desinfeccion.png"
                            },
                            {
                                icon: "fa-earth-americas",
                                title: "Impacto Ambiental",
                                desc: "Estudios de impacto ambiental, muestreo de suelos en zonas industriales.",
                                img: "/Images/Servicios/impacto-ambiental.png"
                            },
                            {
                                icon: "fa-users-rays",
                                title: "Protección Civil",
                                desc: "Formación de brigadas de emergencia y sesiones de entrenamiento en planta.",
                                img: "/Images/Servicios/proteccion-civil.png"
                            },
                            {
                                icon: "fa-leaf",
                                title: "Gestión Ambiental",
                                desc: "Consultoría de gestión ambiental, cumplimiento ISO 14001 y auditorías.",
                                img: "/Images/Servicios/gestion-ambiental.png"
                            },
                        ].map((service, i) => (
                            <div key={i} className="service-mini-card flex flex-col pt-0 px-0 overflow-hidden">
                                {service.img && (
                                    <img
                                        src={service.img}
                                        alt={service.title}
                                        className="w-full h-[220px] object-cover rounded-t-[8px] mb-4"
                                    />
                                )}
                                <div className="px-6 pb-6 mt-2">
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
                            </div>
                        ))}
                        </div>
                    </div>
                </div>

                {/* Additional Services Row: Extintores & Seguridad Industrial */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {[
                        {
                            icon: "fa-fire-extinguisher",
                            color: "rgba(239,68,68,0.15)",
                            textColor: "#f87171",
                            title: "Extintores",
                            desc: "Suministro, recarga, mantenimiento y verificación de extintores bajo NOM-154-SCFI-2005. Dictámenes oficiales para Protección Civil.",
                            badges: ["NOM-154-SCFI-2005", "Recarga Certificada", "Dictamen Oficial"]
                        },
                        {
                            icon: "fa-hard-hat",
                            color: "rgba(245,158,11,0.15)",
                            textColor: "#fbbf24",
                            title: "Seguridad Industrial",
                            desc: "Implementación de programas de seguridad e higiene laboral, EPP, señalética industrial y cumplimiento STPS en su totalidad.",
                            badges: ["NOM-017-STPS", "NOM-030-STPS", "Cumplimiento STPS"]
                        }
                    ].map((service, i) => (
                        <div
                            key={i}
                            className="bg-[var(--color-bg-card)] rounded-3xl border border-[var(--color-glass-border)] p-8 hover:border-[rgba(56,189,248,0.3)] transition-all duration-300 group"
                        >
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5"
                                style={{ background: service.color, color: service.textColor }}
                            >
                                <i className={`fa-solid ${service.icon}`}></i>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-5">
                                {service.desc}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {service.badges.map((badge, j) => (
                                    <span
                                        key={j}
                                        className="text-xs px-3 py-1 rounded-full border border-[var(--color-glass-border)] text-[var(--color-text-muted)]"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
