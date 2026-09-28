import React, { useEffect, useRef } from 'react';

interface StarCanvasProps {
  interactive?: boolean;
  className?: string;
  showWaterRipples?: boolean;
}

export const StarCanvas: React.FC<StarCanvasProps> = ({
  className = '',
  showWaterRipples = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = Math.floor((width * height) / 12000) + 40;
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      baseAlpha: number;
      twinkleSpeed: number;
      color: string;
    }> = [];

    const starColors = ['#FFFFFF', '#E0F2FE', '#FEF3C7', '#F1F5F9', '#D6B27C'];

    for (let i = 0; i < starCount; i++) {
      const baseAlpha = 0.2 + Math.random() * 0.6;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * (height * (showWaterRipples ? 0.75 : 1)),
        radius: 0.6 + Math.random() * 1.4,
        alpha: baseAlpha,
        baseAlpha,
        twinkleSpeed: 0.005 + Math.random() * 0.02,
        color: starColors[Math.floor(Math.random() * starColors.length)]
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#060A13');
      skyGrad.addColorStop(0.5, '#0A1224');
      skyGrad.addColorStop(1, '#070D18');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle celestial nebulous glow
      const glowGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.2,
        10,
        width * 0.5,
        height * 0.2,
        width * 0.6
      );
      glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.04)');
      glowGrad.addColorStop(0.5, 'rgba(214, 178, 124, 0.02)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw starry sky
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed * 50 + star.x) * 0.3;
        const currentAlpha = Math.max(0.1, Math.min(1, star.baseAlpha + twinkle));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowBlur = star.radius > 1.2 ? 6 : 0;
        ctx.shadowColor = star.color;
        ctx.fill();
      });

      // Water reflection & gentle tidal shimmer at the lower horizon
      if (showWaterRipples) {
        const waterTop = height * 0.65;
        const waterHeight = height - waterTop;

        const waterGrad = ctx.createLinearGradient(0, waterTop, 0, height);
        waterGrad.addColorStop(0, 'rgba(8, 14, 27, 0.85)');
        waterGrad.addColorStop(1, 'rgba(4, 7, 14, 0.98)');
        ctx.fillStyle = waterGrad;
        ctx.fillRect(0, waterTop, width, waterHeight);

        // Water surface horizon glow
        const horizonLine = ctx.createLinearGradient(0, 0, width, 0);
        horizonLine.addColorStop(0, 'transparent');
        horizonLine.addColorStop(0.5, 'rgba(203, 213, 225, 0.12)');
        horizonLine.addColorStop(1, 'transparent');
        ctx.fillStyle = horizonLine;
        ctx.fillRect(0, waterTop, width, 1.5);

        // Gentle tidal caustics
        ctx.globalAlpha = 0.08;
        ctx.lineWidth = 1;
        for (let wave = 0; wave < 6; wave++) {
          const yPos = waterTop + wave * 24 + 10;
          ctx.beginPath();
          for (let x = 0; x < width; x += 15) {
            const waveY =
              yPos +
              Math.sin(x * 0.008 + time + wave) * 3 +
              Math.cos(x * 0.003 - time * 0.5) * 2;
            if (x === 0) ctx.moveTo(x, waveY);
            else ctx.lineTo(x, waveY);
          }
          ctx.strokeStyle = '#D6B27C';
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [showWaterRipples]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
};
