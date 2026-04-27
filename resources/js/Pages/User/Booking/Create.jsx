import UserLayout from "@/Layouts/UserLayout";
import { useForm, Link, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import { useEffect } from "react";

export default function Create({ ps }) {

    const { data, setData, post, processing, errors } = useForm({
        ps_id: ps.id,
        tanggal: "",
        jam_mulai: "",
        durasi: 1,
    });

    function submit(e) {
        e.preventDefault();
        post(route("user.booking.store"));
    }

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            Swal.fire("Berhasil 🎉", flash.success, "success");

            // 🔥 reset form setelah booking berhasil
            setData({
                ps_id: ps.id,
                tanggal: "",
                jam_mulai: "",
                durasi: 1,
            });
        }

        if (flash.error) {
            Swal.fire("Gagal ❌", flash.error, "error");
        }
    }, [flash]);
 
    return (
        <UserLayout>
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-3xl mx-auto px-4 py-6">

                    {/* HEADER */}
                    <h1 className="text-xl sm:text-2xl font-bold mb-4">
                        Booking PlayStation
                    </h1>

                    {/* CARD INFO PS */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-5 shadow mb-6">
                        <p className="text-sm opacity-90">Kamu akan booking</p>
                        <h2 className="text-2xl font-bold">{ps.nama_ps}</h2>
                        <p className="text-sm mt-1">
                            Harga : Rp {ps.harga_per_jam} / jam
                        </p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={submit} className="bg-white p-5 sm:p-6 rounded-2xl shadow space-y-5">

                        {/* GRID INPUT */}
                        <div className="grid sm:grid-cols-2 gap-4">

                            {/* TANGGAL */}
                            <div>
                                <label className="block mb-1 font-semibold">
                                    Tanggal Booking
                                </label>
                                <input
                                    type="date"
                                    value={data.tanggal}
                                    onChange={(e) => setData("tanggal", e.target.value)}
                                    className="w-full border rounded-xl px-3 py-2"
                                />
                                {errors.tanggal && (
                                    <div className="text-red-500 text-sm">{errors.tanggal}</div>
                                )}
                            </div>

                            {/* JAM MULAI */}
                            <div>
                                <label className="block mb-1 font-semibold">
                                    Jam Mulai
                                </label>
                                <input
                                    type="time"
                                    value={data.jam_mulai}
                                    onChange={(e) => setData("jam_mulai", e.target.value)}
                                    className="w-full border rounded-xl px-3 py-2"
                                />
                                {errors.jam_mulai && (
                                    <div className="text-red-500 text-sm">{errors.jam_mulai}</div>
                                )}
                            </div>

                            {/* JAM SELESAI */}
                            {/* DURASI MAIN */}
                            <div className="sm:col-span-2">
                                <label className="block mb-1 font-semibold">
                                    Lama Main (Jam)
                                </label>

                                <select
                                    value={data.durasi}
                                    onChange={(e) => setData("durasi", e.target.value)}
                                    className="w-full border rounded-xl px-3 py-2"
                                >
                                    {[1,2,3,4,5,6,7,8].map(jam => (
                                        <option key={jam} value={jam}>
                                            {jam} Jam
                                        </option>
                                    ))}
                                </select>

                                {errors.durasi && (
                                    <div className="text-red-500 text-sm">{errors.durasi}</div>
                                )}
                            </div>

                        </div>

                        {/* BUTTON */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                disabled={processing}
                                className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-xl shadow"
                            >
                                Simpan Booking
                            </button>

                            <Link
                                href={route("user.ps.index")}
                                className="w-full sm:w-auto text-center bg-gray-400 hover:bg-gray-500 text-white px-6 py-2.5 rounded-xl"
                            >
                                Batal
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </UserLayout>
    );
}