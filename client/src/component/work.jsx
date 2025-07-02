import React from 'react';

const currentWork = [
  {
    id: 1,
    title: "Decentralized Finance Dashboard",
    status: "In Development",
    techs: ["React", "Solidity", "Web3.js", "Ethereum"],
    description: "Building a comprehensive dashboard for DeFi applications with real-time analytics."
  },
  {
    id: 2,
    title: "Mobile Fitness App",
    status: "Planning",
    techs: ["React Native", "Firebase", "Health APIs"],
    description: "Designing a cross-platform fitness application with personalized workout plans."
  }
];

const Work = () => {
  return (
    <section id="current" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">
            Active Projects
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-center">
            Current <span className="text-violet-500">Work</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {currentWork.map((work) => (
            <div 
              key={work.id} 
              className="bg-gradient-to-br from-gray-900 to-black p-px rounded-xl relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>  
              <div className="bg-gray-900 p-8 rounded-xl h-full border border-gray-800 group-hover:border-violet-500/30 transition-colors relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-violet-400 transition-colors">{work.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    work.status === 'In Development' 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-blue-900/30 text-blue-400'
                  }`}>
                    {work.status}
                  </span>
                </div>
                
                <p className="text-gray-400 mb-6">{work.description}</p>
                
                <div>
                  <h4 className="text-sm text-gray-500 mb-2 uppercase tracking-wider font-medium">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {work.techs.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-gray-800 rounded-full text-xs text-violet-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;