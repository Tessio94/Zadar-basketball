import { Head, Link } from '@inertiajs/react';

const styles = `
.about-likar {
    --orange:#ff6e00;
    color:#f5f3ed;
    padding:40px 5% 64px;
    font-family:var(--font-text,sans-serif);
}
.about-likar *,.about-likar *::before,.about-likar *::after {
    box-sizing:border-box;
}
.about-likar h1,.about-likar h2,.about-likar p {
    margin:0;
}
.about-likar a {
    text-decoration:none;
}
.about-likar a:focus-visible {
    outline:3px solid #ffad70;
    outline-offset:6px;
}
.about-shell {
    max-width:1440px;
    margin:auto;
    overflow:hidden;
    border:1px solid #ffffff16;
    border-radius:24px;
    background:#101317;
}
.about-hero {
    position:relative;
    isolation:isolate;
    overflow:hidden;
}
.about-hero::before {
    content:'';
    position:absolute;
    inset:0;
    z-index:-2;
    background:linear-gradient(90deg,#101317f5 0%,#101317de 50%,#1013178a 100%),url('/images/design/hardwood.jpg') center/cover;
}
.about-hero::after {
    content:'';
    position:absolute;
    inset:0;
    z-index:-1;
    background:radial-gradient(ellipse at 83% 40%,#ff6e0029,transparent 52%);
}
.about-topline {
    display:flex;
    justify-content:space-between;
    gap:16px;
    padding:24px 5%;
    border-bottom:1px solid #ffffff14;
    font-size:10px;
    font-weight:700;
    letter-spacing:.2em;
    text-transform:uppercase;
    color:#b9bcc2;
}
.about-topline span:first-child {
    color:var(--orange);
}
.about-hero-grid {
    display:grid;
    grid-template-columns:1.12fr 1fr;
    align-items:center;
    padding:72px 5% 76px;
}
.about-intro {
    position:relative;
    z-index:2;
}
.about-kicker {
    display:flex;
    align-items:center;
    gap:12px;
    font-size:11px;
    font-weight:700;
    line-height:1.6;
    letter-spacing:.18em;
    text-transform:uppercase;
    color:var(--orange);
}
.about-kicker::before {
    content:'';
    flex-shrink:0;
    width:28px;
    height:2px;
    background:currentColor;
}
.about-likar h1 {
    margin:24px 0 26px;
    font-family:var(--font-heading,sans-serif);
    font-size:clamp(48px,5.7vw,88px);
    font-weight:700;
    line-height:1.04;
    letter-spacing:-.025em;
    text-transform:uppercase;
}
.about-likar h1 span {
    display:block;
    color:var(--orange);
}
.about-lead {
    max-width:440px;
    font-size:16px;
    line-height:1.85;
    color:#c4c6ca;
}
.about-actions {
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    gap:24px;
    margin-top:32px;
}
.about-button {
    display:inline-flex;
    align-items:center;
    justify-content:space-between;
    gap:28px;
    min-height:48px;
    padding:13px 20px;
    border:1px solid var(--orange);
    border-radius:5px;
    background:var(--orange);
    color:#15120f;
    font-size:13px;
    font-weight:800;
    transition:background .2s,border-color .2s;
}
.about-button:hover {
    background:#ff913d;
    border-color:#ff913d;
}
.about-text-link {
    display:inline-flex;
    align-items:center;
    gap:12px;
    padding:12px 0;
    color:#f5f3ed;
    font-size:13px;
    font-weight:600;
}
.about-text-link:hover {
    color:var(--orange);
}
.about-art {
    position:relative;
    align-self:stretch;
    display:flex;
    align-items:flex-end;
    justify-content:center;
    min-height:450px;
}
.about-court {
    position:absolute;
    top:5%;
    right:-12%;
    width:110%;
    aspect-ratio:1;
    border:1px solid #ff6e003d;
    border-radius:50%;
}
.about-court::before {
    content:'';
    position:absolute;
    inset:18%;
    border:1px solid #ff6e004a;
    border-radius:50%;
}
.about-court::after {
    content:'';
    position:absolute;
    top:50%;
    left:-15%;
    width:130%;
    height:1px;
    background:#ff6e003d;
    transform:rotate(-25deg);
}
.about-players {
    position:relative;
    z-index:1;
    display:block;
    width:100%;
    max-width:480px;
    height:auto;
    filter:drop-shadow(0 25px 30px #0008);
}
.about-location {
    position:absolute;
    bottom:-25px;
    right:0;
    z-index:2;
    border-left:2px solid var(--orange);
    padding:8px 14px;
    background:#101317d9;
}
.about-location strong {
    display:block;
    font-family:var(--font-heading,sans-serif);
    font-size:22px;
    text-transform:uppercase;
}
.about-location span {
    display:block;
    margin-top:4px;
    font-size:10px;
    color:#afb4bd;
    letter-spacing:.14em;
    text-transform:uppercase;
}
.about-facts {
    display:grid;
    grid-template-columns:repeat(3,1fr);
    border-top:1px solid #ffffff16;
    border-bottom:1px solid #ffffff16;
    background:#ffffff03;
}
.about-fact {
    display:flex;
    align-items:center;
    gap:18px;
    padding:30px max(20px,3vw);
}
.about-fact+.about-fact {
    border-left:1px solid #ffffff16;
}
.about-fact strong {
    flex-shrink:0;
    font-family:var(--font-heading,sans-serif);
    font-size:48px;
    font-weight:600;
    line-height:1;
    color:var(--orange);
}
.about-fact span {
    max-width:160px;
    font-size:12px;
    line-height:1.7;
    color:#b9bcc2;
}
.about-story {
    display:grid;
    grid-template-columns:.9fr 1.1fr;
    gap:60px;
    padding:76px 5%;
}
.about-likar h2 {
    margin-top:20px;
    font-family:var(--font-heading,sans-serif);
    font-size:clamp(32px,3.4vw,48px);
    font-weight:600;
    line-height:1.16;
    text-transform:uppercase;
}
.about-likar h2 em {
    font-style:normal;
    color:var(--orange);
}
.about-story-copy p {
    font-size:15px;
    line-height:1.95;
    color:#b9bcc2;
}
.about-story-copy p+p {
    margin-top:20px;
}
.about-story-copy strong {
    color:#f5f3ed;
    font-weight:600;
}
.about-motto {
    display:flex;
    align-items:flex-start;
    gap:18px;
    margin-top:28px;
    padding-top:22px;
    border-top:1px solid #ffffff14;
}
.about-motto>span {
    font-family:Georgia,serif;
    font-size:58px;
    line-height:1;
    color:var(--orange);
}
.about-motto p {
    font-family:var(--font-heading,sans-serif);
    font-size:22px;
    line-height:1.4;
    color:#f5f3ed;
}
.about-bottom {
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:32px;
    margin:0 5% 5%;
    padding:34px 36px;
    border:1px solid #ff6e0038;
    border-radius:12px;
    background:linear-gradient(110deg,#ff6e001c,#ff6e0004);
}
.about-bottom h2 {
    margin:0;
    font-size:clamp(26px,3vw,36px);
}
.about-bottom p {
    margin-top:10px;
    max-width:600px;
    font-size:14px;
    line-height:1.8;
    color:#b9bcc2;
}
.about-bottom .about-button {
    flex-shrink:0;
}
@media(max-width:1023px) {
    .about-hero-grid {
        grid-template-columns:1.1fr .9fr;
        padding-top:50px;
        padding-bottom:60px;
    }
    .about-art {
        min-height:350px;
    }
    .about-fact {
        gap:12px;
        padding:24px 20px;
    }
    .about-fact strong {
        font-size:38px;
    }
    .about-story {
        gap:36px;
        padding-top:56px;
        padding-bottom:56px;
    }
}
@media(max-width:767px) {
    .about-likar {
        padding-top:24px;
        padding-bottom:40px;
    }
    .about-shell {
        border-radius:16px;
    }
    .about-topline {
        padding:20px 6%;
        font-size:9px;
        letter-spacing:.12em;
    }
    .about-topline span:last-child {
        display:none;
    }
    .about-hero-grid {
        grid-template-columns:1fr;
        padding:38px 6% 48px;
        gap:28px;
    }
    .about-likar h1 {
        font-size:clamp(44px,10vw,72px);
    }
    .about-lead {
        font-size:15px;
    }
    .about-art {
        min-height:0;
        width:100%;
        max-width:390px;
        justify-self:center;
    }
    .about-players {
        width:85%;
    }
    .about-court {
        width:90%;
        right:0;
    }
    .about-location {
        right:0;
        bottom:-20px;
    }
    .about-facts {
        grid-template-columns:1fr;
    }
    .about-fact {
        padding:20px 6%;
        gap:22px;
    }
    .about-fact+.about-fact {
        border-left:0;
        border-top:1px solid #ffffff12;
    }
    .about-fact strong {
        min-width:52px;
    }
    .about-fact span {
        max-width:none;
        font-size:13px;
    }
    .about-story {
        grid-template-columns:1fr;
        padding:44px 6%;
        gap:28px;
    }
    .about-bottom {
        flex-direction:column;
        align-items:flex-start;
        margin:0 6% 6%;
        padding:26px 22px;
        gap:22px;
    }
}
@media(prefers-reduced-motion:reduce) {
    .about-likar a {
        transition:none;
    }
}
`;

export default function About() {
    return (
        <>
            <Head>
                <title>O nama | Likar Krombacher</title>
                <meta
                    name="description"
                    content="Upoznaj LIKAR Krombacher Zadar — ligu košarkaških amatera i rekreativaca. Od prvih utakmica u Jazinama do susreta na Višnjiku."
                />
            </Head>

            <style>{styles}</style>

            <div className="about-likar">
                <div className="about-shell">
                    <section
                        className="about-hero"
                        aria-labelledby="about-title"
                    >
                        <div className="about-topline">
                            <span>LIKAR Krombacher Zadar</span>
                            <span>Liga košarkaških amatera i rekreativaca</span>
                        </div>

                        <div className="about-hero-grid">
                            <div className="about-intro">
                                <p className="about-kicker">
                                    Naš grad. Naša igra.
                                </p>
                                <h1 id="about-title">
                                    Košarka nas
                                    <span>okuplja.</span>
                                </h1>
                                <p className="about-lead">
                                    Od prvih utakmica u Jazinama do susreta na
                                    Višnjiku. LIKAR je mjesto za zadarske
                                    amatere, rekreativce i sve koji žive za igru
                                    pod obručima.
                                </p>
                                <div className="about-actions">
                                    <Link
                                        href="/utakmice"
                                        className="about-button"
                                    >
                                        Prati utakmice
                                        <span aria-hidden="true">↗</span>
                                    </Link>
                                    <Link
                                        href="/ekipe"
                                        className="about-text-link"
                                    >
                                        Upoznaj ekipe
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        className="about-facts"
                        aria-label="Naša priča u brojkama"
                    >
                        <div className="about-fact">
                            <strong>09</strong>
                            <span>momčadi s kojima je započela naša priča</span>
                        </div>
                        <div className="about-fact">
                            <strong>06</strong>
                            <span>sezona koje su oblikovale ligu</span>
                        </div>
                        <div className="about-fact">
                            <strong>01</strong>
                            <span>zajednička strast — košarka</span>
                        </div>
                    </section>

                    <section
                        className="about-story"
                        aria-labelledby="about-story-title"
                    >
                        <div>
                            <p className="about-kicker">Naša priča</p>
                            <h2 id="about-story-title">
                                Od entuzijazma
                                <br />
                                do <em>gradske lige.</em>
                            </h2>
                            <div className="about-motto">
                                <span aria-hidden="true">“</span>
                                <p>
                                    Igra je razlog zbog kojeg se vraćamo na
                                    teren.
                                </p>
                            </div>
                        </div>
                        <div className="about-story-copy">
                            <p>
                                Pokrenuta entuzijazmom zaljubljenika u košarku,
                                <strong>
                                    {' '}
                                    LIKAR — Liga košarkaških amatera i
                                    rekreativaca
                                </strong>{' '}
                                izrasla je iz devet početnih momčadi u
                                prepoznatljivo gradsko natjecanje i dio zadarske
                                sportske scene.
                            </p>
                            <p>
                                Šest sezona donijelo je brojne utakmice,
                                različite momčadi i igrače. Od prvih utakmica u
                                Jazinama do današnjih susreta na Višnjiku, u
                                središtu je ostalo ono najvažnije:{' '}
                                <strong>
                                    igranje košarke i međusobno natjecanje.
                                </strong>
                            </p>
                            <p>
                                Svaka nova sezona otvara prostor za nove
                                susrete, nove momčadi i nove prilike da se
                                pokaže što se može na terenu.
                            </p>
                        </div>
                    </section>

                    <section
                        className="about-bottom"
                        aria-labelledby="about-join-title"
                    >
                        <div>
                            <h2 id="about-join-title">
                                Tvoja ekipa. Tvoja liga.
                            </h2>
                            <p>
                                Voliš košarku i organizirano natjecanje? Upoznaj
                                LIKAR, prati momčadi i budi dio zadarske
                                košarkaške priče.
                            </p>
                        </div>
                        <Link href="/ekipe" className="about-button">
                            Istraži ekipe
                            <span aria-hidden="true">↗</span>
                        </Link>
                    </section>
                </div>
            </div>
        </>
    );
}
