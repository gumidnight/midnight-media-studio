'use client';

import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/AnimatedSection';
import content from '@/content/siteContent.json';

export function Clients() {
  const { clients } = content;
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <FadeIn className="text-center mb-12">
          <p className="text-sm uppercase tracking-widest text-accent-primary mb-2">{clients.sectionLabel}</p>
          <h2 className="text-2xl font-semibold text-gray-300">{clients.sectionTitle}</h2>
        </FadeIn>

        <StaggerContainer className="flex flex-wrap justify-center items-center gap-8">
          {clients.list.map((client, index) => {
            const CardWrapper = client.url ? 'a' : 'div';
            const cardProps = client.url ? { href: client.url, target: '_blank', rel: 'noopener noreferrer' } : {};
            
            return (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <CardWrapper
                    {...cardProps}
                    className="card-glass p-8 flex items-center justify-center h-36 w-56 cursor-pointer card-hover block"
                  >
                    {client.logo.startsWith('/') ? (
                      <img 
                        src={client.logo} 
                        alt={client.name} 
                        className="h-20 max-w-full object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30 flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">{client.logo}</span>
                      </div>
                    )}
                  </CardWrapper>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
