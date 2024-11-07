import { NextResponse } from "next/server";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Import your Firebase setup
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    const { name, email, password } = await req.json();

    try {
        const userQuery = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            return NextResponse.json({ error: "User already exists!" }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await addDoc(collection(db, "users"), {
            name,
            email,
            password: hashedPassword,
        });

        return NextResponse.json({ message: "User successfully created", success: true }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}
