import AdminLayout from "@/Layouts/AdminLayout";
import { router, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Index({ bookings, filters, flash }) {

    const [search,setSearch] = useState(filters.search || '')

    useEffect(()=>{
        if(flash?.success){
            Swal.fire("Berhasil", flash.success, "success")
        }
    },[flash])

    const handleSearch = (e)=>{
        e.preventDefault()
        router.get(route("admin.finish"),{search},{preserveState:true})
    }

    const handleFinish = (id)=>{
        Swal.fire({
            title:"Selesaikan sesi bermain?",
            text:"User akan selesai bermain & siap bayar",
            icon:"question",
            showCancelButton:true,
            confirmButtonText:"Ya, selesai"
        }).then(res=>{
            if(res.isConfirmed){
                router.post(route("admin.finish.process",id))
            }
        })
    }

    return(
    <AdminLayout title="Selesaikan Sesi">
    <div className="p-6">

        <h1 className="text-2xl font-bold mb-6">Selesaikan Sesi Bermain</h1>

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-6">
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    placeholder="Cari user / PS..."
                    className="border p-2 rounded"
                />
                <button className="bg-blue-500 text-white px-4 rounded">
                    Cari
                </button>
            </form>

            <Link href={route('admin.monitoring')}
                className="bg-gray-500 text-white px-4 py-2 rounded">
                ← Kembali Monitoring
            </Link>
        </div>

        {/* TABLE */}
        <div className="bg-white shadow rounded overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3">User</th>
                        <th>PS</th>
                        <th>Tanggal</th>
                        <th>Jam Main</th>
                        <th>Aksi</th>
                    </tr>
                </thead>

                <tbody>
                {bookings.data.length > 0 ? bookings.data.map(b=>(
                    <tr key={b.id} className="border-t text-center">
                        <td className="p-3">{b.user?.name}</td>
                        <td>{b.ps_unit?.nama_ps}</td>
                        <td>{b.tanggal}</td>
                        <td>{b.jam_mulai} - {b.jam_selesai}</td>
                        <td>
                            <button
                                onClick={()=>handleFinish(b.id)}
                                className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-xs">
                                Selesai
                            </button>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan="5" className="p-4 text-center">
                            Tidak ada user yang sedang bermain
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>

        {/* PAGINATION */}
        <div className="mt-4 flex gap-2">
            {bookings.links.map((link,i)=>(
                <button key={i}
                    dangerouslySetInnerHTML={{__html:link.label}}
                    disabled={!link.url}
                    onClick={()=>router.get(link.url)}
                    className="px-3 py-1 border rounded"/>
            ))}
        </div>

    </div>
    </AdminLayout>
    )
}