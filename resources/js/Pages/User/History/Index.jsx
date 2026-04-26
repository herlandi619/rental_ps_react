import UserLayout from "@/Layouts/UserLayout";
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function History({ bookings, filters, flash }) {

    const [search, setSearch] = useState(filters.search || "");

    /* 🔔 FLASH MESSAGE */
    useEffect(() => {
        if (flash?.success) {
            Swal.fire("Berhasil", flash.success, "success");
        }
        if (flash?.error) {
            Swal.fire("Gagal", flash.error, "error");
        }
    }, [flash]);

    /* ❌ CANCEL BOOKING */
    

    /* 🎨 BADGE STATUS */
    const statusBadge = (status) => {
        const styles = {
            pending: "bg-yellow-100 text-yellow-700",
            confirmed: "bg-purple-100 text-purple-700",
            sukses: "bg-green-100 text-green-700",
            selesai: "bg-blue-100 text-blue-700",
            gagal: "bg-orange-100 text-orange-700",
            batal: "bg-red-100 text-red-700",
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-gray-200"}`}>
                {status}
            </span>
        );
    };

    // /* 🔔 REMINDER BOOKING PENDING */
    useEffect(() => {

        const hasPendingBooking = bookings.data.some(
            (b) => b.status === "pending"
        );

        if (hasPendingBooking) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan Booking",
                html: `
                    Kamu memiliki booking yang belum dikonfirmasi.<br><br>
                    Jika kamu tidak jadi datang, silakan tekan tombol 
                    <b style="color:red">Gagalkan Booking</b> agar admin mengetahui.
                `,
                confirmButtonText: "Mengerti",
            });
        }

    }, []);

    useEffect(() => {

        const hasPendingBooking = bookings.data.some(
            (b) => b.status === "confirmed"
        );

        if (hasPendingBooking) {
            Swal.fire({
                icon: "info",
                title: "Pemberitahuan Booking",
                html: `
                    Kamu memiliki booking yang sudah dikonfirmasi.<br><br>
                    Jika kamu tidak jadi datang, silakan tekan tombol 
                    <b style="color:red">Batalkan Booking</b> agar admin mengetahui.
                `,
                confirmButtonText: "Mengerti",
            });
        }

    }, []);


    const failBooking = (id) => {
        Swal.fire({
            title: "Gagalkan booking?",
            text: "Booking akan digagalkan karena kamu tidak jadi datang.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, gagalkan",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                router.patch(route("user.booking.fail", id));
            }
        });
    };

    const cancelBooking = (id) => {
        Swal.fire({
            title: "Batalkan booking?",
            text: "Booking yang sudah dikonfirmasi akan dibatalkan.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, batalkan",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                router.patch(route("user.booking.cancel", id));
            }
        });
    };


    return (
        <UserLayout>
            <div className="p-4 md:p-6">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-6">
                    <h1 className="text-xl md:text-2xl font-bold">Riwayat Booking</h1>
                </div>

                {/* ================= DESKTOP TABLE ================= */}
                <div className="hidden md:block bg-white shadow rounded-lg overflow-hidden">
                    <table className="w-full text-sm text-center">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3">PS</th>
                                <th>Tanggal</th>
                                <th>Jam</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookings.data.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-6 text-gray-500">
                                        Belum ada riwayat booking
                                    </td>
                                </tr>
                            )}

                            {bookings.data.map((booking) => (
                                <tr key={booking.id} className="border-t hover:bg-gray-50">
                                    <td className="p-3 font-semibold">
                                        {booking.ps_unit?.nama_ps ?? "-"}
                                    </td>

                                    <td>{booking.tanggal}</td>

                                    <td>
                                        {booking.jam_mulai} - {booking.jam_selesai}
                                    </td>

                                    <td>{statusBadge(booking.status)}</td>

                                    <td className="space-x-2">
                                        {/* PENDING → GAGALKAN */}
                                        {booking.status === "pending" && (
                                            <button
                                                onClick={() => failBooking(booking.id)}
                                                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Gagalkan
                                            </button>
                                        )}

                                        {/* CONFIRMED → BATALKAN */}
                                        {booking.status === "confirmed" && (
                                            <button
                                                onClick={() => cancelBooking(booking.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Batalkan
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ================= MOBILE CARD ================= */}
                <div className="md:hidden space-y-4">
                    {bookings.data.length === 0 && (
                        <div className="bg-white p-6 rounded shadow text-center text-gray-500">
                            Belum ada riwayat booking
                        </div>
                    )}

                    {bookings.data.map((booking) => (
                        <div key={booking.id} className="bg-white p-4 rounded-xl shadow">

                            <div className="flex justify-between items-center mb-3">
                                <h2 className="font-bold text-lg">
                                    {booking.ps_unit?.nama_ps ?? "-"}
                                </h2>
                                {statusBadge(booking.status)}
                            </div>

                            <div className="text-sm text-gray-600 space-y-1">
                                <p><b>Tanggal :</b> {booking.tanggal}</p>
                                <p><b>Jam :</b> {booking.jam_mulai} - {booking.jam_selesai}</p>
                            </div>

                            {/* PENDING */}
                            {booking.status === "pending" && (
                                <button
                                    onClick={() => failBooking(booking.id)}
                                    className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
                                >
                                    Gagalkan Booking
                                </button>
                            )}

                            {/* CONFIRMED */}
                            {booking.status === "confirmed" && (
                                <button
                                    onClick={() => cancelBooking(booking.id)}
                                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                                >
                                    Batalkan Booking
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* ================= PAGINATION ================= */}
                <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                    {bookings.links.map((link, i) => (
                        <button
                            key={i}
                            disabled={!link.url}
                            onClick={() => router.visit(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-3 py-1 border rounded text-sm
                            ${link.active ? "bg-blue-500 text-white border-blue-500" : "hover:bg-gray-100"}
                            ${!link.url ? "opacity-50 cursor-not-allowed" : ""}`}
                        />
                    ))}
                </div>

            </div>
        </UserLayout>
    );
}