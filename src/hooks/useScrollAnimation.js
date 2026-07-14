import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function useScrollAnimation(ref, options = {}) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.registerPlugin(ScrollTrigger);

    // DO NOT re-register scrollerProxy here — useLenis handles it globally

    const delay = options.delay ?? 0;
    const duration = options.duration ?? 0.8;
    const ease = options.ease ?? 'power3.out';
    const start = options.start ?? 'top 85%';
    const once = options.once ?? true;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: element,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          }
        }
      );
    }, element);

    return () => ctx.revert();
  }, [ref]);
}
