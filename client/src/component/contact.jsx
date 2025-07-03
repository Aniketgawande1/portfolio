import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin, Github, Twitter } from 'lucide-react';
import BackgroundSVG from './svgbac';
import ScrollFloat from './ScrollFloat';
import { ContactService } from '../services';

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Filter out empty fields
      const submitData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value.trim() !== '')
      );

      const response = await ContactService.submitContact(submitData);
      
      if (response.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your message! I will get back to you soon.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: ''
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      <BackgroundSVG />
      
      <div className="container mx-auto px-4 relative z-10">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.03}
          direction="up"
        >
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
        </ScrollFloat>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <ScrollFloat
            animationDuration={1.2}
            ease='power2.out'
            scrollStart='top bottom-=100px'
            scrollEnd='bottom top+=100px'
            stagger={0.1}
            direction="left"
            distance={80}
          >
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
          </ScrollFloat>
          
          <ScrollFloat
            animationDuration={1.2}
            ease='power2.out'
            scrollStart='top bottom-=100px'
            scrollEnd='bottom top+=100px'
            stagger={0.05}
            direction="right"
            distance={80}
          >
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-xl">
              <h3 className="text-xl font-semibold mb-6 text-white">Send Me a Message</h3>
            
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-900/30 border border-green-500/30 text-green-400'
                  : 'bg-red-900/30 border border-red-500/30 text-red-400'
              }`}>
                {submitStatus.message}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-400 mb-2 text-sm">Your Name *</label>
                  <input 
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-400 mb-2 text-sm">Your Email *</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-gray-400 mb-2 text-sm">Phone</label>
                  <input 
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder="+1 (123) 456-7890"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-gray-400 mb-2 text-sm">Company</label>
                  <input 
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-400 mb-2 text-sm">Subject *</label>
                <input 
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  placeholder="Project Inquiry"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="projectType" className="block text-gray-400 mb-2 text-sm">Project Type</label>
                  <select 
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  >
                    <option value="">Select Type</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Desktop App">Desktop App</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-gray-400 mb-2 text-sm">Budget</label>
                  <select 
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  >
                    <option value="">Select Budget</option>
                    <option value="< $1K">&lt; $1K</option>
                    <option value="$1K - $5K">$1K - $5K</option>
                    <option value="$5K - $10K">$5K - $10K</option>
                    <option value="$10K - $25K">$10K - $25K</option>
                    <option value="$25K+">$25K+</option>
                    <option value="Not specified">Not specified</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-gray-400 mb-2 text-sm">Timeline</label>
                  <select 
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                  >
                    <option value="">Select Timeline</option>
                    <option value="ASAP">ASAP</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="1 month">1 month</option>
                    <option value="2-3 months">2-3 months</option>
                    <option value="3+ months">3+ months</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-400 mb-2 text-sm">Your Message *</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>              </form>
            </div>
          </ScrollFloat>
        </div>
      </div>
    </section>
  );
};

export default Contact;