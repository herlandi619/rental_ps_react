import UserLayout from "@/Layouts/UserLayout";
import { router, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Index({ auth, psUnits, filters, flash }) {
    const [search, setSearch] = useState(filters.search || "");

    useEffect(() => {
        if (flash?.success) {
            Swal.fire("Berhasil", flash.success, "success");
        }
    }, [flash]);

    function handleSearch(e) {
        e.preventDefault();
        router.get("/ps", { search }, { preserveState: true });
    }

    return (
        <UserLayout user={auth.user}>
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">

                    {/* HEADER */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
                        <h1 className="text-xl sm:text-2xl font-bold">
                            Daftar PlayStation
                        </h1>
                    </div>

                    {/* ================= DESKTOP TABLE ================= */}
                    <div className="hidden md:block bg-white shadow rounded-2xl overflow-x-auto">
                        <table className="w-full text-sm min-w-[700px]">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-4 text-left">Nama</th>
                                    <th>Jenis</th>
                                    <th>Harga / Jam</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {psUnits.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center p-6">
                                            Data tidak ditemukan
                                        </td>
                                    </tr>
                                )}

                                {psUnits.data.map((ps) => (
                                    <tr key={ps.id} className="border-t hover:bg-gray-50">
                                        <td className="p-4 font-semibold">{ps.nama_ps}</td>
                                        <td>{ps.jenis_ps}</td>
                                        <td>Rp {ps.harga_per_jam}</td>
                                        <td>
                                            <span
                                                className={`px-2 py-1 rounded text-white text-xs ${
                                                    ps.status === "tersedia"
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            >
                                                {ps.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Link
                                                href={route("user.booking.create", ps.id)}
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
                                            >
                                                Booking
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* ================= MOBILE CARD ================= */}
                    <div className="md:hidden space-y-4">
                        {psUnits.data.length === 0 && (
                            <div className="bg-white p-6 rounded-xl shadow text-center">
                                Data tidak ditemukan
                            </div>
                        )}

                        {psUnits.data.map((ps) => (
                            <div key={ps.id} className="bg-white p-4 rounded-2xl shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="font-bold text-lg">{ps.nama_ps}</h2>
                                        <p className="text-sm text-gray-500">{ps.jenis_ps}</p>
                                    </div>

                                    <span
                                        className={`px-2 py-1 rounded text-white text-xs ${
                                            ps.status === "tersedia"
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                        }`}
                                    >
                                        {ps.status}
                                    </span>
                                </div>

                                <div className="mt-3 text-sm">
                                    <p>Harga : <b>Rp {ps.harga_per_jam} / jam</b></p>
                                </div>

                                <Link
                                    href={route("user.booking.create", ps.id)}
                                    className="block mt-4 bg-green-500 hover:bg-green-600 text-white text-center py-2 rounded-xl"
                                >
                                    Booking Sekarang
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* PAGINATION */}
                    <div className="mt-6 flex flex-wrap gap-2 justify-center sm:justify-end">
                        {psUnits.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 border rounded ${
                                    link.active ? "bg-blue-500 text-white" : "bg-white"
                                }`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </UserLayout>
    );
}