'use client';

import { useActionState } from 'react';
import { authenticate } from '@/actions/auth-actions';

export default function LoginPage() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                <form action={formAction} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                            placeholder="******"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isPending ? 'Logging in...' : 'Login'}
                    </button>

                    {errorMessage && (
                        <div className="text-red-500 text-sm text-center mt-2">
                            {errorMessage}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
