import Link from 'next/link'

export default function Custom404() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
            <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-6">Oops! The page you are looking for does not exist.</p>
            <Link href="/" style={{color:"white"}} className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-600 transition">
                Go to Home
            </Link>
        </div>
    );
}
