import AdminLayout from '@/Layouts/AdminLayout';
import { router, usePage, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Index({ ps, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) {
            Swal.fire('Berhasil', flash.success, 'success');
        }
    }, [flash]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('ps.index'), { search });
    };

    const deleteData = (id) => {
        Swal.fire({
            title: 'Yakin hapus data ini?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('ps.delete', id));
            }
        });
    };

    return (
        <AdminLayout>

            <div className="p-4 md:p-6 space-y-5">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                        Data PS
                    </h1>

                    <Link
                        href={route('ps.create')}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center"
                    >
                        + Tambah PS
                    </Link>
                </div>

                {/* SEARCH */}
                <form
                    onSubmit={handleSearch}
                    className="flex flex-col md:flex-row gap-2"
                >
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari PS..."
                        className="border px-3 py-2 rounded-lg w-full md:w-1/3 focus:outline-none focus:ring"
                    />

                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                        Search
                    </button>
                </form>

                {/* ================= TABLE DESKTOP ================= */}
                <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="p-3 text-left">Nama</th>
                                <th className="p-3 text-left">Jenis</th>
                                <th className="p-3 text-left">Harga</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {ps.data.map((item) => (
                                <tr key={item.id} className="border-t hover:bg-gray-50">
                                    <td className="p-3 font-medium">{item.nama_ps}</td>
                                    <td className="p-3">{item.jenis_ps}</td>
                                    <td className="p-3">Rp {item.harga_per_jam}</td>
                                    <td className="p-3">{item.status}</td>
                                    <td className="p-3">
                                        <div className="flex gap-3 text-sm">
                                            <Link
                                                href={route('ps.edit', item.id)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => deleteData(item.id)}
                                                className="text-red-500 hover:underline"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ================= MOBILE CARD ================= */}
                <div className="md:hidden space-y-3">
                    {ps.data.map((item) => (
                        <div key={item.id} className="bg-white rounded-lg shadow p-4 space-y-2">

                            <div className="flex justify-between">
                                <span className="font-semibold">{item.nama_ps}</span>
                                <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                                    {item.status}
                                </span>
                            </div>

                            <p className="text-sm">🎮 {item.jenis_ps}</p>
                            <p className="text-sm font-semibold">Rp {item.harga_per_jam}</p>

                            <div className="flex gap-3 pt-2">
                                <Link
                                    href={route('ps.edit', item.id)}
                                    className="flex-1 text-center bg-blue-500 text-white py-2 rounded"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => deleteData(item.id)}
                                    className="flex-1 bg-red-500 text-white py-2 rounded"
                                >
                                    Hapus
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

                {/* PAGINATION */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {ps.links.map((link, i) => (
                        <button
                            key={i}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            onClick={() => router.visit(link.url)}
                            disabled={!link.url}
                            className={`px-3 py-1 border rounded text-sm hover:bg-gray-100 ${
                                link.active ? 'bg-blue-500 text-white border-blue-500' : ''
                            }`}
                        />
                    ))}
                </div>

            </div>

        </AdminLayout>
    );
}