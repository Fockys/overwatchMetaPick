

export default function Weapons({heroWeapons}:{heroWeapons:any}){

    return(
        <div className="bg-blue-900 sm:px-[20%] py-8">
            {heroWeapons.map((weapon:any)=>(
                <div key={weapon.id} className="py ">
                <h1 className="font-[overwatchFont] text-6xl">{weapon.name}</h1>
                <p className="text-2xl">{weapon.description}</p>
                </div>
            ))}
        </div>
    )
}