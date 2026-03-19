import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import CertLookup from "@/components/landing/CertLookup";
import AboutSection from "@/components/landing/AboutSection";
import ServicesSection from "@/components/landing/ServicesSection";
import NormatividadSection from "@/components/landing/NormatividadSection";
import CoberturaSection from "@/components/landing/CoberturaSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <section className="relative -mt-10 z-20 px-6">
                    <div className="max-w-5xl mx-auto">
                        <CertLookup />
                    </div>
                </section>
                <AboutSection />
                <ServicesSection />
                <NormatividadSection />
                <CoberturaSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
