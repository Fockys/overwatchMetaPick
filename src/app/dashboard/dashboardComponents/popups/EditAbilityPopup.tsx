"use client"
import { useState, startTransition, } from "react"
import DashboardButton from "../ui/DashboardButton"
import { deleteAbility } from "../../actions/deleteActions"
import { editAbility } from "../../actions/postActions"


interface editAbilityPopupProps{
    className?:string,
    abilityID:number
    abilityName:string,
    abilityDescription:string,
    onAbilityDelete:any,
    onAbilityEdit:any
}

export default function EditAbilityPopup({className, abilityID, abilityName, abilityDescription, onAbilityDelete, onAbilityEdit}:editAbilityPopupProps){

    const [isOpen, setIsOpen] = useState(false)
    const [abilityData, setAbilityData] = useState({name:abilityName,description:abilityDescription})
    const handleOpen = () => setIsOpen(!isOpen)


    function handleFormSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (!abilityID)return;
        startTransition( async () => {
            await editAbility(abilityID,abilityData.name,abilityData.description)
        })
        onAbilityEdit();
        setIsOpen(false);

    }

    function abilityDelete(){

        startTransition( async () => {
            await deleteAbility(abilityID);
        })
        setIsOpen(false);
        onAbilityDelete();
        return
    }


    return(
        <div className={` ${className ?? ''}`}>
            <DashboardButton text={"edit"} onclick={handleOpen}/>
            {isOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={handleOpen}>
                <div className="fixed bg-blue-900 top-1/2 left-1/2 p-4 rounded-md border-2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col" onClick={e => e.stopPropagation()}>
                <h1>Add new ability</h1>
                <form onSubmit={handleFormSubmit}>
                    <label>Name</label>
                    <input value={abilityData.name ?? ""} onChange={(e) => setAbilityData({...abilityData,name:e.target.value})} className="border-2 border-gray-300 p-2 rounded-md w-full text-xs"/>
                    <label>Description</label>
                    <textarea value={abilityData.description ?? ""} onChange={(e) => setAbilityData({...abilityData, description:e.target.value})} className="border-2 border-gray-300 p-2 rounded-md w-full text-xs"/>

                    <DashboardButton text="submit"/>
                </form>
                <DashboardButton text="delete" className="bg-red-500" onclick={() => abilityDelete()}/>
                </div>
                </div>
            )}

            



        </div>
    )
}