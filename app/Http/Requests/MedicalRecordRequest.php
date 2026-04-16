<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class MedicalRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'patient_id'     => 'required|exists:patients,id',
            'doctor_id'      => 'required|exists:doctors,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'diagnosis'      => 'required|string|max:255',
            'prescription'   => 'nullable|string',
            'treatment'      => 'nullable|string',
            'notes'          => 'nullable|string',
            'record_date'    => 'required|date',
        ];
    }
}
