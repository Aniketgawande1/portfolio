import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({ 
  children, 
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
  direction = 'up', // 'up', 'down', 'left', 'right', 'fade'
  distance = 100,
  className = ''
}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state based on direction
    let fromVars = { opacity: 0 };
    let toVars = { opacity: 1, duration: animationDuration, ease };

    switch (direction) {
      case 'up':
        fromVars.y = distance;
        toVars.y = 0;
        break;
      case 'down':
        fromVars.y = -distance;
        toVars.y = 0;
        break;
      case 'left':
        fromVars.x = distance;
        toVars.x = 0;
        break;
      case 'right':
        fromVars.x = -distance;
        toVars.x = 0;
        break;
      case 'fade':
        // Only opacity animation
        break;
      default:
        fromVars.y = distance;
        toVars.y = 0;
    }

    // Set initial state
    gsap.set(element.children, fromVars);

    // Create scroll trigger animation
    const animation = gsap.to(element.children, {
      ...toVars,
      stagger: stagger,
      scrollTrigger: {
        trigger: element,
        start: scrollStart,
        end: scrollEnd,
        toggleActions: 'play none none reverse',
        // markers: true, // Uncomment for debugging
      }
    });

    // Cleanup function
    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animationDuration, ease, scrollStart, scrollEnd, stagger, direction, distance]);

  return (
    <div ref={elementRef} className={className}>
      {React.Children.map(children, (child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
};

export default ScrollFloat;
