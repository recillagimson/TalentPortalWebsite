import Hero from "../components/home/Hero";
import FeatureGrid from "../components/home/FeatureGrid";
import PayrollShowcase from "../components/home/PayrollShowcase";
import PoweredByHighthrive from "../components/home/PoweredByHighthrive";
import FinalCta from "../components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <PayrollShowcase />
      <PoweredByHighthrive />
      <FinalCta />
    </>
  );
}
