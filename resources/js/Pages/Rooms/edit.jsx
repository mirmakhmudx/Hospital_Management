import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ room }) {
    const { data, setData, put, processing, errors } = useForm({
        room_number:   room.room_number,
        type:          room.type,
        capacity:      room.capacity,
        occupied:      room.occupied,
        status:        room.status,
        price_per_day: room.price_per_day,
        notes:         room.notes ?? '',
    });

    function submit(e) {
        e.preventDefault();
        put(route('rooms.update', room.id));
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="text-lg font-semibold text-gray-800">Xonani tahrirlash</h2>}
        >
            <Head title="Tahrirlash" />

            <div className="max-w-2xl mx-auto">
                <form onSubmit={submit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Xona raqami</label>
                            <input
                                type="text"
                                value={data.room_number}
                                onChange={e => setData('room_number', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                            {errors.room_number && <p className="text-red-500 text-xs mt-1">{errors.room_number}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Turi</label>
                            <select
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                <option value="general">Umumiy</option>
                                <option value="private">Xususiy</option>
                                <option value="icu">Reanimatsiya</option>
                                <option value="emergency">Shoshilinch</option>
                                <option value="operation">Operatsiya</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Sig'imi</label>
                            <input
                                type="number"
                                min="1"
                                value={data.capacity}
                                onChange={e => setData('capacity', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Band o'rinlar</label>
                            <input
                                type="number"
                                min="0"
                                value={data.occupied}
                                onChange={e => setData('occupied', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Status</label>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                <option value="available">Bo'sh</option>
                                <option value="full">To'liq band</option>
                                <option value="maintenance">Ta'mirda</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Narx (so'm/kun)</label>
                            <input
                                type="number"
                                min="0"
                                value={data.price_per_day}
                                onChange={e => setData('price_per_day', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Izoh</label>
                        <textarea
                            value={data.notes}
                            onChange={e => setData('notes', e.target.value)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Link
                            href={route('rooms.index')}
                            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Bekor qilish
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 text-sm bg-gray-900 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50"
                        >
                            Yangilash
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
