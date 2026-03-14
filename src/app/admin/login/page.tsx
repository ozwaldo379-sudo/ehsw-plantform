"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Credenciales inválidas");
            }
        } catch {
            setError("Error de conexión");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{
                backgroundImage:
                    "radial-gradient(circle at 30% 50%, rgba(56, 189, 248, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(45, 212, 191, 0.05) 0%, transparent 50%)",
            }}
        >
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="text-3xl font-bold text-white inline-flex items-center gap-2">
                        <i className="fa-solid fa-layer-group text-[var(--color-accent)]"></i>
                        EHSW<span className="text-[var(--color-primary)]">²</span>
                    </div>
                    <p className="text-[var(--color-text-muted)] text-sm mt-2">
                        Portal Administrativo
                    </p>
                </div>

                <div className="glass-card p-8">
                    <div className="text-center mb-6">
                        <i className="fa-solid fa-circle-user text-5xl text-[var(--color-primary)] block mb-3"></i>
                        <h2 className="text-xl font-bold text-white">Iniciar Sesión</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-[var(--color-text-muted)] block mb-1">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 bg-[var(--color-bg-dark)] border border-[var(--color-glass-border)] rounded-lg text-white outline-none focus:border-[var(--color-primary)] transition-colors"
                                placeholder="admin@ehsw.demo"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm text-[var(--color-text-muted)] block mb-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 bg-[var(--color-bg-dark)] border border-[var(--color-glass-border)] rounded-lg text-white outline-none focus:border-[var(--color-primary)] transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && (
                            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 p-3 rounded-lg flex items-center gap-2">
                                <i className="fa-solid fa-circle-exclamation"></i>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full justify-center text-base"
                        >
                            {loading ? (
                                <i className="fa-solid fa-circle-notch fa-spin"></i>
                            ) : (
                                <>
                                    <i className="fa-solid fa-right-to-bracket"></i> Acceder
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
