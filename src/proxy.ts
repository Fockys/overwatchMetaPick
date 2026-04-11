import { NextRequest, NextResponse } from "next/server";
import { db } from "./db";
import { usersTable } from "./db/schema";
import { eq } from "drizzle-orm";
import "dotenv/config"
import { error } from "console";


export function proxy(request:NextRequest){
    if (!isDbUp()){
        return NextResponse.json({error:"Database unavalible",status:503})
    }

    const pathname = request.url

    if (pathname.startsWith("/dashboard")){
        dashboardMiddleware(request)
    }
    
}

export const config= {
    matcher: '/'
}



//ensures the db is up and if not throws a internal server error
function isDbUp(){
    if (!db){
        return false
    }
    return true
}

//check if user is authenticated before making any dashboard changes
async function dashboardMiddleware(request:NextRequest){

    const sessionID = request.cookies.get("sessionID");

    if(!sessionID){
        return NextResponse.redirect(new URL("/login",request.url));
    }else if(!(await isAuthenticated(sessionID.value))){
        return NextResponse.redirect(new URL("/login",request.url));
    }

}




async function isAuthenticated(sessionID:string){

    const user = db.select().from(usersTable).where(eq(usersTable.sessionID,sessionID))

    if(!user){
        return false
    }


    return true
}

