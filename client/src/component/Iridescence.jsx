import React, { useEffect, useRef } from 'react';

const Iridescence = ({
  color = [1, 1, 1],
  mouseReact = false,
  amplitude = 0.1,
  speed = 1.0,
  className = ""
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      if (mouseReact) {
        mouseRef.current = {
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight
        };
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    if (mouseReact) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const createIridescenceGradient = (centerX, centerY, radius, timeOffset = 0) => {
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      
      const hueShift = (time * speed + timeOffset) * 60; // Rotate through hues
      const mouseInfluence = mouseReact ? 
        ((mouseRef.current.x - 0.5) * 2 + (mouseRef.current.y - 0.5) * 2) * 30 : 0;
      
      // Create iridescent color stops
      for (let i = 0; i <= 10; i++) {
        const stop = i / 10;
        const hue = (hueShift + mouseInfluence + stop * 360) % 360;
        const saturation = 70 + Math.sin(time * speed + stop * Math.PI) * 20;
        const lightness = 50 + Math.sin(time * speed * 0.7 + stop * Math.PI * 2) * 20;
        const alpha = amplitude * (1 - stop * 0.8) * (0.3 + Math.sin(time * speed + stop * Math.PI) * 0.2);
        
        const rgbColor = hslToRgb(hue, saturation, lightness);
        const finalColor = [
          Math.floor(rgbColor[0] * color[0]),
          Math.floor(rgbColor[1] * color[1]),
          Math.floor(rgbColor[2] * color[2])
        ];
        
        gradient.addColorStop(stop, `rgba(${finalColor[0]}, ${finalColor[1]}, ${finalColor[2]}, ${alpha})`);
      }
      
      return gradient;
    };

    const hslToRgb = (h, s, l) => {
      h /= 360;
      s /= 100;
      l /= 100;
      
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs((h * 6) % 2 - 1));
      const m = l - c / 2;
      
      let r, g, b;
      
      if (h < 1/6) [r, g, b] = [c, x, 0];
      else if (h < 2/6) [r, g, b] = [x, c, 0];
      else if (h < 3/6) [r, g, b] = [0, c, x];
      else if (h < 4/6) [r, g, b] = [0, x, c];
      else if (h < 5/6) [r, g, b] = [x, 0, c];
      else [r, g, b] = [c, 0, x];
      
      return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create multiple iridescent effects
      const effects = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: 300, timeOffset: 0 },
        { x: canvas.width * 0.8, y: canvas.height * 0.7, radius: 250, timeOffset: Math.PI },
        { x: canvas.width * 0.6, y: canvas.height * 0.2, radius: 200, timeOffset: Math.PI * 0.5 },
        { x: canvas.width * 0.3, y: canvas.height * 0.8, radius: 280, timeOffset: Math.PI * 1.5 }
      ];

      effects.forEach((effect, index) => {
        const gradient = createIridescenceGradient(
          effect.x + Math.sin(time * speed * 0.3 + index) * 50,
          effect.y + Math.cos(time * speed * 0.4 + index) * 30,
          effect.radius,
          effect.timeOffset
        );
        
        ctx.globalCompositeOperation = index === 0 ? 'source-over' : 'screen';
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      time += 0.016; // ~60fps
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (mouseReact) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color, mouseReact, amplitude, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        mixBlendMode: 'overlay',
        opacity: amplitude
      }}
    />
  );
};

export default Iridescence;
