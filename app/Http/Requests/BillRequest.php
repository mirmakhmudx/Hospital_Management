<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class BillRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'patient_id'     => 'required|exists:patients,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'amount'         => 'required|numeric|min:0',
            'status'         => 'required|in:unpaid,paid,cancelled',
            'description'    => 'nullable|string|max:255',
            'due_date'       => 'nullable|date',
            'paid_date'      => 'nullable|date',
        ];
    }
}
