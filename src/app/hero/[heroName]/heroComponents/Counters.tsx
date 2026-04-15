import Link from "next/link"

export default function Counters({heroCounters}:{heroCounters:any}){
    
    return(
        <div>
        <h1 className="font-[overwatchFont] text-4xl pt-4">Counters</h1>
        <div className="">
            
            {heroCounters.map((counter:any)=>(
                <div key={counter.id} className="flex flex-row items-center justify-left bg-blue-950  border-blue-950 ">
                    <Link href={`/hero/${counter.name}`} className="">
                    <div className="bg-blue-900 border-b-4 border-blue-300 clip-slant  py-2 px-4 flex flex-row sm:w-100">
                    <img src={"/images/heroIcon/"+counter.counterImage.trimEnd()} width={48} height={48} alt="hero Portrait" className=" mr-4 border-blue-300 border-solid border-2 rounded-lg h-16 w-auto"/>
                    <h1 className="font-[overwatchFont] text-6xl " >{counter.counterName}</h1>
                    </div>
                    </Link>
                    <p className="">{counter.reason}</p>
                </div>
            ))}

        </div>
        </div>
    )
}