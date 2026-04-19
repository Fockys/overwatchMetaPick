"use client"
import {useState} from "react";
import HeroSidebar from "./HeroSidebar";
import HeroEditPanel from "./HeroEditPanel";
import HeroIconEditor from "./HeroIconEditor";
import AbilityEditor from "./AbilityEditor";
import CountersEditor from "./CountersEditor";

interface DashboardClientProps {
    heros:any,
}


export default function DashboardClient({heros}:DashboardClientProps){
    
    const [currentHeroID, setCurrentHeroID] = useState<number | null>(null);
    
    return(
        <div className={`grid grid-cols-5 grid-rows-3 h-full`}>
            <HeroSidebar heros={heros} onSelectHero={setCurrentHeroID} selectedHero={currentHeroID} className="h-full col-start-1 row-start-1 row-span-full"/>
            <HeroEditPanel currentHeroID={currentHeroID} className="h-full xxl:p-12 p-2 col-start-2 col-span-3 row-start-1"/>
            <HeroIconEditor currentHeroID={currentHeroID} className="h-full xxl:p-12  col-start-5 row-start-1"/>
            <AbilityEditor currentHeroID={currentHeroID} className = "h-full col-start-2 row-start-2 col-span-3"/>
            <CountersEditor className="h-full col-start-2 row-start-3 col-span-3"/>
            
        </div>
    )
}

