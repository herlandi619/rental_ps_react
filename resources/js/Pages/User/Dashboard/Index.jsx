import UserLayout from "@/Layouts/UserLayout";
import { usePage } from "@inertiajs/react";

export default function UserDashboard() {
    const { auth, totalBooking, bookingAktif, bookingSelesai, bookingBatal } = usePage().props;
    const user = auth?.user;

    return (
        <UserLayout>
            <div className="min-h-screen bg-gray-100 px-4 py-4 sm:p-6 lg:p-8">

                {/* WELCOME */}
                <div className="bg-white rounded-2xl shadow p-5 sm:p-6 mb-5">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                        Halo, {user?.name} 👋
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">
                        Berikut statistik aktivitas booking kamu.
                    </p>
                </div>

                {/* 📊 STATISTIK USER */}
                {/* mobile: 2 kolom | tablet: 2 | desktop: 4 */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                    <Card title="Total Booking" value={totalBooking} color="text-blue-600" />
                    <Card title="Booking Aktif" value={bookingAktif} color="text-green-600" />
                    <Card title="Booking Selesai" value={bookingSelesai} color="text-gray-700" />
                    <Card title="Booking Dibatalkan" value={bookingBatal} color="text-red-600" />

                </div>

                {/* 👤 INFO AKUN */}
                <div className="bg-white rounded-2xl shadow p-5 sm:p-6">
                    <h2 className="font-semibold text-gray-700 mb-4 text-base sm:text-lg">
                        Informasi Akun
                    </h2>

                    {/* mobile: 1 kolom | desktop: 2 kolom */}
                    <div className="grid md:grid-cols-2 gap-4 text-sm sm:text-base">
                        
                        <InfoRow label="Nama" value={user?.name} />
                        <InfoRow label="Email" value={user?.email} />
                        <InfoRow label="Status" value="Member Aktif" highlight />

                    </div>
                </div>

            </div>
        </UserLayout>
    );
}

/* 🔹 COMPONENT CARD */
function Card({ title, value, color }) {
    return (
        <div className="bg-white p-4 sm:p-5 rounded-2xl shadow hover:shadow-lg transition">
            <p className="text-gray-500 text-xs sm:text-sm">{title}</p>
            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${color}`}>
                {value}
            </h2>
        </div>
    );
}

/* 🔹 COMPONENT INFO ROW */
function InfoRow({ label, value, highlight }) {
    return (
        <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">{label}</span>
            <span className={highlight ? "text-green-600 font-semibold" : "font-medium"}>
                {value}
            </span>
        </div>
    );
}