<?php
namespace App\Http\Controllers;

use App\Http\Requests\PatientRequest;
use App\Http\Requests\PatientUpdateRequest;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $query = Patient::query();

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('first_name', 'like', '%' . $request->search . '%')
                    ->orWhere('last_name', 'like', '%' . $request->search . '%')
                    ->orWhere('phone', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('gender')) {
            $query->where('gender', $request->gender);
        }

        $patients = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Patients/index', [
            'patients' => $patients,
            'filters'  => $request->only(['search', 'gender']),
        ]);
    }

    public function create()
    {
        abort_unless(auth()->user()->can('create patients'), 403);
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
