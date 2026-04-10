"use server"
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from 'crypto';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { url } from "inspector";

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse){
    //ensure request is POST
    if(req.method != "POST"){
        res.status(405).json({Message:"Only accepts POST"})
        return
    }

    const data = req.body
    if (!data){
        res.status(400).json({Message: "Data empty"})
        return
    }

    const dbEntry = await db.select().from(usersTable).where(eq(usersTable.name,data.username))
    if (dbEntry.length == 0){
        //user does not exist
        res.status(200).json({Message:"User does not exist"})
        return
    }

    const user = dbEntry[0]
    //ensure password isnt null
    if(user.password == null){
        res.status(200).json({Message:"Incorrect password"})
        return
    }

    //successful login
    if( await bcrypt.compare(req.body.password,user.password)){
        

        //generate sessionID
        const id = generateSessionID(36);
        //store id as cookie on client
        res.setHeader("Set-Cookie", `sessionID=${id}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`);
        //store id in database
        await db.update(usersTable).set({sessionID: id}).where(eq(usersTable.name,user.name))

        res.status(200).json({Message:"logged in"})
        return
        
    }

    res.status(200).json({Message:"Could not login"})
    return
}

function generateSessionID(length:number){
    const alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const alphabetLength = alphabet.length;
    const randomBytes = crypto.randomBytes(length);

    let id = "";

    for( let i = 0; i<randomBytes.length; i++){
        const charIndex = randomBytes[i] % alphabetLength;
        id += alphabet[charIndex]
    }

    return id
}