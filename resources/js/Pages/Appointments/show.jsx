import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';

const statusConfig = {
    pending:   { label: 'Kutilmoqda',    class: 'bg-yellow-50 text-yellow-700' },
    confirmed: { label: 'Tasdiqlangan',  class: 'bg-blue-50 text-blue-700' },
    completed: { label: 'Tugallangan',   class: 'bg-green-50 text-green-700' },
    cancelled: { label: 'Bekor qilingan', class: 'bg-red-50 text-red-700' },
};

export default function Show({ appointment }) {
    const status = statusConfig[appointment.status];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">Qabul ma'lumotlari</h2>
                    <Link
                        href={route('appointments.edit', appointment.id)}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        <Pencil size={14} />
                        Tahrirlash
                    </Link>
                </div>
            }
        >
            <Head title="Qabul" />

            <div className="max-w-2xl mx-auto space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4 text-sm">

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-400 mb-1">Bemor</p>
                            <p className="font-medium text-gray-900">
                                {appointment.patient.first_name} {appointment.patient.last_name}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400 mb-1">Shifokor</p>
                            <p className="font-medium text-gray-900">
                                Dr. {appointment.doctor.first_name} {appointment.doctor.last_name}
                            </p>
                            <p className="text-xs text-gray-400">{appointment.doctor.specialization}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 mb-1">Sana va vaqt</p>
                            <p className="font-medium text-gray-900">
                                {new Date(appointment.appointment_date).toLocaleString('uz-UZ', {
                                    year: 'numeric', month: '2-digit', day: '2-digit',
                                    hour: '2-digit', minute: '2-digit'
                                })}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400 mb-1">Status</p>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${status.class}`}>
                                {status.label}
                            </span>
                        </div>
                        <div className="col-span-2">
                            <p className="text-gray-400 mb-1">Sabab</p>
                            <p className="font-medium text-gray-900">{appointment.reason || '—'}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-gray-400 mb-1">Izoh</p>
                            <p className="font-medium text-gray-900">{appointment.notes || '—'}</p>
                        </div>
                    </div>
                </div>

                <Link href={route('appointments.index')} className="text-sm text-gray-500 hover:text-gray-700">
                    ← Ro'yxatga qaytish
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
