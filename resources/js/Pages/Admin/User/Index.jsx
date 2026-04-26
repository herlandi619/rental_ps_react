import AdminLayout from "@/Layouts/AdminLayout";
import { router } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Index({ users, filters, flash }) {

    const handleSearch = (e) => {
        router.get(
            route("admin.users"),
            { search: e.target.value },
            { preserveState: true, replace: true }
        );
    };

    const deleteUser = (id) => {
        Swal.fire({
            title: "Hapus user?",
            text: "Data tidak bisa dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!"
        }).then((res) => {
            if (res.isConfirmed) {
                router.delete(route("admin.users.delete", id));
            }
        });
    };

    const toggleStatus = (id, isActive) => {
        const action = isActive ? "Block" : "Unblock";
        const routeName = isActive
            ? "admin.users.block"
            : "admin.users.unblock";

        Swal.fire({
            title: `${action} user?`,
            text: "Status login user akan berubah",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: `Ya, ${action}`
        }).then((res) => {
            if (res.isConfirmed) {
                router.post(route(routeName, id));
            }
        });
    };

    useEffect(() => {
        if (flash?.success) Swal.fire("Berhasil", flash.success, "success");
        if (flash?.error) Swal.fire("Error", flash.error, "error");
    }, [flash]);

    const RoleBadge = ({ role }) => (
        <span className={`px-2 py-1 rounded text-white text-xs ${role === "admin" ? "bg-purple-600" : "bg-gray-500"}`}>
            {role}
        </span>
    );

    const StatusBadge = ({ isActive }) => (
        isActive ? (
            <span className="text-green-600 font-semibold text-xs bg-green-100 px-2 py-1 rounded">
                Active
            </span>
        ) : (
            <span className="text-red-600 font-semibold text-xs bg-red-100 px-2 py-1 rounded">
                Blocked
            </span>
        )
    );

    return (
        <AdminLayout title="Manajemen User">

            <div className="p-4 md:p-6 space-y-5">

                {/* HEADER */}
                <h1 className="text-xl md:text-2xl font-bold">
                    👥 Manajemen User
                </h1>

                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Cari nama / email..."
                    defaultValue={filters.search}
                    onChange={handleSearch}
                    className="border px-3 py-2 rounded-lg w-full md:w-72 focus:outline-none focus:ring"
                />

                {/* DESKTOP TABLE */}
                <div className="hidden md:block bg-white shadow rounded-lg overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="p-3">Nama</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.data.length > 0 ? users.data.map(user => (
                                <tr key={user.id} className="border-t hover:bg-gray-50 text-center">

                                    <td className="p-3 font-semibold">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td><RoleBadge role={user.role} /></td>
                                    <td><StatusBadge isActive={user.is_active} /></td>

                                    <td>
                                        <div className="flex justify-center gap-2">

                                            <button
                                                onClick={() => toggleStatus(user.id, user.is_active)}
                                                className={`px-3 py-1 rounded text-white text-xs ${user.is_active ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"}`}
                                            >
                                                {user.is_active ? "Block" : "Unblock"}
                                            </button>

                                            <button
                                                onClick={() => deleteUser(user.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center">
                                        Tidak ada data user
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* MOBILE CARD */}
                <div className="md:hidden space-y-3">
                    {users.data.length > 0 ? users.data.map(user => (
                        <div key={user.id} className="bg-white rounded-lg shadow p-4 space-y-2">

                            <div className="flex justify-between">
                                <span className="font-semibold">{user.name}</span>
                                <StatusBadge isActive={user.is_active} />
                            </div>

                            <p className="text-sm">📧 {user.email}</p>
                            <div><RoleBadge role={user.role} /></div>

                            <div className="flex gap-2 pt-2">

                                <button
                                    onClick={() => toggleStatus(user.id, user.is_active)}
                                    className={`flex-1 px-3 py-2 rounded text-white text-sm ${user.is_active ? "bg-yellow-500" : "bg-green-500"}`}
                                >
                                    {user.is_active ? "Block" : "Unblock"}
                                </button>

                                <button
                                    onClick={() => deleteUser(user.id)}
                                    className="flex-1 bg-red-500 text-white py-2 rounded text-sm"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    )) : (
                        <div className="text-center text-gray-500">Tidak ada data user</div>
                    )}
                </div>

                {/* PAGINATION */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {users.links.map((link, i) => (
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