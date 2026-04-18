import "@/app/globals.css"


export default function MainFooter(){
    return(
        <div id="Footer" className="flex items-center bg-blue-950 w-full p-1 xxl:p-4  flex-col ">
        <div className="sm:w-6/12 w-full h-full justify-around flex-row flex *:text-sm *:xxl:text-xl">
            <a>About</a>
            <a>Last updated: now</a>
            <a href="https://github.com/Fockys/overwatchMetaPick">Github</a>
        </div>
        </div>

    )
}