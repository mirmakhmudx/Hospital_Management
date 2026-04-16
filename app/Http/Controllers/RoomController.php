<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomsRequest;
use App\Http\Requests\RoomsUpdateRequest;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index()
    {
        $rooms = Room::latest()->paginate(10);
        return inertia::render('Rooms/index', ['rooms' => $rooms]);
    }

    public function create()
    {
        return inertia::render('Rooms/create');
    }

    public function store(RoomsRequest $request)
    {
        Room::create($request->validated());
        return redirect()->route('rooms.index')->with('success', 'Xona muvaffaqiyatli qo\'shildi!');
    }

    public function show(Room $room)
    {
        return inertia::render('Rooms/show', ['room' => $room]);
    }

    public function edit(Room $room)
    {
        return inertia::render('Rooms/edit', ['room' => $room]);
    }

    public function update(RoomsUpdateRequest $request, Room $room)
    {
        $room->update($request->validated());
        return redirect()->route('rooms.index')->with('success', 'Xona ma\'lumotlari yangilandi!');
    }

    public function destroy(Room $room)
    {
        $room->delete();
        return redirect()->route('rooms.index')->with('success', 'Xona o\'chirildi!');    }
}
