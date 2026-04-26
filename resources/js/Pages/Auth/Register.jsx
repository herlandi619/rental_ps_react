import InputError from '@/Components/InputError';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Register() {
    const { flash } = usePage().props; // ambil flash dari backend

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    // 🔥 Sweet Alert ketika register sukses
    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                title: 'Berhasil 🎉',
                text: flash.success,
                icon: 'success',
                confirmButtonColor: '#22c55e',
            });
        }
    }, [flash]);

    return (
        <>
            <Head title="Register — Rental PS" />

            <div
                className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg,#020617,#0f172a,#020617)' }}
            >
                {/* glow blobs */}
                <div className="absolute top-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full opacity-20"
                     style={{ background: 'radial-gradient(circle,#3b82f6,#22c55e)', animation:'blob 8s infinite'}}/>
                <div className="absolute bottom-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full opacity-20"
                     style={{ background: 'radial-gradient(circle,#22c55e,#3b82f6)', animation:'blob 8s infinite 4s'}}/>

                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap');
                    *{font-family:Poppins}
                    @keyframes blob{
                        0%,100%{border-radius:60% 40% 30% 70% / 60% 30% 70% 40%;}
                        50%{border-radius:30% 60% 70% 40% / 50% 60% 30% 60%;}
                    }
                    .glass{
                        background:rgba(255,255,255,.05);
                        backdrop-filter:blur(18px);
                        border:1px solid rgba(255,255,255,.1);
                    }
                    .input{
                        width:100%;padding:12px;border-radius:12px;
                        background:rgba(255,255,255,.06);
                        border:1px solid rgba(255,255,255,.1);
                        color:white;margin-top:6px;
                    }
                    .btn{
                        width:100%;padding:13px;border-radius:12px;
                        font-weight:700;color:white;
                        background:linear-gradient(135deg,#3b82f6,#22c55e);
                        margin-top:10px;
                    }
                `}</style>

                <div className="glass rounded-3xl w-full max-w-md p-8">

                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-white">Create Gamer Account 🎮</h1>
                        <p className="text-white/40 text-sm mt-2">
                            Daftar untuk mengelola penyewaan PlayStation
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">

                        <div>
                            <label className="text-white/70 text-xs">Nama Lengkap</label>
                            <input
                                value={data.name}
                                className="input"
                                onChange={(e)=>setData('name',e.target.value)}
                            />
                            <InputError message={errors.name} className="text-red-400 text-xs mt-1"/>
                        </div>

                        <div>
                            <label className="text-white/70 text-xs">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                className="input"
                                onChange={(e)=>setData('email',e.target.value)}
                            />
                            <InputError message={errors.email} className="text-red-400 text-xs mt-1"/>
                        </div>

                        <div>
                            <label className="text-white/70 text-xs">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                className="input"
                                onChange={(e)=>setData('password',e.target.value)}
                            />
                            <InputError message={errors.password} className="text-red-400 text-xs mt-1"/>
                        </div>

                        <div>
                            <label className="text-white/70 text-xs">Konfirmasi Password</label>
                            <input
                                type="password"
                                value={data.password_confirmation}
                                className="input"
                                onChange={(e)=>setData('password_confirmation',e.target.value)}
                            />
                        </div>

                        <button className="btn">
                            {processing ? 'Memproses...' : 'Daftar Sekarang'}
                        </button>
                    </form>

                    <p className="text-center text-white/40 text-sm mt-6">
                        Sudah punya akun?{' '}
                        <Link href={route('login')} className="text-green-400 font-semibold">
                            Login disini
                        </Link>
                    </p>

                </div>
            </div>
        </>
    );
}