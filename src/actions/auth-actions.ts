'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        // Convert FormData to object to add redirectTo
        const data = Object.fromEntries(formData);
        await signIn('credentials', { ...data, redirectTo: '/admin' });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Email hoặc mật khẩu không chính xác.';
                default:
                    return 'Đã có lỗi xảy ra. Vui lòng thử lại.';
            }
        }
        throw error;
    }
}
