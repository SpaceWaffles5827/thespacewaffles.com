'use client'

import React, { useEffect, useState } from 'react'

// ===============
// helpers
// ===============
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

// CSS scroller (marquee replacement)
function Scroller({ children, className = '', speed = 26, reverse = false }: { children: React.ReactNode; className?: string; speed?: number; reverse?: boolean }) {
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

// ===============
// PAGE — Early 2000s Portal (XP/Aqua vibes)
// ===============
export default function Page() {
    return (
        <div id="portal-2003">
            {/* XP top bar */}
            <div className="xpBar">
                <div className="xpLogo">The <b>Space Waffles</b> Portal</div>
                <div className="xpRight">
                    <span className="statusDot" />
                    <span className="statusText">Online</span>
                    <VisitorCounter />
                </div>
            </div>

            {/* ticker */}
            <Scroller className="ticker2003" speed={32}>
                <span>✨ Intergalactic Griddle • Projects • Blog • Gallery • Contact ✨&nbsp;&nbsp;</span>
            </Scroller>

            {/* hero */}
            <main className="wrap">
                <section className="heroCard glass">
                    <div className="heroLeft">
                        <div className="brand">SPACE WAFFLES</div>
                        <div className="tag">Early‑2000s portal edition — glossy, bubbly, XP vibes.</div>
                        <div className="ctaRow">
                            <a className="btn aqua" href="/projects">Projects</a>
                            <a className="btn blue" href="/blog">Blog</a>
                            <a className="btn green" href="/gallery">Gallery</a>
                            <a className="btn silver" href="/contact">Contact</a>
                        </div>
                        <div className="nowPlaying">
                            <span className="npDot" /> Now Playing: <em>lofi‑syrup.mp3</em>
                            <button className="btn tiny" onClick={() => { const a = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_1e2de5c8e0.mp3?filename=lofi-study-112191.mp3'); a.volume = 0.2; a.play().catch(() => { }) }}>▶</button>
                        </div>
                    </div>
                    <div className="heroRight">
                        <div className="polaroid">
                            <NetImg
                                sources={[
                                    'https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=1200&auto=format&fit=crop',
                                    'https://picsum.photos/seed/spacewaffle-hero/800/500'
                                ]}
                                alt="Space landscape"
                            />
                            <div className="caption">Welcome to the Intergalactic Griddle</div>
                        </div>
                    </div>
                    <div className="shine" aria-hidden />
                </section>

                {/* modules */}
                <section className="modules">
                    <div className="mod glass">
                        <div className="modHead">Featured Project</div>
                        <div className="modBody feature">
                            <NetImg sources={['https://picsum.photos/seed/waffle-drive/420/220', 'https://placehold.co/420x220?text=Project']} alt="Project" />
                            <div className="copy">
                                <h3>Waffle Drive</h3>
                                <p>A tiny retro file host with glossy UI and tasty gradients.</p>
                                <div className="miniBtns">
                                    <a className="btn mini aqua" href="/projects">View</a>
                                    <a className="btn mini blue" href="#">Demo</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mod glass">
                        <div className="modHead">Latest Post</div>
                        <div className="modBody post">
                            <h4>Pixel Sheen: Recreating Aqua in CSS</h4>
                            <p>How to fake that candy‑coated look from the early 2000s using gradients, masks, and a moving highlight.</p>
                            <a className="btn mini green" href="/blog">Read the blog</a>
                        </div>
                    </div>

                    <div className="mod glass cat">
                        <div className="modHead">Waffle the Grey Tabby</div>
                        <div className="modBody catBody">
                            <NetImg
                                sources={['https://placekitten.com/240/240', 'https://loremflickr.com/240/240/tabby,cat/all']}
                                alt="Grey tabby"
                                className="catImg"
                            />
                            <button className="btn mini silver" onClick={() => { const a = new Audio('https://cdn.pixabay.com/download/audio/2021/08/08/audio_53e3af9c3d.mp3?filename=cat-meow-6226.mp3'); a.volume = 0.35; a.play().catch(() => { }) }}>Meow</button>
                        </div>
                    </div>
                </section>
            </main>

            {/* dock */}
            <nav className="dock">
                <a className="dockItem" href="/projects"><span className="icon">🧪</span><span className="label">Projects</span></a>
                <a className="dockItem" href="/blog"><span className="icon">📝</span><span className="label">Blog</span></a>
                <a className="dockItem" href="/gallery"><span className="icon">🖼️</span><span className="label">Gallery</span></a>
                <a className="dockItem" href="/contact"><span className="icon">📡</span><span className="label">Contact</span></a>
            </nav>

            {/* footer */}
            <footer className="footer">© {new Date().getFullYear()} space waffles — thespacewaffles.com • <span className="mono">Last Updated:</span> {new Date().toLocaleDateString()}</footer>

            {/* styles */}
            <style jsx global>{`
        :root { --xpBlue:#0a64ad; --xpLight:#7db3e6; --aqua:#69e3ff; --aqua2:#00c8ff; --green:#2ee59d; --silver:#dfe6ef; --ink:#0a1b2a; }
        html, body { height:100%; }
        body {
          margin:0; color:#fff; font-family: 'Trebuchet MS','Tahoma',sans-serif; background:
            radial-gradient(1200px 600px at 50% -10%, #08305f, #020a18 60%, #01040b 100%),
            url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop') center/cover fixed no-repeat;
          background-blend-mode: screen, normal;
        }

        /* top bar */
        .xpBar { position:sticky; top:0; z-index:50; display:flex; align-items:center; justify-content:space-between; padding:8px 14px; background: linear-gradient(#0d6bb6, #084c8a); border-bottom: 1px solid #0006; box-shadow:0 2px 12px #0006; }
        .xpLogo { font-weight:900; letter-spacing:0.5px; text-shadow:0 1px 0 #000, 0 0 12px #7db3e6aa; }
        .xpRight { display:flex; align-items:center; gap:10px; }
        .statusDot { width:10px; height:10px; border-radius:50%; background:#3cff96; box-shadow:0 0 10px #3cff96; display:inline-block; }
        .statusText { font-size:12px; opacity:0.9; }
        .hitbox { display:inline-flex; align-items:center; gap:6px; font-size:12px; }
        .counter { background:#00182c; border:1px solid #79b3e6; padding:2px 6px; letter-spacing:2px; }

        /* ticker */
        .scroller { overflow:hidden; white-space:nowrap; }
        .scroller .track { display:inline-block; animation: scroll var(--speed) linear infinite; }
        .scroller.reverse .track { animation-direction: reverse; }
        .scroller .chunk { display:inline-block; padding-right:2rem; }
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ticker2003 { background: linear-gradient(180deg, #0c5aa3, #083c6c); border-top:1px solid #0008; border-bottom:1px solid #0008; padding:6px 10px; text-shadow:0 0 8px #7db3e6; }

        /* layout */
        .wrap { max-width: 1100px; margin: 24px auto 140px; padding: 0 16px; }
        .glass { position:relative; background: linear-gradient(180deg, #ffffff18, #ffffff05); border: 1px solid #ffffff40; border-radius: 14px; backdrop-filter: blur(6px); box-shadow: inset 0 1px 0 #ffffff66, 0 10px 30px #0007; }

        .heroCard { display:grid; grid-template-columns: 1.2fr 1fr; gap:18px; padding:18px; overflow:hidden; }
        .brand { font-weight:900; font-size:42px; letter-spacing:2px; background: linear-gradient(180deg, #fff, #a5d7ff); -webkit-background-clip: text; background-clip:text; color: transparent; text-shadow:0 2px 0 #0006; }
        .tag { margin-top:6px; opacity:0.9; }
        .ctaRow { display:flex; flex-wrap:wrap; gap:10px; margin-top:12px; }
        .btn { display:inline-block; text-decoration:none; color:#002; font-weight:900; padding:10px 14px; border-radius: 12px; box-shadow: inset 0 1px 0 #fff8, 0 8px 18px #0006; border:1px solid #ffffff70; position:relative; overflow:hidden; }
        .btn::after { content:''; position:absolute; inset:auto 0 0 0; height:45%; background: linear-gradient(180deg, #ffffffaa, #ffffff00); filter: blur(8px); transform: translateY(100%); transition: transform .4s; }
        .btn:hover::after { transform: translateY(0%); }
        .btn.aqua { background: linear-gradient(180deg, #80e9ff, #00c8ff); }
        .btn.blue { background: linear-gradient(180deg, #a9cfff, #4a8bff); }
        .btn.green { background: linear-gradient(180deg, #7cffc4, #2ee59d); }
        .btn.silver { background: linear-gradient(180deg, #eef6ff, #ccd7e8); }
        .btn.mini { padding:6px 10px; border-radius:10px; font-size:12px; }
        .btn.tiny { padding:4px 8px; font-size:12px; margin-left:8px; }

        .nowPlaying { margin-top:12px; display:flex; align-items:center; gap:8px; font-size:13px; }
        .npDot { width:8px; height:8px; background:#2ee59d; border-radius:50%; box-shadow:0 0 10px #2ee59d; display:inline-block; }

        .heroLeft { padding: 4px 6px; }
        .heroRight { display:flex; justify-content:flex-end; }
        .polaroid { position:relative; width:100%; max-width:520px; border-radius:12px; overflow:hidden; box-shadow: 0 15px 40px #0009; border:1px solid #ffffff40; }
        .polaroid img { width:100%; height:100%; object-fit:cover; display:block; filter: saturate(1.15) contrast(1.05); }
        .caption { position:absolute; right:10px; bottom:10px; background:#0009; padding:6px 10px; border-radius:10px; font-size:12px; border:1px solid #ffffff40; }
        .shine { position:absolute; inset:-20%; background: conic-gradient(from 180deg at 30% -10%, transparent, #ffffff22 20%, transparent 30%); transform: rotate(8deg); pointer-events:none; animation: sweep 6s linear infinite; }
        @keyframes sweep { to { transform: rotate(8deg) translateX(40%); } }

        .modules { margin-top:18px; display:grid; grid-template-columns: 1.2fr 1fr 0.8fr; gap:16px; }
        .modHead { padding:10px 12px; background: linear-gradient(180deg, #a5d7ff50, #ffffff10); border-bottom:1px solid #ffffff40; font-weight:900; letter-spacing:0.5px; text-shadow:0 1px 0 #000; border-radius:12px 12px 0 0; }
        .mod { overflow:hidden; }
        .mod .modBody { padding:12px; }
        .feature { display:grid; grid-template-columns: 1fr 1.1fr; gap:12px; align-items:center; }
        .feature img { width:100%; height:200px; object-fit:cover; border-radius:10px; border:1px solid #ffffff40; box-shadow:0 8px 20px #0006; }
        .feature .copy h3 { margin:0 0 6px; }
        .miniBtns { margin-top:10px; display:flex; gap:8px; }

        .post h4 { margin: 0 0 8px; }
        .post p { opacity:0.9; }

        .catBody { display:grid; place-items:center; gap:10px; }
        .catImg { width: 180px; height: 180px; object-fit: cover; border-radius: 16px; border:1px solid #ffffff55; box-shadow:0 10px 24px #0007; }

        /* dock */
        .dock { position:fixed; left:50%; transform:translateX(-50%); bottom:18px; background: linear-gradient(180deg, #ffffff22, #00000055); border:1px solid #ffffff55; border-radius: 16px; backdrop-filter: blur(8px); padding:8px 10px; display:flex; gap:14px; box-shadow: 0 10px 30px #0008; }
        .dockItem { position:relative; display:flex; flex-direction:column; align-items:center; color:#fff; text-decoration:none; }
        .dockItem .icon { display:grid; place-items:center; width:56px; height:56px; border-radius:14px; background: linear-gradient(180deg, #a5d7ff, #4a8bff); box-shadow: inset 0 1px 0 #fff8, 0 10px 20px #0007; transform-origin: bottom center; transition: transform 0.18s; }
        .dockItem:nth-child(2) .icon { background: linear-gradient(180deg, #80e9ff, #00c8ff); }
        .dockItem:nth-child(3) .icon { background: linear-gradient(180deg, #7cffc4, #2ee59d); }
        .dockItem:nth-child(4) .icon { background: linear-gradient(180deg, #eef6ff, #ccd7e8); color:#012; }
        .dockItem:hover .icon { transform: scale(1.18) translateY(-6px); }
        .dockItem .label { font-size:11px; margin-top:6px; text-shadow:0 1px 0 #000; }

        /* footer */
        .footer { text-align:center; padding:16px; opacity:0.9; text-shadow:0 0 8px #7db3e6; }

        /* utilities */
        .mono { font-family: 'Courier New', monospace; }
      `}</style>
        </div>
    )
}
