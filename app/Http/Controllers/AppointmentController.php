<?php

namespace App\Http\Controllers;

use App\Http\Requests\AppointmentRequest;
use App\Http\Requests\AppointmentUpdateRequest;
use App\Models\Appointment;
use App\Models\Patient;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Appointment::with(['patient', 'doctor']);

        if ($request->filled('search')) {
            $query->whereHas('patient', function ($q) use ($request) {
                $q->where('first_name', 'like', '%' . $request->search . '%')
                    ->orWhere('last_name', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $appointments = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Appointments/index', [
            'appointments' => $appointments,
            'filters'      => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Appointments/create', [
            'patients' => Patient::select('id', 'first_name', 'last_name')->get(),
            'doctors'  => Doctor::select('id', 'first_name', 'last_name', 'specialization')->get(),
        ]);
    }

    public function show(Appointment $appointment)
    {
        $appointment->load(['patient', 'doctor']);
        return Inertia::render('Appointments/show', ['appointment' => $appointment,]);
    }

    public function store(AppointmentRequest $request)
    {
        Appointment::create($request->validated());

        return redirect()->route('appointments.index')->with('success', 'Muvaffaqiyatli saqlandi!');
    }

    public function edit(Appointment $appointment)
    {
        return Inertia::render('Appointments/edit', [
            'appointment' => $appointment->load(['patient', 'doctor']),
            'patients'    => Patient::select('id', 'first_name', 'last_name')->get(),
            'doctors'     => Doctor::select('id', 'first_name', 'last_name', 'specialization')->get(),
        ]);
    }

    public function update(AppointmentUpdateRequest $request, Appointment $appointment)
    {
        $appointment->update($request->validated());
        return redirect()->route('appointments.index')->with('success', 'Qabul ma\'lumotlari yangilandi!');
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        return redirect()->route('appointments.index')->with('success', 'Qabul o\'chirildi!');
    }

    public function complete(Appointment $appointment)
    {
        $appointment->update(['status' => 'completed']);
        return redirect()->back()->with('success', 'Qabul yakunlandi');
    }
}
