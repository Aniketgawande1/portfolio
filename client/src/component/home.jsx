import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download, Github, Linkedin, Twitter } from 'lucide-react';
import BackgroundSVG from './svgbac';
import ScrollFloat from './ScrollFloat';

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

const Home = ({ scrollToSection }) => {
  const [transform, setTransform] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    const scale = isHovered ? 1.05 : 1;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
  };
  return (
    <section id="home" className="min-h-screen flex items-center py-16 relative overflow-hidden">
      <BackgroundSVG />
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <ScrollFloat
          animationDuration={1.5}
          ease='power3.out'
          scrollStart='top bottom'
          scrollEnd='bottom top'
          stagger={0.1}
          direction="left"
          distance={100}
        >
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
        </ScrollFloat>
        
        <ScrollFloat
          animationDuration={1.2}
          ease='back.out(1.7)'
          scrollStart='top bottom'
          scrollEnd='bottom top'
          direction="right"
          distance={80}
        >
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-600 rounded-full blur-3xl opacity-20"></div>
              <div 
                ref={imageRef}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl shadow-blue-900/20 cursor-pointer transition-transform duration-200 ease-out"
                style={{
                  transform: transform,
                  transformStyle: 'preserve-3d'
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img 
                  src="/api/placeholder/320/320" 
                  alt="Developer Portrait" 
                  className="object-cover w-full h-full"
                />
                
                {/* Professional overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center">
                    <p className="text-sm font-medium">Full-Stack Developer</p>
                    <p className="text-xs text-gray-300 mt-1">Creating Digital Solutions</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-gray-900 rounded-lg border border-gray-800 shadow-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-300">Available for work</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollFloat>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-sm text-gray-500 mb-2">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-500 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Home;