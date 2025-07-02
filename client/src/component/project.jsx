import React from 'react';
import { Github, ExternalLink, Star } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <div className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="relative h-52 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {project.featured && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <Star size={12} className="mr-1" /> Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
        <p className="text-gray-400 mb-4">{project.description}</p>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {project.techs.map((tech) => (
              <span 
                key={tech} 
                className="px-3 py-1 bg-gray-800 rounded-full text-xs text-blue-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-4">
          <a 
            href={project.github}
            className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Github size={18} className="mr-1" /> Code
          </a>
          <a 
            href={project.demo}
            className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
          >
            <ExternalLink size={18} className="mr-1" /> Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;