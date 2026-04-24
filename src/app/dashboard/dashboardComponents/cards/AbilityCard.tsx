import EditAbilityPopup from "../popups/EditAbilityPopup"


interface AbiltiyEditorProps{
    className?:string,
    abilityID:number,
    abilityName:string,
    abilityDescription:string,
    abilityIcon:string
}

export default function AbilityCard({className, abilityName, abilityDescription, abilityIcon, abilityID}:AbiltiyEditorProps){
    return(
        <div className={`${className ?? ''} border-2 border-white rounded-md p-4 m-2 w-48 flex flex-col justify-between`}>
            <div className="flex justify-between border-b-2">
            <h1 className="text-base ">{abilityName}</h1>
            <img src={`images/abilityIcon/${abilityIcon}`} alt={abilityName} className="w-9 h-9" />
            </div>
            <p className="text-xs">{abilityDescription}</p>
            
            <EditAbilityPopup abilityID={abilityID} abilityName={abilityName} abilityDescription={abilityDescription}/>
        </div>
    )
}