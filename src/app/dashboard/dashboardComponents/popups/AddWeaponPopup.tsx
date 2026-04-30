"use client"

import { startTransition, useState } from "react"
import { createWeapon } from "../../actions/postActions"
import DashboardButton from "../ui/DashboardButton"

interface addWeaponPopupProps{
    className?:string,
    heroID:number,
    onNewWeapon?: () => void 
}

export default function AddWeaponPopup({className, heroID, onNewWeapon}:addWeaponPopupProps){

    const[isOpen, setIsOpen] = useState(false)
    const[weaponData, setWeaponData] = useState({name:"",description:""})
    const handleOpen = () => {setIsOpen(!isOpen)}


    function handleFormSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(!heroID) return;
        console.log("adding new weapon");
        startTransition( async () => {
            await createWeapon(heroID,weaponData.name,weaponData.description)
            onNewWeapon?.();
        });
        setIsOpen(false);

    }

    return(
        <div className={className}>
        <DashboardButton text="add weapon" onclick={handleOpen}/>
        {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={handleOpen}>
        <div className="fixed bg-blue-900 top-1/2 left-1/2 p-4 rounded-md border-2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col" onClick={e => e.stopPropagation()}>
            <h1 className="text-lg">Add new ability</h1>
            <form onSubmit={handleFormSubmit}>
            <label>Weapon name</label>
            <input value={weaponData.name ?? ""} onChange={(e) => setWeaponData({...weaponData, name: e.target.value})} className="border-2 border-gray-300 p-2 rounded-md w-full text-xs"/>
            <label>Weapon description</label>
            <textarea value={weaponData.description ?? ""} onChange={(e) => setWeaponData({...weaponData, description: e.target.value})} className="border-2 border-gray-300 p-2 rounded-md w-full text-xs"/>
            <DashboardButton text="Submit" className="mt-2"/>
            </form>
            
        </div>
        </div>
        )}


        </div>
    )

}