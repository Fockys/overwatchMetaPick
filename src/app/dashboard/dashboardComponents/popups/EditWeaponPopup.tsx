import { startTransition, useState } from "react"
import DashboardButton from "../ui/DashboardButton"
import { deleteWeapon } from "../../actions/deleteActions"
import { editWeapon } from "../../actions/postActions"

interface editWeaponPopupProps{
    className?:string,
    weaponID:number
    weaponName:string,
    weaponDescription:string,
    onWeaponDelete:any,
    onWeaponEdit:any
}

export default function EditWeaponPopup({className, weaponID, weaponName, weaponDescription, onWeaponDelete, onWeaponEdit}:editWeaponPopupProps){

    const [isOpen, setIsOpen] = useState(false)
    const [weaponData, setWeaponData] = useState({name:weaponName,description:weaponDescription})
    const handleOpen = () => setIsOpen(!isOpen)

    function handleFormSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (!weaponID)return;
        startTransition( async () => {
            await editWeapon(weaponID,weaponData.name,weaponData.description)
        })
        onWeaponEdit();
        setIsOpen(false);
    }

    function weaponDelete(){
        startTransition( async () => {
            await deleteWeapon(weaponID);
        })
        setIsOpen(false);
        onWeaponDelete();
        return;
    }

    return(
        <div className={` ${className ?? ''}`}>
            <DashboardButton text={"edit"} onclick={handleOpen}/>
            {isOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={handleOpen}>
                <div className="fixed bg-blue-900 top-1/2 left-1/2 p-4 rounded-md border-2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col" onClick={e => e.stopPropagation()}>
                <h1>Edit weapon</h1>
                <form onSubmit={handleFormSubmit}>
                    <label>Name</label>
                    <input value={weaponData.name ?? ""} onChange={(e) => setWeaponData({...weaponData,name:e.target.value})} className="border-2 border-gray-300 p-2 rounded-md w-full text-xs"/>
                    <label>Description</label>
                    <textarea value={weaponData.description ?? ""} onChange={(e) => setWeaponData({...weaponData, description:e.target.value})} className="border-2 border-gray-300 p-2 rounded-md w-full text-xs"/>
                    <DashboardButton text="submit"/>
                </form>
                <DashboardButton text="delete" className="bg-red-600 mt-2" onclick={weaponDelete}/>
                </div>
                </div>
            )}
        </div>
    )



}