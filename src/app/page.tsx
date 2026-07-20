import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InfrastructureLayers from "@/components/InfrastructureLayers";
import RegulatoryTrust from "@/components/RegulatoryTrust";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <Hero />
      <RegulatoryTrust />
      <InfrastructureLayers />
    </div>
  );
}
