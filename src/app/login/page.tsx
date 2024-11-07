'use client';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase/config';
import BaseForm from '@/components/bases/BaseForm';
import BaseInput from '@/components/bases/BaseInput';
import BaseButton from '@/components/bases/BaseButton';

export default function LoginPage() {
    const [signInWithEmailAndPassword,, loading, error] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const handleLogin = async (formData: FormData) => {
        try {
            const email = formData.get('email')?.toString() || '';
            const password = formData.get('password')?.toString() || '';
            const res = await signInWithEmailAndPassword(email, password);
            sessionStorage.setItem('user', 'true')
            if (res?.user) {
                router.push('/');
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-center text-gray-800">Login</h1>
                <BaseForm action={handleLogin}>
                    <BaseInput
                        name="email"
                        type="email"
                        placeholder="Email"
                    />
                    <BaseInput
                        name="password"
                        type="password"
                        placeholder="Password"
                    />
                    <BaseButton label={loading ? "Loading..." : "Login" } type="submit" />
                    {error && <p className="text-red-500">{error.message}</p>}
                </BaseForm>
            </div>
        </div>
    );
}
