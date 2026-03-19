import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
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
