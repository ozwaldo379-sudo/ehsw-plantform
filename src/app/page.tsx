import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import PillarsSection from "@/components/landing/PillarsSection";
import AboutSection from "@/components/landing/AboutSection";
import ClientCarousel from "@/components/landing/ClientCarousel";
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
                <ClientCarousel />
                <PillarsSection />
                <NormatividadSection />
                <CoberturaSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
