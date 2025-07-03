import React from 'react';
import { Code, User } from 'lucide-react';
import ScrollFloat from './ScrollFloat';

const skills = [
  { category: "Frontend", items: ["React", "Vue.js", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "Python", "Django", "GraphQL"] },
  { category: "Database", items: ["MongoDB", "PostgreSQL", "Firebase", "Redis"] },
  { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Git"] }
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <ScrollFloat
          animationDuration={1}
          ease='power2.out'
          scrollStart='top bottom-=100px'
          scrollEnd='bottom top+=100px'
          stagger={0.05}
          direction="up"
        >
          <div className="flex flex-col items-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
              About Me
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Professional <span className="text-blue-500">Background</span>
            </h2>
          </div>
        </ScrollFloat>
        
        <ScrollFloat
          animationDuration={1.2}
          ease='power3.out'
          scrollStart='top bottom-=50px'
          scrollEnd='bottom top+=50px'
          stagger={0.2}
          direction="fade"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-violet-500/20 rounded-lg blur-3xl opacity-30 -z-10"></div>
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 mr-4">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Professional Summary</h3>
                    <p className="text-blue-400">Full-Stack Developer</p>
                  </div>
                </div>
                <p className="text-lg mb-6 text-gray-300">
                  I'm a passionate full-stack developer with a strong focus on creating elegant 
                  solutions to complex problems. With several years of experience in web 
                  development, I specialize in building responsive and performant applications 
                  using modern technologies.
                </p>
                <p className="text-lg mb-6 text-gray-300">
                  My approach combines technical expertise with creative problem-solving, ensuring 
                  that the applications I build are not only functional but also provide an exceptional 
                  user experience.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">5+</div>
                    <div className="text-sm text-gray-400">Years Experience</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">50+</div>
                    <div className="text-sm text-gray-400">Projects Completed</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">20+</div>
                    <div className="text-sm text-gray-400">Satisfied Clients</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-xl">
            <h3 className="text-xl font-semibold mb-6 text-blue-400 flex items-center">
              <Code size={20} className="mr-2" /> Technical Skills
            </h3>
            
            <div className="space-y-8">
              {skills.map((skillGroup) => (
                <div key={skillGroup.category}>
                  <h4 className="text-gray-300 mb-3 font-medium flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    {skillGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-300 hover:bg-blue-500/20 hover:text-blue-300 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </ScrollFloat>
      </div>
    </section>
  );
};

export default About;