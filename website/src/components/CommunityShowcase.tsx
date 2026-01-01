'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Full-Stack Developer',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    content: 'OpenLaunch transformed my career. I went from a junior developer to leading a major project in just 6 months. The mentorship and collaborative environment here is unmatched.',
    rating: 5,
  },
  {
    name: 'Marcus Rodriguez',
    role: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    content: 'The design community at OpenLaunch is incredible. I\'ve learned more about user-centered design in the past year than in my entire previous career.',
    rating: 5,
  },
  {
    name: 'Aisha Patel',
    role: 'DevOps Engineer',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    content: 'Contributing to OpenLaunch projects gave me hands-on experience with cutting-edge technologies. The community support made all the difference.',
    rating: 5,
  },
]

const projects = [
  {
    name: 'CollabCode',
    description: 'Real-time collaborative code editor with integrated video chat',
    tech: ['React', 'Node.js', 'WebRTC', 'Socket.io'],
    contributors: 23,
    stars: 1200,
  },
  {
    name: 'DevMentor',
    description: 'AI-powered mentorship platform connecting junior and senior developers',
    tech: ['Python', 'FastAPI', 'TensorFlow', 'PostgreSQL'],
    contributors: 18,
    stars: 890,
  },
  {
    name: 'OpenDesign',
    description: 'Collaborative design system builder with component library',
    tech: ['TypeScript', 'Storybook', 'Figma API', 'Tailwind'],
    contributors: 15,
    stars: 650,
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
                What Our Community Says
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear from developers, designers, and creators who have found their home in OpenLaunch.
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
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
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
                Featured Projects
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover some of the amazing projects built by our community during Coding Party initiatives.
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
                  <span>{project.contributors} contributors</span>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{project.stars}</span>
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
              href="https://github.com/PraiseTechzw/OpenLaunch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Explore All Projects
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}