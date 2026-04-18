import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ data, label = 'ta yozuv' }) {
    if (!data || data.last_page <= 1) return null;

    function goTo(url) {
        if (url) router.get(url, {}, { preserveState: true });
    }

    // Faqat raqamli sahifalarni olish
    const pages = data.links.slice(1, -1);

    return (
        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100">
            {/* Jami */}
            <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-900">{data.total}</span> {label} —
                sahifa <span className="font-medium text-gray-900">{data.current_page}</span> / {data.last_page}
            </p>

            {/* Tugmalar */}
            <div className="flex items-center gap-1">

                {/* Prev */}
                <button
                    onClick={() => goTo(data.prev_page_url)}
                    disabled={!data.prev_page_url}
                    className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm transition-colors ${
                        data.prev_page_url
                            ? 'text-gray-600 hover:bg-gray-100'
                            : 'text-gray-300 cursor-not-allowed'
                    }`}
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Sahifa raqamlari */}
                {pages.map((link, i) => {
                    // Ko'p sahifa bo'lsa "..." ko'rsatish
                    if (link.label === '...') {
                        return (
                            <span key={i} className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
                                ...
                            </span>
                        );
                    }
                    return (
                        <button
                            key={i}
                            onClick={() => goTo(link.url)}
                            disabled={!link.url}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                                link.active
                                    ? 'bg-gray-900 text-white'
                                    : link.url
                                        ? 'text-gray-600 hover:bg-gray-100'
                                        : 'text-gray-300 cursor-not-allowed'
                            }`}
                        >
                            {link.label}
                        </button>
                    );
                })}

                {/* Next */}
                <button
                    onClick={() => goTo(data.next_page_url)}
                    disabled={!data.next_page_url}
                    className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm transition-colors ${
                        data.next_page_url
                            ? 'text-gray-600 hover:bg-gray-100'
                            : 'text-gray-300 cursor-not-allowed'
                    }`}
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
