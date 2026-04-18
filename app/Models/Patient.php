<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
    'first_name',
    'last_name',
    'gender',
    'date_of_birth',
    'phone',
    'email',
    'address',
    'notes',
];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
