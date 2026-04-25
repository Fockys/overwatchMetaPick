"use client"
import { useEffect, useState, useTransition } from "react"
import { getHeroBasicByID} from "../../actions/getActions";
import {  updateBasicHeroInfo } from "../../actions/postActions";
import DashboardButton from "../ui/DashboardButton";


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
            setHeroData(data);
        })
    }, [currentHeroID])

    function handleFormSubmit(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      if (!currentHeroID) return;
      console.log("saving basic hero data");
      startTransition( async () => {
        await updateBasicHeroInfo(currentHeroID, heroData.name, heroData.description,heroData.role);
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
            <label className="mb-2 xxl:text-lg text-sm">Role</label>
            <select value={heroData.role} onChange={(e) => setHeroData({...heroData, role: e.target.value})} className="border-2 border-gray-300 p-2 rounded-md w-full text-xs" >
              <option value={"Tank"}>Tank</option>
              <option value={"Damage"}>Damage</option>
              <option value={"Support"}>Support</option>
            </select>
            <DashboardButton text="Save" className="mt-4 px-4"/>
          </form>
        </div>
      )}
    </div>
  );

}


