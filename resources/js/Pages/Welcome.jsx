import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="GameZone — Rental PS" />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
                html, body { margin: 0; padding: 0; overflow-x: hidden; box-sizing: border-box; }
                *, *::before, *::after { box-sizing: border-box; }

                .font-orbitron { font-family: 'Orbitron', monospace; }
                .font-rajdhani { font-family: 'Rajdhani', sans-serif; }

                .grid-bg {
                    background-image:
                        linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px);
                    background-size: 50px 50px;
                }
                .scanlines::after {
                    content: '';
                    position: fixed;
                    inset: 0;
                    background: repeating-linear-gradient(
                        0deg, transparent, transparent 2px,
                        rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px
                    );
                    pointer-events: none;
                    z-index: 1;
                }

                .text-neon-blue  { color: #00d4ff; text-shadow: 0 0 10px #00d4ff, 0 0 30px #00d4ff60; }
                .text-neon-green { color: #00ff88; text-shadow: 0 0 10px #00ff88, 0 0 30px #00ff8860; }
                .text-neon-pink  { color: #ff2d78; text-shadow: 0 0 10px #ff2d78, 0 0 30px #ff2d7860; }

                @keyframes blob {
                    0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                    50%      { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                }
                @keyframes float {
                    0%,100% { transform: translateY(0px); }
                    50%     { transform: translateY(-14px); }
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(28px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes ticker {
                    from { transform: translateX(100vw); }
                    to   { transform: translateX(-100%); }
                }
                @keyframes glowPulse {
                    0%,100% { box-shadow: 0 0 20px rgba(0,212,255,0.3), 0 0 60px rgba(0,212,255,0.1); }
                    50%     { box-shadow: 0 0 40px rgba(0,212,255,0.7), 0 0 80px rgba(0,212,255,0.25); }
                }
                @keyframes borderRun {
                    0%   { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }

                .animate-float    { animation: float 3.5s ease-in-out infinite; }
                .animate-fadeup   { animation: fadeUp 0.7s ease forwards; }
                .animate-fadeup-1 { animation: fadeUp 0.7s ease 0.1s forwards; opacity: 0; }
                .animate-fadeup-2 { animation: fadeUp 0.7s ease 0.2s forwards; opacity: 0; }
                .animate-fadeup-3 { animation: fadeUp 0.7s ease 0.3s forwards; opacity: 0; }
                .animate-fadeup-4 { animation: fadeUp 0.7s ease 0.4s forwards; opacity: 0; }
                .animate-fadeup-5 { animation: fadeUp 0.7s ease 0.5s forwards; opacity: 0; }
                .ticker-text      { animation: ticker 22s linear infinite; white-space: nowrap; display: inline-block; }

                .glass {
                    background: rgba(255,255,255,0.04);
                    backdrop-filter: blur(14px);
                    -webkit-backdrop-filter: blur(14px);
                    border: 1px solid rgba(255,255,255,0.08);
                }
                .glass-hover {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(0,212,255,0.15);
                    transition: all 0.3s ease;
                }
                .glass-hover:hover {
                    background: rgba(0,212,255,0.07);
                    border-color: rgba(0,212,255,0.5);
                    transform: translateY(-4px);
                    box-shadow: 0 8px 32px rgba(0,212,255,0.15);
                }

                .btn-neon {
                    background: transparent;
                    border: 1px solid #00d4ff;
                    color: #00d4ff;
                    font-family: 'Orbitron', monospace;
                    font-size: 11px;
                    letter-spacing: 1.5px;
                    padding: 10px 24px;
                    border-radius: 6px;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    position: relative;
                    overflow: hidden;
                    display: inline-block;
                    text-decoration: none;
                }
                .btn-neon::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: #00d4ff;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.25s ease;
                    z-index: 0;
                }
                .btn-neon:hover::before { transform: scaleX(1); }
                .btn-neon:hover { color: #020617; box-shadow: 0 0 24px #00d4ff60; }
                .btn-neon span { position: relative; z-index: 1; }

                .btn-solid {
                    background: linear-gradient(135deg, #00d4ff, #00ff88);
                    color: #020617;
                    font-family: 'Orbitron', monospace;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 1.5px;
                    padding: 12px 32px;
                    border-radius: 6px;
                    border: none;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    display: inline-block;
                    text-decoration: none;
                }
                .btn-solid:hover {
                    opacity: 0.85;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 32px rgba(0,212,255,0.35);
                }

                .console-badge {
                    background: rgba(0,212,255,0.08);
                    border: 1px solid rgba(0,212,255,0.2);
                    border-radius: 8px;
                    padding: 16px;
                    transition: all 0.25s ease;
                }
                .console-badge:hover {
                    background: rgba(0,212,255,0.12);
                    border-color: rgba(0,212,255,0.5);
                    box-shadow: 0 0 20px rgba(0,212,255,0.15);
                }

                .price-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                .price-card.featured {
                    border-color: rgba(0,212,255,0.4);
                    box-shadow: 0 0 30px rgba(0,212,255,0.12);
                }
                .price-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 16px 48px rgba(0,0,0,0.4);
                }

                .nav-link {
                    color: rgba(255,255,255,0.5);
                    font-family: 'Rajdhani', sans-serif;
                    font-size: 14px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: color 0.2s;
                    letter-spacing: 0.5px;
                }
                .nav-link:hover { color: #00d4ff; }

                .section-label {
                    font-family: 'Orbitron', monospace;
                    font-size: 10px;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: #00d4ff;
                    opacity: 0.8;
                }
                .section-title {
                    font-family: 'Orbitron', monospace;
                    font-weight: 700;
                    color: white;
                    line-height: 1.2;
                }

                /* Divider line */
                .cyber-divider {
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent);
                }

                /* Glow orb */
                .glow-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    pointer-events: none;
                }
            `}</style>

            <div className="grid-bg scanlines min-h-screen w-full font-rajdhani"
                 style={{ background: 'linear-gradient(135deg, #020617 0%, #0f172a 60%, #020617 100%)' }}>

                {/* Glow orbs */}
                <div className="glow-orb" style={{ width: 400, height: 400, top: -100, left: -100, background: 'rgba(0,212,255,0.12)', animation: 'blob 8s ease-in-out infinite' }} />
                <div className="glow-orb" style={{ width: 300, height: 300, bottom: '20%', right: -80, background: 'rgba(0,255,136,0.1)', animation: 'blob 8s ease-in-out infinite 4s' }} />
                <div className="glow-orb" style={{ width: 250, height: 250, top: '40%', left: '50%', background: 'rgba(179,71,255,0.08)', animation: 'blob 10s ease-in-out infinite 2s' }} />

                {/* ══ TICKER ══ */}
                <div style={{ background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(0,212,255,0.15)', padding: '6px 0', overflow: 'hidden', position: 'relative', zIndex: 50 }}>
                    <div className="flex items-center">
                        <span className="font-orbitron text-neon-blue px-4 flex-shrink-0" style={{ fontSize: 10, borderRight: '1px solid rgba(0,212,255,0.3)', marginRight: 16 }}>LIVE</span>
                        <span className="ticker-text font-orbitron text-white/30" style={{ fontSize: 10, letterSpacing: 2 }}>
                            {/* 🎮 PS5 Unit 1 — OCCUPIED &nbsp;|&nbsp; PS5 Unit 2 — AVAILABLE &nbsp;|&nbsp; PS4 Unit 3 — OCCUPIED &nbsp;|&nbsp; PS4 Unit 4 — RESERVED &nbsp;|&nbsp; 🔥 PROMO: Main 3 jam gratis 30 menit! &nbsp;|&nbsp; ✨ NEW: FIFA 25, GTA VI, Spider-Man 2 tersedia! &nbsp;|&nbsp; 📅 Booking online sekarang tersedia 24 jam */}
                            AYO BOKING SEKARANG JANGAN KELAMAAN!!!
                        </span>
                    </div>
                </div>

                {/* ══ NAVBAR ══ */}
                <header className="glass sticky top-0 z-40 w-full" style={{ borderBottom: '1px solid rgba(0,212,255,0.1)' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                        {/* Logo */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div className="font-orbitron animate-float"
                                 style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#00d4ff,#00ff88)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'glowPulse 2s ease-in-out infinite' }}>
                                <svg style={{ width: 20, height: 20, color: '#020617' }} viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21 6H3a1 1 0 00-1 1v10a1 1 0 001 1h18a1 1 0 001-1V7a1 1 0 00-1-1zm-10 7H9v2H7v-2H5v-2h2V9h2v2h2v2zm4.5 1a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
                                </svg>
                            </div>
                            <div>
                                <p className="font-orbitron text-white font-bold" style={{ fontSize: 14, lineHeight: 1 }}>
                                    GAME<span className="text-neon-blue">ZONE</span>
                                </p>
                                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, letterSpacing: 2 }}>RENTAL PS</p>
                            </div>
                        </div>

                        {/* Nav Links */}
                        {/* <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
                            <a href="#fitur" className="nav-link">Fitur</a>
                            <a href="#harga" className="nav-link">Harga</a>
                            <a href="#kontak" className="nav-link">Kontak</a>
                        </nav> */}

                        {/* Auth Buttons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            {auth?.user ? (
                                <Link href={route('dashboard')} className="btn-solid">
                                    <span>DASHBOARD</span>
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} className="btn-neon">
                                        <span>LOGIN</span>
                                    </Link>
                                    <Link href={route('register')} className="btn-solid">
                                        DAFTAR
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                {/* ══ HERO ══ */}
                <section style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 60px', position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap' }}>

                        {/* Left */}
                        <div style={{ flex: 1, minWidth: 300 }}>

                            {/* Badge */}
                            <div className="animate-fadeup" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 100, padding: '6px 14px', marginBottom: 24 }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ff88', display: 'inline-block', animation: 'glowPulse 1.5s ease-in-out infinite' }}></span>
                                <span className="font-orbitron text-neon-green" style={{ fontSize: 9, letterSpacing: 2 }}>SISTEM RENTAL ONLINE AKTIF</span>
                            </div>

                            <h1 className="animate-fadeup-1 section-title" style={{ fontSize: 'clamp(32px, 5vw, 58px)', marginBottom: 20 }}>
                                MAIN PS<br/>
                                <span className="text-neon-blue">TANPA RIBET</span><br/>
                                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.6em' }}>BOOKING ONLINE 24 JAM</span>
                            </h1>

                            <p className="animate-fadeup-2 font-rajdhani" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, lineHeight: 1.7, maxWidth: 460, marginBottom: 32 }}>
                                Nikmati pengalaman gaming terbaik dengan PlayStation 4 & 5. Booking kapan saja, di mana saja. Langsung main tanpa antre panjang!
                            </p>

                            {/* Stats */}
                            <div className="animate-fadeup-3" style={{ display: 'flex', gap: 28, marginBottom: 36, flexWrap: 'wrap' }}>
                                {[
                                    { val: '10+', label: 'Unit Konsol' },
                                    { val: '24/7', label: 'Online Booking' },
                                    { val: '500+', label: 'Gamer Puas' },
                                ].map((s, i) => (
                                    <div key={i} style={{ textAlign: 'center' }}>
                                        <p className="font-orbitron text-neon-blue" style={{ fontSize: 22, fontWeight: 700 }}>{s.val}</p>
                                        <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, letterSpacing: 1 }}>{s.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="animate-fadeup-4" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                <Link href={route('login')} className="btn-solid" style={{ fontSize: 12, padding: '14px 36px' }}>
                                    🎮 BOOKING SEKARANG
                                </Link>
                                <a href="#harga" className="btn-neon" style={{ padding: '14px 28px' }}>
                                    <span>LIHAT HARGA</span>
                                </a>
                            </div>
                        </div>

                        {/* Right — Console Visual */}
                        <div className="animate-float animate-fadeup-5" style={{ flex: '0 0 auto', position: 'relative' }}>
                            <div style={{
                                width: 280, height: 280,
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(0,212,255,0.15), rgba(0,255,136,0.05), transparent)',
                                border: '1px solid rgba(0,212,255,0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                position: 'relative',
                                animation: 'glowPulse 3s ease-in-out infinite',
                            }}>
                                {/* Outer ring */}
                                <div style={{
                                    position: 'absolute', inset: -20,
                                    borderRadius: '50%',
                                    border: '1px dashed rgba(0,212,255,0.15)',
                                    animation: 'float 6s ease-in-out infinite reverse',
                                }} />

                                {/* Controller Icon Large */}
                                <svg style={{ width: 120, height: 120, color: '#00d4ff', filter: 'drop-shadow(0 0 20px #00d4ff)' }} viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21 6H3a1 1 0 00-1 1v10a1 1 0 001 1h18a1 1 0 001-1V7a1 1 0 00-1-1zm-10 7H9v2H7v-2H5v-2h2V9h2v2h2v2zm4.5 1a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
                                </svg>

                                {/* Floating badges */}
                                <div className="glass" style={{ position: 'absolute', top: 20, right: -40, borderRadius: 10, padding: '8px 12px', whiteSpace: 'nowrap' }}>
                                    <p className="font-orbitron text-neon-green" style={{ fontSize: 10 }}>PS5 AVAILABLE</p>
                                </div>
                                <div className="glass" style={{ position: 'absolute', bottom: 30, left: -50, borderRadius: 10, padding: '8px 12px', whiteSpace: 'nowrap' }}>
                                    <p className="font-orbitron text-neon-blue" style={{ fontSize: 10 }}>ONLINE 24/7</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="cyber-divider" style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }} />

                {/* ══ FITUR ══ */}
                <section id="fitur" style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px', position: 'relative', zIndex: 10 }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <p className="section-label animate-fadeup">KENAPA GAMEZONE?</p>
                        <h2 className="section-title animate-fadeup-1" style={{ fontSize: 'clamp(24px,3.5vw,38px)', marginTop: 10 }}>
                            FITUR <span className="text-neon-blue">UNGGULAN</span>
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                        {[
                            {
                                icon: '📅',
                                title: 'Booking Online',
                                desc: 'Pesan sesi bermain kapan saja dan di mana saja tanpa perlu datang langsung ke tempat.',
                                color: '#00d4ff',
                            },
                            {
                                icon: '🎮',
                                title: 'PS4 & PS5',
                                desc: 'Pilihan konsol lengkap, hingga PS5 Disc Edition dengan game terbaru.',
                                color: '#00ff88',
                            },
                            {
                                icon: '⚡',
                                title: 'Real-time Status',
                                desc: 'Cek ketersediaan unit secara langsung. Tidak perlu telepon dulu, semua langsung kelihatan.',
                                color: '#b347ff',
                            },
                            {
                                icon: '💰',
                                title: 'Harga Terjangkau',
                                desc: 'Tarif bersaing mulai dari Rp10.000/jam. Ada juga paket hemat untuk main lebih lama.',
                                color: '#ff2d78',
                            },
                        ].map((f, i) => (
                            <div key={i} className="glass-hover" style={{ borderRadius: 16, padding: 24 }}>
                                <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
                                <h3 className="font-orbitron" style={{ color: f.color, fontSize: 13, fontWeight: 700, marginBottom: 10, letterSpacing: 0.5 }}>
                                    {f.title}
                                </h3>
                                <p className="font-rajdhani" style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.65 }}>
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="cyber-divider" style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }} />

                {/* ══ HARGA ══ */}
                <section id="harga" style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px', position: 'relative', zIndex: 10 }}>
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <p className="section-label">PILIH PAKETMU</p>
                        <h2 className="section-title" style={{ fontSize: 'clamp(24px,3.5vw,38px)', marginTop: 10 }}>
                            DAFTAR <span className="text-neon-blue">HARGA</span>
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, maxWidth: 900, margin: '0 auto' }}>

                        {/* PS4 */}
                        <div className="price-card" style={{ padding: 28 }}>
                            <div style={{ marginBottom: 20 }}>
                                <p className="font-orbitron" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: 2 }}>STANDAR</p>
                                <h3 className="font-orbitron" style={{ color: 'white', fontSize: 20, fontWeight: 700, marginTop: 4 }}>PS4</h3>
                            </div>
                            <div style={{ marginBottom: 24 }}>
                                <p className="font-orbitron text-neon-blue" style={{ fontSize: 32, fontWeight: 900, lineHeight: 1 }}>10K</p>
                                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 4 }}>per jam</p>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {['PS4 Pro', 'Game koleksi lengkap', 'TV LED 32"'].map((item, i) => (
                                    <li key={i} className="font-rajdhani" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ color: '#00d4ff', fontSize: 10 }}>▶</span> {item}
                                    </li>
                                ))}
                            </ul>
                            <Link href={route('login')} className="btn-neon" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                                <span>PILIH PS4</span>
                            </Link>
                        </div>

                        <div className="price-card" style={{ padding: 28 }}>
                            <div style={{ marginBottom: 20 }}>
                                <p className="font-orbitron" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: 2 }}>STANDAR</p>
                                <h3 className="font-orbitron" style={{ color: 'white', fontSize: 20, fontWeight: 700, marginTop: 4 }}>PS5</h3>
                            </div>
                            <div style={{ marginBottom: 24 }}>
                                <p className="font-orbitron text-neon-blue" style={{ fontSize: 32, fontWeight: 900, lineHeight: 1 }}>15K</p>
                                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 4 }}>per jam</p>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {['PS5 Pro', 'Game koleksi lengkap', 'TV LED 32"'].map((item, i) => (
                                    <li key={i} className="font-rajdhani" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ color: '#00d4ff', fontSize: 10 }}>▶</span> {item}
                                    </li>
                                ))}
                            </ul>
                            <Link href={route('login')} className="btn-neon" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                                <span>PILIH PS5</span>
                            </Link>
                        </div>

                        {/* PS5 - Featured */}
                        {/* <div className="price-card featured" style={{ padding: 28, position: 'relative' }}>
                            <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50)', background: 'linear-gradient(135deg,#00d4ff,#00ff88)', borderRadius: 100, padding: '4px 16px', whiteSpace: 'nowrap', transform: 'translateX(-50%)' }}>
                                <span className="font-orbitron" style={{ color: '#020617', fontSize: 9, fontWeight: 700, letterSpacing: 2 }}>🔥 POPULER</span>
                            </div>
                            <div style={{ marginBottom: 20, marginTop: 8 }}>
                                <p className="font-orbitron" style={{ color: '#00d4ff', fontSize: 10, letterSpacing: 2 }}>PREMIUM</p>
                                <h3 className="font-orbitron text-neon-blue" style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>PS5</h3>
                            </div>
                            <div style={{ marginBottom: 24 }}>
                                <p className="font-orbitron text-neon-green" style={{ fontSize: 32, fontWeight: 900, lineHeight: 1 }}>15K</p>
                                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 4 }}>per jam</p>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {['PS5 Disc / Digital Ed.', 'Game AAA terbaru', 'TV 4K 43"', 'DualSense Controller', 'Headset premium'].map((item, i) => (
                                    <li key={i} className="font-rajdhani" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ color: '#00ff88', fontSize: 10 }}>▶</span> {item}
                                    </li>
                                ))}
                            </ul>
                            <Link href={route('login')} className="btn-solid" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                                PILIH PS5
                            </Link>
                        </div> */}

                        {/* Paket Hemat */}
                        {/* <div className="price-card" style={{ padding: 28 }}>
                            <div style={{ marginBottom: 20 }}>
                                <p className="font-orbitron" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: 2 }}>PAKET</p>
                                <h3 className="font-orbitron" style={{ color: 'white', fontSize: 20, fontWeight: 700, marginTop: 4 }}>HEMAT</h3>
                            </div>
                            <div style={{ marginBottom: 24 }}>
                                <p className="font-orbitron text-neon-pink" style={{ fontSize: 32, fontWeight: 900, lineHeight: 1 }}>90K</p>
                                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 4 }}>5 jam (hemat 30K)</p>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {['Pilih PS4 atau PS5', 'Berlaku semua unit', 'Bonus snack', 'Bisa dijadwal ulang'].map((item, i) => (
                                    <li key={i} className="font-rajdhani" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ color: '#ff2d78', fontSize: 10 }}>▶</span> {item}
                                    </li>
                                ))}
                            </ul>
                            <Link href={route('login')} className="btn-neon" style={{ width: '100%', textAlign: 'center', display: 'block', borderColor: '#ff2d78', color: '#ff2d78' }}>
                                <span>PILIH PAKET</span>
                            </Link>
                        </div> */}
                    </div>
                </section>

                <div className="cyber-divider" style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }} />

                {/* ══ CTA BANNER ══ */}
                <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px', position: 'relative', zIndex: 10 }}>
                    <div style={{
                        borderRadius: 20,
                        padding: '48px 40px',
                        background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(0,255,136,0.06))',
                        border: '1px solid rgba(0,212,255,0.25)',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                    }}>
                        {/* bg decoration */}
                        <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, borderRadius: '50%', background: 'rgba(0,212,255,0.06)', filter: 'blur(40px)' }} />

                        <p className="section-label" style={{ marginBottom: 12 }}>SIAP GAMING?</p>
                        <h2 className="section-title" style={{ fontSize: 'clamp(22px,3vw,36px)', marginBottom: 16 }}>
                            MULAI SESI BERMAINMU <span className="text-neon-blue">SEKARANG</span>
                        </h2>
                        <p className="font-rajdhani" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, marginBottom: 32, maxWidth: 480, margin: '0 auto 32px' }}>
                            Daftar gratis, booking online, langsung main. Sesimpel itu.
                        </p>
                        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href={route('register')} className="btn-solid" style={{ fontSize: 12, padding: '14px 40px' }}>
                                🎮 DAFTAR GRATIS
                            </Link>
                            <Link href={route('login')} className="btn-neon" style={{ padding: '14px 32px' }}>
                                <span>SUDAH PUNYA AKUN</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ══ FOOTER ══ */}
                <footer style={{ borderTop: '1px solid rgba(0,212,255,0.1)', background: 'rgba(0,0,0,0.3)', padding: '28px 24px', position: 'relative', zIndex: 10 }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#00d4ff,#00ff88)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg style={{ width: 14, height: 14, color: '#020617' }} viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M21 6H3a1 1 0 00-1 1v10a1 1 0 001 1h18a1 1 0 001-1V7a1 1 0 00-1-1zm-10 7H9v2H7v-2H5v-2h2V9h2v2h2v2zm4.5 1a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3-3a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
                                </svg>
                            </div>
                            <span className="font-orbitron text-white" style={{ fontSize: 12 }}>GAME<span className="text-neon-blue">ZONE</span></span>
                        </div>
                        <p className="font-rajdhani" style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>
                            © 2026 GameZone Rental PS — All Rights Reserved
                        </p>
                        <div style={{ display: 'flex', gap: 20 }}>
                            <a href="#" className="nav-link" style={{ fontSize: 12 }}>Privacy</a>
                            <a href="#" className="nav-link" style={{ fontSize: 12 }}>Syarat</a>
                            {/* <a href="#" className="nav-link" style={{ fontSize: 12 }}>Kontak</a> */}
                        </div>
                    </div>
                </footer>

            </div>
        </>
    );
}