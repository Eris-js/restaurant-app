'use client';

import { useTransition } from 'react';
import { Trash2 } from 'lucide-react';

interface DeleteButtonProps {
    id: string;
    deleteAction: (formData: FormData) => Promise<void>;
    className?: string;
    showText?: boolean;
}

export default function DeleteButton({ id, deleteAction, className, showText = true }: DeleteButtonProps) {
    const [pending, startTransition] = useTransition();

    return (
        <form action={(formData) => {
            if (confirm('Are you sure you want to delete this item?')) {
                startTransition(() => deleteAction(formData));
            }
        }} className="inline-block">
            <input type="hidden" name="id" value={id} />
            <button
                type="submit"
                disabled={pending}
                className={className || "text-red-600 hover:text-red-900 ml-4 disabled:opacity-50 transition-all flex items-center shadow-none border-none bg-transparent"}
                title="Delete"
            >
                {pending ? (
                    <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <Trash2 size={16} className={showText ? "mr-1" : ""} />
                )}
                {showText && !pending && <span className="text-sm font-medium">Delete</span>}
                {showText && pending && <span className="text-sm font-medium ml-1 text-gray-400">Deleting...</span>}
            </button>
        </form>
    );
}
