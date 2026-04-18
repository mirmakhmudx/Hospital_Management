<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoomsRequest;
use App\Http\Requests\RoomsUpdateRequest;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index(Request $request)
    {
        $query = Room::query();

        if ($request->filled('search')) {
            $query->where('room_number', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $rooms = $query->latest()->paginate(12)->withQueryString();

        return Inertia::render('Rooms/index', [
            'rooms'   => $rooms,
            'filters' => $request->only(['search', 'type', 'status']),
        ]);
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
