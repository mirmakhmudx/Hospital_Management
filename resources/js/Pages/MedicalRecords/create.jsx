import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ patients, doctors, appointments }) {
    const { data, setData, post, processing, errors } = useForm({
        patient_id: '',
        doctor_id: '',
        appointment_id: '',
        diagnosis: '',
        prescription: '',
        treatment: '',
        notes: '',
        record_date: new Date().toISOString().slice(0, 10),
    });

    function submit(e) {
        e.preventDefault();
        post(route('medical-records.store'));
    }

    return (
        <AuthenticatedLayout
            header={<h2 className="text-lg font-semibold text-gray-800">Yangi tibbiy yozuv</h2>}
        >
            <Head title="Tibbiy yozuv qo'shish" />

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
                            <label className="block text-sm text-gray-600 mb-1">Qabul (ixtiyoriy)</label>
                            <select
                                value={data.appointment_id}
                                onChange={e => setData('appointment_id', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            >
                                <option value="">Tanlang</option>
                                {appointments.map(a => (
                                    <option key={a.id} value={a.id}>
                                        #{a.id} — {a.patient.first_name} / Dr.{a.doctor.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Sana</label>
                            <input
                                type="date"
                                value={data.record_date}
                                onChange={e => setData('record_date', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            />
                            {errors.record_date && <p className="text-red-500 text-xs mt-1">{errors.record_date}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Tashxis</label>
                        <input
                            type="text"
                            value={data.diagnosis}
                            onChange={e => setData('diagnosis', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Masalan: Gripp, Yurak yetishmovchiligi..."
                        />
                        {errors.diagnosis && <p className="text-red-500 text-xs mt-1">{errors.diagnosis}</p>}
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Retsept (ixtiyoriy)</label>
                        <textarea
                            value={data.prescription}
                            onChange={e => setData('prescription', e.target.value)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Dorilar va dozalari..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Davolash (ixtiyoriy)</label>
                        <textarea
                            value={data.treatment}
                            onChange={e => setData('treatment', e.target.value)}
                            rows={3}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Davolash tartibi..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-600 mb-1">Izoh (ixtiyoriy)</label>
                        <textarea
                            value={data.notes}
                            onChange={e => setData('notes', e.target.value)}
                            rows={2}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Qo'shimcha ma'lumotlar..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Link
                            href={route('medical-records.index')}
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
