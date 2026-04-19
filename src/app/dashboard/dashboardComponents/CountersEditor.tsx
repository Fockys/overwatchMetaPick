import { useEffect, useState, useTransition } from "react"
import { getCountersByHeroId, getCounteredByByHeroId } from "../actions";
import CounterCard from "./CounterCard";
import DashboardButton from "./ui/DashboardButton";

interface CountersEditorProps{
    className?:string,
    currentHeroID:number | null,
}


export default function CountersEditor({className, currentHeroID}:CountersEditorProps){
    const [counterData, setCounterData] = useState<any>(null);
    const [counteredByData, setCounteredByData] = useState<any>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!currentHeroID){
            setCounterData(null);
            return;
        }
        startTransition(async () => {
            const counterData = await getCountersByHeroId(currentHeroID);
            setCounterData(counterData);
            const counteredByData = await getCounteredByByHeroId(currentHeroID);
            setCounteredByData(counteredByData);
        })
    }, [currentHeroID])



    return(
        <div className={` ${className ?? 'flex'}`}>
        {isPending && <p>Loading...</p>}

        {!isPending && counterData && (
            <div>
                <DashboardButton text="New Counter" className=" mb-2 ml-2"/>
                <div className="flex flex-row">
                    <div>
                    <h1 className="text-xl pl-2">Counters</h1>
                        <div>
                        {counterData.map((counter:any) => (
                            <CounterCard key={counter.counters_table.id} counterHeroName={counter.hero_table.name} counterHeroReason={counter.counters_table.reason} counterHeroIcon={counter.hero_table.imageName}/>
                        ))}
                        </div>
                    </div>
                    
                    <div>
                    <h1 className="text-xl pl-2">Countered By</h1>
                        <div>
                        {counteredByData.map((counter:any) => (
                            <CounterCard key={counter.counters_table.id} counterHeroName={counter.hero_table.name} counterHeroReason={counter.counters_table.reason} counterHeroIcon={counter.hero_table.imageName}/>
                        ))}
                        </div>
                    </div>
                </div>
                
            </div>
        )}
        </div>
    )
}