import AdminLayout from "@/Layouts/AdminLayout";
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

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("admin.monitoring"), { search }, { preserveState: true });
    };

    const main = (id) => {
        Swal.fire({
            title: "Mulai sesi bermain?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Ya, mulai",
            cancelButtonText: "Batal",
        }).then((res) => {
            if (res.isConfirmed) {
                router.post(route("admin.monitoring.main", id));
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Yakin hapus booking ini?",
            text: "Data yang dihapus tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.monitoring.destroy", id));
            }
        });
    };

    const StatusBadge = ({ status }) => {
        if (status === "confirmed") {
            return (
                <span className="text-green-600 font-semibold text-xs bg-green-100 px-2 py-1 rounded">
                    Siap Main
                </span>
            );
        }

        return <span className="text-gray-500 text-xs">-</span>;
    };

    return (
        <AdminLayout>

            <div className="p-4 md:p-6 space-y-5">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:justify-between gap-3">
                    <h1 className="text-xl md:text-2xl font-bold">
                        Monitoring Penggunaan PS
                    </h1>

                    <Link
                        href={route("admin.monitoring.create")}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center"
                    >
                        Booking Manual +
                    </Link>
                </div>

                {/* SEARCH */}
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari user / PS..."
                        className="border px-3 py-2 rounded-lg w-full md:w-72 focus:outline-none focus:ring"
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Cari
                    </button>
                </form>

                {/* TABLE DESKTOP */}
                <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="p-3">User</th>
                                <th>PS</th>
                                <th>Tanggal</th>
                                <th>Jam Main</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookings.data.map((b) => (
                                <tr key={b.id} className="border-t hover:bg-gray-50 text-center">

                                    <td className="p-3 font-medium">
                                        {b.user?.name || b.nama_user}
                                    </td>

                                    <td>{b.ps_unit?.nama_ps}</td>
                                    <td>{b.tanggal}</td>
                                    <td>{b.jam_mulai}</td>

                                    <td>
                                        <StatusBadge status={b.status} />
                                    </td>

                                    <td>
                                        <div className="flex justify-center gap-2">

                                            {b.status === "confirmed" && (
                                                <button
                                                    onClick={() => main(b.id)}
                                                    className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs"
                                                >
                                                    Play
                                                </button>
                                            )}

                                            <button
                                                onClick={() => handleDelete(b.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Delete
                                            </button>

                                        </div>
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
                                <span className="font-semibold">
                                    {b.user?.name || b.nama_user}
                                </span>
                                <StatusBadge status={b.status} />
                            </div>

                            <p className="text-sm">🎮 {b.ps_unit?.nama_ps}</p>
                            <p className="text-sm">📅 {b.tanggal}</p>
                            <p className="text-sm">⏰ {b.jam_mulai}</p>

                            <div className="flex gap-2 pt-2">

                                {b.status === "confirmed" && (
                                    <button
                                        onClick={() => main(b.id)}
                                        className="flex-1 bg-purple-500 text-white py-2 rounded"
                                    >
                                        Play
                                    </button>
                                )}

                                <button
                                    onClick={() => handleDelete(b.id)}
                                    className="flex-1 bg-red-500 text-white py-2 rounded"
                                >
                                    Delete
                                </button>

                            </div>

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