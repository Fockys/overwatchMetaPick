
interface AbiltiyEditorProps{
    className?:string,
    abilityName:string,
    abilityDescription:string,
    abilityIcon:string
}

export default function AbilityCard({className, abilityName, abilityDescription, abilityIcon}:AbiltiyEditorProps){
    return(
        <div className={`${className ?? ''} border-2 border-white rounded-md p-4 m-2 w-48 flex flex-col justify-between`}>
            <h1 className="text-base border-b-2">{abilityName}</h1>
            <p className="text-xs">{abilityDescription}</p>
            <img src={`images/abilityIcon/${abilityIcon}`} alt={abilityName} className="w-12 h-12" />
            <button className="bg-blue-500 text-white xxl:px-4 xxl:py-2 px-2 py-1 rounded-md">Edit</button>
        </div>
    )
}