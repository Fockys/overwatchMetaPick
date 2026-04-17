import { useEffect, useState, useTransition } from "react"


interface AbiltiyEditorProps{
    className?:string,
}

export default function AbilityEditor({className}:AbiltiyEditorProps){

    const [abilityData, setAbilityData] = useState<any>(null);
    const [isPending, startTransition] = useTransition();




    return(
        <div className={` ${className ?? ''}`}>
            <h1>Ability editor</h1>
        </div>
    )
}
