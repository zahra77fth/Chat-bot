// components/BaseForm.tsx
import Form from 'next/form';
import { ReactNode, FormEventHandler } from 'react';

interface BaseFormProps {
    children: ReactNode;
    action: string | ((formData: FormData) => void | Promise<void>);
}

export default function BaseForm({ children, action }: BaseFormProps) {
    return (
        <Form action={action} className="space-y-6">
            {children}
        </Form>
    );
}
