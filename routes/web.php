<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    if (auth()->check()) {return redirect()->route('dashboard');}
    return redirect()->route('login');});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('patients', \App\Http\Controllers\PatientController::class);
    Route::resource('doctors', \App\Http\Controllers\DoctorController::class);
    Route::resource('appointments', \App\Http\Controllers\AppointmentController::class);
    Route::resource('medical-records', \App\Http\Controllers\MedicalRecordController::class);
    Route::get('medical-records/{medicalRecord}/pdf', [\App\Http\Controllers\MedicalRecordController::class, 'downloadPdf'])->name('medical-records.pdf');
    Route::get('bills/{bill}/pay', [\App\Http\Controllers\BillController::class, 'pay'])->name('bills.pay');
    Route::post('bills/{bill}/pay', [\App\Http\Controllers\BillController::class, 'processPayment'])->name('bills.pay.process');
    Route::resource('bills', \App\Http\Controllers\BillController::class);
    Route::resource('rooms', \App\Http\Controllers\RoomController::class);

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__.'/auth.php';
