'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            router.push('/admin');
        } else {
            const data = await res.json();
            setError(data.error || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
            <div className="w-full max-w-sm p-8 bg-[#111] rounded-xl border border-white/10 shadow-xl">
                <h1 className="text-2xl font-bold mb-6 text-center text-green-500 font-oswald">ADMIN LOGIN</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">USERNAME</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black border border-white/20 p-3 rounded outline-none text-white focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1">PASSWORD</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black border border-white/20 p-3 rounded outline-none text-white focus:border-green-500"
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 bg-green-600 font-bold rounded hover:bg-green-500 transition-colors uppercase"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
