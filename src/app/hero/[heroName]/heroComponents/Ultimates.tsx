

export default function Ultimates({heroUltimates}:{heroUltimates:any}){

    return(
        <div>
            {heroUltimates.map((ultimate:any)=>(
                <div key={ultimate.id} className="bg-blue-900 m-3 p-3 rounded-2xl border-blue-200 border-2">
                <h1 className="font-[overwatchFont] text-4xl">{ultimate.name}</h1>
                <p>{ultimate.description}</p>
                </div>
            ))}
        </div>

    )
}