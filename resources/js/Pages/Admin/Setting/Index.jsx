import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Index({ setting, flash }) {

    const { data, setData, post, processing } = useForm({
        harga_default_per_jam: setting.harga_default_per_jam,
        batas_keterlambatan: setting.batas_keterlambatan,
        jam_buka: setting.jam_buka,
        jam_tutup: setting.jam_tutup,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.settings.update"));
    };

    // SWEET ALERT
    useEffect(() => {
        if (flash?.success) {
            Swal.fire("Berhasil", flash.success, "success");
        }
    }, [flash]);

    return (
        <AdminLayout>
            <div className="max-w-2xl bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-6">⚙️ Pengaturan Sistem</h1>

                <form onSubmit={submit} className="space-y-5">

                    {/* HARGA */}
                    <div>
                        <label className="block font-semibold mb-1">
                            Harga Default / Jam
                        </label>
                        <input
                            type="number"
                            value={data.harga_default_per_jam}
                            onChange={e => setData('harga_default_per_jam', e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    {/* KETERLAMBATAN */}
                    <div>
                        <label className="block font-semibold mb-1">
                            Batas Keterlambatan (menit)
                        </label>
                        <input
                            type="number"
                            value={data.batas_keterlambatan}
                            onChange={e => setData('batas_keterlambatan', e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    {/* JAM BUKA */}
                    <div>
                        <label className="block font-semibold mb-1">
                            Jam Buka
                        </label>
                        <input
                            type="time"
                            value={data.jam_buka}
                            onChange={e => setData('jam_buka', e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    {/* JAM TUTUP */}
                    <div>
                        <label className="block font-semibold mb-1">
                            Jam Tutup
                        </label>
                        <input
                            type="time"
                            value={data.jam_tutup}
                            onChange={e => setData('jam_tutup', e.target.value)}
                            className="border p-2 rounded w-full"
                        />
                    </div>

                    <button
                        disabled={processing}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        💾 Simpan Pengaturan
                    </button>

                </form>
            </div>
        </AdminLayout>
    );
}