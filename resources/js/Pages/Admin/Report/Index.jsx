import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Index({ transactions, filters, flash }) {

    const search = (e) => {
        router.get(
            route("admin.laporan"),
            { search: e.target.value },
            { preserveState: true, replace: true }
        );
    };

    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const download = () => {
        if (!start || !end) {
            Swal.fire("Oops", "Pilih tanggal dulu", "warning");
            return;
        }

        const url = route("admin.laporan.download", {
            start,
            end,
        });

        window.open(url, "_blank");
    };

    useEffect(() => {
        if (flash?.error) Swal.fire("Oops", flash.error, "error");
    }, [flash]);

    const Card = ({ trx }) => (
        <div className="bg-white rounded-lg shadow p-4 space-y-2">
            <div className="flex justify-between text-sm">
                <span className="font-semibold">
                    {trx.booking.user ? trx.booking.user.name : trx.booking.nama_user}
                </span>
                <span className="text-gray-500 text-xs">
                    {new Date(trx.created_at).toLocaleString("id-ID")}
                </span>
            </div>

            <p className="text-sm">🎮 {trx.booking.ps_unit?.nama_ps}</p>

            <div className="flex justify-between text-sm">
                <span className="font-bold text-green-600">
                    Rp {trx.total_harga}
                </span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {trx.metode_pembayaran}
                </span>
            </div>
        </div>
    );

    return (
        <AdminLayout title="Laporan">
            <div className="p-4 md:p-6 space-y-6">

                <h1 className="text-xl md:text-2xl font-bold">
                    📊 Laporan Transaksi
                </h1>

                {/* DOWNLOAD */}
                <div className="bg-white p-4 rounded-lg shadow space-y-3 md:space-y-0 md:flex md:items-end md:gap-3 w-full md:w-fit">

                    <div>
                        <label className="text-sm">Tanggal Mulai</label>
                        <input
                            type="date"
                            onChange={(e) => setStart(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="text-sm">Tanggal Selesai</label>
                        <input
                            type="date"
                            onChange={(e) => setEnd(e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    <button
                        onClick={download}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full md:w-auto"
                    >
                        Download PDF
                    </button>

                </div>

                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Cari nama user..."
                    defaultValue={filters.search}
                    onChange={search}
                    className="border p-2 rounded w-full md:w-72"
                />

                {/* DESKTOP TABLE */}
                <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                            <tr className="text-center">
                                <th className="p-3">User</th>
                                <th>PS</th>
                                <th>Total</th>
                                <th>Metode</th>
                                <th>Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.data.length > 0 ? transactions.data.map(trx => (
                                <tr key={trx.id} className="border-t text-center">
                                    <td className="p-3">
                                        {trx.booking.user ? trx.booking.user.name : trx.booking.nama_user}
                                    </td>
                                    <td>{trx.booking.ps_unit?.nama_ps}</td>
                                    <td className="font-semibold">Rp {trx.total_harga}</td>
                                    <td>{trx.metode_pembayaran}</td>
                                    <td>{new Date(trx.created_at).toLocaleString("id-ID")}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center">
                                        Tidak ada data
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* MOBILE CARDS */}
                <div className="md:hidden space-y-3">
                    {transactions.data.length > 0 ? transactions.data.map(trx => (
                        <Card key={trx.id} trx={trx} />
                    )) : (
                        <div className="text-center text-gray-500">
                            Tidak ada data
                        </div>
                    )}
                </div>

                {/* PAGINATION */}
                <div className="flex flex-wrap gap-2">
                    {transactions.links.map((link, i) => (
                        <button
                            key={i}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            disabled={!link.url}
                            onClick={() => router.get(link.url)}
                            className={`px-3 py-1 border rounded text-sm ${link.active ? "bg-blue-500 text-white" : ""}`}
                        />
                    ))}
                </div>

            </div>
        </AdminLayout>
    );
}
 