import { Link, usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;

    const [isOpen, setIsOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    // USER DROPDOWN
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // NOTIF
    const [notifCount, setNotifCount] = useState(0);
    const [notifData, setNotifData] = useState([]);
    const [notifOpen, setNotifOpen] = useState(false);

    // =========================
    // 🔐 ROLE GUARD (FIX DISINI)
    // =========================
    useEffect(() => {
        const role = auth?.user?.role;

        if (role && role !== 'admin') {
            router.visit(route('user.dashboard'));
        }
    }, [auth]);

    const fetchNotif = async () => {
        try {
            const res = await axios.get('/admin/notifications');
            setNotifData(res.data.data || []);
            setNotifCount(res.data.count || 0);
        } catch (err) {
            console.log(err);
        }
    };

    const openNotif = () => {
        const next = !notifOpen;
        setNotifOpen(next);

        if (!notifOpen) {
            localStorage.setItem("notif_last_read", new Date().toISOString());
            setNotifCount(0);
        }
    };

    useEffect(() => {
        fetchNotif();
        const interval = setInterval(fetchNotif, 10000);
        return () => clearInterval(interval);
    }, []);

    const navItems = [
        { icon: '🧾', label: 'Dashboard', href: route('admin.dashboardLaporan'), name: 'admin.dashboardLaporan' },
        { icon: '🕹️', label: 'Data PS', href: route('ps.index'), name: 'ps' },
        { icon: '✅', label: 'Booking', href: route('admin.checkin'), name: 'admin.checkin' },
        { icon: '📊', label: 'Monitoring', href: route('admin.monitoring'), name: 'admin.monitoring' },
        { icon: '💳', label: 'Pembayaran', href: route('admin.pembayaran'), name: 'admin.pembayaran' },
        { icon: '👥', label: 'Kelola User', href: route('admin.users'), name: 'admin.users' },
        { icon: '📄', label: 'Laporan', href: route('admin.laporan'), name: 'admin.laporan' },
    ];

    const isActive = (name) =>
        route().current(name) || route().current(`${name}.*`);

    const initials = (name = '') =>
        name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* SIDEBAR */}
            <aside
    className={`
        fixed md:static z-50 inset-y-0 left-0
        bg-white border-r border-gray-200
        shadow-sm
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-60' : 'w-[72px]'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col
    `}
>

    {/* HEADER */}
    <div className="flex items-center gap-3 px-4 py-6 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-lg shadow-md">
            🎮
        </div>

        {isOpen && (
            <div className="leading-tight">
                <p className="text-gray-800 font-semibold text-sm">PS Rental</p>
                <p className="text-gray-400 text-xs">Admin Panel</p>
            </div>
        )}
    </div>

    {/* NAV */}
    <nav className="flex-1 flex flex-col gap-1 px-2 py-4">

        {navItems.map((item) => {
            const active = isActive(item.name);

            return (
                <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`
                        group flex items-center gap-3 px-3 py-2.5 rounded-xl
                        transition-all duration-200
                        ${active
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'}
                    `}
                >

                    {/* ICON */}
                    <div
                        className={`
                            w-9 h-9 flex items-center justify-center rounded-lg
                            transition-all duration-200
                            ${active
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 group-hover:bg-gray-200'}
                        `}
                    >
                        <span className="text-lg">{item.icon}</span>
                    </div>

                    {/* LABEL */}
                    {isOpen && (
                        <span className="text-sm">
                            {item.label}
                        </span>
                    )}

                    {/* ACTIVE DOT */}
                    {active && (
                        <div className="absolute right-2 w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                </Link>
            );
        })}
    </nav>

    {/* FOOTER */}
    <div className="p-3 border-t border-gray-100">

        <Link
            href={route('logout')}
            method="post"
            as="button"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
            text-red-500 hover:bg-red-50 transition"
        >
            <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-50">
                🚪
            </div>

            {isOpen && (
                <span className="text-sm font-medium">Logout</span>
            )}
        </Link>

    </div>
</aside>

            {/* MAIN */}
            <div className="flex-1 flex flex-col">

                {/* TOPBAR */}
                <header className="flex justify-between items-center bg-white border-b px-4 py-3 shadow-sm">

                    <button onClick={() => setMobileOpen(true)} className="md:hidden text-2xl">
                        ☰
                    </button>

                    <button onClick={() => setIsOpen(!isOpen)} className="hidden md:block text-lg">
                        ☰
                    </button>

                    <div className="flex items-center gap-6">

                        {/* NOTIF */}
                        <div className="relative">
                            <button onClick={openNotif} className="text-2xl relative">
                                🔔

                                {notifCount > 0 && (
                                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                                        {notifCount}
                                    </span>
                                )}
                            </button>

                            {notifOpen && (
                                <div className="absolute right-0 mt-3 w-80 bg-white border shadow-lg rounded-lg z-50">

                                    <div className="p-3 border-b font-semibold">
                                        Notifikasi Booking
                                    </div>

                                    {notifData.length === 0 ? (
                                        <div className="p-3 text-sm text-gray-500">
                                            Tidak ada notifikasi
                                        </div>
                                    ) : (
                                        notifData.map(n => (
                                            <Link
                                                key={n.id}
                                                href={route('admin.checkin')}
                                                className="block p-3 hover:bg-gray-100 border-b text-sm"
                                            >
                                                {n.status === 'batal' ? (
                                                    <span className="text-red-600">
                                                        ⚠️ {n.user?.name} membatalkan booking
                                                    </span>
                                                ) : (
                                                    <span>
                                                        🎮 {n.user?.name} booking {n.ps_unit?.nama_ps}
                                                    </span>
                                                )}

                                                <div className="text-xs text-gray-500">
                                                    {n.tanggal} | {n.jam_mulai}
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* USER DROPDOWN */}
                        <div className="relative">

                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-gray-100"
                            >
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                                    {initials(auth?.user?.name)}
                                </div>

                                <span className="hidden sm:block">
                                    {auth?.user?.name}
                                </span>

                                <span className="text-xs">▼</span>
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-white border rounded-lg shadow-lg z-50 overflow-hidden">

                                    <Link
                                        href={route('profile.edit')}
                                        className="block px-4 py-3 text-sm hover:bg-gray-100"
                                    >
                                        👤 Profile
                                    </Link>

                                    <div className="border-t" />

                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                                    >
                                        🚪 Logout
                                    </Link>

                                </div>
                            )}

                        </div>

                    </div>
                </header>

                {/* CONTENT */}
                <main className="p-6">
                    {children}
                </main>

            </div>
        </div>
    );
}