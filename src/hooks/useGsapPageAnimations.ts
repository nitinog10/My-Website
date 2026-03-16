import { RefObject, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';

export const useGsapPageAnimations = (scope: RefObject<HTMLElement>) => {
  useLayoutEffect(() => {
    if (!scope.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({ defaults: { ease: EASE } });

      introTl
        .from('[data-page-title]', {
          autoAlpha: 0,
          y: 48,
          duration: 0.9,
        })
        .from(
          '[data-page-lead]',
          {
            autoAlpha: 0,
            y: 32,
            duration: 0.7,
          },
          '-=0.45',
        )
        .from(
          '[data-load-item]',
          {
            autoAlpha: 0,
            y: 38,
            duration: 0.65,
            stagger: 0.12,
          },
          '-=0.35',
        );

      const revealItems = gsap.utils.toArray<HTMLElement>('[data-reveal]');

      revealItems.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            autoAlpha: 0,
            y: 56,
            scale: 0.96,
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: EASE,
            delay: index * 0.03,
            scrollTrigger: {
              trigger: item,
              start: 'top 84%',
              toggleActions: 'play none none none',
            },
          },
        );
      });
    }, scope);

    return () => {
      ctx.revert();
    };
  }, [scope]);
};

export default useGsapPageAnimations;
