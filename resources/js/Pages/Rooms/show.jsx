import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';

const typeConfig = {
    general:   { label: 'Umumiy',       class: 'bg-blue-50 text-blue-700' },
    private:   { label: 'Xususiy',      class: 'bg-purple-50 text-purple-700' },
    icu:       { label: 'Reanimatsiya', class: 'bg-red-50 text-red-700' },
    emergency: { label: 'Shoshilinch',  class: 'bg-orange-50 text-orange-700' },
    operation: { label: 'Operatsiya',   class: 'bg-pink-50 text-pink-700' },
};

const statusConfig = {
    available:   { label: 'Bo\'sh',       class: 'bg-green-50 text-green-700' },
    full:        { label: 'To\'liq band', class: 'bg-red-50 text-red-700' },
    maintenance: { label: 'Ta\'mirda',    class: 'bg-yellow-50 text-yellow-700' },
};

export default function Show({ room }) {
    const occupancyPercent = Math.round((room.occupied / room.capacity) * 100);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">Xona #{room.room_number}</h2>
                    <Link
                        href={route('rooms.edit', room.id)}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        <Pencil size={14} />
                        Tahrirlash
                    </Link>
                </div>
            }
        >
            <Head title={`Xona #${room.room_number}`} />

            <div className="max-w-2xl mx-auto space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5 text-sm">

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-400 mb-1">Xona raqami</p>
                            <p className="text-2xl font-bold text-gray-900">#{room.room_number}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 mb-1">Turi</p>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeConfig[room.type].class}`}>
                                {typeConfig[room.type].label}
                            </span>
                        </div>
                        <div>
                            <p className="text-gray-400 mb-1">Status</p>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusConfig[room.status].class}`}>
                                {statusConfig[room.status].label}
                            </span>
                        </div>
                        <div>
                            <p className="text-gray-400 mb-1">Narx</p>
                            <p className="font-medium text-gray-900">
                                {room.price_per_day.toLocaleString()} so'm/kun
                            </p>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Band holati */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Band holati</span>
                            <span className="font-medium text-gray-900">
                                {room.occupied} / {room.capacity} o'rin ({occupancyPercent}%)
                            </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3">
                            <div
                                className={`h-3 rounded-full transition-all ${
                                    occupancyPercent >= 100 ? 'bg-red-500' :
                                        occupancyPercent >= 70  ? 'bg-yellow-500' : 'bg-green-500'
                                }`}
                                style={{ width: `${Math.min(occupancyPercent, 100)}%` }}
                            />
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-400 mb-1">Izoh</p>
                        <p className="font-medium text-gray-900">{room.notes || '—'}</p>
                    </div>
                </div>

                <Link href={route('rooms.index')} className="text-sm text-gray-500 hover:text-gray-700">
                    ← Ro'yxatga qaytish
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
