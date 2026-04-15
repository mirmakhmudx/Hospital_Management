<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'specialization',
        'phone',
        'email',
        'gender',
        'status',
        'bio',
    ];
}
