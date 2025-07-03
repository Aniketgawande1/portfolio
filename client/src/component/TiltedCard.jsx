import React, { useState, useRef } from 'react';

const TiltedCard = ({
  imageSrc,
  altText,
  captionText,
  containerHeight = "300px",
  containerWidth = "300px",
  imageHeight = "300px",
  imageWidth = "300px",
  rotateAmplitude = 12,
  scaleOnHover = 1.2,
  showMobileWarning = false,
  showTooltip = true,
  displayOverlayContent = true,
  overlayContent
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState('');
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -rotateAmplitude;
    const rotateY = ((x - centerX) / centerX) * rotateAmplitude;

    const scale = isHovered ? scaleOnHover : 1;

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
    <div className="tilted-card-container relative">
      {showMobileWarning && (
        <div className="md:hidden text-center text-sm text-gray-500 mb-4">
          Best viewed on desktop for full tilt effect
        </div>
      )}
      
      <div
        ref={cardRef}
        className="tilted-card relative cursor-pointer transition-transform duration-200 ease-out"
        style={{
          height: containerHeight,
          width: containerWidth,
          transform: transform,
          transformStyle: 'preserve-3d'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
          <img
            src={imageSrc}
            alt={altText}
            className="object-cover transition-transform duration-300"
            style={{
              height: imageHeight,
              width: imageWidth
            }}
          />
          
          {displayOverlayContent && overlayContent && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4">
              <div className="text-white text-center">
                {overlayContent}
              </div>
            </div>
          )}
          
          {captionText && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white text-sm font-medium">{captionText}</p>
            </div>
          )}
        </div>
        
        {showTooltip && isHovered && (
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
            Tilt me!
          </div>
        )}
      </div>
    </div>
  );
};

export default TiltedCard;
