// app/components/Header.js
import Link from 'next/link';
import Logout from './Logout';


export default function Header() {
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('authToken');
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Business Name */}
        <Link href="/" className="text-2xl font-bold">
          Janta Raja motars & Financial Services
        </Link>

        {/* Navigation Menu */}
        <nav className="space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/admin" className="hover:underline">
                Admin
              </Link>
              <Logout />
            </>
          ) : (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}