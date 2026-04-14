<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class PatientUpdateRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'first_name'    => 'required|string|max:255',
            'last_name'     => 'required|string|max:255',
            'gender'        => 'required|in:male,female',
            'date_of_birth' => 'required|date',
            'phone'         => 'required|string|max:20',
            'email'         => 'nullable|email',
            'address'       => 'nullable|string',
            'notes'         => 'nullable|string',
        ];
    }
}
