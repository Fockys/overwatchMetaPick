import "@/app/globals.css"
import Link from "next/link"
import "../globals.css"







export default function NavBar(){
    return(
        <div id="navBar" className="flex justify-left items-center bg-blue-950 ">
            <div className="min-h-full h-full p-5 pb-5 pr-14 border-b-4  bg-blue-900 border-blue-300 font-[overwatchMainFont] clip-slant">
            <Link href="/" className="float-left  text-4xl text-orange-500 min-h-full ">Metapick OW</Link>
            </div>
            <Link href="/Heros" className="text-4xl p-5 font-[overwatchFont]" >Hero's</Link>
            <Link href="/picks" className="text-4xl p-5 font-[overwatchFont]" >Counterpicks</Link>
            <Link href="/teams" className="text-4xl p-5 font-[overwatchFont]" >Teams</Link>

        </div>

    )
}