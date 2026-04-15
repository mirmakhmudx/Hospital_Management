import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SearchInput({ routeName, placeholder, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        // "Debounce" mantiqi: Foydalanuvchi yozishdan to'xtagandan 0.5 sek keyin qidiradi
        const delayDebounceFn = setTimeout(() => {
            router.get(route(routeName),
                { search },
                { preserveState: true, replace: true }
            );
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
            </div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeholder}
                className="block w-full pl-10 pr-10 py-2 border border-gray-200 rounded-xl text-sm focus:ring-gray-900 focus:border-gray-900 transition-all shadow-sm"
            />
            {search && (
                <button
                    onClick={() => setSearch('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                    <X size={14} />
                </button>
            )}
        </div>
    );
}
