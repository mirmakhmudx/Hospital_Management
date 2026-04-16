import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { BedDouble, Plus, Eye, Pencil, Trash2 } from 'lucide-react';

const typeConfig = {
    general:   { label: 'Umumiy',      class: 'bg-blue-50 text-blue-700' },
    private:   { label: 'Xususiy',     class: 'bg-purple-50 text-purple-700' },
    icu:       { label: 'Reanimatsiya', class: 'bg-red-50 text-red-700' },
    emergency: { label: 'Shoshilinch', class: 'bg-orange-50 text-orange-700' },
    operation: { label: 'Operatsiya',  class: 'bg-pink-50 text-pink-700' },
};

const statusConfig = {
    available:   { label: 'Bo\'sh',       class: 'bg-green-50 text-green-700' },
    full:        { label: 'To\'liq band', class: 'bg-red-50 text-red-700' },
    maintenance: { label: 'Ta\'mirda',    class: 'bg-yellow-50 text-yellow-700' },
};

export default function Index({ rooms }) {
    function destroy(id) {
        if (confirm('Xonani o\'chirishni tasdiqlaysizmi?')) {
            router.delete(route('rooms.destroy', id));
        }
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BedDouble size={20} className="text-gray-600" />
                        <h2 className="text-lg font-semibold text-gray-800">Xonalar</h2>
                    </div>
                    <Link
                        href={route('rooms.create')}
                        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        <Plus size={16} />
                        Xona qo'shish
                    </Link>
                </div>
            }
        >
            <Head title="Xonalar" />

            {/* Cards ko'rinishida */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.data.length === 0 ? (
                    <div className="col-span-3 text-center py-16 text-gray-400">
                        Xonalar mavjud emas
                    </div>
                ) : (
                    rooms.data.map((room) => (
                        <div
                            key={room.id}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900">
                                    #{room.room_number}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusConfig[room.status].class}`}>
                                    {statusConfig[room.status].label}
                                </span>
                            </div>

                            {/* Type */}
                            <span className={`text-xs px-2 py-1 rounded-full font-medium w-fit ${typeConfig[room.type].class}`}>
                                {typeConfig[room.type].label}
                            </span>

                            {/* Capacity bar */}
                            <div>
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Band: {room.occupied}/{room.capacity}</span>
                                    <span>{Math.round((room.occupied / room.capacity) * 100)}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-gray-900 h-2 rounded-full transition-all"
                                        style={{ width: `${Math.min((room.occupied / room.capacity) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Price */}
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-900">
                                    {room.price_per_day.toLocaleString()} so'm
                                </span>
                                {' '}/kun
                            </p>

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-1 border-t border-gray-100">
                                <Link
                                    href={route('rooms.show', room.id)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <Eye size={16} />
                                </Link>
                                <Link
                                    href={route('rooms.edit', room.id)}
                                    className="text-yellow-500 hover:text-yellow-700"
                                >
                                    <Pencil size={16} />
                                </Link>
                                <button
                                    onClick={() => destroy(room.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AuthenticatedLayout>
    );
}
