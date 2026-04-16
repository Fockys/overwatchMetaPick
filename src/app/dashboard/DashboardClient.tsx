"use client"
import {useState} from "react";
import HeroSidebar from "./HeroSidebar";
import HeroEditPanel from "./HeroEditPanel";

interface DashboardClientProps {
    heros:any,
}


export default function DashboardClient({heros}:DashboardClientProps){
    
    const [currentHeroID, setCurrentHeroID] = useState<number | null>(null);
    
    return(
        <div className={`grid grid-cols-5 h-full`}>
            <HeroSidebar heros={heros} onSelectHero={setCurrentHeroID} selectedHero={currentHeroID} className="h-full"/>
            <div className="h-full col-span-3">
            <HeroEditPanel currentHeroID={currentHeroID} className="h-full p-12 "/>
            </div>
        </div>
    )
}

