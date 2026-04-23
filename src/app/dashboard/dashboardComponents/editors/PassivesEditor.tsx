import { useEffect, useState, useTransition } from "react"
import { getPassivesByHeroId } from "../../actions/getActions";

interface PassivesEditorProps {
    className?:string,
    currentHeroID?:number | null,
}

export default function PassivesEditor({className, currentHeroID}:PassivesEditorProps){

    const [passivesData, setPassivesData] = useState<any>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(()=>{
        if (!currentHeroID){
            setPassivesData(null);
            return;
        }

    startTransition(async()=>{
            const data = await getPassivesByHeroId(currentHeroID);
            console.log(data);
            setPassivesData(data);
        })
    }, [currentHeroID])


    return(
        <div className={` ${className ?? ''}`}>
            {isPending && <p>Loading...</p>}
            
            {!isPending && passivesData && (
                <div>
                    <h1 className="text-lg">Passives</h1>
                    <ul>
                        {passivesData.map((passive: any) => (
                            <div key={passive.passives_table.id} className="border-2 border-gray-300 p-4 rounded-sm">
                                <h3>{passive.passives_table.name}</h3>
                                <p className="text-xs">{passive.passives_table.description}</p>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
