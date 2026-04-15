import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';

export default function Show({ record }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">Tibbiy yozuv</h2>
                    <Link
                        href={route('medical-records.edit', record.id)}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        <Pencil size={14} />
                        Tahrirlash
                    </Link>
                </div>
            }
        >
            <Head title="Tibbiy yozuv" />

            <div className="max-w-2xl mx-auto space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5 text-sm">

                    {/* Asosiy ma'lumotlar */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-400 mb-1">Bemor</p>
                            <p className="font-medium text-gray-900">
                                {record.patient.first_name} {record.patient.last_name}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400 mb-1">Shifokor</p>
                            <p className="font-medium text-gray-900">
                                Dr. {record.doctor.first_name} {record.doctor.last_name}
                            </p>
                            <p className="text-xs text-gray-400">{record.doctor.specialization}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 mb-1">Sana</p>
                            <p className="font-medium text-gray-900">{record.record_date}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 mb-1">Tashxis</p>
                            <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                                {record.diagnosis}
                            </span>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Retsept */}
                    <div>
                        <p className="text-gray-400 mb-1">Retsept</p>
                        <p className="font-medium text-gray-900 whitespace-pre-line">
                            {record.prescription || '—'}
                        </p>
                    </div>

                    {/* Davolash */}
                    <div>
                        <p className="text-gray-400 mb-1">Davolash</p>
                        <p className="font-medium text-gray-900 whitespace-pre-line">
                            {record.treatment || '—'}
                        </p>
                    </div>

                    {/* Izoh */}
                    <div>
                        <p className="text-gray-400 mb-1">Izoh</p>
                        <p className="font-medium text-gray-900 whitespace-pre-line">
                            {record.notes || '—'}
                        </p>
                    </div>
                </div>

                <Link href={route('medical-records.index')} className="text-sm text-gray-500 hover:text-gray-700">
                    ← Ro'yxatga qaytish
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
