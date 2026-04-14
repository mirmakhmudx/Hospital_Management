<?php
namespace App\Http\Controllers;

use App\Http\Requests\PatientRequest;
use App\Http\Requests\PatientUpdateRequest;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index()
    {
        $patients = Patient::latest()->paginate(10);
        return Inertia::render('Patients/index',['patients'=>$patients]);
    }

    public function create()
    {
        return Inertia::render('Patients/create');
    }

    public function store(PatientRequest $request)
    {
        Patient::create($request->validated());
        return redirect()->route('patients.index')->with('success','Patient created successfully');

    }
    public function show(Patient $patient)
    {
        return Inertia::render('Patients/show',['patient'=>$patient]);
    }

    public function edit(Patient $patient)
    {
        return Inertia::render('Patients/edit',['patient'=>$patient]);
    }

    public function update(PatientUpdateRequest $request, string $id)
    {
        $patient = Patient::find($id);
        $patient->update($request->validated());
        return redirect()->route('patients.index')->with('success','Patient updated successfully');
    }

    public function destroy(Patient $patient)
    {
        $patient->delete();
        return redirect()->route('patients.index')->with('success','Patient deleted successfully');
    }
}
