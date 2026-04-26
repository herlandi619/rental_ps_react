import UserLayout from "@/Layouts/UserLayout";
import { router, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Index({ bookings, filters, flash }) {
    const [search, setSearch] = useState(filters.search || "");

    useEffect(() => {
        if (flash?.success) {
            Swal.fire("Berhasil", flash.success, "success");
        }
    }, [flash]);

    function searchData(e) {
        e.preventDefault();
        router.get("/booking", { search }, { preserveState: true });
    }

    return (
        <UserLayout>
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">

                    {/* HEADER */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                        <h1 className="text-xl sm:text-2xl font-bold">
                            Riwayat Booking
                        </h1>

                        <Link
                            href={route("user.booking.create")}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow text-center w-full sm:w-auto"
                        >
                            + Booking Baru
                        </Link>
                    </div>

                    {/* SEARCH */}
                    <form onSubmit={searchData} className="mb-5 flex flex-col sm:flex-row gap-2">
                        <input
                            className="border rounded-xl px-3 py-2 w-full sm:w-80"
                            placeholder="Cari nama PS..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl w-full sm:w-auto">
                            Cari
                        </button>
                    </form>

                    {/* ================= DESKTOP TABLE ================= */}
                    <div className="hidden md:block bg-white rounded-2xl shadow overflow-x-auto">
                        <table className="w-full text-sm min-w-[600px]">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-4 text-left">PS</th>
                                    <th>Tanggal</th>
                                    <th>Jam</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.data.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="p-6 text-center">
                                            Data tidak ditemukan
                                        </td>
                                    </tr>
                                )}

                                {bookings.data.map((b) => (
                                    <tr key={b.id} className="border-t hover:bg-gray-50">
                                        <td className="p-4 font-semibold">
                                            {b.ps.nama_ps}
                                        </td>
                                        <td>{b.tanggal}</td>
                                        <td>{b.jam_mulai} - {b.jam_selesai}</td>
                                        <td>
                                            <span className="px-2 py-1 rounded bg-gray-200 text-xs">
                                                {b.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ================= MOBILE CARD ================= */}
                    <div className="md:hidden space-y-4">
                        {bookings.data.length === 0 && (
                            <div className="bg-white p-6 rounded-xl shadow text-center">
                                Data tidak ditemukan
                            </div>
                        )}

                        {bookings.data.map((b) => (
                            <div key={b.id} className="bg-white p-4 rounded-2xl shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-lg">
                                            {b.ps.nama_ps}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {b.tanggal}
                                        </p>
                                    </div>

                                    <span className="px-2 py-1 rounded bg-gray-200 text-xs">
                                        {b.status}
                                    </span>
                                </div>

                                <div className="mt-3 text-sm">
                                    <p>
                                        Jam : {b.jam_mulai} - {b.jam_selesai}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* PAGINATION */}
                    <div className="mt-6 flex flex-wrap gap-2 justify-center sm:justify-end">
                        {bookings.links.map((link, i) => (
                            <button
                                key={i}
                                disabled={!link.url}
                                onClick={() => router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 border rounded ${
                                    link.active ? "bg-blue-500 text-white" : "bg-white"
                                }`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </UserLayout>
    );
}