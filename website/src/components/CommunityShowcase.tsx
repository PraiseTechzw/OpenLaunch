'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    name: 'Future Contributor',
    role: 'Your Role Here',
    avatar: '/avatars/placeholder.png',
    content: 'Be the first to share your experience with OpenLaunch! Join our founding community and help shape the future of collaborative software development.',
    rating: 5,
  },
  {
    name: 'Early Adopter',
    role: 'Community Member',
    avatar: '/avatars/placeholder.png',
    content: 'OpenLaunch launches January 1st, 2026. Be part of our story from the very beginning and help build something amazing together.',
    rating: 5,
  },
  {
    name: 'You?',
    role: 'Founding Member',
    avatar: '/avatars/placeholder.png',
    content: 'Your testimonial could be here! Join OpenLaunch and become part of a community that values transparency, learning, and real impact.',
    rating: 5,
  },
]

const projects = [
  {
    name: 'Coming Soon',
    description: 'Our first community project will be announced at launch. Help us decide what to build together!',
    tech: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
    contributors: 0,
    stars: 0,
  },
  {
    name: 'Your Idea Here',
    description: 'Have an idea for a project? Propose it to the community and lead its development from conception to production.',
    tech: ['Your Choice', 'Community Driven', 'Open Source'],
    contributors: 0,
    stars: 0,
  },
  {
    name: 'Future Project',
    description: 'The third project will be chosen by our community. What problem should we solve together?',
    tech: ['TBD', 'Community Vote', 'Real Impact'],
    contributors: 0,
    stars: 0,
  },
]

export function CommunityShowcase() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Community Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Join Our Founding Community
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                OpenLaunch launches January 1st, 2026. Be among the first to shape our community culture and values.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-gray-500 font-semibold text-sm">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Future Projects
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Help us decide what to build! Our first projects will be chosen by the community through our democratic process.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-white text-gray-700 text-xs rounded-md border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{project.contributors}+ future contributors</span>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{project.stars}+ (coming soon)</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="https://github.com/PraiseTechzw/OpenLaunch/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Propose a Project
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}