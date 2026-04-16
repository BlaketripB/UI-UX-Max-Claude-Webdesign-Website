'use client'

import { useEffect } from 'react'

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #07080a;
    --surface: #0d0f13;
    --surface-2: #13161c;
    --surface-3: #191d26;
    --border: rgba(255, 255, 255, 0.06);
    --border-hover: rgba(255, 255, 255, 0.12);
    --text: #eef0f4;
    --text-secondary: #8a929e;
    --text-muted: #50586a;
    --accent: #c8a96a;
    --accent-dim: rgba(200, 169, 106, 0.12);
    --radius: 10px;
    --radius-lg: 16px;
    --max-w: 1100px;
    --gap: 120px;
  }

  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', system-ui, sans-serif;
    line-height: 1.65;
    overflow-x: hidden;
  }

  .wrap { max-width: var(--max-w); margin: 0 auto; padding: 0 28px; }

  /* ── REVEAL ── */
  .reveal {
    opacity: 0;
    transform: translateY(26px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .reveal.in-view { opacity: 1; transform: translateY(0); }
  .d1 { transition-delay: 0.08s; }
  .d2 { transition-delay: 0.16s; }
  .d3 { transition-delay: 0.24s; }
  .d4 { transition-delay: 0.32s; }
  .d5 { transition-delay: 0.40s; }
  .d6 { transition-delay: 0.48s; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 18px 0;
    background: rgba(7, 8, 10, 0.82);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border-bottom: 1px solid var(--border);
  }
  .nav-inner {
    display: flex; align-items: center; justify-content: space-between;
    max-width: var(--max-w); margin: 0 auto; padding: 0 28px;
  }
  .nav-logo {
    font-size: 1.05rem; font-weight: 600; letter-spacing: -0.01em;
    color: var(--text); text-decoration: none;
  }
  .nav-logo span { color: var(--accent); }
  .nav-cta {
    padding: 10px 22px;
    background: var(--accent); color: #07080a;
    font-size: 0.875rem; font-weight: 600;
    border-radius: var(--radius); text-decoration: none;
    transition: opacity 0.2s, transform 0.2s;
  }
  .nav-cta:hover { opacity: 0.85; transform: translateY(-1px); }

  /* ── HERO ── */
  .hero {
    position: relative; min-height: 100vh;
    display: flex; align-items: center;
    padding: 160px 0 100px; overflow: hidden;
  }
  .hero-glow {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 80% 55% at 50% -5%, rgba(200,169,106,0.08) 0%, transparent 60%),
      radial-gradient(ellipse 50% 40% at 85% 85%, rgba(99,102,241,0.04) 0%, transparent 50%);
  }
  .hero-grid {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 64px 64px;
  }
  .hero-content { position: relative; z-index: 1; max-width: 780px; }

  .eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px;
    background: var(--accent-dim);
    border: 1px solid rgba(200,169,106,0.22);
    border-radius: 100px;
    font-size: 0.75rem; font-weight: 600;
    color: var(--accent); letter-spacing: 0.07em; text-transform: uppercase;
    margin-bottom: 32px;
  }
  .eyebrow-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--accent);
    animation: blink 2.2s ease-in-out infinite;
  }
  @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0.35; } }

  .hero h1 {
    font-size: clamp(2.8rem, 6vw, 5.2rem);
    font-weight: 700; line-height: 1.08;
    letter-spacing: -0.035em; margin-bottom: 24px;
  }
  .grad {
    background: linear-gradient(130deg, #c8a96a 0%, #ead4a0 45%, #c8a96a 100%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 5s linear infinite;
  }
  @keyframes shimmer { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }

  .hero-sub {
    font-size: 1.15rem; color: var(--text-secondary);
    max-width: 540px; margin-bottom: 44px; line-height: 1.72;
  }
  .hero-actions { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }

  .btn-primary {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 15px 30px;
    background: var(--accent); color: #07080a;
    font-size: 0.925rem; font-weight: 600;
    border-radius: var(--radius); text-decoration: none;
    box-shadow: 0 4px 28px rgba(200,169,106,0.22);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(200,169,106,0.32); }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 15px 26px;
    background: transparent; color: var(--text-secondary);
    font-size: 0.925rem; font-weight: 500;
    border-radius: var(--radius); text-decoration: none;
    border: 1px solid var(--border);
    transition: color 0.2s, border-color 0.2s;
  }
  .btn-ghost:hover { color: var(--text); border-color: var(--border-hover); }

  .hero-stats {
    display: flex; gap: 44px; flex-wrap: wrap;
    margin-top: 64px; padding-top: 40px;
    border-top: 1px solid var(--border);
  }
  .stat-n {
    font-size: 1.65rem; font-weight: 700;
    letter-spacing: -0.03em; color: var(--text);
  }
  .stat-l { font-size: 0.8rem; color: var(--text-muted); margin-top: 3px; }

  /* ── SECTION SHARED ── */
  section { padding: var(--gap) 0; }
  .sec-label {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 14px;
  }
  .sec-label::before { content:''; display:block; width:18px; height:1px; background:var(--accent); }
  .sec-h {
    font-size: clamp(1.9rem, 4vw, 3rem);
    font-weight: 700; line-height: 1.13;
    letter-spacing: -0.025em; margin-bottom: 14px;
  }
  .sec-sub {
    font-size: 1.025rem; color: var(--text-secondary);
    max-width: 500px; line-height: 1.72; margin-bottom: 56px;
  }

  /* ── SERVICES ── */
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: var(--border);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }
  .svc-card {
    background: var(--surface);
    padding: 36px 32px;
    transition: background 0.22s;
  }
  .svc-card:hover { background: var(--surface-2); }
  .svc-icon {
    width: 42px; height: 42px;
    background: var(--accent-dim);
    border: 1px solid rgba(200,169,106,0.18);
    border-radius: var(--radius);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; margin-bottom: 22px;
  }
  .svc-card h3 {
    font-size: 1.025rem; font-weight: 600;
    letter-spacing: -0.015em; margin-bottom: 10px;
  }
  .svc-card p { font-size: 0.875rem; color: var(--text-secondary); line-height: 1.65; }

  /* ── QUALITY ── */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .feature-list { display: flex; flex-direction: column; gap: 26px; margin-top: 44px; }
  .feat {
    display: flex; gap: 14px; align-items: flex-start;
  }
  .feat-icon {
    flex-shrink: 0; width: 32px; height: 32px;
    background: var(--accent-dim); border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem; margin-top: 2px;
  }
  .feat h4 { font-size: 0.925rem; font-weight: 600; margin-bottom: 4px; }
  .feat p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; }

  .code-win {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px;
    font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
    font-size: 0.78rem; line-height: 1.75;
    color: var(--text-secondary); overflow: hidden;
  }
  .code-bar {
    display: flex; align-items: center; gap: 7px;
    margin-bottom: 22px; padding-bottom: 16px;
    border-bottom: 1px solid var(--border);
  }
  .dot { width: 10px; height: 10px; border-radius: 50%; }
  .dr { background: #f87171; }
  .dy { background: #fbbf24; }
  .dg { background: #34d399; }
  .fn { margin-left: 8px; font-size: 0.72rem; color: var(--text-muted); }
  .ln { display: block; }
  .ca { color: var(--accent); }
  .cg { color: #6ee7b7; }
  .cb { color: #93c5fd; }
  .cm { color: var(--text-muted); }

  .perf-badge {
    display: flex; align-items: center; gap: 14px;
    margin-top: 16px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 14px 18px;
  }
  .perf-score { font-size: 1.5rem; font-weight: 700; color: #34d399; }
  .perf-lbl { font-size: 0.725rem; color: var(--text-muted); }
  .perf-title { font-size: 0.8rem; font-weight: 500; color: var(--text); }

  /* ── SEO ── */
  .alt-bg { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .seo-list { list-style: none; display: flex; flex-direction: column; gap: 14px; margin-top: 36px; }
  .seo-list li { display: flex; gap: 12px; align-items: flex-start; font-size: 0.9rem; color: var(--text-secondary); }
  .seo-list li::before { content: '→'; color: var(--accent); font-weight: 600; flex-shrink: 0; }
  .seo-list strong { color: var(--text); font-weight: 500; }
  .note {
    margin-top: 28px; padding: 16px 18px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent);
    border-radius: var(--radius);
    font-size: 0.815rem; color: var(--text-muted); line-height: 1.65;
  }
  .metrics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .metric {
    background: var(--surface-2); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 22px 18px;
  }
  .metric-val { font-size: 1.35rem; font-weight: 700; color: var(--accent); letter-spacing: -0.02em; margin-bottom: 4px; }
  .metric-lbl { font-size: 0.75rem; color: var(--text-muted); }

  /* ── REMOTE ── */
  .remote-points { display: flex; flex-direction: column; gap: 24px; margin-top: 40px; }
  .rpoint { display: flex; gap: 14px; }
  .rpoint-icon { flex-shrink: 0; font-size: 1rem; margin-top: 3px; }
  .rpoint h4 { font-size: 0.925rem; font-weight: 600; margin-bottom: 4px; }
  .rpoint p { font-size: 0.855rem; color: var(--text-secondary); line-height: 1.6; }

  .globe {
    position: relative; aspect-ratio: 1;
    max-width: 380px; margin: 0 auto;
    display: flex; align-items: center; justify-content: center;
  }
  .gring {
    position: absolute; border-radius: 50%;
    border: 1px solid var(--border);
  }
  .gr1 { width: 100%; height: 100%; }
  .gr2 { width: 70%; height: 70%; }
  .gr3 { width: 42%; height: 42%; }
  .gcenter {
    width: 90px; height: 90px;
    background: var(--accent-dim);
    border: 1px solid rgba(200,169,106,0.22);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 2.2rem;
  }
  .gdot {
    position: absolute; width: 7px; height: 7px;
    border-radius: 50%; background: var(--accent);
    box-shadow: 0 0 8px rgba(200,169,106,0.7);
    animation: pulsedot 3s ease-in-out infinite;
  }
  @keyframes pulsedot { 0%,100%{opacity:1;transform:scale(1);} 50%{opacity:0.5;transform:scale(0.7);} }

  /* ── ABOUT ── */
  .about-layout { display: grid; grid-template-columns: 340px 1fr; gap: 80px; align-items: start; }
  .photo-frame {
    aspect-ratio: 3/4;
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .photo-frame::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(200,169,106,0.05) 0%, transparent 60%);
  }
  .photo-placeholder {
    display: flex; flex-direction: column;
    align-items: center; gap: 10px;
    color: var(--text-muted); font-size: 0.8rem;
    text-align: center; position: relative; z-index: 1;
  }
  .photo-placeholder span { font-size: 2.8rem; opacity: 0.25; }
  .photo-placeholder em { font-size: 0.7rem; opacity: 0.6; font-style: normal; display: block; margin-top: 4px; }

  .about-body { padding-top: 6px; }
  .about-body p { font-size: 0.975rem; color: var(--text-secondary); line-height: 1.76; margin-bottom: 18px; }
  .placeholder-block {
    font-style: italic; color: var(--text-muted);
    background: var(--surface-2);
    border: 1px dashed rgba(255,255,255,0.08);
    border-radius: var(--radius);
    padding: 16px; font-size: 0.855rem; line-height: 1.6;
    margin-bottom: 18px;
  }
  .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 28px; }
  .tag {
    padding: 5px 13px;
    background: var(--surface-2); border: 1px solid var(--border);
    border-radius: 100px; font-size: 0.78rem; color: var(--text-secondary);
  }

  /* ── CTA ── */
  .cta-sec {
    text-align: center; padding: 140px 0;
    position: relative; overflow: hidden;
  }
  .cta-sec::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 65% 55% at 50% 50%, rgba(200,169,106,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .cta-sec .sec-label { justify-content: center; }
  .cta-sec .sec-h { max-width: 580px; margin: 0 auto 14px; }
  .cta-sec .sec-sub { margin: 0 auto 48px; text-align: center; }
  .cta-actions { display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; }
  .cta-note { margin-top: 22px; font-size: 0.8rem; color: var(--text-muted); }

  /* ── FOOTER ── */
  .footer { border-top: 1px solid var(--border); padding: 36px 0; }
  .foot-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; }
  .foot-logo { font-size: 0.95rem; font-weight: 600; color: var(--text-secondary); }
  .foot-logo span { color: var(--accent); }
  .foot-copy { font-size: 0.78rem; color: var(--text-muted); }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    :root { --gap: 80px; }
    .two-col, .about-layout { grid-template-columns: 1fr; gap: 48px; }
    .services-grid { grid-template-columns: 1fr; }
    .about-layout { grid-template-columns: 1fr; }
    .photo-frame { max-width: 280px; aspect-ratio: 1; }
    .metrics-grid { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 600px) {
    .hero-stats { gap: 28px; }
    .hero-actions { flex-direction: column; align-items: flex-start; }
    .two-col { grid-template-columns: 1fr; gap: 40px; }
    .metrics-grid { grid-template-columns: 1fr; }
  }
`

const services = [
  {
    icon: '⬡',
    title: 'Custom Website Design',
    desc: 'Designed from scratch to match your brand and goals. No templates, no shortcuts — every layout decision has a reason behind it.',
  },
  {
    icon: '◻',
    title: 'Mobile-First Development',
    desc: 'Every site is built to perform on any device. Mobile layout, typography, and interactions are a starting point, not an afterthought.',
  },
  {
    icon: '◈',
    title: 'Performance Optimization',
    desc: 'Fast load times, clean code, and optimized assets from the start. Slow websites lose visitors — we take performance seriously.',
  },
  {
    icon: '◎',
    title: 'SEO Foundations',
    desc: 'Semantic structure, proper meta tags, clean URLs, and page speed — the technical groundwork that helps search engines understand your site.',
  },
  {
    icon: '◆',
    title: 'Brand Identity Integration',
    desc: 'If you have an existing brand, we bring it to the web with consistency. If you\'re starting fresh, we establish a clear visual direction.',
  },
  {
    icon: '◉',
    title: 'Launch & Handoff',
    desc: 'We handle the technical side of going live and walk you through your site so you can manage it yourself — no unnecessary dependency on us.',
  },
]

const qualities = [
  {
    icon: '⚡',
    title: 'Clean, Maintainable Code',
    desc: 'No page-builder output. Every line is written by hand — readable, organized, and easy to extend.',
  },
  {
    icon: '◎',
    title: 'Accessibility by Default',
    desc: 'Proper heading structure, alt text, colour contrast, and keyboard navigation built in from the start.',
  },
  {
    icon: '◈',
    title: 'Built for the Long Term',
    desc: 'Stable technologies that won\'t require a full rebuild in 18 months. What we ship stays shippable.',
  },
  {
    icon: '◉',
    title: 'Security-Conscious',
    desc: 'Minimal attack surface, no unnecessary third-party scripts, and proper data handling practices throughout.',
  },
]

const seoItems = [
  ['Semantic HTML structure', 'proper heading hierarchy, landmark elements, and document outline'],
  ['Title tags and meta descriptions', 'written and configured for every page at launch'],
  ['Canonical URLs and redirects', 'clean URL structure with no duplicate content issues'],
  ['Core Web Vitals', 'optimised for LCP, CLS, and INP out of the box'],
  ['Schema markup', 'structured data where appropriate for your content type'],
  ['Sitemap and robots.txt', 'properly configured for search engine crawling'],
]

const metrics = [
  { val: '100', lbl: 'Accessibility score' },
  { val: '100', lbl: 'Best practices' },
  { val: 'A+', lbl: 'Security headers' },
  { val: '<1s', lbl: 'Target TTFB' },
  { val: '0', lbl: 'CLS score target' },
  { val: 'Valid', lbl: 'Structured data' },
]

const remotePoints = [
  {
    icon: '◎',
    title: 'Async-Friendly Communication',
    desc: 'No requirement for live calls. We communicate clearly over email and shared tools at a pace that works for your schedule.',
  },
  {
    icon: '◈',
    title: 'Documented at Every Step',
    desc: 'Scope, feedback, and decisions are written down — no relying on memory or verbal agreements.',
  },
  {
    icon: '⬡',
    title: 'Time Zone Aware',
    desc: 'We set expectations upfront about turnaround windows and stick to them consistently.',
  },
  {
    icon: '◉',
    title: 'Clients Worldwide',
    desc: 'We work with businesses across [placeholder — add your regions]. Your timezone is not a barrier.',
  },
]

const globeDots: React.CSSProperties[] = [
  { top: '14%', left: '24%', animationDelay: '0s' },
  { top: '28%', right: '17%', animationDelay: '0.5s' },
  { top: '62%', left: '16%', animationDelay: '1s' },
  { bottom: '18%', right: '26%', animationDelay: '1.5s' },
  { top: '48%', left: '52%', animationDelay: '0.8s' },
]

export default function Page() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in-view')
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo">LockRidge<span>Cyber</span></a>
          <a href="#contact" className="nav-cta">Start a Project</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-grid" />
        <div className="wrap">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Website Design &amp; Development
            </div>
            <h1>
              Websites Built to<br />
              <span className="grad">Earn Trust</span>
            </h1>
            <p className="hero-sub">
              Custom websites for businesses that need a professional online presence — designed with purpose, built for performance, and delivered without the agency overhead.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary">Start a Project →</a>
              <a href="#services" className="btn-ghost">See What&apos;s Included</a>
            </div>
            <div className="hero-stats">
              <div>
                <div className="stat-n">[X]+</div>
                <div className="stat-l">Projects completed</div>
              </div>
              <div>
                <div className="stat-n">Worldwide</div>
                <div className="stat-l">Remote &amp; async-friendly</div>
              </div>
              <div>
                <div className="stat-n">Fixed</div>
                <div className="stat-l">Pricing, no hourly surprises</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-label">Services</div>
            <h2 className="sec-h">What We Build</h2>
            <p className="sec-sub">
              Every engagement starts with understanding your business — not picking a template.
            </p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div key={i} className={`svc-card reveal d${(i % 3) + 1}`}>
                <div className="svc-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY ── */}
      <section id="quality" className="alt-bg">
        <div className="wrap">
          <div className="two-col">
            <div className="reveal">
              <div className="sec-label">Build Quality</div>
              <h2 className="sec-h">Hand-Built, Not Generated</h2>
              <p style={{ fontSize: '0.975rem', color: 'var(--text-secondary)', lineHeight: '1.72' }}>
                Every site is written by hand. No page builders, no bloated plugins, no mystery code. That means faster load times, easier maintenance, and a codebase that won&apos;t become a liability.
              </p>
              <div className="feature-list">
                {qualities.map((f, i) => (
                  <div key={i} className="feat">
                    <div className="feat-icon">{f.icon}</div>
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal d2">
              <div className="code-win">
                <div className="code-bar">
                  <div className="dot dr" /><div className="dot dy" /><div className="dot dg" />
                  <span className="fn">page.tsx</span>
                </div>
                <span className="ln cm">{'// Semantic, accessible markup'}</span>
                <span className="ln">&nbsp;</span>
                <span className="ln"><span className="cb">{'<main'}</span> <span className="ca">role</span><span className="cm">{"=\"main\""}</span><span className="cb">{'>'}</span></span>
                <span className="ln">{'  '}<span className="cb">{'<h1'}</span> <span className="ca">aria-label</span><span className="cm">{"=\"...\""}</span><span className="cb">{'>'}</span></span>
                <span className="ln">{'    '}LockRidge Cyber</span>
                <span className="ln">{'  '}<span className="cb">{'</h1>'}</span></span>
                <span className="ln">&nbsp;</span>
                <span className="ln cm">{'  // Lazy-loaded, optimised'}</span>
                <span className="ln">{'  '}<span className="cb">{'<Image'}</span></span>
                <span className="ln">{'    '}<span className="ca">src</span><span className="cm">={'"'/hero.webp"'}</span></span>
                <span className="ln">{'    '}<span className="ca">loading</span><span className="cm">{"=\"lazy\""}</span></span>
                <span className="ln">{'    '}<span className="ca">alt</span><span className="cm">{"=\"[descriptive]\""}</span></span>
                <span className="ln">{'  '}<span className="cb">{'/>'}</span></span>
                <span className="ln"><span className="cb">{'</main>'}</span></span>
                <span className="ln">&nbsp;</span>
                <span className="ln cg">{'// Lighthouse: 98 · Accessible: 100'}</span>
              </div>
              <div className="perf-badge">
                <div className="perf-score">98</div>
                <div>
                  <div className="perf-title">Performance Score</div>
                  <div className="perf-lbl">Google Lighthouse</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO ── */}
      <section id="seo">
        <div className="wrap">
          <div className="two-col">
            <div className="reveal">
              <div className="sec-label">SEO Foundations</div>
              <h2 className="sec-h">The Technical Base That Matters</h2>
              <p style={{ fontSize: '0.975rem', color: 'var(--text-secondary)', lineHeight: '1.72' }}>
                Search rankings depend on many factors outside web design — content, authority, and competition among them. What we control, we build right.
              </p>
              <ul className="seo-list">
                {seoItems.map(([strong, rest], i) => (
                  <li key={i}><span><strong>{strong}</strong> — {rest}</span></li>
                ))}
              </ul>
              <div className="note">
                We do not promise or guarantee search rankings. SEO is influenced by domain authority, content quality, competition, and algorithm changes that no web designer controls. We build a technically sound foundation — the rest depends on your content and strategy.
              </div>
            </div>

            <div className="reveal d2">
              <div className="metrics-grid">
                {metrics.map((m, i) => (
                  <div key={i} className={`metric reveal d${(i % 3) + 1}`}>
                    <div className="metric-val">{m.val}</div>
                    <div className="metric-lbl">{m.lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── REMOTE ── */}
      <section id="remote" className="alt-bg">
        <div className="wrap">
          <div className="two-col">
            <div className="reveal">
              <div className="sec-label">How We Work</div>
              <h2 className="sec-h">Remote-First, Anywhere in the World</h2>
              <p style={{ fontSize: '0.975rem', color: 'var(--text-secondary)', lineHeight: '1.72' }}>
                Location doesn&apos;t limit who we work with. The process is built around clear communication, documented decisions, and handoffs that actually make sense.
              </p>
              <div className="remote-points">
                {remotePoints.map((p, i) => (
                  <div key={i} className={`rpoint reveal d${i + 1}`}>
                    <div className="rpoint-icon">{p.icon}</div>
                    <div>
                      <h4>{p.title}</h4>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal d3">
              <div className="globe">
                <div className="gring gr1" />
                <div className="gring gr2" />
                <div className="gring gr3" />
                <div className="gcenter">🌐</div>
                {globeDots.map((style, i) => (
                  <div key={i} className="gdot" style={style} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about">
        <div className="wrap">
          <div className="about-layout">
            <div className="reveal">
              <div className="photo-frame">
                <div className="photo-placeholder">
                  <span>◎</span>
                  Photo placeholder
                  <em>Replace before launch</em>
                </div>
              </div>
            </div>

            <div className="about-body reveal d2">
              <div className="sec-label">About</div>
              <h2 className="sec-h">The Person Behind the Work</h2>
              <p className="placeholder-block">
                [Placeholder — Add your bio here. Include your background, what you focus on, what makes your approach different. 2–3 short paragraphs. Keep it honest and specific.]
              </p>
              <p>
                LockRidge Cyber is a [placeholder — individual / small team] focused on building professional websites for businesses that want quality work without navigating a large agency. Every project is handled directly — not passed off or outsourced.
              </p>
              <div className="tags">
                {['Next.js', 'Web Design', 'Performance', 'SEO Foundations', 'Cybersecurity', '[Add skills]'].map((t, i) => (
                  <span key={i} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section id="contact" className="cta-sec alt-bg">
        <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
          <div className="reveal">
            <div className="sec-label">Get Started</div>
            <h2 className="sec-h">Ready to Build Something That Works?</h2>
            <p className="sec-sub">
              Start with a 30-minute discovery call. We&apos;ll talk about your project, ask the right questions, and tell you honestly whether we&apos;re a good fit.
            </p>
            <div className="cta-actions">
              <a href="mailto:[your@email.com]" className="btn-primary">Schedule a Discovery Call →</a>
              <a href="mailto:[your@email.com]" className="btn-ghost">Send a Message</a>
            </div>
            <p className="cta-note">No pitch decks. No pressure. If we&apos;re not the right fit, we&apos;ll say so.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="wrap">
          <div className="foot-inner">
            <div className="foot-logo">LockRidge<span>Cyber</span></div>
            <div className="foot-copy">© {new Date().getFullYear()} LockRidge Cyber. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </>
  )
}
