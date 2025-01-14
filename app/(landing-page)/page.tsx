import Community from "./sections/Community";
import Features from "./sections/Features";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import Showcase from "./sections/Showcase";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Community Section */}
      <Community />

      {/* Showcase Section */}
      <Showcase />
    </main>
  );
}
