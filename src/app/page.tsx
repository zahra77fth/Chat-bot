"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase/config";
import { useRouter } from "next/navigation";
import BaseButton from "@/components/bases/BaseButton";
import { signOut } from "firebase/auth";
import { useEffect } from "react";

export default function Home() {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/sign-up");
        }
    }, [loading, user, router]);

    const handleSignOut = () => {
        signOut(auth);
        sessionStorage.removeItem("user");
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col h-screen font-[family-name:var(--font-geist-sans)]">
            <header className="h-auto flex items-center justify-center">
                <div>
                    <p>this is header</p>
                    <BaseButton label="Log Out" onClick={handleSignOut} type="button" />
                </div>
            </header>
            <main className="flex flex-1 flex-col gap-8 justify-center items-center">
                <div>this is main</div>
            </main>
            <footer className="h-auto flex items-center justify-center">
                <div>this is footer</div>
            </footer>
        </div>
    );
}