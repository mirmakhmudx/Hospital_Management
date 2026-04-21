<?php

namespace App\Http\Controllers;

use App\Http\Requests\MedicalRecordRequest;
use App\Http\Requests\MedicalRecordUpdateRequest;
use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\MedicalRecord;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;


class MedicalRecordController extends Controller
{
    public function index(Request $request)
    {
        $query = MedicalRecord::with(['patient', 'doctor']);

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('patient', function ($q2) use ($request) {
                    $q2->where('first_name', 'like', '%' . $request->search . '%')
                        ->orWhere('last_name', 'like', '%' . $request->search . '%');
                })->orWhere('diagnosis', 'like', '%' . $request->search . '%');
            });
        }

        $records = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('MedicalRecords/index', [
            'records' => $records,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('MedicalRecords/create', [
            'patients'     => Patient::select('id', 'first_name', 'last_name')->get(),
            'doctors'      => Doctor::select('id', 'first_name', 'last_name', 'specialization')->get(),
            'appointments' => Appointment::with(['patient', 'doctor'])->where('status', 'completed')->get(),
        ]);
    }

    public function store(MedicalRecordRequest $request)
    {
        MedicalRecord::create($request->validated());
        return redirect()->route('medical-records.index')->with('success', 'Tibbiy yozuv muvaffaqiyatli qo\'shildi!');
    }

    public function show(MedicalRecord $medicalRecord)
    {
        $medicalRecord->load('patient', 'doctor', 'appointment');
        return Inertia::render('MedicalRecords/show', ['record' =>$medicalRecord]);
    }

    public function edit(MedicalRecord $medicalRecord)
    {
        return Inertia::render('MedicalRecords/edit', [
            'record'       => $medicalRecord->load(['patient', 'doctor']),
            'patients'     => Patient::select('id', 'first_name', 'last_name')->get(),
            'doctors'      => Doctor::select('id', 'first_name', 'last_name', 'specialization')->get(),
            'appointments' => Appointment::with(['patient', 'doctor'])->where('status', 'completed')->get(),
        ]);
    }

    public function update(MedicalRecordUpdateRequest $request, MedicalRecord $medicalRecord)
    {
        return redirect()->route('medical-records.index')->with('success', 'Tibbiy yozuv yangilandi!');
    }


    public function destroy(MedicalRecord $medicalRecord)
    {
        $medicalRecord->delete();
        return redirect()->route('medical-records.index')->with('success', 'Tibbiy yozuv o\'chirildi!');
    }

    public function downloadPdf(MedicalRecord $medicalRecord)
    {
        $medicalRecord->load(['patient', 'doctor']);

        $pdf = Pdf::loadView('pdf.medical-record', [
            'record' => $medicalRecord,
        ]);
        return $pdf->download('tibbiy-yozuv-' . $medicalRecord->id . '.pdf');
    }

}
