import DashboardButton from "./ui/DashboardButton";

interface CounterCardProps{
    className?:string,
    counterHeroName:string,
    counterHeroIcon:string,
    counterHeroReason:string,

}

export default function CounterCard({className, counterHeroIcon, counterHeroName, counterHeroReason,}:CounterCardProps){
    return(
        <div className={`border-2 rounded-md w-48 p-4 flex flex-col items-center mx-2 ${className ?? ''}`}>


            <div className="flex-col flex">
                <div className="border-b-2 flex flex-row justify-between">
                    <h1 className="text-lg">{counterHeroName}</h1>
                    <img src={`images/heroIcon/${counterHeroIcon}`} alt={counterHeroName} className="w-9 h-9" />
                </div>
                <p className="text-xs">{counterHeroReason}</p>
            </div>
            
            <DashboardButton text="Edit" className="ml-auto w-full"/>
        </div>
    )
}
