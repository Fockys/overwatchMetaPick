import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";


export default async function logoutHandler(req:NextApiRequest,res:NextApiResponse){
    const sessionID = req.cookies["sessionID"];

    if (!sessionID) return unauthorized(res) ; 
    if (!isAuthenticated(sessionID)) return unauthorized(res);

    invalidateSessionID(sessionID);
    res.setHeader("Set-Cookie", `sessionID=deleted; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    
    res.redirect(302,"/") //redirect after logout


}

////////////////////
//helper functions//
////////////////////

function unauthorized(res:NextApiResponse){
    res.status(401).json({Message:"Unauthorized"})
}


async function isAuthenticated(sessionID:string){

    const user = db.select().from(usersTable).where(eq(usersTable.sessionID,sessionID))

    if(!user){
        return false
    }

    return true
}

async function invalidateSessionID(sessionID:string){
    db.update(usersTable).set({sessionID:null}).where(eq(usersTable.sessionID,sessionID))
    return
}