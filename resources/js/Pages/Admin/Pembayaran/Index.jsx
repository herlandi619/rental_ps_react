import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Index({ transactions, filters, flash }) {

    const search = (e) => {
        router.get(
            route("admin.payments"),
            { search: e.target.value },
            { preserveState: true, replace: true }
        );
    };

    const pay = (id, method) => {
        Swal.fire({
            title: "Konfirmasi pembayaran?",
            text: "Pastikan user sudah membayar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, bayar!",
        }).then((result) => {
            if (result.isConfirmed) {
                if (method === "cash") {
                    router.post(route("admin.pembayaran.cash", id));
                }

                if (method === "qris") {
                    router.post(route("admin.pembayaran.qris", id));
                }
            }
        });
    };

    useEffect(() => {
        if (flash?.success) Swal.fire("Berhasil", flash.success, "success");
        if (flash?.error) Swal.fire("Error", flash.error, "error");
    }, [flash]);

    return (
        <AdminLayout title="Manajemen Pembayaran">

            <div className="p-4 md:p-6 space-y-5">

                {/* HEADER */}
                <h1 className="text-xl md:text-2xl font-bold">
                    💰 Manajemen Pembayaran
                </h1>

                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Cari nama user..."
                    defaultValue={filters.search}
                    onChange={search}
                    className="border px-3 py-2 rounded-lg w-full md:w-72 focus:outline-none focus:ring"
                />

                {/* ================= DESKTOP TABLE ================= */}
                <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="p-3">User</th>
                                <th>PS</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions.data.map((trx) => (
                                <tr key={trx.id} className="border-t hover:bg-gray-50 text-center">

                                    <td className="p-3 font-medium">
                                        {trx.booking.user?.name || trx.booking.nama_user}
                                    </td>

                                    <td>{trx.booking.ps_unit?.nama_ps ?? "-"}</td>

                                    <td className="font-semibold">
                                        Rp {trx.total_harga}
                                    </td>

                                    <td>
                                        {trx.status === "paid" ? (
                                            <span className="text-green-600 font-semibold text-xs bg-green-100 px-2 py-1 rounded">
                                                Paid ({trx.metode_pembayaran})
                                            </span>
                                        ) : (
                                            <span className="text-red-600 font-semibold text-xs bg-red-100 px-2 py-1 rounded">
                                                Unpaid
                                            </span>
                                        )}
                                    </td>

                                    <td>
                                        <div className="flex justify-center gap-2">

                                            <button
                                                onClick={() => router.get(route("admin.pembayaran.edit", trx.id))}
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Edit
                                            </button>

                                            {trx.status === "unpaid" && (
                                                <>
                                                    <button
                                                        onClick={() => pay(trx.id, "cash")}
                                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                                                    >
                                                        CASH
                                                    </button>

                                                    <button
                                                        onClick={() => pay(trx.id, "qris")}
                                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                                                    >
                                                        QRIS
                                                    </button>
                                                </>
                                            )}

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ================= MOBILE CARD ================= */}
                <div className="md:hidden space-y-3">
                    {transactions.data.map((trx) => (
                        <div key={trx.id} className="bg-white rounded-lg shadow p-4 space-y-2">

                            <div className="flex justify-between">
                                <span className="font-semibold">
                                    {trx.booking.user?.name || trx.booking.nama_user}
                                </span>

                                {trx.status === "paid" ? (
                                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                                        Paid
                                    </span>
                                ) : (
                                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                        Unpaid
                                    </span>
                                )}
                            </div>

                            <p className="text-sm">🎮 {trx.booking.ps_unit?.nama_ps ?? "-"}</p>
                            <p className="text-sm font-semibold">💰 Rp {trx.total_harga}</p>

                            <div className="flex gap-2 pt-2">

                                <button
                                    onClick={() => router.get(route("admin.pembayaran.edit", trx.id))}
                                    className="flex-1 bg-yellow-500 text-white py-2 rounded"
                                >
                                    Edit
                                </button>

                                {trx.status === "unpaid" && (
                                    <>
                                        <button
                                            onClick={() => pay(trx.id, "cash")}
                                            className="flex-1 bg-green-500 text-white py-2 rounded"
                                        >
                                            CASH
                                        </button>

                                        <button
                                            onClick={() => pay(trx.id, "qris")}
                                            className="flex-1 bg-blue-500 text-white py-2 rounded"
                                        >
                                            QRIS
                                        </button>
                                    </>
                                )}

                            </div>

                        </div>
                    ))}
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