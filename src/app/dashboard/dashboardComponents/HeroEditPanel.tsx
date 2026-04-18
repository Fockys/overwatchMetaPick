"use client"
import { useEffect, useState, useTransition } from "react"
import { getHeroBasicByID, updateHeroBasicInfo } from "../actions";


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
            const data = await getHeroBasicByID(currentHeroID);
            console.log(data);
            setHeroData(data);
        })
    }, [currentHeroID])

    function handleFormSubmit(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      if (!currentHeroID) return;
      console.log("saving basic hero data");
      startTransition( async () => {
        await updateHeroBasicInfo(currentHeroID, heroData.name, heroData.description);
      });
    }






    return (
    <div className={` ${className ?? ''}`}>
      {isPending && <p>Loading...</p>}

      {!isPending && heroData && (
        <div className="">
          <form onSubmit={handleFormSubmit}>
            <label className="mb-2 xxl:text-lg text-sm">Hero Name</label>
            <input type="text" value={heroData.name ?? ""} onChange={(e) => setHeroData({...heroData, name: e.target.value})} className="border-2 border-gray-300 p-2 rounded-md w-full text-xs" />
            <label className="mb-2 xxl:text-lg text-sm">Hero Description</label>
            <textarea value={heroData.description ?? ""} onChange={(e) => setHeroData({...heroData, description: e.target.value})} className="border-2 border-gray-300 p-2 rounded-md w-full text-xs" />
            <button type="submit" className="bg-blue-500 text-white xxl:px-4 xxl:py-2 px-2 py-1 rounded-md">Save</button>
          </form>
        </div>
      )}
    </div>
  );

}


