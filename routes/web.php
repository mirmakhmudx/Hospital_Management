<?php

use App\Http\Controllers\ProfileController;
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

Route::get('/dashboard', function() {return Inertia::render('Dashboard');})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('patients', \App\Http\Controllers\PatientController::class);
    Route::resource('doctors', \App\Http\Controllers\DoctorController::class);
    Route::resource('appointments', \App\Http\Controllers\AppointmentController::class);
    Route::resource('medical-records', \App\Http\Controllers\MedicalRecordController::class);

    // MAXSUS marshrutlar har doim Resource'dan TEPADA bo'lishi kerak
    Route::get('bills/{bill}/pay', [\App\Http\Controllers\BillController::class, 'pay'])->name('bills.pay');
    Route::post('bills/{bill}/pay', [\App\Http\Controllers\BillController::class, 'processPayment'])->name('bills.pay.process');

    // Keyin Resource
    Route::resource('bills', \App\Http\Controllers\BillController::class);


});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__.'/auth.php';
