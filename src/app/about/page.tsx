'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'

const REQUESTS_URL = 'https://requests.thespacewaffles.com/'
const MOVIES_URL = 'https://jellyfin.thespacewaffles.com/'

export default function AboutPage() {
    return (
        <main className="relative flex min-h-dvh flex-col text-[#f4f8ff] antialiased selection:bg-cyan-200/40 selection:text-white">

            {/* Animated background layers */}
            <AnimatedBG90s />

            {/* Top strip */}
            <div className="border-b border-white/15 bg-gradient-to-b from-[#0c1736] to-[#09122a] py-1 text-[11px] text-[#d7e6ff] shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
                <div className="mx-auto flex max-w-[960px] items-center justify-between px-2">
                    <div className="opacity-90">Best viewed at 800×600 • Netscape 4+ • IE5</div>
                    <nav className="space-x-2">
                        <Link className="hover:underline" href="/">Home</Link>
                        <span className="opacity-60">•</span>
                        <Link className="hover:underline" href="/status">Status</Link>
                        <span className="opacity-60">•</span>
                        <Link className="hover:underline" href="/contact">Contact</Link>
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

            {/* Nav */}
            <nav className="border-t border-white/10 bg-gradient-to-b from-[#192a58] to-[#0f1c3e] shadow-[inset_0_-1px_0_rgba(255,255,255,.05),0_8px_20px_rgba(0,0,0,.35)]">
                <div className="mx-auto max-w-[960px] px-2 py-1">
                    <div className="flex flex-wrap gap-1">
                        <NavPill href="/">Home</NavPill>
                        <NavPill href="/about">About</NavPill>
                        <NavPill href="/blog">Blog</NavPill>
                        <NavPill href="/portfolio">Portfolio</NavPill>
                        <NavPill href="/gallery">Gallery</NavPill>
                        <NavPill href={REQUESTS_URL}>Request</NavPill>
                        <NavPill href={MOVIES_URL}>Movies</NavPill>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <div className="mx-auto grid max-w-[960px] grid-cols-1 gap-2 px-2 py-4">
                <Panel title="ABOUT SPACE WAFFLES" shine>
                    <div className="space-y-3 text-[13px] leading-7">
                        <p>
                            <b>Space Waffles</b> is my cozy corner of the web: a retro-styled portal for my movie library,
                            side projects, and notes from the homelab. It’s equal parts nostalgia and tinkering.
                        </p>
                        <ul className="ml-5 list-disc">
                            <li>No trackers. No pop-ups. No ads.</li>
                            <li>Built for friends & family: request a title, grab some popcorn, enjoy.</li>
                            <li>Uptime & status are public because I like honest dashboards.</li>
                        </ul>
                    </div>
                </Panel>

                <Panel title="COLOPHON (STACK)">
                    <div className="grid gap-3 sm:grid-cols-2 text-[13px] leading-7">
                        <div>
                            <div className="font-black text-[#eaf2ff] mb-1">Frontend</div>
                            <ul className="ml-5 list-[square]">
                                <li>Next.js • React • TypeScript</li>
                                <li>Tailwind CSS</li>
                            </ul>
                        </div>
                        <div>
                            <div className="font-black text-[#eaf2ff] mb-1">Infra</div>
                            <ul className="ml-5 list-[square]">
                                <li>Docker on Linux</li>
                                <li>Reverse proxy with Traefik / NPM</li>
                                <li>Let’s Encrypt TLS</li>
                            </ul>
                        </div>
                        <div>
                            <div className="font-black text-[#eaf2ff] mb-1">Media</div>
                            <ul className="ml-5 list-[square]">
                                <li>Jellyfin for streaming</li>
                                <li>Requests portal for friends</li>
                            </ul>
                        </div>
                        <div>
                            <div className="font-black text-[#eaf2ff] mb-1">Design</div>
                            <ul className="ml-5 list-[square]">
                                <li>90s UI vibes, pixel accents</li>
                                <li>Custom starfield (canvas) with comets</li>
                            </ul>
                        </div>
                    </div>
                </Panel>

                <Panel title="POLICY & ETHOS">
                    <div className="space-y-2 text-[13px] leading-7">
                        <p><b>Privacy:</b> I don’t run analytics or invasive scripts. Visitor counter is local to your browser.</p>
                        <p><b>Requests:</b> Intended for personal, fair-use viewing. If something’s broken, ping me.</p>
                        <p><b>Accessibility:</b> Reduced-motion is respected; backgrounds calm down automatically.</p>
                    </div>
                </Panel>

                <Panel title="FAQ">
                    <dl className="grid gap-3 text-[13px] leading-7">
                        <div>
                            <dt className="font-black text-[#eaf2ff]">How do I request a movie?</dt>
                            <dd className="ml-4">Use the <a className="underline" href={REQUESTS_URL}>Requests</a> portal and add details. I’ll queue it.</dd>
                        </div>
                        <div>
                            <dt className="font-black text-[#eaf2ff]">Do I need an account?</dt>
                            <dd className="ml-4">For streaming, yes—ask and I’ll set you up if you’re a friend/fam.</dd>
                        </div>
                        <div>
                            <dt className="font-black text-[#eaf2ff]">Why the retro look?</dt>
                            <dd className="ml-4">Because the web used to be fun—and this site tries to keep it that way.</dd>
                        </div>
                    </dl>
                </Panel>

                <Panel title="CONTACT">
                    <div className="flex flex-wrap items-center gap-2 text-[13px] leading-7">
                        <RetroBtn href="/contact" variant="gold">Email / DM</RetroBtn>
                        <RetroBtn href="/guestbook" variant="steel">Sign the Guestbook</RetroBtn>
                    </div>
                </Panel>
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

        @keyframes tile-pan { from { background-position: 0 0; } to { background-position: 1000px 600px; } }
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
            <StarfieldCanvas />
            <div
                className="pointer-events-none fixed inset-0 -z-30 opacity-30 mix-blend-screen"
                style={{
                    backgroundImage: "url('https://www.transparenttextures.com/patterns/stardust.png')",
                    animation: 'tile-pan 40s linear infinite',
                }}
            />
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
            cometEveryMs: 3000,
            cometFadeRate: 0.0006,
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

        function seedStars(n: number, w: number, h: number, p: typeof params): Star[] {
            const out: Star[] = []
            for (let i = 0; i < n; i++) {
                const layer = Math.random() < 0.6 ? 0 : 1
                const z = layer === 0 ? Math.random() * 0.6 : 0.6 + Math.random() * 0.4
                const size = 0.6 + z * (p.maxSize - 0.6)
                const speed = p.minSpeed + z * (p.maxSpeed - p.minSpeed)
                const hue = 190 + Math.floor(Math.random() * 80)
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

            ctx.globalCompositeOperation = 'source-over'
            ctx.clearRect(0, 0, w, h)

            ctx.globalCompositeOperation = 'lighter'
            const stars = starsRef.current
            const drift = Math.sin(performance.now() * 0.0002) * 0.05

            for (const s of stars) {
                s.tw += (0.002 + Math.random() * 0.003) * dt
                const twinkle = 0.72 + (s.layer ? 0.28 : 0.2) * Math.sin(s.tw)

                const scale = s.layer ? 1.0 : 0.45
                s.x += s.speed * dt * 0.055 * scale
                s.y += drift * dt * scale
                if (s.x > w + 20) s.x = -20
                if (s.y > h + 20) s.y = -20
                if (s.y < -20) s.y = h + 20

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

            if (!reducedMotion.current) {
                for (let i = cometsRef.current.length - 1; i >= 0; i--) {
                    const m = cometsRef.current[i]
                    m.x += m.vx * dt
                    m.y += m.vy * dt
                    m.life -= dt * params.cometFadeRate

                    const alpha = Math.max(0, Math.min(1, m.life / m.maxLife))
                    const len = 140 * (0.6 + 0.4 * alpha)
                    const tx = m.x - m.vx * len
                    const ty = m.y - m.vy * len

                    const lg = ctx.createLinearGradient(m.x, m.y, tx, ty)
                    lg.addColorStop(0, `rgba(255,255,255,${0.9 * alpha})`)
                    lg.addColorStop(1, 'rgba(255,255,255,0)')
                    ctx.strokeStyle = lg
                    ctx.lineWidth = 2 * (0.6 + 0.4 * alpha)
                    ctx.beginPath()
                    ctx.moveTo(m.x, m.y)
                    ctx.lineTo(tx, ty)
                    ctx.stroke()

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
        'inline-block no-underline font-black rounded-md border shadow-[inset_0_1px_0_rgba(255,255,255,.24),0_2px_0_#0a1226,0_10px_18px_rgba(0,0,0,.35)] hover:brightness-105 transition'
    const size = small ? 'px-3 py-1 text-[12px]' : 'px-3.5 py-2 text-[13px]'
    const look =
        variant === 'gold'
            ? 'border-[#6e5717] text-[#231900] bg-[linear-gradient(#ffe084,#ffbe3a)] [text-shadow:0_1px_0_rgba(255,255,255,.7)]'
            : 'border-[#2f4780] text-[#eef4ff] bg-[linear-gradient(#1a2a53,#0e1834)]'
    return (
        <a href={href} className={`${base} ${size} ${look}`}>
            {children}
        </a>
    )
}

function NavPill({ href, children }: { href: string; children: React.ReactNode }) {
    const isExternal = href.startsWith('http')
    const inner = (
        <span className="rounded border border-transparent bg-[linear-gradient(#25408a,#142a5a)] px-2 py-1 text-[13px] font-extrabold text-[#e5efff] shadow-[inset_0_1px_0_rgba(255,255,255,.08)] hover:border-[#2f457c] hover:bg-[#102149]">
            {children}
        </span>
    )
    return isExternal ? (
        <a href={href}>{inner}</a>
    ) : (
        <Link href={href}>{inner}</Link>
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
