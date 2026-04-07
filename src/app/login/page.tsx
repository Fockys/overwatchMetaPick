"use client"
import { NextApiHandler, NextApiRequest } from "next"
import { FormEvent } from "react"




export default function loginPage(req:NextApiRequest,res:NextApiHandler){
    
    async function onSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const response = await fetch("api/login",{
            method:"POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify({
                username: formData.get("username"),
                password: formData.get("password")
            })
        })

        if (await response!=null){
            const data = await response.json
            console.log(data)
        }
        

    }
    


    
    return(
        <div className="flex justify-center">
            <form className="bg-blue-800 w-[50%] p-16 m-5 rounded-2xl flex flex-col" onSubmit={onSubmit}>
                <h1 className="text-2xl">Username</h1>
                <input name="username" className="border-black border-2 bg-blue-200 text-black" />
                <h1 className="text-2xl">Password</h1>
                <input name="password" className="border-black border-2 bg-blue-200 text-black" type="password"/>
                <button className="bg-blue-950 w-64 rounded-sm self-center m-4 p-2" type="submit">Submit</button>
            </form>
        </div>
    )



}