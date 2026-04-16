<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class RoomsRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'room_number'   => 'required|string|unique:rooms,room_number',
            'type'          => 'required|in:general,private,icu,emergency,operation',
            'capacity'      => 'required|integer|min:1',
            'occupied'      => 'required|integer|min:0',
            'status'        => 'required|in:available,full,maintenance',
            'price_per_day' => 'required|integer|min:0',
            'notes'         => 'nullable|string',
        ];
    }
}
