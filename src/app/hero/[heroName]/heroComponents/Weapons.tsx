

export default function Weapons({heroWeapons}:{heroWeapons:any}){

    return(
        <div>
            {heroWeapons.map((weapon:any)=>(
                <div key={weapon.id} className="bg-blue-900 m-3 p-3 rounded-2xl border-blue-200 border-2">
                <h1 className="font-[overwatchFont] text-4xl">{weapon.name}</h1>
                <p>{weapon.description}</p>
                </div>
            ))}
        </div>
    )
}