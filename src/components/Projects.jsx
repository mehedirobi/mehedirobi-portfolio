// Projects.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import Badge from "./Badge";
import Button from "./Button";
import { projectData } from "../data/projectData";

const ProjectCard = ({ project, onSelect, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    onClick={() => onSelect(project)}
    className="cursor-pointer"
  >
    <Card className="flex flex-col h-full overflow-hidden group border-0 rounded-2xl hover:border-blue-500 hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800">
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-2xl h-56 mb-4">
        <motion.img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-t-2xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {project.tech.slice(0, 2).map((tech, idx) => (
            <Badge
              key={idx}
              variant="blue"
              size="sm"
              className="backdrop-blur-sm"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-2 md:px-4 pb-4">
        <motion.h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-blue-500 transition-colors text-gray-900 dark:text-white">
          {project.name}
        </motion.h3>
        <p className="text-sm md:text-base mb-4 flex-grow text-gray-600 dark:text-gray-300">
          {project.description.length > 100
            ? project.description.substring(0, 100) + "..."
            : project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech, idx) => (
            <Badge key={idx} variant="gray" size="sm">{tech}</Badge>
          ))}
          {project.tech.length > 3 && (
            <Badge variant="outline" size="sm">+{project.tech.length - 3}</Badge>
          )}
        </div>

        <Button variant="primary" size="sm" className="w-full justify-center">
          View Details
        </Button>
      </div>
    </Card>
  </motion.div>
);

export default function Projects() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <section id="projects" className="py-24 md:py-32 px-4 dark:bg-gray-950 transition-colors duration-500">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-5xl font-bold mb-4 text-white">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 text-transparent bg-clip-text">
              <span className="text-black dark:text-white">My</span> Projects
            </span>
          </h2>
        </motion.div>

        {/* Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
          {projectData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onSelect={setSelected} />
          ))}
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start z-50 px-4 py-10 overflow-y-auto"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={(e) => e.target === e.currentTarget && setSelected(null)}
            >
              <motion.div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl p-6 shadow-2xl border border-gray-200 dark:border-gray-700"
                initial={{ y: 40, opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 40, opacity: 0, scale: 0.96 }} transition={{ duration: 0.25 }}>
                
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white leading-tight">{selected.name}</h3>
                  <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white text-xl transition-colors">✕</button>
                </div>

                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">{selected.fullDescription}</p>

                <div className="mb-5">
                  <h4 className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-200 mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">{selected.tech.map((tech, i) => <Badge key={i} variant="gray" size="sm">{tech}</Badge>)}</div>
                </div>

                <div className="flex gap-3 mt-6 flex-wrap">
                  <Button asChild size="sm" className="flex-1"><a href={selected.links.live} target="_blank" rel="noopener noreferrer">Live Demo</a></Button>
                  <Button asChild variant="secondary" size="sm" className="flex-1"><a href={selected.links.github} target="_blank" rel="noopener noreferrer">Source Code</a></Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}