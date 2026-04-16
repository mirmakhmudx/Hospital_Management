import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link  className="flex flex-col items-center">
                    <svg
                        className="h-20 w-20 text-black"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1
                        0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6V6h12v13z"/>
                        <path d="M11 7h2v10h-2z"/>
                        <path d="M7 11h10v2H7z"/>
                    </svg>

                    <span className="mt-2 text-lg font-semibold text-gray-800">
                        Hospital
                    </span>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
