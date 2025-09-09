// app/components/Logout.js
'use client';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  return (
    <button 
      onClick={handleLogout}
      className="text-red-600 hover:text-red-800 font-medium"
    >
      Logout
    </button>
  );
}