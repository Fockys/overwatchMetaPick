import "@/app/globals.css"


export default function MainFooter(){
    return(
        <div id="Footer" className="flex items-center fixed bottom-0 bg-blue-950 w-full p-4 flex-col">
        <div className="w-4/12 h-full justify-around flex-row flex [&>h1]:text-xl">
            <h1>About</h1>
            <h1>Last updated: now</h1>
            <h1>Github</h1>
        </div>
        </div>

    )
}