import React, { useEffect, useRef } from 'react';

const Aurora = ({
  colorStops = ["#3A29FF", "#FF94B4", "#FF3232"],
  blend = 0.5,
  amplitude = 1.0,
  speed = 0.5,
  className = ""
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create multiple aurora layers
      for (let layer = 0; layer < colorStops.length; layer++) {
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        
        // Create dynamic gradient based on time and layer
        const offset1 = Math.sin(time * speed + layer * 0.5) * 0.3 + 0.5;
        const offset2 = Math.cos(time * speed * 0.8 + layer * 0.7) * 0.3 + 0.5;
        const offset3 = Math.sin(time * speed * 1.2 + layer * 0.3) * 0.3 + 0.5;

        gradient.addColorStop(0, `${colorStops[layer]}00`); // Transparent
        gradient.addColorStop(offset1, `${colorStops[layer]}${Math.floor(blend * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(offset2, `${colorStops[layer]}${Math.floor(blend * 128).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(offset3, `${colorStops[layer]}${Math.floor(blend * 64).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${colorStops[layer]}00`); // Transparent

        ctx.globalCompositeOperation = layer === 0 ? 'source-over' : 'screen';
        ctx.fillStyle = gradient;

        // Create aurora wave path
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 10) {
          const waveHeight = Math.sin((x / canvas.width) * Math.PI * 4 + time * speed + layer * 0.5) * amplitude * 100;
          const y = canvas.height * 0.3 + waveHeight + Math.sin(time * speed * 0.7 + layer) * 50;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
      }

      time += 0.016; // ~60fps
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colorStops, blend, amplitude, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        mixBlendMode: 'screen',
        opacity: blend
      }}
    />
  );
};

export default Aurora;
