import "@/app/globals.css"


export default function MainFooter(){
    return(
        <div id="Footer" className="flex items-center bg-blue-950 w-full p-1 xxl:p-4  flex-col ">
        <div className="sm:w-6/12 w-full h-full justify-around flex-row flex *:text-sm *:xxl:text-xl">
            <h1>About</h1>
            <h1>Last updated: now</h1>
            <h1>Github</h1>
        </div>
        </div>

    )
}