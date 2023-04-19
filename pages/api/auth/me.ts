import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken"


const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const bearerToken = req.headers["authorization"] as string
        const token = bearerToken.split(" ")[1]

        const payload = jwt.decode(token) as { email: string }
        if (!payload.email) {
            return res.status(401).json({ errrorMessage: "unauthorized request" })
        }
        const user = await prisma.user.findUnique({
            where: {
                email: payload?.email
            },
            select: {
                id: true,
                last_name: true,
                first_name: true,
                email: true,
                city: true,
                phone: true
            }
        })
        if (!user) {
            return res.status(401).json({ errorMessage: "User not found" })
        }
        return res.status(200).json({ user })
    }
    return res.status(404).json("unknown endpoint")
}