import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { BedDouble, Plus, Eye, Pencil, Trash2, Search } from 'lucide-react';
import { useState, useCallback } from 'react';

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

export default function Index({ rooms, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');
    const [status, setStatus] = useState(filters.status || '');

    const doSearch = useCallback((s, t, st) => {
        router.get(route('rooms.index'), { search: s, type: t, status: st }, {
            preserveState: true,
            replace: true,
        });
    }, []);

    function handleSearch(e) {
        const val = e.target.value;
        setSearch(val);
        doSearch(val, type, status);
    }

    function handleType(e) {
        const val = e.target.value;
        setType(val);
        doSearch(search, val, status);
    }

    function handleStatus(e) {
        const val = e.target.value;
        setStatus(val);
        doSearch(search, type, val);
    }

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

            {/* Search & Filter */}
            <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Xona raqami bo'yicha qidirish..."
                        className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                </div>
                <select
                    value={type}
                    onChange={handleType}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                    <option value="">Barcha turlar</option>
                    <option value="general">Umumiy</option>
                    <option value="private">Xususiy</option>
                    <option value="icu">Reanimatsiya</option>
                    <option value="emergency">Shoshilinch</option>
                    <option value="operation">Operatsiya</option>
                </select>
                <select
                    value={status}
                    onChange={handleStatus}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                    <option value="">Barcha statuslar</option>
                    <option value="available">Bo'sh</option>
                    <option value="full">To'liq band</option>
                    <option value="maintenance">Ta'mirda</option>
                </select>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.data.length === 0 ? (
                    <div className="col-span-3 text-center py-16 text-gray-400">
                        Xonalar topilmadi
                    </div>
                ) : (
                    rooms.data.map((room) => (
                        <div key={room.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900">#{room.room_number}</span>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusConfig[room.status].class}`}>
                                    {statusConfig[room.status].label}
                                </span>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium w-fit ${typeConfig[room.type].class}`}>
                                {typeConfig[room.type].label}
                            </span>
                            <div>
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Band: {room.occupied}/{room.capacity}</span>
                                    <span>{Math.round((room.occupied / room.capacity) * 100)}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                        className="bg-gray-900 h-2 rounded-full"
                                        style={{ width: `${Math.min((room.occupied / room.capacity) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">
                                <span className="font-medium text-gray-900">{room.price_per_day.toLocaleString()} so'm</span> /kun
                            </p>
                            <div className="flex items-center gap-3 pt-1 border-t border-gray-100">
                                <Link href={route('rooms.show', room.id)} className="text-blue-600 hover:text-blue-800"><Eye size={16} /></Link>
                                <Link href={route('rooms.edit', room.id)} className="text-yellow-500 hover:text-yellow-700"><Pencil size={16} /></Link>
                                <button onClick={() => destroy(room.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            {rooms.last_page > 1 && (
                <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-500">Jami {rooms.total} ta xona</p>
                    <div className="flex gap-1">
                        {rooms.links.map((link, i) => (
                            <button
                                key={i}
                                onClick={() => link.url && router.get(link.url)}
                                disabled={!link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 rounded text-sm ${
                                    link.active ? 'bg-gray-900 text-white'
                                        : link.url ? 'text-gray-600 hover:bg-gray-100'
                                            : 'text-gray-300 cursor-not-allowed'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
