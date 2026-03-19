export default function AboutSection() {
    return (
        <section id="quienes-somos" className="py-24 bg-[var(--color-bg-dark)]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image Side */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)] to-transparent opacity-20 rounded-3xl transform translate-x-4 translate-y-4"></div>
                        <img 
                            src="/Images/Servicios/quienes-somos.png" 
                            alt="Quiénes Somos EHSW²" 
                            className="relative z-10 w-full h-auto object-cover rounded-3xl shadow-2xl border border-[var(--color-glass-border)]"
                        />
                    </div>
                    
                    {/* Text Side */}
                    <div>
                        <span className="text-[var(--color-primary)] font-bold uppercase tracking-widest text-sm block mb-3">
                            Quiénes Somos
                        </span>
                        <h2 className="text-4xl font-bold text-white mb-6">
                            Líderes en Protección Integral
                        </h2>
                        <p className="text-[var(--color-text-muted)] text-lg mb-6 leading-relaxed">
                            En <strong className="text-white">EHSW²</strong>, somos especialistas comprometidos con la excelencia operativa de su empresa. Integramos soluciones de alto impacto en Control de Plagas, Gestión Ambiental y Seguridad Industrial.
                        </p>
                        <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-8">
                            Nuestro equipo está conformado por profesionales altamente capacitados y certificados para garantizar el cumplimiento normativo total ante dependencias como STPS, COFEPRIS y Protección Civil, brindando un entorno seguro y sustentable.
                        </p>
                        
                        <div className="flex gap-4">
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-check-circle text-[var(--color-primary)] text-xl"></i>
                                <span className="text-white font-medium">Experiencia Comprobada</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-check-circle text-[var(--color-primary)] text-xl"></i>
                                <span className="text-white font-medium">Cumplimiento Oficial</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
