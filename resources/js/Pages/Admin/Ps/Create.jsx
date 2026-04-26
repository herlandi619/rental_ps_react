import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Create() {

    const { data, setData, post, processing, errors } = useForm({
        nama_ps: '',
        jenis_ps: '',
        harga_per_jam: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('ps.store'));
    };

    return (
        <AdminLayout>

            <div className="p-4 md:p-6 flex justify-center">

                <div className="w-full max-w-xl bg-white rounded-lg shadow p-5 md:p-6 space-y-5">

                    {/* TITLE */}
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                            Tambah Data PS
                        </h1>
                        <p className="text-sm text-gray-500">
                            Tambahkan unit PlayStation baru ke sistem
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">

                        {/* NAMA */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Nama PS
                            </label>
                            <input
                                type="text"
                                value={data.nama_ps}
                                onChange={e => setData('nama_ps', e.target.value)}
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Contoh: PS 5 Ruang 1"
                            />
                            {errors.nama_ps && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.nama_ps}
                                </p>
                            )}
                        </div>

                        {/* JENIS */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Jenis PS
                            </label>
                            <select
                                value={data.jenis_ps}
                                onChange={e => setData('jenis_ps', e.target.value)}
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                <option value="">-- Pilih Jenis PS --</option>
                                <option value="PS3">PS3</option>
                                <option value="PS4">PS4</option>
                                <option value="PS5">PS5</option>
                            </select>
                            {errors.jenis_ps && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.jenis_ps}
                                </p>
                            )}
                        </div>

                        {/* HARGA */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Harga per Jam
                            </label>
                            <input
                                type="number"
                                value={data.harga_per_jam}
                                onChange={e => setData('harga_per_jam', e.target.value)}
                                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Contoh: 20000"
                            />
                            {errors.harga_per_jam && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.harga_per_jam}
                                </p>
                            )}
                        </div>

                        {/* BUTTON */}
                        <div className="flex flex-col md:flex-row gap-2 pt-2">

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </button>

                            <Link
                                href={route('ps.index')}
                                className="w-full md:w-auto text-center bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                            >
                                Kembali
                            </Link>

                        </div>

                    </form>

                </div>

            </div>

        </AdminLayout>
    );
}