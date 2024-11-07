import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import cookie from "cookie";

export async function GET(req: Request) {
    try {
        const cookies = cookie.parse(req.headers.get('cookie') || '');
        const token = cookies.token; // Access the token cookie

        if (!token) {
            return NextResponse.json({ error: "Token not found" }, { status: 401 });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { email: string };
        const userQuery = query(collection(db, "users"), where("email", "==", decodedToken.email));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            return NextResponse.json({ user: userData });
        } else {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
    } catch (err) {
        return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
}
