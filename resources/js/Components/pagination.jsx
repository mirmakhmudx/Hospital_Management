import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    // Agar sahifalar bittadan ko'p bo'lmasa (faqat "Oldingi" va "Keyingi" bo'lsa), ko'rsatmaymiz
    if (links.length <= 3) return null;

    return (
        <div className="flex flex-wrap justify-center items-center gap-1 py-6">
            {links.map((link, key) => {
                // Link label ichidagi &laquo; va &raquo; larni to'g'irlash yoki o'z holicha qoldirish
                const label = link.label
                    .replace('&laquo; Previous', '‹')
                    .replace('Next &raquo;', '›');

                return link.url === null ? (
                    // Link bosib bo'lmaydigan holat (masalan, birinchi sahifada turganda "Oldingi" tugmasi)
                    <div
                        key={key}
                        className="px-3 py-1 text-[12px] text-gray-300 border border-gray-100 rounded bg-white cursor-not-allowed"
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                ) : (
                    // Aktiv va oddiy sahifa linklari
                    <Link
                        key={key}
                        href={link.url}
                        className={`px-3 py-1 text-[12px] border rounded transition-all duration-200 font-medium ${
                            link.active
                                ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300'
                        }`}
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                );
            })}
        </div>
    );
}
