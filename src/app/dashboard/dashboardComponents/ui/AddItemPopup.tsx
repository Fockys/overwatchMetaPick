import { useState } from "react";
import Dashboard from "../../page";
import DashboardButton from "./DashboardButton";


interface addItemPopupProps{
    className?:string,
    buttonText:string,
    popupTitle:string,
    popupFields:any[],

}

export default function AddItemPopup({className, buttonText, popupTitle, popupFields}:addItemPopupProps){

    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(!isOpen);

    return(
        <div className={`${className ?? ''}`}>
        <DashboardButton text={buttonText} onclick={handleOpen} />
        {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={handleOpen}>
        <div className="fixed bg-blue-900 top-1/2 left-1/2 p-4 rounded-md border-2 transform -translate-x-1/2 -translate-y-1/2" onClick={e => e.stopPropagation()}>
            <h1>{popupTitle}</h1>
            {popupFields.map((field:any) => (
                <div key={field} className="flex flex-col my-2">
                    <label htmlFor={field} className="text-sm">{field}</label>
                    <input type="text" id={field} name={field} className="border-2 rounded-md border-black text-black p-1 bg-white"/>
                </div>
            ))}
            <DashboardButton text="Submit" className="mt-2"/>
        </div>
        </div>

        )}
        </div>
    )

}