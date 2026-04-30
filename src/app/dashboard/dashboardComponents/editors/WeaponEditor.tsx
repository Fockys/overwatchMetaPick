import { useCallback, useEffect, useState, useTransition } from "react"
import {getWeaponsByHeroId} from "../../actions/getActions";
import DashboardButton from "../ui/DashboardButton";
import AddWeaponPopup from "../popups/AddWeaponPopup";

interface WeaponEditorProps{
    className?:string,
    currentHeroID:number | null,
}

export default function WeaponEditor({className, currentHeroID}:WeaponEditorProps){

    const [weaponData, setWeaponData] = useState<any>(null);
    const [isPending, startTransition] = useTransition();

    

    const refreshWeapons = useCallback(() => {
        if (!currentHeroID){
            setWeaponData(null);
            return;
        }
        startTransition(async()=>{
            const data = await getWeaponsByHeroId(currentHeroID);
            setWeaponData(data);
        })

    },[currentHeroID,startTransition])

    useEffect(()=>{
        refreshWeapons();
    }, [currentHeroID,refreshWeapons])

    return(
        <div className={` ${className ?? ''}`}>
            {isPending && <p>Loading...</p>}

            {!isPending && weaponData && (
                <div>
                    <h1 className="xxl:text-2xl text-sm">Current hero Weapons</h1>
                    <AddWeaponPopup heroID={currentHeroID!} onNewWeapon={refreshWeapons}/>
                    {weaponData.map((weapon:any) => (
                        <div key={weapon.id} className="mb-4 border-2 border-gray-300 rounded-sm p-2">
                            <h2 className="xxl:text-xl text-sm">{weapon.name}</h2>
                            <p className="xxl:text-base text-xs">{weapon.description}</p>
                            <DashboardButton text="edit" className="mt-2 w-full"/>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}