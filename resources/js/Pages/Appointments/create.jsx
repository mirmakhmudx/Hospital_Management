import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ patients, doctors }) {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: '',
        doctor_id: '',
        appointment_date: '',
        status: 'pending',
        reason: '',
        notes: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('appointments.store'));
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="text-lg font-semibold text-gray-800">Yangi qabul qo'shish</h2>}
        >
            <Head title="Qabul qo'shish" />

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
                                <option value="">Tanlang</option>
                                {patients.map(p => (
                                    <option key={p.id} value={p.id}>
                                        {p.first_name} {p.last_name}
                                    </option>
                                ))}
                            </select>
                            {errors.patient_id && <p className="text-red-500 text-xs mt-1">{errors.patient_id}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Shifokor</label>
                            <select
                                value={data.doctor_id}
                                onChange={e => setData('doctor_id', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                <option value="">Tanlang</option>
                                {doctors.map(d => (
                                    <option key={d.id} value={d.id}>
                                        Dr. {d.first_name} {d.last_name} — {d.specialization}
                                    </option>
                                ))}
                            </select>
                            {errors.doctor_id && <p className="text-red-500 text-xs mt-1">{errors.doctor_id}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Sana va vaqt</label>
                            <input
                                type="datetime-local"
                                value={data.appointment_date}
                                onChange={e => setData('appointment_date', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                            {errors.appointment_date && <p className="text-red-500 text-xs mt-1">{errors.appointment_date}</p>}
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Status</label>
                            <select
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                <option value="pending">Kutilmoqda</option>
                                <option value="confirmed">Tasdiqlangan</option>
                                <option value="completed">Tugallangan</option>
                                <option value="cancelled">Bekor qilingan</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Sabab (ixtiyoriy)</label>
                        <input
                            type="text"
                            value={data.reason}
                            onChange={e => setData('reason', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Qabulga kelish sababi..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Izoh (ixtiyoriy)</label>
                        <textarea
                            value={data.notes}
                            onChange={e => setData('notes', e.target.value)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Qo'shimcha ma'lumotlar..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Link
                            href={route('appointments.index')}
                            className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Bekor qilish
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 text-sm bg-gray-900 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50"
                        >
                            Saqlash
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
