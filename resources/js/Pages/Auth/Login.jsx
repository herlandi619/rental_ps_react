import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import Swal from "sweetalert2";

export default function Login({ status }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Login Berhasil 🎉",
                    text: "Masuk ke dashboard...",
                    confirmButtonColor: "#22c55e",
                }).then(() => {
                    window.location.href = route("dashboard");
                });
            },
            onError: () => {
                Swal.fire({
                    icon: "error",
                    title: "Login Gagal 😢",
                    text: "Email atau password salah",
                    confirmButtonColor: "#ef4444",
                });
            },
            onFinish: () => reset("password"),
        });
    };

    return (
        <>
            <Head title="Login — Rental PS" />

            <div
                className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)' }}
            >
                {/* glow blobs */}
                <div className="absolute top-[-80px] left-[-80px] w-[350px] h-[350px] rounded-full opacity-20"
                     style={{ background: 'radial-gradient(circle, #3b82f6, #22c55e)', animation: 'blob 8s ease-in-out infinite' }} />
                <div className="absolute bottom-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full opacity-20"
                     style={{ background: 'radial-gradient(circle, #22c55e, #3b82f6)', animation: 'blob 8s ease-in-out infinite 4s' }} />

                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap');
                    * { font-family: 'Poppins', sans-serif; }

                    @keyframes blob {
                        0%,100%{border-radius:60% 40% 30% 70% / 60% 30% 70% 40%;}
                        50%{border-radius:30% 60% 70% 40% / 50% 60% 30% 60%;}
                    }

                    .input-field{
                        width:100%;
                        background:rgba(255,255,255,.06);
                        border:1px solid rgba(255,255,255,.1);
                        border-radius:12px;
                        padding:12px 16px;
                        color:#fff;
                        outline:none;
                    }

                    .btn-primary{
                        width:100%;
                        padding:13px;
                        border-radius:12px;
                        font-weight:700;
                        color:#fff;
                        border:none;
                        background:linear-gradient(135deg,#3b82f6,#22c55e);
                        transition:0.2s;
                    }

                    .btn-primary:hover{
                        transform:translateY(-1px);
                    }

                    .glass-card{
                        background:rgba(255,255,255,.05);
                        backdrop-filter:blur(18px);
                        border:1px solid rgba(255,255,255,.1);
                    }
                `}</style>

                {/* CARD */}
                <div className="glass-card rounded-3xl w-full max-w-md p-8 sm:p-10 relative z-10">

                    {/* HEADER */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                             style={{ background: 'linear-gradient(135deg,#3b82f6,#22c55e)' }}>
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M7 10h10l2 5a3 3 0 01-3 4l-2-2H10l-2 2a3 3 0 01-3-4l2-5zM8 12h.01M16 12h.01"/>
                            </svg>
                        </div>

                        <p className="text-green-400 text-xs font-semibold uppercase tracking-widest">
                            PlayStation Rental
                        </p>

                        <h1 className="text-white font-bold text-3xl text-center mt-2">
                            Welcome Gamer 🎮
                        </h1>

                        <p className="text-white/40 text-sm mt-2 text-center">
                            Login untuk mengelola penyewaan PlayStation
                        </p>
                    </div>

                    {/* STATUS */}
                    {status && (
                        <div className="mb-4 text-green-400 text-sm">
                            {status}
                        </div>
                    )}

                    {/* FORM */}
                    <form onSubmit={submit} className="space-y-5">

                        <div>
                            <label className="text-white/70 text-xs">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                className="input-field mt-2"
                                placeholder="admin@rentalps.com"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-2 text-red-400 text-xs"/>
                        </div>

                        <div>
                            <label className="text-white/70 text-xs">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                className="input-field mt-2"
                                placeholder="••••••••"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-2 text-red-400 text-xs"/>
                        </div>

                        <button type="submit" className="btn-primary" disabled={processing}>
                            {processing ? "Memproses..." : "Masuk ke Dashboard"}
                        </button>

                        <Link href={route('register')} className="block">
                            <button type="button" className="btn-primary mt-3">
                                Daftar Akun Baru
                            </button>
                        </Link>

                    </form>

                    <p className="text-center text-white/30 text-xs mt-6">
                        © 2026 Rental PlayStation Management System
                    </p>

                </div>
            </div>
        </>
    );
}