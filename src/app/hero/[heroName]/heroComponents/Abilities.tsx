

export default function Abilities({heroAbilities}:{heroAbilities:any}){

    return(
        <div>
            {heroAbilities.map((ability:any) =>(
            <div key={ability.id} className="bg-blue-900 m-3 p-3 rounded-2xl  border-blue-200 border-2">
            <h1 className="font-[overwatchFont] text-4xl">{ability.name}</h1>
            <h1>{ability.description}</h1>
            </div>
            ))}
      </div>
    )
}