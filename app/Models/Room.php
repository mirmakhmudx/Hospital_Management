<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = [
        'room_number',
        'type',
        'capacity',
        'occupied',
        'status',
        'price_per_day',
        'notes',
    ];
}
