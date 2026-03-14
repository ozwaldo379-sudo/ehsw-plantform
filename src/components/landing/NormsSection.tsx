export default function NormsSection() {
    const norms = [
        "NOM-154-SCFI-2005",
        "NOM-002-STPS",
        "NOM-017-STPS",
        "NOM-030-STPS",
        "ISO 14001:2015",
        "Registro COFEPRIS",
    ];

    return (
        <section
            id="normatividad"
            className="py-16 border-t border-b border-[var(--color-glass-border)]"
            style={{ background: "rgba(30, 41, 59, 0.3)" }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-8">
                    <span className="text-[var(--color-primary)] font-bold uppercase tracking-widest text-sm block mb-3">
                        Cumplimiento Legal
                    </span>
                    <h2 className="text-3xl font-bold text-white">
                        Normas y Certificaciones
                    </h2>
                </div>

                <div className="flex flex-wrap gap-5 justify-center">
                    {norms.map((norm, i) => (
                        <div key={i} className="norm-item">
                            {norm}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
