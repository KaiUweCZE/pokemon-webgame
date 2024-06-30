import { connectToDatabase } from "@/utils/server-helpers"
import prisma from "../../../../prisma"
import { NextResponse } from "next/server"


export const POST = async (req: Request) => {
    try {
        const {username, img} = await req.json()
        await connectToDatabase()

        const user = await prisma.user.findUnique({
            where: {name: username},
        })

        if(!user) { return null}

        const updatedUser = await prisma.user.update({
            where: {id: user.id},
            data: { profileImg: img,}
        })

        return updatedUser
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json({ error: "server error" }, { status: 500 });
    } finally {
    console.log("Disconnecting from the database...");
    await prisma.$disconnect();
    console.log("Disconnected from the database.");}
}