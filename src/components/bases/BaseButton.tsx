'use client';
import { useFormStatus } from 'react-dom';

interface BaseButtonProps {
    label: string;
    onClick?: () => void;
    type: "submit" | "reset" | "button"
}

export default function BaseButton({ label, onClick, type }: BaseButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            type={type}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={onClick}
        >
            {pending ? "Loading..." : label}
        </button>
    );
}