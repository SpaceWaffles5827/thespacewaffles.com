'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'


const REQUESTS_URL = 'https://requests.thespacewaffles.com/'
const MOVIES_URL = 'https://jellyfin.thespacewaffles.com/'

export default function Page() {
  return (
    <main className="relative flex min-h-dvh flex-col text-[#f4f8ff] antialiased selection:bg-cyan-200/40 selection:text-white">

      {/* Animated background layers */}
      <AnimatedBG90s />

      {/* Top strip */}
      <div className="border-b border-white/15 bg-gradient-to-b from-[#0c1736] to-[#09122a] py-1 text-[11px] text-[#d7e6ff] shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
        <div className="mx-auto flex max-w-[960px] items-center justify-between px-2">
          <div className="opacity-90">Best viewed at 800×600 • Netscape 4+ • IE5</div>
          <nav className="space-x-2">
            <a className="hover:underline" href="/about">About</a>
            <span className="opacity-60">•</span>
            <a className="hover:underline" href="/status">Status</a>
            <span className="opacity-60">•</span>
            <a className="hover:underline" href="/contact">Contact</a>
          </nav>
        </div>
      </div>

      {/* Header */}
      <header className="border-b-4 border-[#091436] bg-gradient-to-b from-[#25408a] to-[#142a5a] shadow-[0_10px_28px_rgba(0,0,0,.55)]">
        <div className="mx-auto flex max-w-[960px] flex-col items-start gap-2 px-2 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="no-underline">
            <div className="leading-none drop-shadow-[0_1px_0_#162856,0_2px_0_#0f1c3c,0_4px_8px_rgba(0,0,0,.45)]">
              <div className="font-black tracking-[0.02em]">
                <span className="text-[18px]">THE</span>{' '}
                <span className="bg-[linear-gradient(#fff1a8,#ffd86f)] bg-clip-text text-[40px] text-transparent [text-shadow:0_1px_0_#73601c,0_2px_0_#574713,0_0_12px_rgba(255,224,90,.5)]">
                  SPACE
                </span>{' '}
                <span className="text-[30px]">WAFFLES</span>
              </div>
              <div className="mt-0.5 text-[11px] text-[#cfe3ff]">~ Since 2002 ~</div>
            </div>
          </Link>

          <div className="flex flex-wrap gap-2">
            <RetroBtn href={REQUESTS_URL} variant="gold">📬 Request Movies</RetroBtn>
            <RetroBtn href={MOVIES_URL} variant="steel">🎬 View Movies</RetroBtn>
          </div>
        </div>
      </header>

      {/* Nav + marquee */}
      <nav className="border-t border-white/10 bg-gradient-to-b from-[#192a58] to-[#0f1c3e] shadow-[inset_0_-1px_0_rgba(255,255,255,.05),0_8px_20px_rgba(0,0,0,.35)]">
        <div className="mx-auto max-w-[960px] px-2 py-1">
          <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[auto_1fr]">
            {/* Pills: single row, scroll if overflow */}
            <div className="flex gap-1 flex-nowrap overflow-x-auto no-scrollbar">
              <NavPill href={REQUESTS_URL}>Request</NavPill>
              <NavPill href={MOVIES_URL}>Movies</NavPill>
              <NavPill href="/blog">Blog</NavPill>
              <NavPill href="/portfolio">Portfolio</NavPill>
              <NavPill href="/gallery">Gallery</NavPill>
              <NavPill href="/contact">Contact</NavPill>
            </div>

            {/* Marquee: CSS animation, clipped to row */}
            <div className="hidden sm:block overflow-hidden">
              <div className="animate-marquee whitespace-nowrap py-0.5 text-[#e2edff]">
                ✨ Welcome to TheSpaceWaffles.com • IDK • Fresh Movies • Request to download • Portfolio • Blog • Gallery ✨
              </div>
            </div>
          </div>
        </div>
      </nav>


      {/* 3-col layout (stacks on mobile) */}
      <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-2 px-2 py-4 md:grid-cols-[220px_1fr_240px]">
        {/* LEFT */}
        <aside className="space-y-2">
          <Panel title="~ Navigation ~">
            <ul className="list-[square] pl-5 text-[13px] leading-7">
              <li><a className="font-bold text-[#e5efff] hover:underline" href={REQUESTS_URL}>📬 Request Movies</a></li>
              <li><a className="font-bold text-[#e5efff] hover:underline" href={MOVIES_URL}>🎬 View Movies</a></li>
              <li><a className="font-bold text-[#e5efff] hover:underline" href="/blog">📝 Blog</a></li>
              <li><a className="font-bold text-[#e5efff] hover:underline" href="/portfolio">🧪 Portfolio</a></li>
              <li><a className="font-bold text-[#e5efff] hover:underline" href="/gallery">🖼️ Gallery</a></li>
              <li><a className="font-bold text-[#e5efff] hover:underline" href="/guestbook">📔 Guestbook</a></li>
            </ul>
            {/* <div className="my-3 h-px bg-gradient-to-r from-transparent via-[#3a5aa3] to-transparent" />
            <img
              className="w-full border border-[#27417e]"
              src="https://cdn11.bigcommerce.com/s-10c6f/images/stencil/1280x1280/products/15522/146063/BAN084-MD__38370.1648218624.jpg?c=2"
              alt="Under construction"
            /> */}
          </Panel>

          <Panel title="Cat">
            <div className="flex flex-col items-center gap-3">
              {/* Replace the src with your cat photo path/url */}
              <figure className="w-full max-w-[260px] rounded-sm border-2 border-[#6e5717] bg-black p-1 shadow-[0_6px_16px_rgba(0,0,0,.45)]">
                <img
                  src="/cat.png"
                  alt="Resident grey tabby"
                  className="block w-full h-auto object-cover [image-rendering:pixelated]"
                />
                <figcaption className="mt-1 text-center text-[11px] text-[#ffeba3]">
                  Thor
                </figcaption>
              </figure>
            </div>
          </Panel>

          <Panel title="Badges">
            <div className="grid grid-cols-2 place-items-center gap-2">
              {[
                'https://cyber.dabamos.de/88x31/nedscape_now.gif',
                'https://cyber.dabamos.de/88x31/ie_exploder.gif',
                'https://cyber.dabamos.de/88x31/linux.gif',
                'https://cyber.dabamos.de/88x31/valid-html32.gif',
                'https://cyber.dabamos.de/88x31/tipsba.gif',
                'https://cyber.dabamos.de/88x31/midinote.gif',
              ].map((src) => (
                <img key={src} src={src} alt="88x31 badge" className="w-[110px] border border-[#27417e] bg-black p-0.5" />
              ))}
            </div>
          </Panel>
        </aside>

        {/* CENTER */}
        <section className="space-y-2">
          <Panel title="WELCOME" shine>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <p className="text-[13px] leading-7">
                  <b>Space Waffles</b> is a gloriously retro home for my movie library, projects, and posts.
                  Click around, sign the guestbook, and request what should land next on the <i>Intergalactic Griddle</i>.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <RetroBtn href={REQUESTS_URL} variant="gold">Request a Title »</RetroBtn>
                  <RetroBtn href={MOVIES_URL} variant="steel">Open Library »</RetroBtn>
                </div>
              </div>
              <div className="grid w-full max-w-[200px] place-items-center gap-2 self-start md:w-auto">
                <VisitorCounter />
                <div className="rounded border border-[#6e5717] bg-[#231a05] px-3 py-1 text-[11px] font-black text-[#ffec9a] shadow-[inset_0_0_0_1px_rgba(255,255,255,.08)]">
                  NO POP-UPS • NO TRACKERS
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Quick Links">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <RetroCard href={MOVIES_URL} title="Movies" desc="Freshly added films & series" emoji="🍿" />
              <RetroCard href={REQUESTS_URL} title="Request" desc="Suggest a movie or show" emoji="📮" />
              <RetroCard href="/blog" title="Blog" desc="Guides, server notes, & rants" emoji="📝" />
              <RetroCard href="/portfolio" title="Portfolio" desc="Apps, games, and gizmos" emoji="🧪" />
              <RetroCard href="/gallery" title="Gallery" desc="Screens, frames, and GIFs" emoji="🖼️" />
              <RetroCard href="/contact" title="Comm-Link" desc="Email • Discord • etc." emoji="📡" />
            </div>
          </Panel>

          <Panel title="Latest Updates">
            <ul className="ml-4 list-disc text-[13px] leading-7">
              <li><span className="font-black text-teal-300">[NEW]</span> Starfield redraws each frame (no streak lines). Comets fade away naturally.</li>
              <li><span className="font-black text-teal-300">[LIB]</span> Classic sci-fi block added — see <a className="underline" href={MOVIES_URL}>View Movies</a>.</li>
              <li><span className="font-black text-teal-300">[POST]</span> Reverse proxies + certs — <a className="underline" href="/blog">read »</a></li>
            </ul>
          </Panel>
        </section>

        {/* RIGHT */}
        <aside className="space-y-2">
          <Panel title="Services">
            <ServicesBox />
          </Panel>

          <Panel title="Shout-Box">
            <p className="mb-2 text-[13px] leading-7">
              <b>Hello traveler!</b> Sign the guestbook and say hi — requests welcome.
            </p>
            <RetroBtn href="/guestbook" variant="gold" small>Sign Guestbook</RetroBtn>
          </Panel>
        </aside>
      </div>

      {/* Footer */}
      <footer className="mx-auto mt-auto mb-0 max-w-[960px] border border-[#27417e] bg-gradient-to-b from-[#0f1a38] to-[#0b142b] px-3 py-2 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_12px_28px_rgba(0,0,0,.35)]">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="flex items-center gap-2">
            <img className="h-[31px] w-[88px] border border-[#27417e] bg-black p-0.5" src="https://cyber.dabamos.de/88x31/pp-free.gif" alt="GIF" />
            <img className="h-[31px] w-[88px] border border-[#27417e] bg-black p-0.5" src="https://cyber.dabamos.de/88x31/aol_instant3.gif" alt="AIM" />
          </div>
          <div className="font-extrabold text-[#dbe8ff] drop-shadow-[0_1px_0_#0e1a38]">
            © {new Date().getFullYear()} Space Waffles • thespacewaffles.com
          </div>
          <div className="text-right">
            <a className="hover:underline" href="/contact">Email Me</a>
          </div>
        </div>
      </footer>

      {/* Tiny helpers */}
      <style jsx global>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-60%); } }
        .animate-marquee { animation: marquee 22s linear infinite; }
        @keyframes blinkOld { 50% { opacity: .1 } }
        .blink-old { animation: blinkOld 1s steps(2, start) infinite; }

        /* 90s tiled starfield slow scroll */
        @keyframes tile-pan {
          from { background-position: 0 0; }
          to   { background-position: 1000px 600px; }
        }
        /* gentle hue cycle on the nebula glow */
        @keyframes hue { to { filter: hue-rotate(360deg); } }
        .nebula-hue { animation: hue 30s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee, .nebula-hue { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </main>
  )
}

/* ==================== Animated Background ==================== */

function AnimatedBG90s() {
  return (
    <>
      {/* Canvas starfield (twinkle + comets that fade) */}
      <StarfieldCanvas />

      {/* Tiled sparkle texture that slowly scrolls (pure CSS, very 90s) */}
      <div
        className="pointer-events-none fixed inset-0 -z-30 opacity-30 mix-blend-screen"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/stardust.png')",
          animation: 'tile-pan 40s linear infinite',
        }}
      />

      {/* Nebula glow with hue shift */}
      <div className="pointer-events-none nebula-hue fixed inset-0 -z-40 bg-[radial-gradient(1100px_780px_at_50%_-10%,rgba(45,70,160,.65),transparent_60%)]" />
    </>
  )
}

type Star = { x: number; y: number; speed: number; size: number; hue: number; tw: number; layer: number }
type Comet = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }

function StarfieldCanvas({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const starsRef = useRef<Star[]>([])
  const cometsRef = useRef<Comet[]>([])
  const lastRef = useRef<number>(0)
  const reducedMotion = useRef<boolean>(false)

  const params = useMemo(
    () => ({
      baseCount: 120,
      maxSpeed: 0.28,
      minSpeed: 0.05,
      maxSize: 2.0,
      minSize: 0.6,
      cometEveryMs: 3000, // average spawn interval target
      cometFadeRate: 0.0006, // fade per ms (higher = quicker fade)
    }),
    []
  )

  useEffect(() => {
    reducedMotion.current = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d', { alpha: true })!

    function resize() {
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Seed stars across two layers for parallax
      const area = w * h
      const factor = area / (1280 * 720)
      const target = Math.floor(params.baseCount * density * Math.max(0.6, factor))
      starsRef.current = seedStars(target, w, h, params)
    }

    let lastComet = 0
    function frame(ts: number) {
      if (!lastRef.current) lastRef.current = ts
      const dt = Math.min(33, ts - lastRef.current)
      lastRef.current = ts

      draw(ctx, canvas, dt)

      // spawn comets at random intervals
      if (!reducedMotion.current && ts - lastComet > params.cometEveryMs + Math.random() * 2500) {
        lastComet = ts
        spawnComet(canvas)
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize)
    rafRef.current = requestAnimationFrame(frame)
    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }

    // --- helpers bound to this closure ---
    function seedStars(n: number, w: number, h: number, p: typeof params): Star[] {
      const out: Star[] = []
      for (let i = 0; i < n; i++) {
        const layer = Math.random() < 0.6 ? 0 : 1 // far vs near
        const z = layer === 0 ? Math.random() * 0.6 : 0.6 + Math.random() * 0.4
        const size = 0.6 + z * (p.maxSize - 0.6)
        const speed = p.minSpeed + z * (p.maxSpeed - p.minSpeed)
        const hue = 190 + Math.floor(Math.random() * 80) // cool tones
        out.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size,
          speed,
          hue,
          tw: Math.random() * Math.PI * 2,
          layer,
        })
      }
      return out
    }

    function spawnComet(c: HTMLCanvasElement) {
      const fromTop = Math.random() < 0.5
      const x = -40
      const y = fromTop ? Math.random() * (c.clientHeight * 0.4) : Math.random() * (c.clientHeight * 0.4) + c.clientHeight * 0.6
      const vx = 0.7 + Math.random() * 0.5
      const vy = fromTop ? 0.15 + Math.random() * 0.1 : -(0.15 + Math.random() * 0.1)
      cometsRef.current.push({ x, y, vx, vy, life: 1, maxLife: 1 })
      if (cometsRef.current.length > 4) cometsRef.current.shift()
    }

    function draw(ctx: CanvasRenderingContext2D, c: HTMLCanvasElement, dt: number) {
      const w = c.clientWidth
      const h = c.clientHeight

      // ======= CLEAR each frame (so stars leave NO trails) =======
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, w, h)

      // ---- Stars (lighter blend, but no persistence) ----
      ctx.globalCompositeOperation = 'lighter'
      const stars = starsRef.current
      const drift = Math.sin(perfNow() * 0.0002) * 0.05 // gentle vertical wave

      for (const s of stars) {
        // twinkle
        s.tw += (0.002 + Math.random() * 0.003) * dt
        const twinkle = 0.72 + (s.layer ? 0.28 : 0.2) * Math.sin(s.tw)

        // motion (near layer moves faster)
        const scale = s.layer ? 1.0 : 0.45
        s.x += s.speed * dt * 0.055 * scale
        s.y += drift * dt * scale
        if (s.x > w + 20) s.x = -20
        if (s.y > h + 20) s.y = -20
        if (s.y < -20) s.y = h + 20

        // glow sprite
        const r = s.size * twinkle
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 2.2)
        g.addColorStop(0, `hsla(${s.hue},100%,88%,0.95)`)
        g.addColorStop(0.55, `hsla(${s.hue},100%,70%,0.55)`)
        g.addColorStop(1, `rgba(255,255,255,0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(s.x, s.y, r * 2.2, 0, Math.PI * 2)
        ctx.fill()
      }

      // ---- Comets (with lifetime-based fade) ----
      if (!reducedMotion.current) {
        for (let i = cometsRef.current.length - 1; i >= 0; i--) {
          const m = cometsRef.current[i]
          m.x += m.vx * dt
          m.y += m.vy * dt
          m.life -= dt * params.cometFadeRate

          const alpha = Math.max(0, Math.min(1, m.life / m.maxLife))
          const len = 140 * (0.6 + 0.4 * alpha) // tail shortens as it fades
          const tx = m.x - m.vx * len
          const ty = m.y - m.vy * len

          // Tail gradient fades with life (no frame persistence)
          const lg = ctx.createLinearGradient(m.x, m.y, tx, ty)
          lg.addColorStop(0, `rgba(255,255,255,${0.9 * alpha})`)
          lg.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.strokeStyle = lg
          ctx.lineWidth = 2 * (0.6 + 0.4 * alpha)
          ctx.beginPath()
          ctx.moveTo(m.x, m.y)
          ctx.lineTo(tx, ty)
          ctx.stroke()

          // bright core (also fades)
          ctx.fillStyle = `rgba(255,255,255,${0.9 * alpha})`
          ctx.beginPath()
          ctx.arc(m.x, m.y, 1.8 * (0.6 + 0.4 * alpha), 0, Math.PI * 2)
          ctx.fill()

          if (alpha <= 0 || m.x > w + 50 || m.y < -50 || m.y > h + 50) {
            cometsRef.current.splice(i, 1)
          }
        }
      }
    }

    function perfNow() {
      return (typeof performance !== 'undefined' && performance.now()) || Date.now()
    }
  }, [density, params])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 -z-20" aria-hidden />
}

/* ==================== Retro UI Bits ==================== */

function RetroBtn({
  href,
  children,
  variant = 'steel',
  small = false,
}: {
  href: string
  children: React.ReactNode
  variant?: 'steel' | 'gold'
  small?: boolean
}) {
  const base =
    'inline-block no-underline font-black rounded-md border shadow-[inset_0_1px_0_rgba(255,255,255,.24),0_2px_0_#0a1226,0_10px_18px_rgba(0,0,0,.35)] hover:brightness-105 transition';
  const size = small ? 'px-3 py-1 text-[12px]' : 'px-3.5 py-2 text-[13px]';
  const look =
    variant === 'gold'
      ? 'border-[#6e5717] text-[#231900] bg-[linear-gradient(#ffe084,#ffbe3a)] [text-shadow:0_1px_0_rgba(255,255,255,.7)]'
      : 'border-[#2f4780] text-[#eef4ff] bg-[linear-gradient(#1a2a53,#0e1834)]';
  return (
    <a href={href} className={`${base} ${size} ${look}`}>
      {children}
    </a>
  )
}

function NavPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="rounded border border-transparent bg-[linear-gradient(#25408a,#142a5a)] px-2 py-1 text-[13px] font-extrabold text-[#e5efff] shadow-[inset_0_1px_0_rgba(255,255,255,.08)] hover:border-[#2f457c] hover:bg-[#102149]"
    >
      {children}
    </a>
  )
}

function Panel({
  title,
  children,
  shine = false,
}: {
  title: string
  children: React.ReactNode
  shine?: boolean
}) {
  return (
    <section className="rounded border border-[#27417e] bg-[#0f142b] shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_10px_22px_rgba(0,0,0,.35)]">
      <div
        className={[
          'border-b border-[#1d315f] px-3 py-2 font-black tracking-[0.01em] text-[#eef4ff] shadow-[0_1px_0_#13244c]',
          shine ? 'bg-[linear-gradient(#2e4e9a,#1b366f)]' : 'bg-[linear-gradient(#2a4589,#183163)]',
        ].join(' ')}
      >
        {title}
      </div>
      <div className="px-3 py-3 text-[13px] leading-7">{children}</div>
    </section>
  )
}

function MiniBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded-md border border-[#314b8f] bg-[linear-gradient(#233b79,#132657)] px-2 py-1 text-[12px] font-black text-[#eaf2ff] shadow-[inset_0_1px_0_rgba(255,255,255,.15)] hover:brightness-105">
      {children}
    </button>
  )
}

function RetroCard({ href, title, desc, emoji }: { href: string; title: string; desc: string; emoji: string }) {
  return (
    <a
      href={href}
      className="block cursor-pointer rounded-lg border border-[#35538f] bg-[linear-gradient(#121d3c,#0c1630)] p-3 text-[#e9f0ff] shadow-[inset_0_1px_0_rgba(255,255,255,.1),0_10px_22px_rgba(0,0,0,.35)] hover:brightness-110"
    >
      <div className="mb-1 flex items-center gap-2 font-black">
        <span className="grid h-[22px] w-[22px] place-items-center rounded-full border border-[#405ea0] bg-[linear-gradient(#2e457d,#1a2b54)] shadow-[inset_0_1px_0_rgba(255,255,255,.25)]">
          {emoji}
        </span>
        <span>{title}</span>
      </div>
      <div className="text-[12px] text-[#cfe0ff]">{desc}</div>
    </a>
  )
}


function VisitorCounter() {
  const [n, setN] = useState(0)
  useEffect(() => {
    const k = 'spacewaffles_hits'
    const v = (parseInt(localStorage.getItem(k) || '0') || 0) + 1
    localStorage.setItem(k, String(v))
    setN(v)
  }, [])
  return (
    <div className="w-full rounded border border-[#314c8a] bg-[linear-gradient(#0b152d,#0a1225)] px-3 py-2 text-center shadow-[inset_0_1px_0_rgba(255,255,255,.12)]">
      <div className="inline-block rounded border-2 border-[#618f78] bg-[#aee7c8] px-3 py-1 font-mono text-[13px] leading-none tracking-[0.22em] text-[#0a100f] shadow-[0_1px_0_rgba(255,255,255,.7)]">
        {String(n).padStart(6, '0')}
      </div>
      <div className="mt-1 text-[10px] text-[#b8c6da]">VISITORS</div>
    </div>
  )
}

function ServicesBox() {
  type Row = { name: string; url: string; status?: number; ok?: boolean; error?: string }

  const services: Row[] = [
    { name: 'Main Site', url: 'https://thespacewaffles.com/' },
    { name: 'Requests', url: 'https://requests.thespacewaffles.com/' },
    { name: 'Movies', url: MOVIES_URL },
    { name: 'NovaExpense', url: 'https://novaexpense.com/' },
  ]

  const [rows, setRows] = React.useState<Row[]>(services)
  const [ts, setTs] = React.useState<number | null>(null)
  const [loading, setLoading] = React.useState(false)

  const refresh = React.useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: services.map(s => s.url) }),
        cache: 'no-store',
      })
      type Result = Row & { status?: number; ok?: boolean; error?: string }

      const data = (await res.json()) as Partial<{ results: Result[]; ts: number }>
      const results: Result[] = Array.isArray(data.results) ? data.results : []
      const map = new Map<string, Result>(
        results.map<[string, Result]>(r => [r.url, r])
      )
      setRows(services.map(s => ({ ...s, ...(map.get(s.url) || {}) })))
      setTs(data.ts || Date.now())
    } catch {
      /* keep previous rows */
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => { refresh() }, [refresh])

  const dot = (code?: number) => {
    if (!code) return 'bg-gray-400'
    if (code >= 200 && code < 300) return 'bg-emerald-400'
    if (code >= 300 && code < 400) return 'bg-amber-400'
    return 'bg-rose-400'
  }
  const label = (r: Row) => (r.status ? `${r.status}` : r.error ? r.error : 'timeout')

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[12px] text-[#cfe0ff]">
        <span className="opacity-80">HTTP status by service</span>
        <button
          onClick={refresh}
          className="rounded border border-[#2f4780] bg-[linear-gradient(#1a2a53,#0e1834)] px-2 py-0.5 text-[11px] font-black text-[#eef4ff] active:translate-y-px disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Checking…' : 'Check Again'}
        </button>
      </div>

      <ul className="rounded border border-[#203e7a] bg-[#0a1223]/60 divide-y divide-[#1d315f]">
        {rows.map((r) => (
          <li key={r.url}>
            <a
              href={r.url}
              className="group block px-2 py-2 hover:bg-[#0c1530]/70"
              title={r.url}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate font-black text-[#eaf2ff] group-hover:underline">
                    {r.name}
                  </div>
                  <div className="truncate text-[11px] text-[#9db9f0]">
                    {new URL(r.url).host}
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2 font-mono text-[11px] text-[#cfe3ff]">
                  <span className={`inline-block h-2.5 w-2.5 rounded-full ${dot(r.status)}`} />
                  <span className="tabular-nums">{label(r)}</span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <div className="text-right text-[11px] text-[#cfe0ff]/70">
        Last check: {ts ? new Date(ts).toLocaleTimeString() : '—'}
      </div>
    </div>
  )
}

