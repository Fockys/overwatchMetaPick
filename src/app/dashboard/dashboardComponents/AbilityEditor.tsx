import { useEffect, useState, useTransition } from "react"
import { getAbilitiesByHeroId } from "../actions";
import AbilityCard from "./AbilityCard";

interface AbiltiyEditorProps{
    className?:string,
    currentHeroID:number | null,
}

export default function AbilityEditor({className, currentHeroID}:AbiltiyEditorProps){

    const [abilityData, setAbilityData] = useState<any>(null);
    const [isPending, startTransition] = useTransition();


    useEffect(() => {
        if (!currentHeroID){
            setAbilityData(null);
            return;
        }
        startTransition(async () => {
            const abilityData =  await getAbilitiesByHeroId(currentHeroID);
            console.log(abilityData);
            setAbilityData(abilityData);
        })
    }, [currentHeroID])


    return(
        <div className={` ${className ?? ''}`}>
            {isPending && <p>Loading Ability data...</p>}

        {!isPending && abilityData && (
            <div>
            <button className="bg-blue-500 text-white xxl:px-4 xxl:py-2 px-2 py-1 rounded-md ml-2">Add Ability</button>
            <div className="flex">
                {abilityData.map((ability:any) => (
                    <AbilityCard key={ability.id} abilityName={ability.name} abilityDescription={ability.description} abilityIcon={ability.imageName} />
                ))}
            </div>
            </div>
        )}
        </div>
    )
}
