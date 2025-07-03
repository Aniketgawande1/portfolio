import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Download, ArrowRight
} from 'lucide-react';

// Import all components
import Home from './home';
import About from './about';
import Work from './work';
import Contact from './contact';
import Footer from './footer';
import ProjectCard from './project';
import ExperienceCard from './experience';

// Import services
import { ProjectService, ExperienceService } from '../services';

// Main Portfolio Component
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch projects and experiences in parallel
        const [projectsResponse, experiencesResponse] = await Promise.all([
          ProjectService.getProjects().catch(() => ({ data: [] })), // Fallback to empty array on error
          ExperienceService.getExperiences().catch(() => ({ data: [] })) // Fallback to empty array on error
        ]);

        setProjects(projectsResponse.data || []);
        setExperiences(experiencesResponse.data || []);
      } catch (err) {
        console.warn('Failed to fetch data from backend, using fallback data:', err);
        setError('Using offline mode');
        
        // Fallback data if backend is not available
        setProjects([
          {
            _id: '1',
            title: "AI Content Generator",
            description: "An AI-powered application that generates high-quality content for websites and social media.",
            images: [{ url: "/api/placeholder/500/300", alt: "AI Content Generator" }],
            technologies: ["React", "Node.js", "OpenAI API"],
            githubUrl: "#",
            demoUrl: "#",
            featured: true
          },
          {
            _id: '2',
            title: "E-Commerce Platform",
            description: "A full-featured e-commerce solution with payment integration and inventory management.",
            images: [{ url: "/api/placeholder/500/300", alt: "E-Commerce Platform" }],
            technologies: ["Next.js", "MongoDB", "Stripe"],
            githubUrl: "#",
            demoUrl: "#",
            featured: true
          },
          {
            _id: '3',
            title: "Weather Forecast App",
            description: "Real-time weather forecasting application with interactive maps and alerts.",
            images: [{ url: "/api/placeholder/500/300", alt: "Weather Forecast App" }],
            technologies: ["React", "Weather API", "Mapbox"],
            githubUrl: "#",
            demoUrl: "#",
            featured: false
          },
          {
            _id: '4',
            title: "Task Management System",
            description: "A collaborative task management tool for teams with real-time updates.",
            images: [{ url: "/api/placeholder/500/300", alt: "Task Management System" }],
            technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
            githubUrl: "#",
            demoUrl: "#",
            featured: false
          }
        ]);

        setExperiences([
          {
            _id: '1',
            title: "Senior Frontend Developer",
            company: "Tech Innovations Inc.",
            period: "2021 - Present",
            description: "Leading the frontend development team in building modern web applications with React and Next.js."
          },
          {
            _id: '2',
            title: "Full-Stack Developer",
            company: "Digital Solutions Co.",
            period: "2018 - 2021",
            description: "Developed full-stack applications using MERN stack, improved performance by 40% through code optimizations."
          },
          {
            _id: '3',
            title: "Web Developer",
            company: "Creative Web Agency",
            period: "2016 - 2018",
            description: "Created responsive websites and web applications for various clients across different industries."
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  // Transform backend data to match frontend expectations
  const transformProject = (project) => ({
    id: project._id,
    title: project.title,
    description: project.description,
    image: project.images?.[0]?.url || "/api/placeholder/500/300",
    techs: project.technologies || [],
    github: project.githubUrl || "#",
    demo: project.demoUrl || "#",
    featured: project.featured || false
  });

  const transformExperience = (experience) => ({
    id: experience._id,
    role: experience.title,
    company: experience.company,
    period: experience.period || `${new Date(experience.startDate).getFullYear()} - ${experience.current ? 'Present' : new Date(experience.endDate).getFullYear()}`,
    description: experience.description
  });

  const transformedProjects = projects.map(transformProject);
  const transformedExperiences = experiences.map(transformExperience);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading Portfolio...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {error && (
        <div className="bg-yellow-900/30 border-b border-yellow-500/30 text-yellow-400 p-2 text-center text-sm">
          ⚠️ {error} - Some features may be limited
        </div>
      )}
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950 bg-opacity-80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">Dev<span className="text-white">Portfolio</span></span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['home', 'about', 'experience', 'current', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm uppercase tracking-wider font-medium hover:text-blue-400 transition-colors ${
                  activeSection === section ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {section === 'current' ? 'Current Work' : section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-gray-900 py-4 px-6 flex flex-col space-y-4 border-t border-gray-800">
            {['home', 'about', 'experience', 'current', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm uppercase tracking-wider font-medium hover:text-blue-400 transition-colors ${
                  activeSection === section ? 'text-blue-400' : 'text-gray-300'
                }`}
              >
                {section === 'current' ? 'Current Work' : section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </nav>
        )}
      </header>
      
      <main className="pt-20">
        {/* Home Section */}
        <Home scrollToSection={scrollToSection} />
        
        {/* About Me Section */}
        <About />
        
        {/* Experience Section */}
        <section id="experience" className="py-24 bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
                Professional Journey
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                Work <span className="text-blue-500">Experience</span>
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {transformedExperiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <button 
                onClick={() => window.open('#', '_blank')}
                className="px-6 py-3 bg-gray-900 border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center mx-auto"
              >
                <Download size={16} className="mr-2" /> Download Full Resume
              </button>
            </div>
          </div>
        </section>
        
        {/* Current Work Section */}
        <Work />
        
        {/* Projects Section */}
        <section id="projects" className="py-24 bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
                My Work
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                Featured <span className="text-blue-500">Projects</span>
              </h2>
              <p className="text-gray-400 mt-4 text-center max-w-2xl">
                Explore a collection of my recent development work, showcasing various technologies and solutions.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {transformedProjects.filter(project => project.featured).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            {transformedProjects.filter(project => !project.featured).length > 0 && (
              <div className="mt-16">
                <h3 className="text-2xl font-semibold mb-8 text-center">Other Projects</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {transformedProjects.filter(project => !project.featured).map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-16 text-center">
              <a 
                href="#"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                View All Projects <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default Portfolio;