import { db } from "@/db"
import { usersTable } from "@/db/schema"
import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function dashboard(request:NextRequest){
    const cookieStore = await cookies()
    const sessionID = cookieStore.get("sessionID");

    
    if(!sessionID){
        redirect("/login");
    }
    const user = await db.select().from(usersTable).where(eq(usersTable.sessionID,sessionID.value))
    user[0].name
    return <h1>Welcome back {user[0].name}</h1>
}