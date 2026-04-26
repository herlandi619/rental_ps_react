import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard(props) {

    const stats = [
        { label: 'Total PS', value: '20' },
        { label: 'Booking Hari Ini', value: '12' },
        { label: 'Total User', value: '50' },
        { label: 'Pendapatan', value: 'Rp 500.000' },
    ];

    return (
        <AdminLayout auth={props.auth} title="Dashboard">

            <Head title="Dashboard Admin" />

            {/* GRID RESPONSIVE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {stats.map(s => (
                    <div
                        key={s.label}
                        className="
                            bg-white
                            border border-gray-200
                            rounded-xl
                            p-5
                            shadow-sm
                            hover:shadow-md
                            transition
                        "
                    >
                        <p className="text-sm text-gray-500">
                            {s.label}
                        </p>

                        <p className="text-2xl font-semibold text-gray-800 mt-2">
                            {s.value}
                        </p>
                    </div>
                ))}

            </div>

        </AdminLayout>
    );
}