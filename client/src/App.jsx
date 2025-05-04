// import React, { useState, useEffect } from 'react';
// import { 
//   Menu, X, Mail, Phone, Download, Instagram, Linkedin, Github, Twitter,
//   Code, ExternalLink, Star, ArrowRight
// } from 'lucide-react';

// // Sample data
// const projects = [
//   {
//     id: 1,
//     title: "AI Content Generator",
//     description: "An AI-powered application that generates high-quality content for websites and social media.",
//     image: "/api/placeholder/500/300",
//     techs: ["React", "Node.js", "OpenAI API"],
//     github: "#",
//     demo: "#",
//     featured: true
//   },
//   {
//     id: 2,
//     title: "E-Commerce Platform",
//     description: "A full-featured e-commerce solution with payment integration and inventory management.",
//     image: "/api/placeholder/500/300",
//     techs: ["Next.js", "MongoDB", "Stripe"],
//     github: "#",
//     demo: "#",
//     featured: true
//   },
//   {
//     id: 3,
//     title: "Weather Forecast App",
//     description: "Real-time weather forecasting application with interactive maps and alerts.",
//     image: "/api/placeholder/500/300",
//     techs: ["React", "Weather API", "Mapbox"],
//     github: "#",
//     demo: "#",
//     featured: false
//   },
//   {
//     id: 4,
//     title: "Task Management System",
//     description: "A collaborative task management tool for teams with real-time updates.",
//     image: "/api/placeholder/500/300",
//     techs: ["Vue.js", "Firebase", "Tailwind CSS"],
//     github: "#",
//     demo: "#",
//     featured: false
//   }
// ];

// const currentWork = [
//   {
//     id: 1,
//     title: "Decentralized Finance Dashboard",
//     status: "In Development",
//     techs: ["React", "Solidity", "Web3.js", "Ethereum"],
//     description: "Building a comprehensive dashboard for DeFi applications with real-time analytics."
//   },
//   {
//     id: 2,
//     title: "Mobile Fitness App",
//     status: "Planning",
//     techs: ["React Native", "Firebase", "Health APIs"],
//     description: "Designing a cross-platform fitness application with personalized workout plans."
//   }
// ];

// const skills = [
//   { category: "Frontend", items: ["React", "Vue.js", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"] },
//   { category: "Backend", items: ["Node.js", "Express", "Python", "Django", "GraphQL"] },
//   { category: "Database", items: ["MongoDB", "PostgreSQL", "Firebase", "Redis"] },
//   { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Git"] }
// ];

// // TypeWriter component
// const TypewriterEffect = ({ texts }) => {
//   const [textIndex, setTextIndex] = useState(0);
//   const [charIndex, setCharIndex] = useState(0);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [displayText, setDisplayText] = useState('');
  
//   useEffect(() => {
//     const typeSpeed = isDeleting ? 50 : 150;
    
//     const timer = setTimeout(() => {
//       const currentText = texts[textIndex];
      
//       if (!isDeleting) {
//         setDisplayText(currentText.substring(0, charIndex + 1));
//         setCharIndex(charIndex + 1);
        
//         if (charIndex >= currentText.length) {
//           setTimeout(() => setIsDeleting(true), 1000);
//         }
//       } else {
//         setDisplayText(currentText.substring(0, charIndex - 1));
//         setCharIndex(charIndex - 1);
        
//         if (charIndex <= 1) {
//           setIsDeleting(false);
//           setTextIndex((textIndex + 1) % texts.length);
//         }
//       }
//     }, typeSpeed);
    
//     return () => clearTimeout(timer);
//   }, [texts, textIndex, charIndex, isDeleting]);
  
//   return (
//     <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">
//       {displayText}<span className="inline-block w-1 h-8 bg-blue-500 ml-1 animate-pulse"></span>
//     </h2>
//   );
// };

// // Project Card Component
// const ProjectCard = ({ project }) => {
//   return (
//     <div className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-colors">
//       <div className="relative h-48 overflow-hidden">
//         <img 
//           src={project.image} 
//           alt={project.title} 
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//         {project.featured && (
//           <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
//             <Star size={12} className="mr-1" /> Featured
//           </div>
//         )}
//       </div>
      
//       <div className="p-6">
//         <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
//         <p className="text-gray-400 mb-4">{project.description}</p>
        
//         <div className="mb-6">
//           <div className="flex flex-wrap gap-2">
//             {project.techs.map((tech) => (
//               <span 
//                 key={tech} 
//                 className="px-3 py-1 bg-gray-800 rounded-full text-xs text-blue-300"
//               >
//                 {tech}
//               </span>
//             ))}
//           </div>
//         </div>
        
//         <div className="flex space-x-4">
//           <a 
//             href={project.github}
//             className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
//           >
//             <Github size={18} className="mr-1" /> Code
//           </a>
//           <a 
//             href={project.demo}
//             className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
//           >
//             <ExternalLink size={18} className="mr-1" /> Live Demo
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Contact Item Component
// const ContactItem = ({ icon, label, value, href }) => {
//   return (
//     <div className="flex items-start">
//       <div className="mt-1 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-purple-400">
//         {icon}
//       </div>
//       <div className="ml-4">
//         <span className="block text-sm text-gray-500">{label}</span>
//         <a 
//           href={href}
//           className="text-white hover:text-purple-400 transition-colors"
//         >
//           {value}
//         </a>
//       </div>
//     </div>
//   );
// };

// // Social Link Component
// const SocialLink = ({ href, icon, label }) => {
//   return (
//     <a 
//       href={href}
//       className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
//       aria-label={label}
//     >
//       {icon}
//     </a>
//   );
// };

// // Main Portfolio Component
// const Portfolio = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('home');
  
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = document.querySelectorAll('section[id]');
//       const scrollY = window.pageYOffset;
      
//       sections.forEach(section => {
//         const sectionHeight = section.offsetHeight;
//         const sectionTop = section.offsetTop - 100;
//         const sectionId = section.getAttribute('id');
        
//         if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
//           setActiveSection(sectionId);
//         }
//       });
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       window.scrollTo({
//         top: section.offsetTop - 80,
//         behavior: 'smooth'
//       });
//       setIsMenuOpen(false);
//     }
//   };
  
//   return (
//     <div className="min-h-screen bg-black text-gray-200">
//       {/* Header */}
//       <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm border-b border-gray-800">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center">
//             <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Dev<span className="text-white">Portfolio</span></span>
//           </div>
          
//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex space-x-8">
//             {['home', 'about', 'current', 'projects', 'contact'].map((section) => (
//               <button
//                 key={section}
//                 onClick={() => scrollToSection(section)}
//                 className={`text-sm uppercase tracking-wider font-medium hover:text-blue-400 transition-colors ${
//                   activeSection === section ? 'text-blue-400' : 'text-gray-300'
//                 }`}
//               >
//                 {section === 'current' ? 'Current Work' : section.charAt(0).toUpperCase() + section.slice(1)}
//               </button>
//             ))}
//           </nav>
          
//           {/* Mobile Menu Button */}
//           <button 
//             onClick={() => setIsMenuOpen(!isMenuOpen)} 
//             className="md:hidden text-gray-300 hover:text-white"
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
        
//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <nav className="md:hidden bg-gray-900 py-4 px-6 flex flex-col space-y-4 border-t border-gray-800">
//             {['home', 'about', 'current', 'projects', 'contact'].map((section) => (
//               <button
//                 key={section}
//                 onClick={() => scrollToSection(section)}
//                 className={`text-sm uppercase tracking-wider font-medium hover:text-blue-400 transition-colors ${
//                   activeSection === section ? 'text-blue-400' : 'text-gray-300'
//                 }`}
//               >
//                 {section === 'current' ? 'Current Work' : section.charAt(0).toUpperCase() + section.slice(1)}
//               </button>
//             ))}
//           </nav>
//         )}
//       </header>
      
//       <main className="pt-20">
//         {/* Home Section */}
//         <section id="home" className="min-h-screen flex items-center py-16">
//           <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
//             <div className="order-2 md:order-1">
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
//                 <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
//                   Full-Stack Developer
//                 </span>
//               </h1>
//               <div className="mb-8 h-16">
//                 <TypewriterEffect
//                   texts={[
//                     "I build modern web applications",
//                     "I create elegant user interfaces",
//                     "I develop robust backend systems",
//                     "I design responsive experiences"
//                   ]}
//                 />
//               </div>
//               <p className="text-lg text-gray-400 mb-8 max-w-lg">
//                 Transforming ideas into elegant, functional, and high-performance 
//                 digital experiences with modern technologies.
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <button 
//                   onClick={() => scrollToSection('contact')}
//                   className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center"
//                 >
//                   Contact Me <ArrowRight size={16} className="ml-2" />
//                 </button>
//                 <button 
//                   onClick={() => window.open('#', '_blank')}
//                   className="px-6 py-3 border border-gray-700 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center"
//                 >
//                   View Resume <Download size={16} className="ml-2" />
//                 </button>
//               </div>
//             </div>
//             <div className="order-1 md:order-2 flex justify-center">
//               <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gray-800">
//                 <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20"></div>
//                 <img 
//                   src="/api/placeholder/320/320" 
//                   alt="Developer Portrait" 
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>
        
//         {/* About Me Section */}
//         <section id="about" className="py-20 bg-gray-950">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
//               About <span className="text-blue-500">Me</span>
//             </h2>
            
//             <div className="grid md:grid-cols-2 gap-12 items-center">
//               <div>
//                 <p className="text-lg mb-6 text-gray-300">
//                   I'm a passionate full-stack developer with a strong focus on creating elegant 
//                   solutions to complex problems. With several years of experience in web 
//                   development, I specialize in building responsive and performant applications 
//                   using modern technologies.
//                 </p>
//                 <p className="text-lg mb-6 text-gray-300">
//                   My approach combines technical expertise with creative problem-solving, ensuring 
//                   that the applications I build are not only functional but also provide an exceptional 
//                   user experience.
//                 </p>
//               </div>
              
//               <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
//                 <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center">
//                   <Code size={20} className="mr-2" /> Technical Skills
//                 </h3>
                
//                 <div className="space-y-6">
//                   {skills.map((skillGroup) => (
//                     <div key={skillGroup.category}>
//                       <h4 className="text-gray-400 mb-2 font-medium">{skillGroup.category}</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {skillGroup.items.map((skill) => (
//                           <span 
//                             key={skill} 
//                             className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
        
//         {/* Current Work Section */}
//         <section id="current" className="py-20">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
//               Current <span className="text-purple-500">Work</span>
//             </h2>
            
//             <div className="grid md:grid-cols-2 gap-8">
//               {currentWork.map((work) => (
//                 <div 
//                   key={work.id} 
//                   className="bg-gradient-to-br from-gray-900 to-black p-1 rounded-xl"
//                 >
//                   <div className="bg-gray-900 p-6 rounded-xl h-full border border-gray-800 hover:border-purple-500/30 transition-colors">
//                     <div className="flex justify-between items-start mb-4">
//                       <h3 className="text-xl font-semibold text-white">{work.title}</h3>
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         work.status === 'In Development' 
//                           ? 'bg-green-900/30 text-green-400' 
//                           : 'bg-blue-900/30 text-blue-400'
//                       }`}>
//                         {work.status}
//                       </span>
//                     </div>
                    
//                     <p className="text-gray-400 mb-6">{work.description}</p>
                    
//                     <div>
//                       <h4 className="text-sm text-gray-500 mb-2 uppercase tracking-wider font-medium">Tech Stack</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {work.techs.map((tech) => (
//                           <span 
//                             key={tech} 
//                             className="px-3 py-1 bg-gray-800 rounded-full text-xs text-purple-300"
//                           >
//                             {tech}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
        
//         {/* Projects Section */}
//         <section id="projects" className="py-20 bg-gray-950">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
//               Recent <span className="text-blue-500">Projects</span>
//             </h2>
//             <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
//               A selection of my recent work, showcasing web applications and digital experiences I've built.
//             </p>
            
//             <div className="grid md:grid-cols-2 gap-8">
//               {projects.map((project) => (
//                 <ProjectCard key={project.id} project={project} />
//               ))}
//             </div>
//           </div>
//         </section>
        
//         {/* Contact Section */}
//         <section id="contact" className="py-20">
//           <div className="container mx-auto px-4">
//             <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
//               Get In <span className="text-purple-500">Touch</span>
//             </h2>
            
//             <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl p-8 border border-gray-800">
//               <div className="grid md:grid-cols-2 gap-8">
//                 <div>
//                   <h3 className="text-xl font-semibold mb-6 text-white">Contact Information</h3>
                  
//                   <div className="space-y-6">
//                     <ContactItem 
//                       icon={<Mail size={20} />}
//                       label="Email"
//                       value="developer@example.com"
//                       href="mailto:developer@example.com"
//                     />
                    
//                     <ContactItem 
//                       icon={<Phone size={20} />}
//                       label="Phone"
//                       value="+1 (555) 123-4567"
//                       href="tel:+15551234567"
//                     />
                    
//                     <ContactItem 
//                       icon={<Download size={20} />}
//                       label="Resume"
//                       value="Download CV"
//                       href="#"
//                     />
//                   </div>
                  
//                   <div className="mt-8">
//                     <h3 className="text-xl font-semibold mb-4 text-white">Social Links</h3>
//                     <div className="flex space-x-4">
//                       <SocialLink href="#" icon={<Github size={24} />} label="GitHub" />
//                       <SocialLink href="#" icon={<Linkedin size={24} />} label="LinkedIn" />
//                       <SocialLink href="#" icon={<Twitter size={24} />} label="Twitter" />
//                       <SocialLink href="#" icon={<Instagram size={24} />} label="Instagram" />
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="bg-gray-800 p-6 rounded-lg">
//                   <div className="mb-4">
//                     <label htmlFor="name" className="block text-gray-400 mb-2 text-sm">Name</label>
//                     <input 
//                       type="text" 
//                       id="name" 
//                       className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
//                       placeholder="Your Name"
//                     />
//                   </div>
                  
//                   <div className="mb-4">
//                     <label htmlFor="email" className="block text-gray-400 mb-2 text-sm">Email</label>
//                     <input 
//                       type="email" 
//                       id="email" 
//                       className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
//                       placeholder="Your Email"
//                     />
//                   </div>
                  
//                   <div className="mb-4">
//                     <label htmlFor="message" className="block text-gray-400 mb-2 text-sm">Message</label>
//                     <textarea 
//                       id="message" 
//                       rows="5" 
//                       className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 text-white resize-none"
//                       placeholder="Your Message"
//                     ></textarea>
//                   </div>
                  
//                   <button 
//                     className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium hover:opacity-90 transition-opacity"
//                   >
//                     Send Message
//                   </button>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
//                 {/* Phone Support Card */}
//                 <div className="bg-gradient-to-br from-gray-900 to-black p-[1px] rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-blue-500/10 transition-all">
//                   <div className="bg-gray-900/90 p-6 rounded-xl border border-gray-800 text-center h-full hover:border-blue-500/20 transition-colors">
//                     <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-blue-900/50 to-blue-700/20 text-blue-400 mb-4 group-hover:scale-110 transition-transform">
//                       <Phone size={22} className="group-hover:animate-pulse" />
//                     </div>
//                     <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-300 transition-colors">Phone Support</h3>
//                     <p className="text-gray-400 text-sm">Available 9 AM - 5 PM, Monday through Friday</p>
//                     <a href="tel:+15551234567" className="mt-4 inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300">
//                       +1 (555) 123-4567
//                     </a>
//                   </div>
//                 </div>
                
//                 {/* Email Support Card */}
//                 <div className="bg-gradient-to-br from-gray-900 to-black p-[1px] rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-purple-500/10 transition-all">
//                   <div className="bg-gray-900/90 p-6 rounded-xl border border-gray-800 text-center h-full hover:border-purple-500/20 transition-colors">
//                     <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-purple-900/50 to-purple-700/20 text-purple-400 mb-4 group-hover:scale-110 transition-transform">
//                       <Mail size={22} className="group-hover:animate-pulse" />
//                     </div>
//                     <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors">Email Support</h3>
//                     <p className="text-gray-400 text-sm mb-2">I typically respond within 24-48 business hours</p>
//                     <a href="mailto:developer@example.com" className="mt-2 inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300">
//                       developer@example.com
//                     </a>
//                   </div>
//                 </div>
                
//                 {/* Download CV Card */}
//                 <div className="bg-gradient-to-br from-gray-900 to-black p-[1px] rounded-xl overflow-hidden group hover:shadow-lg hover:shadow-green-500/10 transition-all">
//                   <div className="bg-gray-900/90 p-6 rounded-xl border border-gray-800 text-center h-full hover:border-green-500/20 transition-colors">
//                     <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-gradient-to-br from-green-900/50 to-green-700/20 text-green-400 mb-4 group-hover:scale-110 transition-transform">
//                       <Download size={22} className="group-hover:animate-pulse" />
//                     </div>
//                     <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-green-300 transition-colors">Download CV</h3>
//                     <p className="text-gray-400 text-sm mb-4">Get my full resume and portfolio</p>
//                     <a 
//                       href="#" 
//                       className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors"
//                     >
//                       Download PDF <Download size={14} className="ml-2" />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
      
//       {/* Footer */}
//       <footer className="py-8 bg-gray-950 border-t border-gray-900">
//         <div className="container mx-auto px-4 text-center">
//           <p className="text-gray-500">© {new Date().getFullYear()} Developer Portfolio. All rights reserved.</p>
//           <p className="text-gray-600 text-sm mt-2">Built with React & Tailwind CSS</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Portfolio;



import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Mail, Phone, Download, Instagram, Linkedin, Github, Twitter,
  Code, ExternalLink, Star, ArrowRight, MapPin, Calendar, Briefcase, User
} from 'lucide-react';

// Sample data
const projects = [
  {
    id: 1,
    title: "AI Content Generator",
    description: "An AI-powered application that generates high-quality content for websites and social media.",
    image: "/api/placeholder/500/300",
    techs: ["React", "Node.js", "OpenAI API"],
    github: "#",
    demo: "#",
    featured: true
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce solution with payment integration and inventory management.",
    image: "/api/placeholder/500/300",
    techs: ["Next.js", "MongoDB", "Stripe"],
    github: "#",
    demo: "#",
    featured: true
  },
  {
    id: 3,
    title: "Weather Forecast App",
    description: "Real-time weather forecasting application with interactive maps and alerts.",
    image: "/api/placeholder/500/300",
    techs: ["React", "Weather API", "Mapbox"],
    github: "#",
    demo: "#",
    featured: false
  },
  {
    id: 4,
    title: "Task Management System",
    description: "A collaborative task management tool for teams with real-time updates.",
    image: "/api/placeholder/500/300",
    techs: ["Vue.js", "Firebase", "Tailwind CSS"],
    github: "#",
    demo: "#",
    featured: false
  }
];

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

const skills = [
  { category: "Frontend", items: ["React", "Vue.js", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "Python", "Django", "GraphQL"] },
  { category: "Database", items: ["MongoDB", "PostgreSQL", "Firebase", "Redis"] },
  { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Git"] }
];

const experiences = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    period: "2021 - Present",
    description: "Leading the frontend development team in building modern web applications with React and Next.js."
  },
  {
    id: 2,
    role: "Full-Stack Developer",
    company: "Digital Solutions Co.",
    period: "2018 - 2021",
    description: "Developed full-stack applications using MERN stack, improved performance by 40% through code optimizations."
  },
  {
    id: 3,
    role: "Web Developer",
    company: "Creative Web Agency",
    period: "2016 - 2018",
    description: "Created responsive websites and web applications for various clients across different industries."
  }
];

// SVG Background Component
const BackgroundSVG = () => {
  return (
    <svg 
      className="absolute inset-0 w-full h-full z-0 opacity-30" 
      viewBox="0 0 1000 1000" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#EC4899" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      
      {/* Abstract shapes */}
      <circle cx="150" cy="150" r="80" fill="url(#grad1)" />
      <circle cx="850" cy="150" r="120" fill="url(#grad2)" />
      <circle cx="150" cy="850" r="100" fill="url(#grad2)" />
      <circle cx="850" cy="850" r="70" fill="url(#grad1)" />
      
      {/* Connection lines */}
      <path d="M150,150 Q500,100 850,150" stroke="#4F46E5" strokeWidth="1" fill="none" opacity="0.2" />
      <path d="M150,850 Q500,900 850,850" stroke="#8B5CF6" strokeWidth="1" fill="none" opacity="0.2" />
      <path d="M150,150 Q100,500 150,850" stroke="#3B82F6" strokeWidth="1" fill="none" opacity="0.2" />
      <path d="M850,150 Q900,500 850,850" stroke="#EC4899" strokeWidth="1" fill="none" opacity="0.2" />
      
      {/* Center elements */}
      <path d="M300,300 Q500,100 700,300 Q900,500 700,700 Q500,900 300,700 Q100,500 300,300" 
        stroke="#6366F1" strokeWidth="1" fill="none" opacity="0.1" />
      
      {/* Grid patterns */}
      <g opacity="0.05">
        {Array.from({ length: 10 }).map((_, i) => (
          <line 
            key={`hline-${i}`} 
            x1="0" 
            y1={i * 100} 
            x2="1000" 
            y2={i * 100} 
            stroke="#CBD5E1" 
            strokeWidth="1" 
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line 
            key={`vline-${i}`} 
            x1={i * 100} 
            y1="0" 
            x2={i * 100} 
            y2="1000" 
            stroke="#CBD5E1" 
            strokeWidth="1" 
          />
        ))}
      </g>
    </svg>
  );
};

// TypeWriter component
const TypewriterEffect = ({ texts }) => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 150;
    
    const timer = setTimeout(() => {
      const currentText = texts[textIndex];
      
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        
        if (charIndex >= currentText.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      } else {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        
        if (charIndex <= 1) {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, typeSpeed);
    
    return () => clearTimeout(timer);
  }, [texts, textIndex, charIndex, isDeleting]);
  
  return (
    <h2 className="text-2xl md:text-3xl font-semibold text-gray-300">
      {displayText}<span className="inline-block w-1 h-8 bg-blue-500 ml-1 animate-pulse"></span>
    </h2>
  );
};

// Project Card Component
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

// Experience Card Component
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

// Contact Item Component
const ContactItem = ({ icon, label, value, href }) => {
  return (
    <div className="flex items-start group">
      <div className="mt-1 w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
        {icon}
      </div>
      <div className="ml-4">
        <span className="block text-sm text-gray-500">{label}</span>
        <a 
          href={href}
          className="text-white hover:text-blue-400 transition-colors"
        >
          {value}
        </a>
      </div>
    </div>
  );
};

// Social Link Component
const SocialLink = ({ href, icon, label, color }) => {
  return (
    <a 
      href={href}
      className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-${color}-500/20 hover:text-${color}-400 transition-all duration-300`}
      aria-label={label}
    >
      {icon}
    </a>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
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
  
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
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
        <section id="home" className="min-h-screen flex items-center py-16 relative overflow-hidden">
          <BackgroundSVG />
          
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="order-2 md:order-1">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
                Full-Stack Developer
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                  Creating Digital Experiences
                </span>
              </h1>
              <div className="mb-8 h-16">
                <TypewriterEffect
                  texts={[
                    "I build modern web applications",
                    "I create elegant user interfaces",
                    "I develop robust backend systems",
                    "I design responsive experiences"
                  ]}
                />
              </div>
              <p className="text-lg text-gray-400 mb-8 max-w-lg">
                Transforming ideas into elegant, functional, and high-performance 
                digital experiences with modern technologies.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center shadow-lg shadow-blue-900/20"
                >
                  Contact Me <ArrowRight size={16} className="ml-2" />
                </button>
                <button 
                  onClick={() => window.open('#', '_blank')}
                  className="px-6 py-3 border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center"
                >
                  Download Resume <Download size={16} className="ml-2" />
                </button>
              </div>
              
              <div className="mt-12 flex items-center space-x-4">
                <span className="text-gray-500 text-sm">Connect with me:</span>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Github size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full blur-3xl opacity-20"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl shadow-blue-900/20">
                  <img 
                    src="/api/placeholder/320/320" 
                    alt="Developer Portrait" 
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-gray-900 rounded-lg border border-gray-800 shadow-lg">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-300">Available for work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll down indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <span className="text-sm text-gray-500 mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-blue-500 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </section>
        
        {/* About Me Section */}
        <section id="about" className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
                About Me
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                Professional <span className="text-blue-500">Background</span>
              </h2>
            </div>
            
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
          </div>
        </section>
        
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
              {experiences.map((experience) => (
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
        
        {/* Projects Section */}
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
              {projects.filter(project => project.featured).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            <div className="mt-16">
              <h3 className="text-2xl font-semibold mb-8 text-center">Other Projects</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {projects.filter(project => !project.featured).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
            
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
        <section id="contact" className="py-24 bg-black relative overflow-hidden">
          <BackgroundSVG />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center mb-16">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
                Get In Touch
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                Let's <span className="text-blue-500">Connect</span>
              </h2>
              <p className="text-gray-400 mt-4 text-center max-w-2xl">
                Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <div className="mb-12">
                  <h3 className="text-xl font-semibold mb-6 text-white">Contact Information</h3>
                  <div className="space-y-6">
                    <ContactItem 
                      icon={<Mail size={20} />}
                      label="Email"
                      value="hello@devportfolio.com"
                      href="mailto:hello@devportfolio.com"
                    />
                    <ContactItem 
                      icon={<Phone size={20} />}
                      label="Phone"
                      value="+1 (123) 456-7890"
                      href="tel:+11234567890"
                    />
                    <ContactItem 
                      icon={<MapPin size={20} />}
                      label="Location"
                      value="San Francisco, CA"
                      href="#"
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-white">Connect on Social Media</h3>
                  <div className="flex space-x-4">
                    <SocialLink 
                      href="#"
                      icon={<Github size={20} />}
                      label="GitHub"
                      color="gray"
                    />
                    <SocialLink 
                      href="#"
                      icon={<Linkedin size={20} />}
                      label="LinkedIn"
                      color="blue"
                    />
                    <SocialLink 
                      href="#"
                      icon={<Twitter size={20} />}
                      label="Twitter"
                      color="blue"
                    />
                    <SocialLink 
                      href="#"
                      icon={<Instagram size={20} />}
                      label="Instagram"
                      color="pink"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-xl">
                <h3 className="text-xl font-semibold mb-6 text-white">Send Me a Message</h3>
                <form>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-400 mb-2 text-sm">Your Name</label>
                    <input 
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-400 mb-2 text-sm">Your Email</label>
                    <input 
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-gray-400 mb-2 text-sm">Subject</label>
                    <input 
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-400 mb-2 text-sm">Your Message</label>
                    <textarea 
                      id="message"
                      rows="5"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white resize-none"
                      placeholder="Hello, I'd like to talk about..."
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center shadow-lg shadow-blue-900/20"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-950 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent mb-4 block">Dev<span className="text-white">Portfolio</span></span>
              <p className="text-gray-400 mb-6">
                A full-stack developer specializing in building exceptional digital experiences.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Github size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Instagram size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {['home', 'about', 'experience', 'projects', 'contact'].map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => scrollToSection(section)}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-400">
                  <Mail size={16} className="mr-2" /> hello@devportfolio.com
                </li>
                <li className="flex items-center text-gray-400">
                  <Phone size={16} className="mr-2" /> +1 (123) 456-7890
                </li>
                <li className="flex items-center text-gray-400">
                  <MapPin size={16} className="mr-2" /> San Francisco, CA
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} DevPortfolio. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;