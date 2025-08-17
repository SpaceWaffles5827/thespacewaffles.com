import Link from "next/link";
import { redirect } from "next/navigation";

// Retro Space Waffles Blog — early‑2000s car‑meet energy, but for posts
// No <marquee> tag; CSS scrollers instead for TS friendliness.

type Post = {
    title: string;
    date: string; // human readable
    tags: string[];
    excerpt: string;
    slug: string;
    hero?: string;
};

const POSTS: Post[] = [
    {
        title: "Building the Intergalactic Griddle (v1)",
        date: "Aug 14, 2025",
        tags: ["devlog", "design", "retro"],
        excerpt:
            "How I mashed Geocities chaos with modern Next.js — blink text, CRT filters, and why table layout still slaps.",
        slug: "intergalactic-griddle-v1",
        hero:
            "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
    },
    {
        title: "Waffle Sweeper: from concept to crunchy",
        date: "Aug 10, 2025",
        tags: ["game", "web"],
        excerpt:
            "A minesweeper riff where tiles flip like waffles. Input latency notes, crunchy sound design, and pixel art syrup.",
        slug: "waffle-sweeper-dev",
        hero:
            "https://images.unsplash.com/photo-1520975922216-c924dd49d4ae?q=80&w=1200&auto=format&fit=crop",
    },
    {
        title: "CSS Tickering without <marquee>",
        date: "Aug 6, 2025",
        tags: ["css", "tricks"],
        excerpt:
            "You can keep the late‑90s vibe and still satisfy TypeScript with pure‑CSS horizontal and vertical scrollers.",
        slug: "css-ticker-without-marquee",
        hero:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
    },
    {
        title: "Grey Tabby Mascot: motion study",
        date: "Aug 1, 2025",
        tags: ["animation", "mascot"],
        excerpt:
            "From idle mrrrps to hover squints — how subtle loops make mascots feel alive.",
        slug: "grey-tabby-motion",
        hero:
            "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1200&auto=format&fit=crop",
    },
];

// ✅ Server action (demo): fake blogroll submit
async function addBlogroll(formData: FormData) {
    "use server";
    const label = (formData.get("label") || "Cool Link").toString().slice(0, 60);
    const url = (formData.get("url") || "http://example.com").toString().slice(0, 200);
    console.log("[blog][BLOGROLL] add:", label, url);
    redirect("/blog?roll=1");
}

export default async function BlogPage() {
    const hitCounter = 4200 + Math.floor(Math.random() * 900); // totally legit counter
    const updated = new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "America/Chicago",
    });

    return (
        <div id="retroblog">
            {/* inline CSS for that authentic 2000s portal‑meets‑garage look */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
          html, body { background: #020510; color: #bdfcff; font-family: "Trebuchet MS", Tahoma, Verdana, sans-serif; }
          #retroblog { min-height: 100vh; padding: 12px; }
          .container { margin: 0 auto; max-width: 1080px; }

          /* header */
          .top { display:flex; align-items:center; justify-content:space-between; padding:10px 14px; background: linear-gradient(180deg, #061b2b, #07101c); border:3px ridge #0ff; box-shadow:0 8px 30px #0009; }
          .brand { font-size: 26px; font-weight:900; letter-spacing:1px; text-transform:uppercase; }
          .brand span { color:#00fff0; text-shadow:0 0 10px #00fff0; }
          .counter { font-family: "OCR A", monospace; background:#010; border:3px inset #0f0; padding:4px 8px; display:inline-block; color:#0f0; }

          /* scroller (marquee replacement) */
          .ticker { overflow:hidden; white-space:nowrap; border:3px groove #f0f; background:#270033; color:#ffb3ff; padding:6px 8px; }
          .ticker .track { display:inline-block; padding-right:2rem; animation: scroll 26s linear infinite; }
          @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

          /* layout */
          .navtable { width: 100%; border: 4px ridge #0ff; background: radial-gradient(500px 200px at 10% 0%, #071b2b, #020510); }
          .sidebar { width: 260px; background: #050e17; vertical-align: top; }
          .content { background: #030919; }
          .cell { padding: 10px; border: 2px inset #099; }

          /* buttons */
          .btn {
            background: linear-gradient(#ff0,#fa0); color:#000; border: 3px outset #cc0; padding: 6px 12px;
            text-decoration:none; font-weight:bold; display:inline-block; text-transform: uppercase;
          }
          .btn.alt { background: linear-gradient(#80e9ff,#00c8ff); border-color:#bdfcff; }
          .btn:hover { filter: hue-rotate(40deg) saturate(1.6); text-decoration: none; }

          .hr { height: 6px; background: repeating-linear-gradient(90deg,#f00 0 12px,#ff0 12px 24px,#0f0 24px 36px,#0ff 36px 48px,#00f 48px 60px,#f0f 60px 72px); }
          .bigtitle { font-size: 34px; color:#ff0; text-shadow: 2px 2px #f00; letter-spacing: 1px; }
          .small { font-size: 12px; color:#9ff; }
          .badge { border: 2px ridge #fff; padding: 4px 6px; background:#111; display:inline-block; margin: 2px 4px; }

          /* posts */
          .posts { width:100%; border:4px ridge #0ff; background:#000; color:#0ff; }
          .posts th { background:#001b2b; color:#fff; padding:8px; border-bottom:3px groove #0ff; text-align:left; }
          .posts td { padding:10px; border-bottom:1px dotted #099; vertical-align: top; }
          .posts .alt { background:#000022; }
          .thumb { width:120px; height:80px; object-fit:cover; border:3px outset #0ff; }
          .postTitle { color:#ff0; text-shadow:1px 1px #f00; text-decoration:underline; }
          .tag { display:inline-block; font-size:11px; padding:2px 6px; margin:0 6px 0 0; background:#001; border:1px solid #0ff7; color:#7cffc4; }

          /* sidebar lists */
          .linklist a { color:#bdfcff; text-decoration: underline; display:block; margin:6px 0; }
          .linklist a:hover { color:#ff0; background:#033; }
          .boxHead { color:#ff0; text-shadow:1px 1px #f00; margin-bottom:6px; }
          .box { border:3px ridge #0ff; background:#00121d; padding:8px; margin:10px 0; }

          /* blogroll form */
          .form input { width:100%; background:#013; color:#0ff; border:3px inset #0ff; padding:6px; font-family:inherit; margin:4px 0; }

          .footer { text-align:center; margin-top:10px; }
        `,
                }}
            />

            <div className="container">
                <header className="top">
                    <div className="brand">SPACE <span>WAFFLES</span> — BLOG</div>
                    <div>
                        <span className="small">Visitor Counter:</span> <span className="counter">{hitCounter}</span>
                    </div>
                </header>

                <div className="ticker">
                    <div className="track">
                        🚀 NEW POST EVERY WEEK • 🧇 RETRO WEB + MODERN STACK • 🐈 GREY TABBY SAYS HI •
                        🚀 NEW POST EVERY WEEK • 🧇 RETRO WEB + MODERN STACK • 🐈 GREY TABBY SAYS HI •
                    </div>
                </div>

                <div className="hr" />

                <table className="navtable" cellPadding={0} cellSpacing={0}>
                    <tbody>
                        <tr>
                            {/* Sidebar */}
                            <td className="sidebar cell" valign="top">
                                <center>
                                    <img
                                        src="https://www.animatedimages.org/data/media/202/animated-rocket-image-0028.gif"
                                        alt="Rocket"
                                        width={120}
                                        height={90}
                                        style={{ border: "3px outset #0ff" }}
                                    />
                                    <div style={{ margin: "8px 0" }}>
                                        <span className="badge">DEVLOG</span>
                                        <span className="badge">CSS</span>
                                        <span className="badge">GAMES</span>
                                    </div>
                                </center>

                                <div className="box">
                                    <div className="boxHead">~ NAV ~</div>
                                    <div className="linklist">
                                        <Link href="/">🏠 Home</Link>
                                        <Link href="/projects">🧪 Projects</Link>
                                        <Link href="/gallery">🖼 Gallery</Link>
                                        <Link href="/contact">📡 Contact</Link>
                                    </div>
                                </div>

                                <div className="box">
                                    <div className="boxHead">~ BLOGROLL ~</div>
                                    <ul style={{ margin: 0, paddingLeft: 18 }}>
                                        <li><a href="https://www.cameronsworld.net/" target="_blank" rel="noreferrer">Cameron's World</a></li>
                                        <li><a href="https://www.spacejam.com/1996/jam.htm" target="_blank" rel="noreferrer">Space Jam (1996)</a></li>
                                        <li><a href="https://motherfuckingwebsite.com/" target="_blank" rel="noreferrer">MF Website</a></li>
                                    </ul>
                                    <div className="small" style={{ marginTop: 6 }}>Got a link? Submit below:</div>
                                    <form action={addBlogroll} className="form">
                                        <input name="label" placeholder="Site Name" />
                                        <input name="url" placeholder="https://example.com" />
                                        <p><button type="submit" className="btn alt">ADD TO ROLL</button></p>
                                    </form>
                                </div>

                                <div className="box">
                                    <div className="boxHead">~ LAST UPDATED ~</div>
                                    <div className="small">{updated}</div>
                                </div>
                            </td>

                            {/* Content */}
                            <td className="content cell" valign="top">
                                <h1 className="bigtitle">INTERGALACTIC LOGBOOK</h1>

                                <table className="posts" cellPadding={0} cellSpacing={0}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: 140 }}>Post</th>
                                            <th>Title / Excerpt</th>
                                            <th style={{ width: 160 }}>Date</th>
                                            <th style={{ width: 180 }}>Tags</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {POSTS.map((p, i) => (
                                            <tr key={p.slug} className={i % 2 ? "alt" : ""}>
                                                <td>
                                                    {p.hero ? (
                                                        <img className="thumb" src={p.hero} alt={p.title} />
                                                    ) : (
                                                        <img
                                                            className="thumb"
                                                            src="https://picsum.photos/seed/spacewaffle/120/80"
                                                            alt="thumb"
                                                        />
                                                    )}
                                                </td>
                                                <td>
                                                    <Link href={`/blog/${p.slug}`} className="postTitle">{p.title}</Link>
                                                    <div className="small" style={{ marginTop: 6 }}>{p.excerpt}</div>
                                                    <div style={{ marginTop: 8 }}>
                                                        <Link href={`/blog/${p.slug}`} className="btn">READ</Link>
                                                    </div>
                                                </td>
                                                <td>{p.date}</td>
                                                <td>
                                                    {p.tags.map((t) => (
                                                        <span key={t} className="tag">{t}</span>
                                                    ))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="hr" />

                                <h2 style={{ color: "#ff0", textShadow: "1px 1px #f00" }}>ARCHIVE</h2>
                                <table className="posts" cellPadding={8}>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <b>2025</b>
                                                <ul style={{ margin: 0, paddingLeft: 18 }}>
                                                    <li><Link href="/blog?m=08">August</Link></li>
                                                    <li><Link href="/blog?m=07">July</Link></li>
                                                    <li><Link href="/blog?m=06">June</Link></li>
                                                </ul>
                                            </td>
                                            <td>
                                                <b>2024</b>
                                                <ul style={{ margin: 0, paddingLeft: 18 }}>
                                                    <li><Link href="/blog?y=2024">All Posts</Link></li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <p className="small" style={{ marginTop: 10 }}>
                                    © {new Date().getFullYear()} Space Waffles • RSS coming soon • Powered by vibes & waffles
                                </p>

                                <center style={{ marginTop: 10 }}>
                                    <Link href="/" className="btn">Back to Home</Link>
                                </center>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="footer small">
                    <div className="ticker">
                        <div className="track">🚧 BLOG THEME STILL UNDER CONSTRUCTION • CHECK BACK L8R • 🚧 BLOG THEME STILL UNDER CONSTRUCTION • CHECK BACK L8R •</div>
                    </div>
                    <div style={{ marginTop: 6 }}>
                        <img
                            src="https://www.animatedimages.org/data/media/56/animated-dividers-image-0002.gif"
                            alt="Divider"
                            height={20}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}