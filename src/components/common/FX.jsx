import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const REVEAL = '.card,.specialty-item,.menu-item,.menu-preview-item,.hours-list li,.cozy-image-wrap,.footer-col,.footer-brand,.category-pills';
const TILT = '.specialty-item,.menu-item,.menu-preview-item,.cozy-image-wrap';
const MAGNET = '.btn,.btn-reserve,.header-cart';
const calm = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function FX() {
  const { pathname } = useLocation();

  /* Global effects: scroll bar, cursor glow, hero parallax, 3D tilt, magnetic buttons */
  useEffect(() => {
    if (calm()) return;
    const root = document.documentElement;
    const bar = Object.assign(document.createElement('div'), { className: 'fx-progress' });
    const glow = Object.assign(document.createElement('div'), { className: 'fx-glow' });
    document.body.append(bar, glow);
    const fine = matchMedia('(pointer: fine)').matches;

    const onScroll = () => {
      const h = root.scrollHeight - innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
      root.style.setProperty('--sy', Math.min(scrollY, 900));
    };

    let last = null;
    const reset = (el) => { if (el) { el.style.transform = ''; el.style.translate = ''; el.classList.remove('fx-hot'); } };

    const onMove = (e) => {
      if (!fine) return;
      glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      const t0 = e.target;
      if (!t0.closest) return;

      const hero = t0.closest('.hero-section');
      if (hero) {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty('--hx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        hero.style.setProperty('--hy', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      }
      const card = t0.closest('.card');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }

      const t = t0.closest(TILT) || t0.closest(MAGNET);
      if (t !== last) { reset(last); last = t; }
      if (!t) return;
      const r = t.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      t.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
      t.style.setProperty('--my', `${(y + 0.5) * 100}%`);
      t.classList.add('fx-hot');
      if (t.matches(TILT)) t.style.transform = `perspective(800px) rotateX(${-y * 10}deg) rotateY(${x * 12}deg) translateZ(10px)`;
      else t.style.translate = `${x * 10}px ${y * 8}px`;
    };
    const onLeave = () => { reset(last); last = null; };

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('mouseleave', onLeave);
    onScroll();
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('pointermove', onMove);
      root.removeEventListener('mouseleave', onLeave);
      bar.remove(); glow.remove();
    };
  }, []);

  /* Per-page effects: page transition, hero sparks, scroll reveal (also for menu items loaded later) */
  useEffect(() => {
    if (calm()) return;
    const main = document.querySelector('main');
    if (main) { main.classList.remove('page-enter'); void main.offsetWidth; main.classList.add('page-enter'); }

    const hero = document.querySelector('.hero-section');
    if (hero && !hero.querySelector('.fx-spark')) {
      for (let i = 0; i < 22; i++) {
        const s = document.createElement('i');
        s.className = 'fx-spark';
        s.style.cssText = `left:${Math.random() * 100}%;--s:${3 + Math.random() * 5}px;--t:${6 + Math.random() * 8}s;animation-delay:-${Math.random() * 10}s`;
        hero.append(s);
      }
    }

    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('fx-in'); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    const seen = new WeakSet();
    let n = 0;
    const scan = () => document.querySelectorAll(REVEAL).forEach((el) => {
      if (seen.has(el)) return;
      seen.add(el);
      el.classList.add('fx');
      el.style.setProperty('--fx-d', `${(n++ % 4) * 90}ms`);
      io.observe(el);
    });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.getElementById('root'), { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [pathname]);

  return null;
}