import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import AboutSection from "@/components/landing/AboutSection";
import ServicesSection from "@/components/landing/ServicesSection";
import CoverageSection from "@/components/landing/CoverageSection";
import NormsSection from "@/components/landing/NormsSection";
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
                <NormsSection />
                <CoverageSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
