import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ bill, patients, appointments }) {
    const { data, setData, put, processing, errors } = useForm({
        patient_id:     bill.patient_id,
        appointment_id: bill.appointment_id ?? '',
        amount:         bill.amount,
        status:         bill.status,
        description:    bill.description ?? '',
        due_date:       bill.due_date ?? '',
        paid_date:      bill.paid_date ?? '',
    });

    function submit(e) {
        e.preventDefault();
        put(route('bills.update', bill.id));
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="text-lg font-semibold text-gray-800">To'lovni tahrirlash</h2>}
        >
            <Head title="Tahrirlash" />

            <div className="max-w-2xl mx-auto">
                <form onSubmit={submit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Bemor</label>
                            <select
                                value={data.patient_id}
                                onChange={e => setData('patient_id', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                {patients.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.first_name} {p.last_name}
                                    </option>
                                ))}
                            </select>
                            {errors.patient_id && <p className="text-red-500 text-xs mt-1">{errors.patient_id}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Qabul (ixtiyoriy)</label>
                            <select
                                value={data.appointment_id}
                                onChange={e => setData('appointment_id', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                <option value="">Tanlang</option>
                                {appointments.map(a => (
                                    <option key={a.id} value={a.id}>
                                        #{a.id} — {a.patient.first_name} {a.patient.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Miqdor (so'm)</label>
                            <input
                                type="number"
                                value={data.amount}
                                onChange={e => setData('amount', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                                min="0"
                            />
                            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Status</label>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                <option value="unpaid">To'lanmagan</option>
                                <option value="paid">To'langan</option>
                                <option value="cancelled">Bekor qilingan</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Tavsif</label>
                        <input
                            type="text"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">To'lov muddati</label>
                            <input
                                type="date"
                                value={data.due_date}
                                onChange={e => setData('due_date', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">To'langan sana</label>
                            <input
                                type="date"
                                value={data.paid_date}
                                onChange={e => setData('paid_date', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Link
                            href={route('bills.index')}
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
