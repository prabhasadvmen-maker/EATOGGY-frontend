import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1.0,
      smoothTouch: false,
      touchMultiplier: 2.0,
      infinite: false,
    });

    let frameId;

    function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    // Make lenis globally accessible for other animations (GSAP ScrollTrigger)
    window.lenis = lenis;

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);
}
