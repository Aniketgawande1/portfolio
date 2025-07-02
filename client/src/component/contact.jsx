import React from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin, Github, Twitter } from 'lucide-react';
import BackgroundSVG from './svgbac';

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

const Contact = () => {
  return (
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
  );
};

export default Contact;