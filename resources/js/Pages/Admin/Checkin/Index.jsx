import AdminLayout from "@/Layouts/AdminLayout";
import { router, Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Index({ bookings, filters, flash }) {
    const [search, setSearch] = useState(filters.search || "");
    const { props } = usePage();

    useEffect(() => {
        if (flash?.success) Swal.fire("Berhasil", flash.success, "success");
        if (flash?.error) Swal.fire("Error", flash.error, "error");
    }, [flash]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("admin.checkin"), { search }, { preserveState: true });
    };

    const handleCheckin = (id) => {
        Swal.fire({
            title: "Konfirmasi check-in?",
            icon: "question",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("admin.checkin.process", id));
            }
        });
    };
 
    const handleCancel = (id) => {
        Swal.fire({
            title: "Batalkan booking?",
            text: "Booking akan diubah menjadi batal",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("admin.batal.process", id));
            }
        });
    };

    const handlegagalkan = (id) => {
        Swal.fire({
            title: "Gagalkan booking?",
            text: "Booking akan diubah menjadi gagal",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("admin.gagalkan.process", id));
            }
        });
    };

    return (
        <AdminLayout title="Check-in User">
            <div className="p-4 md:p-6 space-y-5">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <h1 className="text-xl md:text-2xl font-bold">
                        Check-in User
                    </h1>
                </div>

                {/* SEARCH */}
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
                    <input
                        type="text"
                        placeholder="Cari user / PS..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border px-3 py-2 rounded-lg w-full md:w-72 focus:outline-none focus:ring"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Cari
                    </button>
                </form>

                {/* DESKTOP TABLE */}
                <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="p-3">User</th>
                                <th>PS</th>
                                <th>Tanggal</th>
                                <th>Jam</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookings.data.map((b) => (
                                <tr key={b.id} className="border-t hover:bg-gray-50 text-center">
                                    <td className="p-3 font-medium">{b.user?.name}</td>
                                    <td>{b.ps_unit?.nama_ps ?? "-"}</td>
                                    <td>{b.tanggal}</td>
                                    <td>{b.jam_mulai} - {b.jam_selesai}</td>
                                    <td className="py-2">
                                        {b.status === "pending" && (
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => handleCheckin(b.id)}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                                                >
                                                    Check-in
                                                </button>
                                                <button
                                                    onClick={() => handlegagalkan(b.id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                                >
                                                    Gagalkan
                                                </button>
                                            </div>
                                        )}

                                        {b.status === "checked_in" && (
                                            <span className="text-green-600 font-semibold text-xs">
                                                Sudah Check-in
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* MOBILE CARD */}
                <div className="md:hidden space-y-3">
                    {bookings.data.map((b) => (
                        <div key={b.id} className="bg-white rounded-lg shadow p-4 space-y-2">

                            <div className="flex justify-between">
                                <span className="font-semibold">{b.user?.name}</span>
                                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                                    {b.status}
                                </span>
                            </div>

                            <p className="text-sm">🎮 {b.ps_unit?.nama_ps ?? "-"}</p>
                            <p className="text-sm">📅 {b.tanggal}</p>
                            <p className="text-sm">⏰ {b.jam_mulai} - {b.jam_selesai}</p>

                            {b.status === "pending" && (
                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() => handleCheckin(b.id)}
                                        className="flex-1 bg-green-500 text-white py-2 rounded"
                                    >
                                        Check-in
                                    </button>

                                    <button
                                        onClick={() => handlegagalkan(b.id)}
                                        className="flex-1 bg-red-500 text-white py-2 rounded"
                                    >
                                        Gagalkan
                                    </button>
                                </div>
                            )}

                            {b.status === "checked_in" && (
                                <p className="text-green-600 font-semibold text-sm">
                                    Sudah Check-in
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                <div className="flex flex-wrap gap-2 justify-center">
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