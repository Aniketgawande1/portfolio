import React from 'react';
import { Calendar, Briefcase } from 'lucide-react';

const ExperienceCard = ({ experience }) => {
  return (
    <div className="relative pl-8 pb-8 border-l border-gray-800 group">
      <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full transform -translate-x-1/2 group-hover:scale-125 transition-transform"></div>
      <div className="mb-1 flex items-center text-sm text-gray-500">
        <Calendar size={14} className="mr-2" />
        <span>{experience.period}</span>
      </div>
      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">{experience.role}</h3>
      <div className="mb-3 flex items-center text-sm text-blue-400">
        <Briefcase size={14} className="mr-2" />
        <span>{experience.company}</span>
      </div>
      <p className="text-gray-400">{experience.description}</p>
    </div>
  );
};

export default ExperienceCard;