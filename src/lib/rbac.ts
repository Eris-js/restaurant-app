import { auth } from '@/auth';

export async function isAdmin() {
    const session = await auth();
    return session?.user && (session.user as any).role === 'admin';
}

export async function ensureAdmin() {
    if (!(await isAdmin())) {
        throw new Error('Unauthorized: Bạn không có quyền thực hiện hành động này.');
    }
}
