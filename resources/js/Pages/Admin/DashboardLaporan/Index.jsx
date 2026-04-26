import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Index({ stats, transactions, filters, flash }) {

    const search = (e) => {
        router.get(route('admin.dashboard'),
            { search: e.target.value, filter: filters.filter },
            { preserveState: true, replace: true }
        );
    };

    const changeFilter = (filter) => {
        router.get(route('admin.dashboard'),
            { filter },
            { preserveState: true }
        );
    };

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: flash.success,
            });
        }
    }, [flash]);

    const cards = [
        {
            label: "Total Pendapatan",
            value: `Rp ${stats.pendapatan}`,
            color: "bg-green-100"
        },
        {
            label: "Total Booking",
            value: stats.booking,
            color: "bg-blue-100"
        },
        {
            label: "Sesi Selesai",
            value: stats.selesai,
            color: "bg-yellow-100"
        },
        {
            label: "Cash / QRIS",
            value: `${stats.cash} / ${stats.qris}`,
            color: "bg-purple-100"
        }
    ];

    return (
        <AdminLayout>
            <div className="p-4 md:p-6 space-y-6">

                {/* TITLE */}
                <div>
                    <h1 className="text-xl md:text-2xl font-bold">
                        📊 Dashboard & Laporan
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Ringkasan aktivitas rental PS
                    </p>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {cards.map((c, i) => (
                        <div
                            key={i}
                            className={`${c.color} rounded-lg p-4 shadow-sm`}
                        >
                            <p className="text-xs md:text-sm text-gray-600">
                                {c.label}
                            </p>
                            <h2 className="text-sm md:text-xl font-bold mt-1">
                                {c.value}
                            </h2>
                        </div>
                    ))}
                </div>

                {/* FILTER (optional ready) */}
                {/* <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => changeFilter('harian')}
                        className="px-3 py-1 text-sm rounded bg-blue-500 text-white"
                    >
                        Harian
                    </button>

                    <button
                        onClick={() => changeFilter('bulanan')}
                        className="px-3 py-1 text-sm rounded bg-purple-500 text-white"
                    >
                        Bulanan
                    </button>
                </div> */}

                {/* TABLE WRAPPER */}
                <div className="bg-white rounded-lg shadow overflow-hidden">

                    {/* DESKTOP TABLE */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="p-3">User</th>
                                    <th>PS</th>
                                    <th>Total</th>
                                    <th>Metode</th>
                                    <th>Tanggal</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.data.map(trx => (
                                    <tr key={trx.id} className="border-t text-center hover:bg-gray-50">
                                        <td className="p-3">
                                            {trx.booking.user?.name || trx.booking.nama_user}
                                        </td>
                                        <td>{trx.booking.ps_unit?.nama_ps}</td>
                                        <td>Rp {trx.total_harga}</td>
                                        <td>{trx.metode_pembayaran}</td>
                                        <td>
                                            {new Date(trx.created_at).toLocaleString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* MOBILE CARD */}
                    <div className="md:hidden space-y-3 p-3">
                        {transactions.data.map(trx => (
                            <div
                                key={trx.id}
                                className="border rounded-lg p-3 space-y-1"
                            >
                                <div className="flex justify-between">
                                    <span className="font-semibold text-sm">
                                        {trx.booking.user?.name || trx.booking.nama_user}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {trx.metode_pembayaran}
                                    </span>
                                </div>

                                <p className="text-sm">
                                    🎮 {trx.booking.ps_unit?.nama_ps}
                                </p>

                                <p className="text-sm font-semibold">
                                    Rp {trx.total_harga}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {new Date(trx.created_at).toLocaleString('id-ID')}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PAGINATION */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {transactions.links.map((link, i) => (
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