import Link from "next/link";
export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-600">404</h1>
      <p className="text-2xl mt-4">Oops! Page not found.</p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
