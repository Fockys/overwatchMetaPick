import { NextRequest, NextResponse } from "next/server";
import { db } from "./db";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";
import "dotenv/config"


//check if user is authenticated before making any dashboard changes
export async function proxy(request:NextRequest){
    
    
    
    const sessionID = request.cookies.get("sessionID");

    if(!sessionID){
        return NextResponse.redirect(new URL("/login",request.url));
    }else if(!(await isAuthenticated(sessionID.value))){
        return NextResponse.redirect(new URL("/login",request.url));
    }

}

export const config= {
    matcher: '/dashboard'
}





async function isAuthenticated(sessionID:string){

    const user = db.select().from(usersTable).where(eq(usersTable.sessionID,sessionID))

    if(!user){
        return false
    }


    return true
}