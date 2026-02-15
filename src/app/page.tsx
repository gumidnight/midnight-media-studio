import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Clients } from '@/components/sections/Clients';
import { Projects } from '@/components/sections/Projects';
import { Services } from '@/components/sections/Services';
import { TechStack } from '@/components/sections/TechStack';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Clients />
      <Projects />
      <Services />
      <TechStack />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
