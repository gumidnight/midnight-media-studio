'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/AnimatedSection';
import content from '@/content/siteContent.json';

export function Projects() {
  const { projects } = content;
  const featuredProjects = projects.list.filter((p) => p.featured);
  const otherProjects = projects.list.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-accent-primary mb-4">{projects.sectionLabel}</p>
          <h2 className="section-heading">{projects.sectionTitle}</h2>
          <p className="section-subheading">
            {projects.sectionDescription}
          </p>
        </FadeIn>

        {/* Featured Projects */}
        <StaggerContainer className="grid md:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <StaggerItem key={index} className="h-full">
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="group card-glass overflow-hidden h-full flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href={project.liveUrl}
                      className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                      <ExternalLink size={18} className="text-white" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      href={project.githubUrl}
                      className="p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                      <Github size={18} className="text-white" />
                    </motion.a>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">{project.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-accent-primary/10 text-accent-primary rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Other Projects */}
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherProjects.map((project, index) => (
            <StaggerItem key={index} className="h-full">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="group card-glass p-5 card-hover h-full flex flex-col"
              >
                <div className="relative aspect-[16/10] mb-4 rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {project.tech.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs bg-white/5 text-gray-300 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
