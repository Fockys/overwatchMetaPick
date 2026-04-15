

export default function Passives({heroPassives}:{heroPassives:any}){

    return(
        <div className="bg-blue-900 sm:px-[20%] py-8">
            {heroPassives.map((passive:any)=>(
                <div key={passive.id}>
                <h1 className="font-[overwatchFont] text-6xl">{passive.name}</h1>
                <p className="text-2xl">{passive.description}</p>
                </div>
            ))}
        </div>
    )
}