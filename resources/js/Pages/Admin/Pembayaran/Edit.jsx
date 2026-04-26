import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Edit({ trx }) {

    const [form, setForm] = useState({
        metode_pembayaran: trx.metode_pembayaran || "",
        status: trx.status || "",
        total_harga: trx.total_harga || 0,
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        router.put(route("admin.pembayaran.update", trx.id), form);
    };

    return (
        <AdminLayout>

            <div className="p-4 md:p-6 flex justify-center">

                <div className="w-full max-w-xl bg-white rounded-lg shadow p-5 md:p-6 space-y-5">

                    {/* TITLE */}
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                            ✏️ Edit Transaksi
                        </h1>
                        <p className="text-sm text-gray-500">
                            Perbarui data pembayaran transaksi
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">

                        {/* METODE */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Metode Pembayaran
                            </label>
                            <select
                                name="metode_pembayaran"
                                value={form.metode_pembayaran}
                                onChange={handleChange}
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="">- pilih -</option>
                                <option value="cash">Cash</option>
                                <option value="qris">QRIS</option>
                            </select>
                        </div>

                        {/* STATUS */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="unpaid">Unpaid</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>

                        {/* TOTAL */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Total Harga
                            </label>
                            <input
                                type="number"
                                name="total_harga"
                                value={form.total_harga}
                                onChange={handleChange}
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* BUTTON */}
                        <div className="flex flex-col md:flex-row gap-2 pt-2">

                            <button
                                type="button"
                                onClick={() => router.get(route("admin.pembayaran"))}
                                className="w-full md:w-auto bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                            >
                                Batal
                            </button>

                            <button
                                type="submit"
                                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            >
                                Simpan
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
}