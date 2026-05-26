import { useState } from 'react';
import './styles/global.css';
import { useTheme } from './hooks/useTheme';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [loaded, setLoaded] = useState(false);
  const isDark = theme === 'dark';

  return (
    <>
      <Preloader onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />
          <main style={{ position: 'relative', zIndex: 1 }}>
            <HeroSection isDark={isDark} />
            <ProblemSection />
            <FeaturesSection />
            <HowItWorksSection />
            <PricingSection />
            <TestimonialsSection />
            <CTASection />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
