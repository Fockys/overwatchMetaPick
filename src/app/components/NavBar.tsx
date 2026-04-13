import "@/app/globals.css"
import Link from "next/link"
import "../globals.css"
import { cookies } from "next/headers"
import LogoutButton from "./LogoutButton"







export default async function NavBar(){
    const cookieStore = await cookies()
    const token = cookieStore.get("sessionID")
    return(
        <div id="navBar" className="flex justify-left items-center bg-blue-950 top-0 w-full">
            <div className="min-h-full h-full p-4 sm:p-3  pr-7 sm:pr-14 border-b-4  bg-blue-900 border-blue-300 font-[overwatchMainFont] clip-slant">
            <Link href="/" className="float-left  text-md sm:text-4xl text-orange-500 min-h-full ">Metapick OW</Link>
            </div>
            <div className=" *:font-[overwatchFont] *:sm:text-4xl *:text-xl *:p-2 *:sm:p-5">
            <Link href="/Heros" >Hero's</Link>
            <Link href="/picks" >Counterpicks</Link>
            <Link href="/teams" >Teams</Link>
            </div>
            {token && (
                <div className="*:p-5 justify-self-end">
                    <LogoutButton/>
                    <Link href="/dashboard">Dashboard</Link>
                </div>
            )}

        </div>

    )
}