"use client"
import {useState} from "react";
import HeroSidebar from "./HeroSidebar";
import HeroEditPanel from "./HeroEditPanel";
import HeroIconEditor from "./HeroIconEditor";
import AbilityEditor from "./AbilityEditor";
import CountersEditor from "./CountersEditor";
import WeaponEditor from "./WeaponEditor";
import PassivesEditor from "./PassivesEditor";

interface DashboardClientProps {
    heros:any,
}


export default function DashboardClient({heros}:DashboardClientProps){
    
    const [currentHeroID, setCurrentHeroID] = useState<number | null>(null);
    
    return(
        <div className={`h-full w-full grid grid-cols-5 grid-rows-1 gap-0`}>
            <HeroSidebar heros={heros} onSelectHero={setCurrentHeroID} selectedHero={currentHeroID} className="h-full w-full col-start-1 row-start-1 row-span-full"/>
            <div className="h-full col-start-2 col-span-4 grid grid-cols-4 grid-rows-[auto_auto_auto] gap-4 overflow-y-scroll w-full">
            <HeroEditPanel currentHeroID={currentHeroID} className="h-auto xxl:p-12 p-2 col-start-1 col-span-3 row-start-1"/>
            <HeroIconEditor currentHeroID={currentHeroID} className="h-auto xxl:p-12  col-start-4 row-start-1"/>
            <AbilityEditor currentHeroID={currentHeroID} className = "h-auto col-start-1 row-start-2 col-span-3"/>
            <CountersEditor currentHeroID={currentHeroID} className="h-auto row-start-3 col-start-1 col-span-3 "/>
            <WeaponEditor currentHeroID={currentHeroID} className="h-auto col-start-4 row-start-2"/>
            <PassivesEditor currentHeroID={currentHeroID} className="h-auto col-start-4 row-start-3"/>
            </div>
        </div>
    )
}

