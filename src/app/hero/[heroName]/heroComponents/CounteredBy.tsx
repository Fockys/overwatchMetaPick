

export default function CounteredBy({heroCounteredBy}:{heroCounteredBy:any}){

    return(
        <div>
            <h1 className="font-[overwatchFont] text-4xl pt-4">Countered by</h1>
            {heroCounteredBy.map((counteredBy:any)=>(
                <div key={counteredBy.id} className="flex items-center">
                    <div>
                    <h1 className="font-[overwatchFont] text-xl">{counteredBy.name}</h1>
                    <img src={"/images/heroIcon/"+counteredBy.counteredByImage.trimEnd()} width={48} height={48} alt="hero Portrait" className="mr-8 border-blue-300 border-solid border-2 rounded-lg h-12 w-auto"/>
                    </div>
                    <p>{counteredBy.reason}</p>
                </div>
            ))}

        </div>
    )
}