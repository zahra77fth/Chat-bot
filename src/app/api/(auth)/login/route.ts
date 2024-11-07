import { NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    try {
        const userQuery = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(userQuery);

        if (querySnapshot.empty) {
            return NextResponse.json({ error: "User does not exist!" }, { status: 400 });
        }

        const userDoc = querySnapshot.docs[0].data();
        const isPasswordMatch = await bcrypt.compare(password, userDoc.password);

        if (!isPasswordMatch) {
            return NextResponse.json({ error: "Passwords do not match!" }, { status: 400 });
        }

        const token = jwt.sign({ email: userDoc.email }, process.env.JWT_SECRET as string, {
            expiresIn: "30d",
        });

        const response = NextResponse.json({ message: "Successfully logged in", success: true });
        response.cookies.set("token", token, { httpOnly: true });

        return response;
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}
