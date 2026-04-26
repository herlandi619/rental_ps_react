import AdminLayout from "@/Layouts/AdminLayout";
import { router, usePage, Head, Link } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

export default function Index() {
    const { bookings, filters, flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: flash.success,
                timer: 2000,
                showConfirmButton: false,
            });
        }
    }, [flash]);

    const submitSearch = (e) => {
        e.preventDefault();
        router.get("/admin/bookings", { search });
    };

    const confirmBooking = (id) => {
        Swal.fire({
            title: "Konfirmasi booking?",
            icon: "question",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(`/admin/bookings/${id}/confirm`);
            }
        });
    };

    const rejectBooking = (id) => {
        Swal.fire({
            title: "Tolak booking?",
            icon: "warning",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(`/admin/bookings/${id}/reject`);
            }
        });
    };

    return (
        <AdminLayout>
            <Head title="Manajemen Booking" />

            <div className="p-4 md:p-6 space-y-6">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <h1 className="text-xl md:text-2xl font-bold">
                        Manajemen Booking
                    </h1>
                </div>

                {/* SEARCH + ACTION */}
                <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">

                    <form
                        onSubmit={submitSearch}
                        className="flex flex-col sm:flex-row gap-2 w-full md:w-auto"
                    >
                        <input
                            type="text"
                            placeholder="Cari user / PS / status..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border p-2 rounded w-full md:w-80 focus:outline-none focus:ring"
                        />
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                            Search
                        </button>
                    </form>

                    <Link
                        href={route("admin.bookings.terlambat")}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-center"
                    >
                        Booking Terlambat
                    </Link>
                </div>

                {/* ================= DESKTOP TABLE ================= */}
                <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="p-3 text-left">User</th>
                                <th className="p-3 text-left">PS</th>
                                <th className="p-3 text-left">Tanggal</th>
                                <th className="p-3 text-left">Jam</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookings.data.map((booking) => (
                                <tr key={booking.id} className="border-t hover:bg-gray-50">
                                    <td className="p-3">{booking.user?.name}</td>
                                    <td>{booking.ps_unit?.nama_ps ?? "-"}</td>
                                    <td>{booking.tanggal}</td>
                                    <td>{booking.jam_mulai} - {booking.jam_selesai}</td>
                                    <td>
                                        <span className="px-2 py-1 text-xs rounded bg-gray-200">
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        {booking.status === "pending" ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => confirmBooking(booking.id)}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                                                >
                                                    Confirm
                                                </button>
                                                <button
                                                    onClick={() => rejectBooking(booking.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-xs">
                                                No action
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ================= MOBILE CARD ================= */}
                <div className="md:hidden space-y-4">
                    {bookings.data.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white rounded-lg shadow p-4 space-y-2"
                        >
                            <div className="flex justify-between">
                                <span className="font-semibold">{booking.user?.name}</span>
                                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                                    {booking.status}
                                </span>
                            </div>

                            <p className="text-sm">🎮 {booking.ps_unit?.nama_ps ?? "-"}</p>
                            <p className="text-sm">📅 {booking.tanggal}</p>
                            <p className="text-sm">
                                ⏰ {booking.jam_mulai} - {booking.jam_selesai}
                            </p>

                            {booking.status === "pending" && (
                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() => confirmBooking(booking.id)}
                                        className="flex-1 bg-green-500 text-white py-2 rounded"
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={() => rejectBooking(booking.id)}
                                        className="flex-1 bg-red-500 text-white py-2 rounded"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                <div className="flex flex-wrap gap-2 justify-center pt-4">
                    {bookings.links.map((link, i) => (
                        <button
                            key={i}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            disabled={!link.url}
                            onClick={() => router.get(link.url)}
                            className="px-3 py-1 border rounded text-sm hover:bg-gray-100"
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}