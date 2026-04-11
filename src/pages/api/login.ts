"use server"
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from 'crypto';



export default async function loginHandler(req: NextApiRequest, res: NextApiResponse){
    if (!isPostRequest(req,res)) return;

    const data = getRequestData(req,res)
    if (!data) return;
    
    const user = await findUserFromData(data,req,res)
    if(!user) return;

    
    const isCorrectPassword = await checkPassword(data,user.password,req,res)
    if(isCorrectPassword){
        console.log("correct password")
        generateSession(user.id,res)
        res.status(200).json({Message:"logged in"})
    }else{
        res.status(401).json({Message:"Could not login"});
    }

}

////////////////////
//helper functions//
////////////////////

function isPostRequest(req:NextApiRequest,res:NextApiResponse){
    if(req.method !== "POST"){
        res.status(405).json({Message:"Only accepts POST"})
        return false
    }
    return true
}

function getRequestData(req:NextApiRequest,res:NextApiResponse){
    if (!req.body){
        res.status(400).json({Message: "Data empty"})
        return null;
    }
    return req.body
}

async function findUserFromData(data:any,req:NextApiRequest,res:NextApiResponse){

    const dbEntry = await db.select().from(usersTable).where(eq(usersTable.name,data.username))
    if (dbEntry.length == 0){
        //user does not exist
        res.status(404).json({Message:"User does not exist"})
        return null
    }
    return dbEntry[0]

}

async function checkPassword(data:any,hash:any,req:NextApiRequest,res:NextApiResponse){
    const isMatch = await bcrypt.compare(data.password,hash)
    if(isMatch) return true;
    return false
}


async function generateSession(userid:any,res:NextApiResponse){
    console.log("generate session called")
 //generate sessionID
    const id = generateSessionID(36);
    //store id as cookie on client
    res.setHeader("Set-Cookie", `sessionID=${id}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400;`);
    //store id in database
    await db.update(usersTable).set({sessionID: id}).where(eq(usersTable.id,userid))


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