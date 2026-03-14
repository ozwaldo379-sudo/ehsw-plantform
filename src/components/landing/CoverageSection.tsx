export default function CoverageSection() {
    const locations = [
        { zone: "Zona Centro", cities: "CDMX / Edo. de México" },
        { zone: "Bajío", cities: "León / Querétaro / Pachuca" },
        { zone: "Zona Norte", cities: "Monterrey" },
        { zone: "Zona Oriente", cities: "Puebla" },
        { zone: "Península", cities: "Cancún" },
    ];

    return (
        <section
            id="cobertura"
            className="py-24"
            style={{
                background: "linear-gradient(180deg, var(--color-bg-dark) 0%, #172033 100%)",
            }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Side */}
                    <div>
                        <span className="text-[var(--color-primary)] font-bold uppercase tracking-widest text-sm block mb-3">
                            Alcance Nacional
                        </span>
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Donde tu empresa nos necesite
                        </h2>
                        <p className="text-[var(--color-text-muted)] text-lg mb-10">
                            Contamos con ubicaciones estratégicas para brindar respuesta
                            rápida y cobertura a nivel nacional.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {locations.map((loc, i) => (
                                <div
                                    key={i}
                                    className="flex gap-3 text-[var(--color-text-muted)] group"
                                >
                                    <i className="fa-solid fa-location-dot text-[var(--color-accent)] mt-1 group-hover:scale-125 transition-transform"></i>
                                    <div>
                                        <strong className="text-white block">{loc.zone}</strong>
                                        {loc.cities}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Map Visual */}
                    <div className="h-96 bg-[var(--color-bg-card)] rounded-3xl flex items-center justify-center border border-[var(--color-glass-border)] relative overflow-hidden">
                        <div className="absolute inset-0 opacity-5">
                            <div
                                className="w-full h-full"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle, var(--color-primary) 1px, transparent 1px)",
                                    backgroundSize: "20px 20px",
                                }}
                            ></div>
                        </div>
                        <div className="text-center relative z-10">
                            <i className="fa-solid fa-map-location-dot text-7xl text-[rgba(255,255,255,0.05)] mb-4 block animate-float"></i>
                            <p className="text-[var(--color-text-muted)] text-sm">
                                5 zonas estratégicas
                            </p>
                            <p className="text-white text-2xl font-bold">
                                Cobertura Nacional
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
