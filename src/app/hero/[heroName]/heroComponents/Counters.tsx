

export default function Counters({heroCounters}:{heroCounters:any}){
    
    return(
        <div>
            {heroCounters.map((counter:any)=>(
                <div className="flex items-center" key={counter.id}>
                    <div>
                    <h1 className="font-[overwatchFont] text-xl">{counter.counterName}</h1>
                    <img src={"/images/heroIcon/"+counter.counterImage.trimEnd()} alt="hero Portrait" className="mr-8 border-blue-300 border-solid border-2 rounded-lg h-12 w-auto"/>
                    </div>
                    <p>{counter.reason}</p>
                </div>
            ))}
        </div>
    )
}