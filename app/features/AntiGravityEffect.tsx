"use client";
import { useEffect } from "react";

export default function AntiGravityEffect() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const elements = document.querySelectorAll('.card, .btn, .marker, .stat-box');
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      elements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        const rect = htmlEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const radius = 180; // effect area

        if (distance < radius) {
          const force = (radius - distance) / radius;
          const moveX = -(dx / distance) * force * 25;
          const moveY = -(dy / distance) * force * 25;

          htmlEl.style.transform = `
            translate(${moveX}px, ${moveY}px)
            scale(${1 + force * 0.06})
            rotateX(${moveY * -0.3}deg)
            rotateY(${moveX * 0.3}deg)
          `;
        } else {
          htmlEl.style.transform =
            'translate(0px,0px) scale(1) rotateX(0deg) rotateY(0deg)';
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
}
