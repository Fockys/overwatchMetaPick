"use client"
import { useEffect, useState, useTransition } from "react"
import { getHeroByID } from "./actions";


interface HeroEditPanelProps {
    currentHeroID:number | null,
    className?:string,
}

export default function HeroEditPanel({currentHeroID,className}:HeroEditPanelProps){

    const [heroData, setHeroData] = useState<any>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!currentHeroID){
            setHeroData(null);
            return;
        }
        
        startTransition(async () => {
            const data = await getHeroByID(currentHeroID);
            console.log(data);
            setHeroData(data);
        })
    }, [currentHeroID])


    return (
    <div className={` ${className ?? ''}`}>
      {isPending && <p>Loading...</p>}

      {!isPending && heroData && (
        <div className="">
          <form>
            <label className="mb-2 text-lg">Hero Name</label>
            <input type="text" value={heroData.name ?? ""} onChange={(e) => setHeroData({...heroData, name: e.target.value})} className="border-2 border-gray-300 p-2 rounded-md w-full" />
            <label className="mb-2 text-lg">Hero Description</label>
            <textarea value={heroData.description ?? ""} onChange={(e) => setHeroData({...heroData, description: e.target.value})} className="border-2 border-gray-300 p-2 rounded-md w-full" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
          </form>
        </div>
      )}
    </div>
  );

}
