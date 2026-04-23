import { useEffect, useState, useTransition } from "react"
import { getAbilitiesByHeroId } from "../../actions/getActions";
import AbilityCard from "../cards/AbilityCard";
import AddAbilityPopup from "../popups/AddAbilityPopup";

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
            <AddAbilityPopup heroID={currentHeroID!} className="px-2"/>
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
