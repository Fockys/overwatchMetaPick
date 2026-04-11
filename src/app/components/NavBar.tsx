import "@/app/globals.css"
import Link from "next/link"
import "../globals.css"







export default function NavBar(){
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

        </div>

    )
}