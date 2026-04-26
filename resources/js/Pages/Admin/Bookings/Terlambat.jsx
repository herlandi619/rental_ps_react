import AdminLayout from "@/Layouts/AdminLayout";
import { router, Link } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

export default function Terlambat({ bookings, filters, flash }) {

    const [search, setSearch] = useState(filters.search || '')

    // SweetAlert
    useEffect(() => {
        if (flash?.success) {
            Swal.fire('Berhasil', flash.success, 'success')
        }
        if (flash?.error) {
            Swal.fire('Error', flash.error, 'error')
        }
    }, [flash])

    // Search
    const handleSearch = (e) => {
        e.preventDefault()

        router.get(route('admin.bookings.terlambat'), {
            search
        }, {
            preserveState: true,
            replace: true
        })
    }

    return (
        <AdminLayout title="Monitoring Keterlambatan">

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">
                    Monitoring Booking Terlambat
                </h1>

                {/* HEADER ACTION */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                    {/* SEARCH */}
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Cari user / PS..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border p-2 rounded w-full md:w-72"
                        />
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                            Cari
                        </button>
                    </form>

                    {/* BUTTON BACK */}
                    <Link
                        href={route('admin.bookings')}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-center"
                    >
                        ← Kembali ke Manajemen Booking
                    </Link>

                </div>


                {/* 📊 TABLE */}
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-2">User</th>
                                <th className="p-2">PS</th>
                                <th className="p-2">Tanggal</th>
                                <th className="p-2">Jam</th>
                                <th className="p-2">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookings.data.length > 0 ? (
                                bookings.data.map((b) => (
                                    <tr key={b.id} className="text-center border-t">
                                        <td className="p-2">{b.user?.name || "-"}</td>
                                        {/* <td className="p-2">{b.psUnit?.nama_ps || "-"}</td> */}
                                        <td>{b.ps_unit?.nama_ps || "-"}</td>
                                        <td className="p-2">{b.tanggal}</td>
                                        <td className="p-2">
                                            {b.jam_mulai} - {b.jam_selesai}
                                        </td>
                                        <td className="p-2 text-red-500 font-bold">
                                            {b.status}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center">
                                        Tidak ada data
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* 📄 PAGINATION */}
                <div className="mt-4 flex flex-wrap gap-2">
                    {bookings.links.map((link, i) => (
                        <button
                            key={i}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            onClick={() => link.url && router.get(link.url)}
                            className={`px-3 py-1 border rounded ${
                                link.active ? 'bg-blue-500 text-white' : ''
                            }`}
                            disabled={!link.url}
                        />
                    ))}
                </div>
            </div>

        </AdminLayout>
    )
}