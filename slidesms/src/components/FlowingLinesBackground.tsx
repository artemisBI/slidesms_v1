"use client";

import React, { useEffect, useRef } from 'react';
import styles from './FlowingLinesBackground.module.css';

const FlowingLinesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    // Configuration for the lines
    const lines: Line[] = [];
    const numLines = 15;
    const colors = [
      'rgba(66, 133, 244, 0.5)', // Google Blue
      'rgba(219, 68, 55, 0.5)',  // Google Red
      'rgba(244, 180, 0, 0.5)',  // Google Yellow
      'rgba(15, 157, 88, 0.5)',  // Google Green
      'rgba(138, 43, 226, 0.5)', // Purple
      'rgba(255, 105, 180, 0.5)', // Hot Pink
    ];

    class Line {
      y: number;
      speed: number;
      offset: number;
      color: string;
      amplitude: number;
      frequency: number;

      constructor() {
        this.y = Math.random() * height;
        this.speed = 0.5 + Math.random() * 1.5;
        this.offset = Math.random() * 100;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.amplitude = 20 + Math.random() * 50;
        this.frequency = 0.002 + Math.random() * 0.003;
      }

      update() {
        this.offset += this.speed;
        if (this.offset > width + 200) { // Reset when off screen
           this.offset = -200;
           this.y = Math.random() * height;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        
        for (let x = 0; x < width; x += 5) {
            // Sine wave calculation
            const y = this.y + Math.sin((x + this.offset) * this.frequency) * this.amplitude;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
      }
    }

    // Initialize lines
    for (let i = 0; i < numLines; i++) {
        lines.push(new Line());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trail effect
      ctx.fillRect(0, 0, width, height);

      lines.forEach(line => {
        line.update();
        line.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className={styles.canvas}
    />
  );
};

export default FlowingLinesBackground;
