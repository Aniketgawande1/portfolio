import React, { useState, useRef } from 'react';
import { User, MessageCircle, CheckCircle, Clock } from 'lucide-react';

const ProfileCard = ({
  name = "John Doe",
  title = "Developer",
  handle = "johndoe",
  status = "Online",
  contactText = "Contact Me",
  avatarUrl = "/api/placeholder/100/100",
  showUserInfo = true,
  enableTilt = true,
  onContactClick = () => {}
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState('');
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!enableTilt || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.05 : 1})`
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (enableTilt) {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)');
    }
  };

  const getStatusIcon = () => {
    switch (status.toLowerCase()) {
      case 'online':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'busy':
        return <Clock size={16} className="text-yellow-500" />;
      case 'offline':
        return <div className="w-4 h-4 rounded-full bg-gray-500"></div>;
      default:
        return <CheckCircle size={16} className="text-green-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'online':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <div
      ref={cardRef}
      className="profile-card bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700 transition-all duration-300 hover:shadow-3xl hover:border-blue-500/30 max-w-sm mx-auto"
      style={{
        transform: transform,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5 rounded-2xl"></div>
      
      <div className="relative z-10">
        {/* Avatar and Status */}
        <div className="flex items-center mb-4">
          <div className="relative">
            <img
              src={avatarUrl}
              alt={`${name}'s avatar`}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-600 shadow-lg"
            />
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 ${getStatusColor()} rounded-full border-2 border-gray-900 shadow-sm`}></div>
          </div>
          
          {showUserInfo && (
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-white">{name}</h3>
              <p className="text-sm text-gray-400">{title}</p>
              <div className="flex items-center mt-1">
                {getStatusIcon()}
                <span className="text-xs text-gray-500 ml-1">{status}</span>
              </div>
            </div>
          )}
        </div>

        {/* Handle */}
        <div className="mb-4">
          <div className="flex items-center text-blue-400">
            <User size={14} />
            <span className="text-sm ml-1">@{handle}</span>
          </div>
        </div>

        {/* Stats or Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-gray-800/50 rounded-lg">
            <div className="text-lg font-bold text-white">25+</div>
            <div className="text-xs text-gray-400">Projects</div>
          </div>
          <div className="text-center p-3 bg-gray-800/50 rounded-lg">
            <div className="text-lg font-bold text-white">100+</div>
            <div className="text-xs text-gray-400">Clients</div>
          </div>
        </div>

        {/* Contact Button */}
        <button
          onClick={onContactClick}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg font-medium text-white hover:opacity-90 transition-opacity flex items-center justify-center shadow-lg shadow-blue-900/20"
        >
          <MessageCircle size={16} className="mr-2" />
          {contactText}
        </button>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full opacity-50"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-violet-500 rounded-full opacity-30"></div>
      </div>
    </div>
  );
};

export default ProfileCard;
