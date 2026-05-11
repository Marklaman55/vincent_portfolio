import React, { useEffect, useRef } from 'react';

const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 60;
    const connectionDistance = 150;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const scrollY = window.scrollY;
      
      particles.forEach(p => {
        p.update(canvas.width, canvas.height);
        
        // Apply parallax effect based on scroll position
        // Particles have different sizes, we can use that to simulate depth
        const parallaxFactor = p.size * 0.15; 
        const offsetY = scrollY * parallaxFactor;
        
        // Wrap Y coordinate to keep particles visible within the viewport
        let drawY = (p.y - offsetY) % canvas.height;
        if (drawY < 0) drawY += canvas.height;
        
        ctx.beginPath();
        ctx.arc(p.x, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(28, 111, 179, 0.3)';
        ctx.fill();
        
        // Glowing effect
        ctx.beginPath();
        ctx.arc(p.x, drawY, p.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(28, 111, 179, 0.1)';
        ctx.fill();
        
        // Store drawY for connection calculation
        (p as any).drawY = drawY;
      });

      // Draw connections with parallax
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i] as any;
          const p2 = particles[j] as any;
          
          const dx = p1.x - p2.x;
          const dy = p1.drawY - p2.drawY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.drawY);
            ctx.lineTo(p2.x, p2.drawY);
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(28, 111, 179, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 bg-[#F2F4F5]"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default NetworkBackground;
