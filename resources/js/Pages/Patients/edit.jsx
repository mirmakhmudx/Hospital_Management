import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ patient }) {
    const { data, setData, put, processing, errors } = useForm({
        first_name: patient.first_name,
        last_name: patient.last_name,
        gender: patient.gender,
        date_of_birth: patient.date_of_birth,
        phone: patient.phone,
        email: patient.email ?? '',
        address: patient.address ?? '',
        notes: patient.notes ?? '',
    });

    function submit(e) {
        e.preventDefault();
        put(route('patients.update', patient.id));
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="text-lg font-semibold text-gray-800">Bemorni tahrirlash</h2>}
        >
            <Head title="Tahrirlash" />

            <div className="max-w-2xl mx-auto">
                <form onSubmit={submit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Ism</label>
                            <input
                                type="text"
                                value={data.first_name}
                                onChange={e => setData('first_name', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                            {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Familiya</label>
                            <input
                                type="text"
                                value={data.last_name}
                                onChange={e => setData('last_name', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                            {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Jins</label>
                            <select
                                value={data.gender}
                                onChange={e => setData('gender', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                <option value="male">Erkak</option>
                                <option value="female">Ayol</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Tug'ilgan sana</label>
                            <input
                                type="date"
                                value={data.date_of_birth}
                                onChange={e => setData('date_of_birth', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Telefon</label>
                            <input
                                type="text"
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Manzil</label>
                        <input
                            type="text"
                            value={data.address}
                            onChange={e => setData('address', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
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
                            href={route('patients.index')}
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
