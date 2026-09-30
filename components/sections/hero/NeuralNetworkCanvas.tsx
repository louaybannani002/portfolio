"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Base drift velocity the node relaxes back to after mouse pushes. */
  bx: number;
  by: number;
  r: number;
  color: string;
}

const MOUSE_RADIUS = 170;

function cssColorToRgb(value: string, fallback: [number, number, number]) {
  const hex = value.trim().replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return fallback;
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];
}

/**
 * Floating nodes linked when close, gently pushed by the pointer.
 * rAF loop runs only while on screen and the tab is visible; static single frame with reduced motion.
 * Default export so it can be loaded with next/dynamic.
 */
export default function NeuralNetworkCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduce = prefersReducedMotion();
    const styles = getComputedStyle(document.documentElement);
    const blue = cssColorToRgb(styles.getPropertyValue("--accent"), [59, 130, 246]);
    const violet = cssColorToRgb(styles.getPropertyValue("--accent-2"), [139, 92, 246]);
    const rgb = (c: [number, number, number]) => `${c[0]}, ${c[1]}, ${c[2]}`;
    const palette = [rgb(blue), rgb(violet)];

    let width = 0;
    let height = 0;
    let linkDist = 150;
    let nodes: Node[] = [];
    let raf = 0;
    let onScreen = true;
    const mouse = { x: -9999, y: -9999, active: false };

    const setup = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      // Phones: 1× pixel density (4× fewer pixels to fill on a 2× screen)
      const dpr = width < 768 ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mobile = width < 768;
      linkDist = mobile ? 110 : 150;
      const count = mobile
        ? Math.min(34, Math.round((width * height) / 11000))
        : Math.min(90, Math.round((width * height) / 15000));

      nodes = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.12 + Math.random() * 0.25;
        const bx = Math.cos(angle) * speed;
        const by = Math.sin(angle) * speed;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: bx,
          vy: by,
          bx,
          by,
          r: 1 + Math.random() * 1.6,
          color: palette[Math.random() < 0.55 ? 0 : 1],
        };
      });
    };

    const step = () => {
      for (const n of nodes) {
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_RADIUS && d > 0.1) {
            const f = (1 - d / MOUSE_RADIUS) * 0.06;
            n.vx += (dx / d) * f;
            n.vy += (dy / d) * f;
          }
        }
        // Relax back toward the base drift
        n.vx += (n.bx - n.vx) * 0.02;
        n.vy += (n.by - n.vy) * 0.02;
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) {
          n.vx *= -1;
          n.bx *= -1;
          n.x = Math.max(0, Math.min(width, n.x));
        }
        if (n.y < 0 || n.y > height) {
          n.vy *= -1;
          n.by *= -1;
          n.y = Math.max(0, Math.min(height, n.y));
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 0.7;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > linkDist * linkDist) continue;
          const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.32;
          ctx.strokeStyle = `rgba(${a.color}, ${alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      if (mouse.active) {
        for (const n of nodes) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d > MOUSE_RADIUS) continue;
          ctx.strokeStyle = `rgba(${palette[1]}, ${(1 - d / MOUSE_RADIUS) * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgba(${n.color}, 0.85)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Phones: ~30fps is plenty for slow drifting nodes and halves the work
    let skip = false;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (width < 768 && (skip = !skip)) return;
      step();
      draw();
    };

    const start = () => {
      if (reduce || raf || !onScreen || document.hidden) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    setup();
    draw();
    start();

    // Pause when off-screen / tab hidden
    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        const rect = parent.getBoundingClientRect();
        if (Math.abs(rect.width - width) < 1 && Math.abs(rect.height - height) < 80) return;
        setup();
        draw();
      }, 150);
    });
    ro.observe(parent);

    const onPointerMove = (e: PointerEvent) => {
      if (reduce) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y >= 0 && mouse.y <= rect.height;
    };
    const onPointerOut = () => {
      mouse.active = false;
    };
    // Touch: the "pointer" disappears when the finger lifts
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") onPointerOut();
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    document.documentElement.addEventListener("pointerleave", onPointerOut);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      window.clearTimeout(resizeTimer);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      document.documentElement.removeEventListener("pointerleave", onPointerOut);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`block ${className}`} />;
}
