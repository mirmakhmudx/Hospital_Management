import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const icons = {
    success: <CheckCircle size={18} className="text-green-500" />,
    error:   <XCircle size={18} className="text-red-500" />,
    warning: <AlertCircle size={18} className="text-yellow-500" />,
};

export default function Toast({ toasts, onClose }) {
    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className="flex items-center gap-3 bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3 min-w-72 animate-in slide-in-from-right"
                >
                    {icons[toast.type]}
                    <p className="text-sm text-gray-800 flex-1">{toast.message}</p>
                    <button onClick={() => onClose(toast.id)} className="text-gray-400 hover:text-gray-600">
                        <X size={14} />
                    </button>
                </div>
            ))}
        </div>
    );
}
