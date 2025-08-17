'use client'

import React, { useEffect, useRef, useState } from 'react'

// =====================
// tiny helper: network image with graceful fallbacks
// =====================
function NetImg({ sources, alt, className }: { sources: string[]; alt: string; className?: string }) {
  const [i, setI] = useState(0)
  return (
    <img
      src={sources[i]}
      alt={alt}
      className={className}
      onError={() => setI((v) => (v + 1 < sources.length ? v + 1 : v))}
    />
  )
}

// =====================
// KONAMI / CRT TOGGLE (no deps)
// =====================
function useKonami(toggle: () => void) {
  useEffect(() => {
    const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
    let idx = 0
    function onKey(e: KeyboardEvent) {
      const key = e.key
      if (key === seq[idx]) { idx++; if (idx === seq.length) { toggle(); idx = 0 } } else { idx = 0 }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])
}

function CRTToggle() {
  const [on, setOn] = useState(false)
  const toggle = () => setOn(v => !v)
  useKonami(toggle)
  useEffect(() => {
    const root = document.documentElement
    if (on) root.classList.add('crt')
    else root.classList.remove('crt')
  }, [on])
  return (
    <button onClick={toggle} className="crt-toggle" title="Toggle CRT/Scanlines (Konami code works too)">
      {on ? 'CRT: ON' : 'CRT: OFF'}
    </button>
  )
}

// =====================
// VISITOR COUNTER (local only)
// =====================
function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  useEffect(() => {
    const key = 'spacewaffles_hits'
    const n = parseInt(localStorage.getItem(key) || '0', 10) + 1
    localStorage.setItem(key, String(n))
    setCount(n)
  }, [])
  return (
    <div className="hitbox"><span className="mono">VISITORS:</span><span className="counter mono">{count ?? '0000'}</span></div>
  )
}

// =====================
// SPARKLE TRAIL (90s cursor bling)
// =====================
function SparkleTrail() {
  useEffect(() => {
    const root = document.body
    function spawn(e: MouseEvent) {
      const s = document.createElement('span')
      s.textContent = '✨'
      s.className = 'spark'
      s.style.left = e.pageX + 'px'
      s.style.top = e.pageY + 'px'
      root.appendChild(s)
      setTimeout(() => s.remove(), 1000)
    }
    window.addEventListener('mousemove', spawn)
    return () => window.removeEventListener('mousemove', spawn)
  }, [])
  return null
}

// =====================
// BLING LAYER: random floaters (🧇,⭐,🛸)
// =====================
function BlingLayer() {
  const ref = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const icons = ['🧇', '⭐', '🛸', '🌟', '💾', '💿']
    const el = ref.current!
    const id = setInterval(() => {
      const b = document.createElement('div')
      b.className = 'bling'
      b.textContent = icons[Math.floor(Math.random() * icons.length)]
      b.style.left = Math.random() * 100 + 'vw'
      b.style.animationDuration = 6 + Math.random() * 6 + 's'
      el.appendChild(b)
      setTimeout(() => b.remove(), 14000)
    }, 1200)
    return () => clearInterval(id)
  }, [])
  return <div ref={ref} className="blingLayer" aria-hidden />
}

// =====================
// CSS SCROLLERS (replace <marquee>) — typed and TS-safe
// =====================
function Scroller({ children, className = '', speed = 24, reverse = false }: { children: React.ReactNode; className?: string; speed?: number; reverse?: boolean }) {
  return (
    <div className={`scroller ${reverse ? 'reverse' : ''} ${className}`} style={{ ['--speed' as any]: `${speed}s` }}>
      <div className="track">
        <div className="chunk">{children}</div>
        <div className="chunk">{children}</div>
        <div className="chunk">{children}</div>
        <div className="chunk">{children}</div>
      </div>
    </div>
  )
}

function VScroller({ children, className = '', speed = 28, reverse = false }: { children: React.ReactNode; className?: string; speed?: number; reverse?: boolean }) {
  return (
    <div className={`vscroller ${reverse ? 'reverse' : ''} ${className}`} style={{ ['--speed' as any]: `${speed}s` }}>
      <div className="track">
        <div className="chunk">{children}</div>
        <div className="chunk">{children}</div>
        <div className="chunk">{children}</div>
        <div className="chunk">{children}</div>
      </div>
    </div>
  )
}

// =====================
// MAIN PAGE — MAXIMALIST 90s CHAOS++ (now with more images)
// =====================
export default function Page() {
  return (
    <div id="geo-root">
      <CRTToggle />
      <SparkleTrail />
      <BlingLayer />

      {/* flying banner */}
      <div className="flyingBanner">WELCOME TO THE INTERGALACTIC GRIDDLE • WELCOME TO THE INTERGALACTIC GRIDDLE • </div>

      {/* header bar */}
      <center>
        <table className="headerTable" width="1100" cellPadding={0} cellSpacing={0}>
          <tbody>
            <tr>
              <td className="headerCell">
                <div className="logo">THE <span>SPACE</span> WAFFLES</div>
                <Scroller className="marq" speed={30}>
                  <span>✨ Serving hot bytes since 1999* (*time is a flat waffle). ✨&nbsp;&nbsp; </span>
                </Scroller>
                <VisitorCounter />
              </td>
            </tr>
          </tbody>
        </table>
      </center>

      {/* side tickers */}
      <VScroller className="sideMarq left" speed={32}>
        <div>
          ★ NEW: Desktop mini-game soon! <br />★ Blog refresh! <br />★ Hire me!
        </div>
      </VScroller>
      <VScroller className="sideMarq right" speed={36} reverse>
        <div>
          ☎ Contact • 🧪 Projects • 🖼 Gallery • 📝 Blog
        </div>
      </VScroller>

      {/* three-column TABLE LAYOUT like it's 1999 */}
      <center>
        <table className="layout" width="1100" cellPadding={12} cellSpacing={0}>
          <tbody>
            <tr>
              {/* LEFT NAV */}
              <td className="leftCol" width="240" valign="top">
                <NetImg
                  sources={[
                    'https://www.animatedimages.org/data/media/562/animated-under-construction-image-0035.gif',
                    'https://placehold.co/240x40/000/FFF?text=UNDER+CONSTRUCTION'
                  ]}
                  alt="Under Construction"
                  className="uc"
                />
                <div className="navBox">
                  <div className="navTitle rainbowText">~ NAVIGATION ~</div>
                  <ul className="navList">
                    <li><a href="/blog">📝 Blog</a></li>
                    <li><a href="/projects">🧪 Projects</a></li>
                    <li><a href="/gallery">🖼️ Gallery</a></li>
                    <li><a href="/contact">📡 Contact</a></li>
                    <li><a href="/guestbook">📔 Guestbook</a></li>
                  </ul>
                </div>
                <div className="webring">
                  <div className="navTitle">WEB-RING</div>
                  <div className="ringBtns">
                    <button>&laquo; Prev</button>
                    <button>Random</button>
                    <button>Next &raquo;</button>
                  </div>
                </div>
                <div className="badges">
                  <NetImg sources={['https://cyber.dabamos.de/88x31/nedscape_now.gif']} alt="Netscape Now" />
                  <NetImg sources={['https://cyber.dabamos.de/88x31/ie_exploder.gif', 'https://placehold.co/88x31?text=IE6']} alt="IE6" />
                  <NetImg sources={['https://cyber.dabamos.de/88x31/valid-html32.gif', 'https://placehold.co/88x31?text=HTML+3.2']} alt="Valid HTML 3.2" />
                  <NetImg sources={['https://cyber.dabamos.de/88x31/linux.gif', 'https://placehold.co/88x31?text=LINUX']} alt="Linux" />
                  <NetImg sources={['https://cyber.dabamos.de/88x31/aol_instant3.gif', 'https://placehold.co/88x31?text=Y2K']} alt="Y2K" />
                  <NetImg sources={['https://cyber.dabamos.de/88x31/spotify.gif', 'https://placehold.co/88x31?text=WIFI']} alt="WiFi" />
                  <NetImg sources={['https://cyber.dabamos.de/88x31/tipsba.gif', 'https://placehold.co/88x31?text=UNDER']} alt="Under Construction" />
                  <NetImg sources={['https://cyber.dabamos.de/88x31/midinote.gif', 'https://placehold.co/88x31?text=UNDER']} alt="Under Construction" />
                </div>
              </td>

              {/* CENTER MAIN */}
              <td className="centerCol" valign="top">
                <table className="panel" width="100%">
                  <tbody>
                    <tr><td className="panelHead"><span className="blink">ABOUT / NEWS</span></td></tr>
                    <tr>
                      <td className="panelBody spacious">
                        <p>
                          hi! i’m <b>space waffles</b> 🧇🚀 — i build weird, delightful things for the web & machines.
                          expect late-90s aesthetic, early-web chaos, and modern internals under the hood.
                        </p>
                        <ul>
                          <li>themes: retro net, playful UX, tiny electronics, game dev</li>
                          <li>stack: next.js, node, c/c++, embedded, realtime</li>
                          <li>currently: shipping projects + writing on the blog</li>
                        </ul>
                        <hr className="rainbow" />
                        <div className="linkGrid">
                          <a className="linkBtn pop" href="/blog">ENTER BLOG &raquo;</a>
                          <a className="linkBtn pop" href="/projects">PROJECTS LAB &raquo;</a>
                          <a className="linkBtn pop" href="/gallery">GIF / GALLERY &raquo;</a>
                          <a className="linkBtn pop" href="/contact">CONTACT HQ &raquo;</a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="panel" width="100%">
                  <tbody>
                    <tr><td className="panelHead">FEATURED STRIP</td></tr>
                    <tr>
                      <td className="panelBody spacious">
                        <Scroller speed={35}>
                          <NetImg sources={['https://picsum.photos/seed/waffleA/240/140', 'https://placehold.co/240x140?text=IMG']} alt="img" className="stripImg" />
                        </Scroller>
                        <div className="ticker">★ SPACE • WAFFLES • DOT • COM • SPACE • WAFFLES • DOT • COM ★</div>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table className="panel" width="100%">
                  <tbody>
                    <tr><td className="panelHead">LATEST UPDATES</td></tr>
                    <tr>
                      <td className="panelBody spacious">
                        <ul className="updates bigList">
                          <li><span className="date">[NEW]</span> launched the <b>Intergalactic Griddle</b> v1 — welcome aboard!</li>
                          <li><span className="date">[DEV]</span> prototyping a tiny waffle-sweeper game for the desktop page.</li>
                          <li><span className="date">[POST]</span> blogged about pixel shaders &amp; syrup (coming soon).</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>

              {/* RIGHT SIDEBAR */}
              <td className="rightCol" width="280" valign="top">
                <table className="panel catPanel" width="100%">
                  <tbody>
                    <tr><td className="panelHead">WAFFLE THE GREY TABBY</td></tr>
                    <tr>
                      <td className="panelBody catBody spacious">
                        <div className="catFrame">
                          <NetImg
                            sources={[
                              '/thor.jpg',
                            ]}
                            alt="Grey tabby cat mascot"
                          />
                        </div>
                        <p className="small">Resident site guardian. Click to hear a <i>mrrrp</i>.</p>
                        <button className="meowBtn" onClick={() => { const a = new Audio('https://cdn.pixabay.com/download/audio/2021/08/08/audio_53e3af9c3d.mp3?filename=cat-meow-6226.mp3'); a.volume = 0.35; a.play().catch(() => { }) }}>▶ MEOW</button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="stickerWall">
                  <NetImg sources={['https://cyber.dabamos.de/88x31/construction.gif', 'https://placehold.co/180x40?text=LINUX']} alt="Linux" />
                  <NetImg sources={['https://cyber.dabamos.de/88x31/archlinux.gif']} alt="Under Construction" />
                  <NetImg sources={['https://cyber.dabamos.de/88x31/hash_now.gif', 'https://placehold.co/180x40?text=Y2K']} alt="Y2K" />
                  <NetImg sources={['https://cyber.dabamos.de/88x31/pp-free.gif', 'https://placehold.co/180x40?text=GIF']} alt="88x31" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </center>

      {/* FOOTER */}
      <center>
        <div className="footer">© {new Date().getFullYear()} space waffles — thespacewaffles.com • <span className="mono">Last Updated:</span> {new Date().toLocaleDateString()}</div>
      </center>

      {/* AUDIO preload (optional) */}
      <audio id="meowAudio" src="https://cdn.pixabay.com/download/audio/2021/08/08/audio_53e3af9c3d.mp3?filename=cat-meow-6226.mp3" preload="none" />

      {/* GLOBAL 90s CSS */}
      <style jsx global>{`
        :root { --c1:#ff00ff; --c2:#00ffff; --c3:#ffde59; --c4:#00ffb2; --ink:#ffffff; }
        html, body { height: 100%; }
        body {
          background:
            url('https://www.transparenttextures.com/patterns/stardust.png') repeat fixed,
            radial-gradient(1200px 700px at 50% -10%, #121232, #000);
          color: var(--ink);
          font-family: 'Verdana', 'Tahoma', 'Geneva', sans-serif;
          text-shadow: 0 0 4px rgba(255,255,255,0.25);
          image-rendering: pixelated;
          animation: bg-pan 30s linear infinite;
        }
        @keyframes bg-pan { from { background-position: 0 0, 50% 0; } to { background-position: 1000px 600px, 50% 0; } }
        a { color: #00ffff; text-decoration: underline; }
        a:hover { color: #ffde59; }
        .mono { font-family: 'Courier New', monospace; }

        .crt-toggle { position:fixed; right:12px; bottom:12px; z-index:9999; font-size:11px; color:#fff; background:#000a; border:2px ridge #fff5; padding:8px 12px; border-radius:8px; box-shadow:0 0 12px #0ff6; }
        .crt::before { content:''; position:fixed; inset:0; pointer-events:none; background:
          repeating-linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px),
          radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.25) 100%);
          mix-blend-mode: soft-light; z-index: 9998; }

        .flyingBanner { position: fixed; top: 10px; left: -100vw; right: 0; z-index: 50; color:#fff; font-weight:900; letter-spacing:2px;
          text-shadow:0 0 8px #0ff,0 0 14px #f0f; filter: drop-shadow(0 0 8px #0ff);
          animation: fly 18s linear infinite; white-space: nowrap; }
        @keyframes fly { 0% { transform: translateX(0); } 100% { transform: translateX(200vw); } }

        .sideMarq { position: fixed; top: 140px; width: 170px; height: 60vh; background:#000a; border:4px groove #7df; color:#fff; z-index: 40; font-size:12px; padding:6px; }
        .sideMarq.left { left: 12px; }
        .sideMarq.right { right: 12px; }

        /* Scrollers */
        .scroller { overflow:hidden; white-space:nowrap; }
        .scroller .track { display:inline-block; animation: scroll var(--speed) linear infinite; }
        .scroller.reverse .track { animation-direction: reverse; }
        .scroller .chunk { display:inline-block; padding-right: 2rem; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .vscroller { overflow:hidden; }
        .vscroller .track { display:flex; flex-direction:column; gap:8px; animation: scrollY var(--speed) linear infinite; }
        .vscroller.reverse .track { animation-direction: reverse; }
        .vscroller .chunk { padding-bottom: 1rem; }
        @keyframes scrollY { from { transform: translateY(0); } to { transform: translateY(-50%); } }

        .headerTable { border:6px ridge #8ef; background: linear-gradient(90deg, rgba(0,0,0,0.6), rgba(0,0,30,0.6)); margin-top:48px; box-shadow: 0 0 24px #0ff6; }
        .headerCell { padding: 16px; }
        .logo { font-size: 58px; font-weight: 900; letter-spacing: 4px; text-align:center; margin:10px 0 14px; 
          background: linear-gradient(90deg, #fff, #ff00ff, #00ffff, #ffff00, #fff);
          -webkit-background-clip: text; background-clip: text; color: transparent;
          text-shadow: 0 0 12px rgba(255,255,255,0.5), 0 0 18px rgba(0,255,255,0.35);
          animation: hue 6s linear infinite;
        }
        @keyframes hue { to { filter: hue-rotate(360deg); } }
        .logo span { filter: drop-shadow(0 0 10px #ff00ff); }
        .marq { font-size: 14px; background: #000a; border:2px dashed #fff7; padding:8px; margin-top:6px; }
        .hitbox { margin-top:8px; display:flex; gap:8px; align-items:center; justify-content:center; font-size:14px; }
        .counter { background:#000; border:2px inset #fff9; padding:4px 10px; letter-spacing:3px; }

        .heroWrap { margin-top: 14px; }
        .heroStrip { border:6px ridge #ff9; background:#120015aa; box-shadow:0 0 18px #f0f6; }
        .heroItem { display:inline-block; padding: 8px; }
        .heroItem img { width: 180px; height: 120px; object-fit: cover; border:6px outset #fff7; background:#000; box-shadow:0 0 12px #fff5; }

        .layout { background: rgba(0,0,0,0.55); border:8px groove #58f; margin-top:16px; }
        .leftCol { background: rgba(10,10,40,0.6); }
        .centerCol { background: rgba(15,15,15,0.6); }
        .rightCol { background: rgba(20,10,40,0.6); }

        .uc { width: 100%; image-rendering: pixelated; border-bottom: 2px dashed #fff3; }
        .navBox { margin-top:12px; border:6px ridge #9cf; background: #001018cc; }
        .navTitle { text-align:center; font-weight:bold; padding:8px; background: linear-gradient(180deg, #0ff6, #00f6); border-bottom: 1px dashed #fff6; letter-spacing:1px; }
        .navList { list-style: square inside; padding: 10px 12px 14px; margin:0; line-height:2.0; font-size:14px; }
        .webring { margin-top:12px; border:6px ridge #9cf; background:#010b15cc; padding-bottom:8px; }
        .ringBtns { display:flex; gap:8px; padding:8px; justify-content:center; }
        .ringBtns button { font-size:12px; padding:6px 10px; border:4px outset #7df; background:#00334a; color:#cfffff; cursor:pointer; }
        .badges { margin-top:12px; display:grid; grid-template-columns: repeat(2, 1fr); gap:8px; justify-items:center; padding:8px; border:6px ridge #9cf; background:#020b18cc; }
        .badges img { width: 110px; image-rendering: pixelated; border:2px inset #fff5; background:#000; }

        .panel { border-collapse: collapse; margin: 14px 0; }
        .panelHead { background: linear-gradient(90deg, #220033, #003355); padding:10px; font-weight:900; letter-spacing:1px; border:6px ridge #7cf; text-align:center; }
        .panelBody { background: #0008; border:6px ridge #7cf; padding:20px; font-size:16px; line-height:1.95; word-spacing:1px; }
        .spacious p { margin: 0 0 16px; }
        .spacious ul { margin: 8px 0 0 0; }
        .blink { animation: blink 1s steps(2, start) infinite; }
        @keyframes blink { to { visibility: hidden; } }
        .rainbow { height:8px; border:none; margin:16px 0; background: linear-gradient(90deg, red, orange, yellow, green, cyan, blue, violet); box-shadow:0 0 12px #fff5; }
        .linkGrid { display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-top:10px; }
        .linkBtn { display:block; text-align:center; font-weight:800; color:#001; text-decoration:none; background: linear-gradient(180deg, #ffde59, #ffa500); border:6px outset #ffef99; padding:12px; box-shadow: 0 0 14px #ffde59aa; }
        .linkBtn:hover { filter: hue-rotate(15deg) saturate(1.3); transform: translateY(-1px); }
        .pop { animation: pop 1.2s ease-in-out infinite alternate; }
        @keyframes pop { from { transform: scale(1); } to { transform: scale(1.03); } }

        .updates { padding-left:18px; }
        .bigList li { margin: 12px 0; }
        .date { color:#7cffc4; font-weight:bold; }
        .ticker { margin-top: 12px; padding: 8px 10px; background:#000a; border:4px inset #0ff8; color:#0ff; font-weight:900; letter-spacing:2px; overflow:hidden; white-space:nowrap; animation: ticker 22s linear infinite; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .catPanel .panelHead { background: linear-gradient(90deg, #330033, #660033); }
        .catBody { text-align:center; }
        .catFrame { border:8px ridge #ff9; background:#111; padding:6px; width: 200px; margin: 10px auto; box-shadow:0 0 12px #ff9a; }
        .catFrame img { width:100%; height:auto; display:block; image-rendering: pixelated; }
        .small { font-size: 12px; color:#ffd; }
        .meowBtn { font-size:12px; padding:8px 12px; border:6px outset #ffc; background:#442; color:#ffd; cursor:pointer; }
        .meowBtn:active { border-style: inset; }

        .stickerWall { margin-top:12px; display:grid; gap:10px; justify-items:center; }
        .stickerWall img { width: 180px; image-rendering: pixelated; border: 4px outset #fff5; background:#000; }

        .footer { font-size: 12px; margin: 18px 0 90px; opacity: 0.95; text-shadow:0 0 6px #0ff; }

        .rainbowText { background: linear-gradient(90deg, #ff00ff, #00ffff, #ffff00, #ff00ff); -webkit-background-clip:text; background-clip:text; color:transparent; filter: drop-shadow(0 0 6px #fff8); }

        .spark { position:absolute; transform: translate(-50%, -50%); animation: sparkfade 1s ease-out forwards; pointer-events:none; }
        @keyframes sparkfade { from { opacity:1; transform: translate(-50%, -50%) scale(1); } to { opacity:0; transform: translate(-50%, -120%) scale(0.6); } }

        .blingLayer { position:fixed; inset:0; pointer-events:none; z-index:30; }
        .bling { position: absolute; top: 100vh; font-size: 18px; animation: floatUp linear forwards; opacity:0.9; text-shadow:0 0 6px #fff; }
        @keyframes floatUp { from { transform: translateY(0); } to { transform: translateY(-120vh) rotate(360deg); } }
      `}</style>
    </div>
  )
}
