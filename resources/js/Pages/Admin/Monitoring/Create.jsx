import AdminLayout from "@/Layouts/AdminLayout";
import { useState } from "react";
import { router } from "@inertiajs/react";

export default function Create({ psUnits }) {

    const [form, setForm] = useState({
        nama_user: "",
        ps_id: "",
        jam_mulai: "",
        durasi: 1
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const submit = (e) => {
        e.preventDefault();
        router.post(route("admin.monitoring.store"), form);
    };

    return (
        <AdminLayout>

            <div className="p-4 md:p-6 flex justify-center">

                <div className="w-full max-w-xl bg-white rounded-lg shadow p-5 md:p-6 space-y-5">

                    {/* TITLE */}
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                            Create Booking Manual
                        </h1>
                        <p className="text-sm text-gray-500">
                            Tambahkan booking PS secara manual
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">

                        {/* USER */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Nama User
                            </label>
                            <input
                                type="text"
                                name="nama_user"
                                value={form.nama_user}
                                onChange={handleChange}
                                placeholder="Masukkan nama user"
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                required
                            />
                        </div>

                        {/* PS UNIT */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                PlayStation
                            </label>
                            <select
                                name="ps_id"
                                value={form.ps_id}
                                onChange={handleChange}
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                required
                            >
                                <option value="">-- Pilih PS --</option>
                                {psUnits.map(ps => (
                                    <option key={ps.id} value={ps.id}>
                                        {ps.nama_ps} ({ps.jenis_ps})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* JAM */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Jam Mulai
                                </label>
                                <input
                                    type="time"
                                    name="jam_mulai"
                                    value={form.jam_mulai}
                                    onChange={handleChange}
                                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div>

                            {/* <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Jam Selesai
                                </label>
                                <input
                                    type="time"
                                    name="jam_selesai"
                                    value={form.jam_selesai}
                                    onChange={handleChange}
                                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                    required
                                />
                            </div> */}

                            {/* DURASI */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Lama Main
                                </label>

                                <select
                                    name="durasi"
                                    value={form.durasi}
                                    onChange={handleChange}
                                    className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                >
                                    {[1,2,3,4,5,6,7,8].map(jam => (
                                        <option key={jam} value={jam}>
                                            {jam} Jam
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>

                        {/* BUTTON */}
                        <div className="flex flex-col md:flex-row gap-2 pt-2">

                            <button
                                type="button"
                                onClick={() => router.get(route("admin.monitoring"))}
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