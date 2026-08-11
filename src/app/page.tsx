import ComplianceCredentials from "@/components/ComplianceCredentials";
import ContactForm from "@/components/ContactForm";
import ExplorerIntro from "@/components/ExplorerIntro";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfrastructureLayers from "@/components/InfrastructureLayers";
import PlatformInfrastructure from "@/components/PlatformInfrastructure";
import RegulatoryTrust from "@/components/RegulatoryTrust";
import ScaleSegments from "@/components/ScaleSegments";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <Hero />
      <RegulatoryTrust />
      <InfrastructureLayers />
      <PlatformInfrastructure />
      <ScaleSegments />
      <ComplianceCredentials />
      <ExplorerIntro />
      <ContactForm />
      <Footer />
    </div>
  );
}
