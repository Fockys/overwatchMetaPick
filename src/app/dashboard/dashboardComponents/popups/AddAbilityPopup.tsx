"use client"
import { useState, startTransition, useEffect } from "react";
import DashboardButton from "../ui/DashboardButton";
import { createAbility } from "../../actions/postActions";
import { useRouter } from "next/navigation";


interface addAbilityPopupProps{
    className?:string,
    heroID:number
}

export default function AddAbilityPopup({className, heroID}:addAbilityPopupProps){
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [abilityData, setAbilityData] = useState({name:"", description:""});
    const handleOpen = () => setIsOpen(!isOpen);





    function handleFormSubmit(e:React.FormEvent<HTMLFormElement>){
          e.preventDefault();
          if (!heroID) return;
          console.log("adding new ability");
          startTransition( async () => {
            await createAbility(heroID, abilityData.name,abilityData.description)
          });
          setIsOpen(false);
          
        }

    return(
        <div className={`${className ?? ''}`}>
        <DashboardButton text={"Add ability"} onclick={handleOpen} />
        {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={handleOpen}>
        <div className="fixed bg-blue-900 top-1/2 left-1/2 p-4 rounded-md border-2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col" onClick={e => e.stopPropagation()}>
            <h1 className="text-lg">Add new ability</h1>
            <form onSubmit={handleFormSubmit}>
            <label>Ability name</label>
            <input value={abilityData.name ?? ""} onChange={(e) => setAbilityData({...abilityData, name: e.target.value})} className="border-2 border-gray-300 p-2 rounded-md w-full text-xs"/>
            <label>Ability description</label>
            <textarea value={abilityData.description ?? ""} onChange={(e) => setAbilityData({...abilityData, description: e.target.value})} className="border-2 border-gray-300 p-2 rounded-md w-full text-xs"/>
            <DashboardButton text="Submit" className="mt-2"/>
            </form>
            
        </div>
        </div>

        )}
        </div>
    )

}