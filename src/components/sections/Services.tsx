'use client';

import { motion } from 'framer-motion';
import { Code, Cloud, Search, Wrench, ArrowRight, LucideIcon } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/AnimatedSection';
import content from '@/content/siteContent.json';

const iconMap: Record<string, LucideIcon> = {
  Code,
  Cloud,
  Search,
  Wrench,
};

export function Services() {
  const { services } = content;
  return (
    <section id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/5 via-transparent to-accent-secondary/5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-accent-primary mb-4">{services.sectionLabel}</p>
          <h2 className="section-heading">{services.sectionTitle}</h2>
          <p className="section-subheading">
            {services.sectionDescription}
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-8">
          {services.list.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code;
            return (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="group card-glass p-8 card-hover h-full"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent size={28} className="text-white" />
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-primary mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="inline-flex items-center text-accent-primary hover:text-white transition-colors group/link"
                >
                  Learn More
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover/link:translate-x-1" />
                </a>
              </motion.div>
            </StaggerItem>
          )})}
        </StaggerContainer>
      </div>
    </section>
  );
}
