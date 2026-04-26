import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminLayout({ children }) {

    // ✅ SAFE AUTH (ANTI CRASH)
    const { auth = {} } = usePage().props || {};
    const user = auth?.user || null;

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    // 🔔 NOTIF
    const [notifCount, setNotifCount] = useState(0);
    const [notifData, setNotifData] = useState([]);
    const [notifOpen, setNotifOpen] = useState(false);

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

    // ✅ NAV
    const navItems = [
        { icon: '📊', label: 'Dashboard', href: route('user.dashboard'), name: 'user.dashboard' },
        { icon: '🎮', label: 'Booking', href: route('user.ps.index'), name: 'user.ps.index' },
        { icon: '📑', label: 'Riwayat', href: route('user.booking.history'), name: 'user.booking.history' },
        // { icon: '👤', label: 'Profile', href: route('user.profile.edit'), name: 'user.profile.edit' },
    ];

    const isActive = (name) =>
        route().current(name) || route().current(`${name}.*`);

    // ✅ SAFE INITIALS
    const initials = (name = '') =>
        name
            ?.split(' ')
            ?.filter(Boolean)
            ?.map(w => w[0])
            ?.join('')
            ?.slice(0, 2)
            ?.toUpperCase() || 'U';

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* SIDEBAR */}
          <aside
    className={`
        hidden md:flex flex-col
        bg-white border-r border-gray-200
        shadow-sm
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-56' : 'w-[72px]'}
    `}
>

    {/* HEADER */}
    <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-white shadow-sm">
            🎮
        </div>

        {isOpen && (
            <div className="leading-tight">
                <p className="font-semibold text-gray-800 text-sm">PS Admin</p>
                <p className="text-xs text-gray-400">Dashboard</p>
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
                    className={`
                        group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
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
                        <div className="absolute right-3 w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                </Link>
            );
        })}
    </nav>

    {/* LOGOUT */}
    <div className="px-2 pb-4 border-t border-gray-100 pt-3">

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
            <div className="flex-1 flex flex-col pb-16 md:pb-0">

                {/* HEADER */}
                <header className="flex items-center justify-between bg-white border-b px-4 py-3 shadow-sm">

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100"
                    >
                        ☰
                    </button>

                    <div>
                        <div className="font-semibold text-gray-800">
                            Dashboard
                        </div>
                        <div className="text-xs text-gray-500 hidden sm:block">
                            PS Rental System
                        </div>
                    </div>

                    {/* USER DROPDOWN */}
                    <div className="relative border-l pl-3">

                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-lg"
                        >
                            <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                                {initials(user?.name)}
                            </div>

                            <span className="hidden sm:block text-sm">
                                {user?.name || "User"}
                            </span>
                        </button>

                        {userMenuOpen && (
                            <div className="absolute right-0 mt-3 w-44 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">

                                <Link
                                    href={route("user.profile.edit")}
                                    className="block px-4 py-3 hover:bg-gray-50 text-sm"
                                >
                                    👤 Profile
                                </Link>

                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 text-sm"
                                >
                                    🚪 Logout
                                </Link>

                            </div>
                        )}
                    </div>
                </header>

                {/* CONTENT */}
                <main className="p-6">
                    {children}
                </main>
            </div>

            {/* MOBILE NAV */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-xl z-50">
                <div className="flex justify-around items-center py-2">

                    {navItems.map(item => {
                        const active = isActive(item.name);

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex flex-col items-center w-full py-1"
                            >
                                <span className={`text-2xl ${active ? 'scale-110' : 'opacity-60'}`}>
                                    {item.icon}
                                </span>

                                <span className={`text-[11px] mt-1 ${
                                    active ? 'text-blue-600 font-semibold' : 'text-gray-500'
                                }`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}

                </div>
            </div>

            {/* FLOATING BUTTON */}
            <Link
                href={route("user.ps.index")}
                className="md:hidden fixed bottom-20 right-4 z-50
                bg-green-500 hover:bg-green-600 text-white text-3xl
                w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
            >
                +
            </Link>

        </div>
    );
}