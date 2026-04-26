import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
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

    const navItems = [
        { icon: '📊', label: 'Dashboard', href: route('user.dashboard'), name: 'user.dashboard' },
        { icon: '🎮', label: 'Booking', href: route('user.ps.index'), name: 'user.ps.index' },
        // { icon: '📊', label: 'Booking', href: route('user.booking.index'), name: 'user.booking.index' },
        { icon: '📑', label: 'Riwayat', href: route('user.booking.history'), name: 'user.booking.history' },
        { icon: '👤', label: 'Profile', href: route('profile.edit'), name: 'profile.edit' },
    ];

    const isActive = (name) =>
        route().current(name) || route().current(`${name}.*`);

    const initials = (name = '') =>
        name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div className="min-h-screen bg-gray-100 flex">

            {/* ================= SIDEBAR (DESKTOP ONLY) ================= */}
            <aside className={`
                hidden md:flex flex-col
                bg-white border-r shadow-sm
                transition-all duration-300
                ${isOpen ? 'w-56' : 'w-[60px]'}
            `}>
                <div className="flex items-center gap-3 px-3 py-5">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        🎮
                    </div>
                    {isOpen && <span className="font-semibold">PS Admin</span>}
                </div>

                <nav className="flex-1 flex flex-col gap-1 px-2">
                    {navItems.map(item => {
                        const active = isActive(item.name);

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                                ${active ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <span>{item.icon}</span>
                                {isOpen && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="px-2 pb-4">
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                        🚪 {isOpen && "Logout"}
                    </Link>
                </div>
            </aside>

            {/* ================= MAIN ================= */}
            <div className="flex-1 flex flex-col pb-16 md:pb-0">

                {/* ================= HEADER (CLEAN VERSION) ================= */}
                <header className="flex items-center justify-between bg-white border-b px-4 py-3 shadow-sm">

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100"
                    >
                        ☰
                    </button>

                    <div className="flex flex-col leading-tight">
                        <span className="font-semibold text-gray-800">Dashboard</span>
                        <span className="text-xs text-gray-500 hidden sm:block">
                            PS Rental Management System
                        </span>
                    </div>

                    <div className="flex items-center gap-4">

                        {/* NOTIF */}
                        {/* <div className="relative">
                            <button
                                onClick={openNotif}
                                className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-xl"
                            >
                                🔔

                                {notifCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                                        {notifCount}
                                    </span>
                                )}
                            </button>

                            {notifOpen && (
                                <div className="absolute right-0 mt-3 w-80 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">

                                    <div className="px-4 py-3 border-b font-semibold">
                                        Notifikasi Booking
                                    </div>

                                    <div className="max-h-72 overflow-y-auto">
                                        {notifData.length === 0 ? (
                                            <div className="p-4 text-sm text-gray-500">
                                                Tidak ada notifikasi
                                            </div>
                                        ) : (
                                            notifData.map(n => (
                                                <Link
                                                    key={n.id}
                                                    // href={route('admin.checkin')}
                                                    
                                                    className="block px-4 py-3 hover:bg-gray-50 border-b text-sm"
                                                >
                                                    <div className="font-medium">
                                                        🎮 {n.user.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        Booking {n.ps_unit.nama_ps}
                                                    </div>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        {n.tanggal} • {n.jam_mulai}
                                                    </div>
                                                </Link>
                                            ))
                                        )}
                                    </div>

                                </div>
                            )}
                        </div> */}

                        {/* USER DROPDOWN */}
<div className="relative border-l pl-3">

    <button
        onClick={() => setUserMenuOpen(!userMenuOpen)}
        className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-lg"
    >
        <div className="w-9 h-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
            {initials(auth?.user?.name)}
        </div>

        <span className="hidden sm:block text-sm">
            {auth?.user?.name}
        </span>
    </button>

    {/* DROPDOWN */}
    {userMenuOpen && (
        <div className="absolute right-0 mt-3 w-44 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">

            <Link
                href={route("profile.edit")}
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
                    </div>
                </header>

                {/* CONTENT */}
                <main className="p-6">
                    {children}
                </main>
            </div>

            {/* ================= ANDROID STYLE BOTTOM NAV ================= */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-xl z-50">

                <div className="flex justify-around items-center py-2">

                    {navItems.map(item => {
                        const active = isActive(item.name);

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex flex-col items-center justify-center w-full relative py-1"
                            >
                                <span className={`text-2xl ${active ? 'scale-110' : 'opacity-60'}`}>
                                    {item.icon}
                                </span>

                                <span className={`text-[11px] mt-1 ${
                                    active ? 'text-blue-600 font-semibold' : 'text-gray-500'
                                }`}>
                                    {item.label}
                                </span>

                                {active && (
                                    <span className="absolute bottom-0 w-10 h-[3px] bg-blue-600 rounded-full"></span>
                                )}
                            </Link>
                        );
                    })}

                    {/* NOTIF */}
                    {/* <button
                        onClick={openNotif}
                        className="flex flex-col items-center justify-center w-full relative py-1"
                    >
                        <span className="text-2xl">🔔</span>
                        <span className="text-[11px] mt-1 text-gray-500">
                            Notif
                        </span>

                        {notifCount > 0 && (
                            <span className="absolute top-0 right-6 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                                {notifCount}
                            </span>
                        )}
                    </button> */}

                </div>
            </div>

            {/* FLOATING BOOKING BUTTON */}
            <Link
                href={route("user.ps.index", { user: auth.user_id })}
                className="md:hidden fixed bottom-20 right-4 z-50
                        bg-green-500 hover:bg-green-600
                        text-white text-3xl
                        w-14 h-14 rounded-full
                        flex items-center justify-center
                        shadow-xl"
            >
                +
            </Link>

        </div>
    );
}

