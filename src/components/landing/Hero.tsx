import CertLookup from "./CertLookup";

export default function Hero() {
    return (
        <section
            id="inicio"
            className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(20, 50, 73, 0.5), rgba(20, 50, 73, 0.5)), url('/Images/Servicios/empleado-plagas-ehsw2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Grid background (optional, can keep for texture) */}
            <div className="hero-grid-bg opacity-30"></div>

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center relative z-10">
                {/* Text Side */}
                <div className="lg:text-left text-center">
                    <div className="inline-block bg-[rgba(56,189,248,0.1)] text-[var(--color-primary)] border border-[rgba(56,189,248,0.2)] px-4 py-2 rounded-full text-sm font-semibold tracking-wider mb-6">
                        COBERTURA NACIONAL
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                        Soluciones Integrales en <br />
                        <span className="text-gradient">Seguridad & Medio Ambiente</span>
                    </h1>

                    <p className="text-lg text-[var(--color-text-muted)] mb-8 max-w-xl lg:max-w-lg mx-auto lg:mx-0 font-[var(--font-body)]">
                        Especialistas en <strong className="text-white">Control de Plagas</strong>,
                        Gestión Ambiental y Seguridad Industrial. Protegemos su empresa
                        cumpliendo estrictamente con COFEPRIS, STPS y Protección Civil.
                    </p>

                    <div className="flex gap-4 items-center flex-wrap justify-center lg:justify-start">
                        <a href="#servicios" className="btn-primary">
                            Explorar Servicios
                        </a>
                        <a
                            href="#certificados"
                            className="text-white no-underline font-semibold flex gap-2 items-center hover:text-[var(--color-primary)] transition-colors"
                        >
                            <i className="fa-solid fa-magnifying-glass"></i> Validar
                            Certificado
                        </a>
                    </div>
                </div>

                {/* Cert Lookup Card */}
                <CertLookup />
            </div>
        </section>
    );
}
