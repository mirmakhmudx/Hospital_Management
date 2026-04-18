<?php

namespace App\Http\Controllers;

use App\Http\Requests\DoctorRequest;
use App\Http\Requests\DoctorUpdateRequest;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DoctorController extends Controller
{
    public function index(Request $request)
    {
        $query = Doctor::query();

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('first_name', 'like', '%' . $request->search . '%')
                    ->orWhere('last_name', 'like', '%' . $request->search . '%')
                    ->orWhere('specialization', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('specialization')) {
            $query->where('specialization', $request->specialization);
        }

        $doctors = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Doctors/index', [
            'doctors'          => $doctors,
            'filters'          => $request->only(['search', 'specialization']),
            'specializations'  => Doctor::distinct()->pluck('specialization'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Doctors/create');
    }
    public function store(DoctorRequest $request)
    {
        Doctor::create($request->validated());
        return redirect()->route('doctors.index')->with('success','Doctor created successfully');
    }

    public function show(Doctor $doctor)
    {
        return Inertia::render('Doctors/show', ['doctor' => $doctor,]);
    }


    public function edit(Doctor $doctor)
    {
        return Inertia::render('Doctors/edit',['doctor'=>$doctor]);

    }
    public function update(DoctorUpdateRequest $request, Doctor $doctor)
    {
        $doctor->update($request->validated());
        return redirect()->route('doctors.index')->with('success','Doctor updated successfully');

    }
    public function destroy(Doctor $doctor)
    {
        $doctor->delete();
        return redirect()->route('doctors.index')->with('success','Doctor deleted successfully');

    }

}
