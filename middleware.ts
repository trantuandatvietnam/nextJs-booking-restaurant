import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose"

export async function middleware(req: NextRequest, res: NextResponse) {
    const bearerToken = req.headers.get("authorization")
    if (!bearerToken) {
        return new NextResponse(JSON.stringify({ errorMessage: "unauthorized request (no bearer token)" }), { status: 401 })
    }
    const token = bearerToken.split(" ")[1]
    if (!token) {
        return new NextResponse(JSON.stringify({ errorMessage: "unauthorized request (no token)" }), { status: 401 })
    }
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    try {
        await jose.jwtVerify(token, secret)
    } catch (error) {
        return new NextResponse(JSON.stringify({ errorMessage: "unauthorized request (invalid token)" }), { status: 401 })
    }
}

export const config = {
    matcher: ["/api/auth/me"]
}