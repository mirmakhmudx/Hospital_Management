<?php

namespace App\Http\Controllers;

use App\Http\Requests\DoctorRequest;
use App\Http\Requests\DoctorUpdateRequest;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DoctorController extends Controller
{
    public function index()
    {
        $doctors = Doctor::latest()->paginate(10);
        return Inertia::render('Doctors/index', [
            'doctors' => $doctors
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
        return Inertia::render('Doctors/show', [
            'doctor' => $doctor,
        ]);
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
