// components/BaseInput.tsx
import { ChangeEventHandler } from 'react';

interface BaseInputProps {
    name: string;
    type?: string;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function BaseInput({ name, type = 'text', placeholder, onChange }: BaseInputProps) {
    return (
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    );
}
