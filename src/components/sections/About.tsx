'use client';

import { motion } from 'framer-motion';
import { Award, Users, Zap, Heart, LucideIcon } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/AnimatedSection';
import content from '@/content/siteContent.json';

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Award,
  Users,
  Heart,
};

export function About() {
  const { about } = content;
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-secondary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image & Info */}
          <FadeIn direction="right" className="relative">
            <div className="relative">
              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 rounded-2xl overflow-hidden"
              >
                <img
                  src={about.image}
                  alt="Developer workspace"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-950/80 via-transparent to-transparent" />
              </motion.div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -right-6 card-glass p-6 max-w-xs glow-md"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                    <span className="text-white font-bold">{about.founder.initials}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{about.founder.name}</p>
                    <p className="text-sm text-gray-400">{about.founder.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  &ldquo;{about.founder.quote}&rdquo;
                </p>
              </motion.div>

              {/* Background Decoration */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-2xl -z-10" />
            </div>
          </FadeIn>

          {/* Right Column - Content */}
          <div>
            <FadeIn>
              <p className="text-sm uppercase tracking-widest text-accent-primary mb-4">{about.sectionLabel}</p>
              <h2 className="section-heading text-left">{about.sectionTitle}</h2>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                {about.description}
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                {about.descriptionSecondary}
              </p>
              {about.descriptionTertiary && (
                <p className="text-gray-400 leading-relaxed mb-8">
                  {about.descriptionTertiary}
                </p>
              )}
            </FadeIn>

            <StaggerContainer className="grid grid-cols-2 gap-4">
              {about.values.map((value, index) => {
                const IconComponent = iconMap[value.icon] || Zap;
                return (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="card-glass p-4 card-hover"
                  >
                    <IconComponent size={24} className="text-accent-primary mb-3" />
                    <h3 className="text-white font-semibold mb-1">{value.title}</h3>
                    <p className="text-sm text-gray-400">{value.description}</p>
                  </motion.div>
                </StaggerItem>
              )})}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
