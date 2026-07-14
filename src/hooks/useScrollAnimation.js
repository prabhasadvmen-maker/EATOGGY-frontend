import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function useScrollAnimation(ref, options = {}) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    gsap.registerPlugin(ScrollTrigger);

    // Sync ScrollTrigger with Lenis smooth scroll
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) window.lenis?.scrollTo(value);
        return window.scrollY;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      }
    });

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

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, [ref, options]);
}
