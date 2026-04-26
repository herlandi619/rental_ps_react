<?php

use App\Http\Controllers\Admin\AdminCheckinController;
use App\Http\Controllers\Admin\AdminDashboardLaporanController;
use App\Http\Controllers\Admin\AdminFinishController;
use App\Http\Controllers\Admin\AdminMonitoringController;
use App\Http\Controllers\Admin\AdminNotificationController;
use App\Http\Controllers\Admin\AdminPaymentController;
use App\Http\Controllers\Admin\AdminReportController;
use App\Http\Controllers\Admin\AdminSettingController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PsUnitController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\UserBookingController;
use App\Http\Controllers\User\UserDashboardController;
use App\Http\Controllers\User\UserHistoryController;
use App\Http\Controllers\User\UserProfileController;
use App\Http\Controllers\User\UserPsController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });


Route::middleware(['auth', 'role:admin'])
    ->prefix('admin')
    ->group(function () {

        // // profile
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // DASHBOARD
        Route::get('/AdminDashboard', [DashboardController::class, 'index'])
            ->name('admin.dashboard');

        // KELOLA DATA PS
        Route::get('/kelolaPS', [PsUnitController::class, 'index'])->name('ps.index');
        Route::get('/kelolaPS/create', [PsUnitController::class, 'create'])->name('ps.create');
        Route::post('/kelolaPS/store', [PsUnitController::class, 'store'])->name('ps.store');

        Route::get('/kelolaPS/edit/{id}', [PsUnitController::class, 'edit'])->name('ps.edit');
        Route::put('/kelolaPS/update/{id}', [PsUnitController::class, 'update'])->name('ps.update');

        Route::delete('/kelolaPS/delete/{id}', [PsUnitController::class, 'destroy'])->name('ps.delete');

        // MANAJEMEN BOOKING
        Route::get('/bookings', [BookingController::class,'index'])->name('admin.bookings');
        Route::post('/bookings/{id}/confirm', [BookingController::class,'confirm'])->name('booking.confirm');
        Route::post('/bookings/{id}/reject', [BookingController::class,'reject'])->name('booking.reject');
                // Terlambat
        Route::get('/bookings/terlambat', [BookingController::class, 'terlambat'])
        ->name('admin.bookings.terlambat');


        // CHECKIN USER
        // halaman check-in
            Route::get('/checkin', [AdminCheckinController::class,'index'])->name('admin.checkin');
            Route::post('/checkin/{id}', [AdminCheckinController::class,'process'])->name('admin.checkin.process');
            Route::post('/batal/{id}', [AdminCheckinController::class,'batal'])->name('admin.batal.process');
            Route::post('/admin/bookings/{id}/gagalkan', [AdminCheckinController::class, 'gagalkan'])->name('admin.gagalkan.process');

        // ADMIN MONITORING
        Route::get('/monitoring', [AdminMonitoringController::class,'index'])
            ->name('admin.monitoring');

        Route::post('/monitoring/{id}/main', [AdminMonitoringController::class,'main'])
            ->name('admin.monitoring.main');

        Route::get('/monitoring/create', [AdminMonitoringController::class, 'create'])
            ->name('admin.monitoring.create');

        Route::post('/monitoring', [AdminMonitoringController::class, 'store'])
            ->name('admin.monitoring.store');

        Route::delete('/monitoring/{id}', [AdminMonitoringController::class, 'destroy'])
            ->name('admin.monitoring.destroy');
        
        

        // ADMIN FINISH MONITORING
        // Route::get('/admin/finish', [AdminFinishController::class,'index'])
        //     ->name('admin.finish');

        // Route::post('/admin/finish/{id}', [AdminFinishController::class,'finish'])
        //     ->name('admin.finish.process');

        // PEMBAYARAN
        Route::get('/pembayaran', [AdminPaymentController::class,'index'])
            ->name('admin.pembayaran');

        Route::get('/pembayaran/{id}/edit', [AdminPaymentController::class, 'edit'])
            ->name('admin.pembayaran.edit');

        Route::put('/pembayaran/{id}', [AdminPaymentController::class, 'update'])
            ->name('admin.pembayaran.update');

        Route::post('/pembayaran/{id}/cash', [AdminPaymentController::class,'payCash'])
            ->name('admin.pembayaran.cash');

        Route::post('/pembayaran/{id}/qris', [AdminPaymentController::class,'payQris'])
            ->name('admin.pembayaran.qris');

        // ADMIN DASHBOARD DAN LAPORAN
         Route::get('/dashboardLaporan', [AdminDashboardLaporanController::class,'index'])
        ->name('admin.dashboardLaporan');

        // Kelola USer
        Route::get('/users', [AdminUserController::class,'index'])
        ->name('admin.users');

        Route::delete('/users/{id}', [AdminUserController::class,'destroy'])
            ->name('admin.users.delete');

        Route::post('/users/{id}/block', [AdminUserController::class,'block'])
            ->name('admin.users.block');

        Route::post('/users/{id}/unblock', [AdminUserController::class,'unblock'])
            ->name('admin.users.unblock');

        // NOTIFKASI
        Route::get('/notifications', [AdminNotificationController::class,'index'])
            ->name('admin.notifications');

        // LAPORAN PDF
        Route::get('/laporan', [AdminReportController::class,'index'])
            ->name('admin.laporan');

        Route::get('/laporan/download', [AdminReportController::class,'download'])->name('admin.laporan.download');

        // SETTING
        Route::get('/settings', [AdminSettingController::class,'index'])
            ->name('admin.settings');

        Route::post('/settings/update', [AdminSettingController::class,'update'])
            ->name('admin.settings.update');

});

Route::middleware(['auth', 'role:user'])
    ->prefix('user')
    ->group(function () {

        // DASHBOARD
        Route::get('/UserDashboard', [UserDashboardController::class, 'index'])
            ->name('user.dashboard');

        // Melihat Daftar PS
        Route::get('/ps', [UserPsController::class, 'index'])->name('user.ps.index');

        // BOOKING PS
        // Route::get('/booking', [UserBookingController::class,'index'])->name('user.booking.index');
        Route::get('/booking/create/{ps}', [UserBookingController::class,'create'])->name('user.booking.create');
        Route::post('/booking', [UserBookingController::class,'store'])->name('user.booking.store');

        // RIWAYAT
        Route::get('/history-booking', [UserHistoryController::class,'history'])->name('user.booking.history');
        Route::patch('/user/booking/{booking}/cancel', [UserHistoryController::class, 'cancel'])->name('user.booking.cancel');
        Route::patch('/user/booking/{booking}/fail', [UserHistoryController::class, 'fail'])->name('user.booking.fail');

        // PROFILE
        Route::get('/profile', [ProfileController::class, 'edit'])->name('user.profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('user.profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('user.profile.destroy');
});

require __DIR__.'/auth.php';
