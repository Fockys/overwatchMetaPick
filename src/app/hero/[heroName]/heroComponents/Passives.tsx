

export default function Passives({heroPassives}:{heroPassives:any}){

    return(
        <div>
            {heroPassives.map((passive:any)=>(
                <div key={passive.id} className="bg-blue-900 m-3 p-3 rounded-2xl border-blue-200 border-2">
                <h1 className="font-[overwatchFont] text-4xl">{passive.name}</h1>
                <p>{passive.description}</p>
                </div>
            ))}
        </div>
    )
}