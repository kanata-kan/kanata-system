/**
 * @file not-found.tsx
 * @description Global 404 fallback — shown when no locale segment is matched.
 * Self-contained: root layout just passes children, so we own the full document.
 */

import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404 — Page not found</title>
        <meta name="robots" content="noindex" />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          :root {
            --cyan: #22d3ee;
            --purple: #a855f7;
            --bg: #060910;
            --text: #e2e8f0;
            --muted: #64748b;
            --faint: #1e293b;
            --line: #1e293b;
            --border2: #334155;
          }
          body {
            background: var(--bg);
            color: var(--text);
            font-family: system-ui, -apple-system, sans-serif;
            min-height: 100dvh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 40px 24px;
            position: relative;
            overflow: hidden;
          }
          .dots {
            position: fixed;
            inset: 0;
            background-image: radial-gradient(circle, #1e293b88 1px, transparent 1px);
            background-size: 28px 28px;
            pointer-events: none;
            opacity: 0.5;
          }
          .glow {
            position: fixed;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 480px;
            height: 480px;
            border-radius: 50%;
            background: radial-gradient(circle, #22d3ee0c, #a855f706, transparent 68%);
            pointer-events: none;
          }
          .mark { margin-bottom: 28px; opacity: 0.9; }
          .code {
            font-size: clamp(96px, 18vw, 160px);
            font-weight: 800;
            font-style: italic;
            line-height: 1;
            background: linear-gradient(135deg, #22d3ee, #a855f7);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -4px;
            margin-bottom: 8px;
            user-select: none;
          }
          .eyebrow {
            font-family: 'Courier New', monospace;
            font-size: 9px;
            letter-spacing: 3px;
            color: var(--muted);
            text-transform: uppercase;
            margin-bottom: 20px;
          }
          .divider {
            width: 48px;
            height: 1px;
            background: linear-gradient(90deg, #22d3ee, #a855f7);
            margin: 0 auto 28px;
          }
          .heading {
            font-size: clamp(20px, 4vw, 28px);
            font-style: italic;
            color: var(--text);
            letter-spacing: -0.5px;
            line-height: 1.3;
            margin-bottom: 16px;
            max-width: 440px;
          }
          .sub {
            font-size: 15px;
            color: var(--muted);
            line-height: 1.7;
            max-width: 380px;
            margin-bottom: 48px;
          }
          .actions { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
          .btn {
            font-family: 'Courier New', monospace;
            font-size: 10px;
            letter-spacing: 1.5px;
            padding: 12px 28px;
            border-radius: 8px;
            text-decoration: none;
            transition: all .2s;
            cursor: pointer;
          }
          .btn-ghost {
            border: 1px solid var(--line);
            color: var(--muted);
            background: transparent;
          }
          .btn-ghost:hover {
            border-color: var(--border2);
            color: var(--text);
          }
          .btn-primary {
            border: 1px solid #22d3ee50;
            color: var(--cyan);
            background: #22d3ee08;
          }
          .btn-primary:hover {
            background: var(--cyan);
            color: var(--bg);
            border-color: var(--cyan);
            box-shadow: 0 4px 20px #22d3ee35;
          }
          .corner-tl {
            position: fixed; top: 28px; left: 28px;
            width: 22px; height: 22px;
            border-top: 1px solid #22d3ee25;
            border-left: 1px solid #22d3ee25;
          }
          .corner-br {
            position: fixed; bottom: 28px; right: 28px;
            width: 22px; height: 22px;
            border-bottom: 1px solid #22d3ee25;
            border-right: 1px solid #22d3ee25;
          }
        `}</style>
      </head>
      <body>
        <div className="dots" aria-hidden="true" />
        <div className="glow" aria-hidden="true" />
        <div className="corner-tl" aria-hidden="true" />
        <div className="corner-br" aria-hidden="true" />

        <div className="mark" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="g404" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <path
              d="M8,82 L28,16 L50,82 L63,16 L76,82 L89,16"
              stroke="url(#g404)"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5,53 L42,53"
              stroke="url(#g404)"
              strokeWidth="11"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="code">404</div>
        <p className="eyebrow">PAGE NOT FOUND</p>
        <div className="divider" />
        <h1 className="heading">You&apos;ve gone off the map.</h1>
        <p className="sub">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="actions">
          <Link href="/en" className="btn btn-ghost">
            Back to Homepage
          </Link>
          <Link href="/en/how-i-start" className="btn btn-primary">
            How I Start
          </Link>
        </div>
      </body>
    </html>
  );
}
