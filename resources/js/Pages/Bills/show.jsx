import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';

const statusConfig = {
    unpaid:    { label: 'To\'lanmagan',   class: 'bg-red-50 text-red-700' },
    paid:      { label: 'To\'langan',     class: 'bg-green-50 text-green-700' },
    cancelled: { label: 'Bekor qilingan', class: 'bg-gray-100 text-gray-500' },
};

export default function Show({ bill }) {
    const status = statusConfig[bill.status];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">To'lov #{bill.id}</h2>
                    <Link
                        href={route('bills.edit', bill.id)}
                        className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                    >
                        <Pencil size={14} />
                        Tahrirlash
                    </Link>
                </div>
            }
        >
            <Head title={`To'lov #${bill.id}`} />

            <div className="max-w-2xl mx-auto space-y-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-5 text-sm">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-400 mb-1">Bemor</p>
                            <p className="font-medium text-gray-900">
                                {bill.patient.first_name} {bill.patient.last_name}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400 mb-1">Status</p>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${status.class}`}>
                                {status.label}
                            </span>
                        </div>
                        <div>
                            <p className="text-gray-400 mb-1">Miqdor</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {Number(bill.amount).toLocaleString()} so'm
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-400 mb-1">Tavsif</p>
                            <p className="font-medium text-gray-900">{bill.description || '—'}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 mb-1">To'lov muddati</p>
                            <p className="font-medium text-gray-900">{bill.due_date ?? '—'}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 mb-1">To'langan sana</p>
                            <p className="font-medium text-gray-900">{bill.paid_date ?? '—'}</p>
                        </div>
                        {bill.appointment && (
                            <div className="col-span-2">
                                <p className="text-gray-400 mb-1">Qabul</p>
                                <p className="font-medium text-gray-900">#{bill.appointment.id}</p>
                            </div>
                        )}
                    </div>
                </div>

                <Link href={route('bills.index')} className="text-sm text-gray-500 hover:text-gray-700">
                    ← Ro'yxatga qaytish
                </Link>
            </div>
        </AuthenticatedLayout>
    );
}
