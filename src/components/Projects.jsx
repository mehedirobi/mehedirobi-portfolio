import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import Badge from './Badge';
import Button from './Button';

const ProjectCard = ({ project, onSelect, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: index * 0.15 }}
    onClick={() => onSelect(project)}
  >
    <Card className="flex flex-col h-full overflow-hidden cursor-pointer group border-0 hover:border-blue-500 hover:border hover:shadow-2xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg mb-6 h-56" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
        <motion.img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {project.tech.slice(0, 2).map((tech, idx) => (
            <Badge key={idx} variant="blue" size="sm" className="backdrop-blur-sm">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <motion.h3
          className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors"
          style={{ color: 'var(--text-primary)' }}
          whileHover={{ x: 5 }}
        >
          {project.name}
        </motion.h3>
        <p className="text-sm mb-4 flex-grow leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {project.description.length > 100
            ? project.description.substring(0, 100) + '...'
            : project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.slice(0, 3).map((tech, idx) => (
            <Badge key={idx} variant="gray" size="sm">
              {tech}
            </Badge>
          ))}
          {project.tech.length > 3 && (
            <Badge variant="outline" size="sm">
              +{project.tech.length - 3}
            </Badge>
          )}
        </div>

        {/* View Details Button */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <Button variant="primary" size="sm" className="w-full justify-center group/btn">
            <i className="fas fa-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
            View Details
          </Button>
        </motion.div>
      </div>
    </Card>
  </motion.div>
);

export default function Projects() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <section id="projects" className="py-20 md:py-32 px-4" style={{
      background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary))'
    }}>
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-heading-1 mb-4" style={{ color: 'var(--text-primary)' }}>
            My Latest <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Projects</span>
          </h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: '96px' }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {projectData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onSelect={setSelected} />
          ))}
        </motion.div>
      </div>

      {/* Project Details Modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)',
              boxShadow: 'var(--shadow-color)'
            }}
          >
            <div className="sticky top-0 p-6 border-b flex justify-between items-center" style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--border-color)'
            }}>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
                {selected.name}
              </h3>
              <motion.button
                onClick={() => setSelected(null)}
                className="text-2xl p-2 transition-colors"
                style={{
                  color: 'var(--text-muted)',
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                aria-label="Close modal"
                whileHover={{ rotate: 90, scale: 1.1 }}
              >
                <i className="fas fa-times"></i>
              </motion.button>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Tech Stack */}
              <div>
                <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>Tech Stack</h4>
                <p className="text-blue-400 font-semibold text-lg">
                  {selected.techStack}
                </p>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>Overview</h4>
                <p className="leading-relaxed text-lg" style={{ color: 'var(--text-muted)' }}>
                  {selected.fullDescription}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05 }} className="flex-1 min-w-[200px]">
                  <Button
                    variant="primary"
                    size="md"
                    asChild
                    className="w-full justify-center"
                  >
                    <a
                      href={selected.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-external-link-alt"></i> Live Demo
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="flex-1 min-w-[200px]">
                  <Button
                    variant="secondary"
                    size="md"
                    asChild
                    className="w-full justify-center"
                  >
                    <a
                      href={selected.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-github"></i> GitHub Repo
                    </a>
                  </Button>
                </motion.div>
              </div>

              {/* Challenges */}
              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <i className="fas fa-exclamation-circle text-orange-400"></i>
                  Challenges Faced
                </h4>
                <ul className="space-y-3">
                  {selected.challenges.map((ch, idx) => (
                    <motion.li
                      key={idx}
                      className="flex gap-3 items-start"
                      style={{ color: 'var(--text-muted)' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <i className="fas fa-check-circle text-green-400 mt-1 flex-shrink-0"></i>
                      <span>{ch}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Future Improvements */}
              <div>
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                  <i className="fas fa-lightbulb text-yellow-400"></i>
                  Future Improvements
                </h4>
                <ul className="space-y-3">
                  {selected.improvements.map((imp, idx) => (
                    <motion.li
                      key={idx}
                      className="flex gap-3 items-start"
                      style={{ color: 'var(--text-muted)' }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <i className="fas fa-arrow-right text-purple-400 mt-1 flex-shrink-0"></i>
                      <span>{imp}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

// Project Data
const projectData = [
  {
    id: 1,
    name: 'Urban Fix Website',
    description: 'Developed a responsive "Urban Fix" website using HTML, CSS, JavaScript, and React, allowing users to report issues in their city and track their resolution.',
    image: 'https://i.ibb.co.com/Z1Rpx4Jb/Screenshot-2026-01-08-183414.png',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    techStack: 'React, Node.js, Express, MongoDB, Tailwind CSS',
    fullDescription: 'Developed a robust full-stack e-commerce platform featuring secure user authentication, product listing, shopping cart functionality, and order processing. Implemented a responsive design for optimal viewing on various devices. Users can report issues in their local community with real-time tracking and resolution updates.',
    challenges: [
      'Managing complex state across multiple components with React Context.',
      'Implementing secure authentication and authorization flows.',
      'Optimizing database queries for issue filtering and geolocation search.',
      'Creating real-time notifications system for issue updates.'
    ],
    improvements: [
      'Integrate real-time geolocation mapping with Google Maps API.',
      'Add push notifications for issue updates.',
      'Introduce AI-powered issue categorization and priority ranking.',
      'Implement community rating system for improved accountability.'
    ],
    links: {
      live: 'https://urban-fix.netlify.app/',
      github: 'https://github.com/mehdixun/urban-fix-client.git'
    }
  },
  {
    id: 2,
    name: 'Pawmart Website',
    description: 'Developed a responsive "PawMart" website using HTML, CSS, JavaScript, and React, where users can adopt pets and purchase pet-related products.',
    image: 'https://i.ibb.co.com/spBB7YbP/Screenshot-2026-01-08-183616.png',
    tech: ['Vue.js', 'Firebase', 'Vuetify', 'CSS3'],
    techStack: 'Vue.js, Firebase, CSS3',
    fullDescription: 'Created an intuitive pet marketplace application with features like pet adoption listings, product catalog, shopping cart, and secure checkout. Utilized Firebase for real-time data synchronization and Vuetify for responsive component design.',
    challenges: [
      'Implementing efficient filtering for pet breeds and product categories.',
      'Ensuring real-time inventory updates across multiple user sessions.',
      'Designing a clean and user-friendly interface for pet discovery.',
      'Managing complex payment flows for adoption and product purchases.'
    ],
    improvements: [
      'Add virtual pet care calculator and health tracking.',
      'Implement veterinarian appointment booking system.',
      'Add pet adoption matching algorithm based on lifestyle.',
      'Create community forum for pet owners.'
    ],
    links: {
      live: 'https://toyverse-project-01.netlify.app/',
      github: 'https://github.com/mehdixun/pawmart.git'
    }
  },
  {
    id: 3,
    name: 'Hero APP Website',
    description: 'Developed a "Hero APP" website using HTML, CSS, JavaScript, and React that showcases a collection of superheroes with detailed profiles.',
    image: 'https://i.ibb.co.com/3mxVn19W/Screenshot-2026-01-08-184922.png',
    tech: ['Next.js', 'GraphQL', 'MDX', 'Vercel'],
    techStack: 'Next.js, Markdown, GraphQL',
    fullDescription: 'Built a modern superhero database platform with detailed character profiles, abilities, origin stories, and high-quality images. Features include dynamic routing, search functionality, and SEO optimization. Styled with a modern theme and smooth animations.',
    challenges: [
      'Organizing and displaying large datasets efficiently.',
      'Implementing powerful search and filtering capabilities.',
      'Optimizing image loading for superhero galleries.',
      'Creating engaging narratives for each character profile.'
    ],
    improvements: [
      'Add character comparison tool.',
      'Implement universe/franchise filtering system.',
      'Add news feed for superhero movies and comics.',
      'Create interactive power level visualization.'
    ],
    links: {
      live: 'https://hero-web-app-01.netlify.app/',
      github: 'https://github.com/mehdixun/Hero-app.git'
    }
  }
];
