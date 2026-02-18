'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {clients.list.map((client, index) => {
            const CardWrapper = client.url ? 'a' : 'div';
            const cardProps = client.url ? { href: client.url, target: '_blank', rel: 'noopener noreferrer' } : {};

            return (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-full"
                >
                  <CardWrapper
                    {...cardProps}
                    className="card-glass p-6 sm:p-8 flex items-center justify-center h-full min-h-[140px] cursor-pointer card-hover group"
                  >
                    {client.logo.startsWith('/') ? (
                      <div className="relative h-16 w-full opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500">
                        <Image
                          src={client.logo}
                          alt={client.name}
                          fill
                          sizes="(max-width: 768px) 150px, 200px"
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-500">
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
