"use client"
import { useState, useEffect, startTransition} from "react";
import DashboardButton from "../ui/DashboardButton";
import { createCounter } from "../../actions/postActions";
import { getAllHeroes } from "../../actions/getActions";


interface addCounterPopupProps{
    className?:string,
    heroID:number,
    onNewCounter?: () => void
}

export default function AddCounterPopup({className, heroID, onNewCounter}:addCounterPopupProps){

    const [isOpen, setIsOpen] = useState(false);
    const [counterData, setCounterData] = useState({heroCounterID:"", reason:""});
    const [heroes, setHeroes] = useState<any[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const handleOpen = () => setIsOpen(!isOpen);

    const handleHeroSelect = (heroId: number) => {
        setCounterData({...counterData, heroCounterID: heroId.toString()});
        setDropdownOpen(false);
    };

    const selectedHero = heroes.find(hero => hero.id.toString() === counterData.heroCounterID);

    useEffect(() => {
        startTransition(async () => {
            const allHeroes = await getAllHeroes();
            setHeroes(allHeroes);
        });
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownOpen && !(event.target as Element).closest('.hero-dropdown')) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownOpen]);

    function handleFormSubmit(e:React.FormEvent<HTMLFormElement>){
          e.preventDefault();
          if (!heroID || !counterData.heroCounterID) return;
          console.log("adding new counter");
          startTransition( async () => {
            await createCounter(heroID, parseInt(counterData.heroCounterID), counterData.reason)
            onNewCounter?.();
          });
          setIsOpen(false);
          setCounterData({heroCounterID:"", reason:""});
        }

    return(
        <div className={`${className ?? ''}`}>
        <DashboardButton text={"Add counter"} onclick={handleOpen} />
        {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={handleOpen}>
        <div className="fixed bg-blue-900 top-1/2 left-1/2 p-4 rounded-md border-2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col" onClick={e => e.stopPropagation()}>
            <h1 className="text-lg">Add new counter</h1>
            <form onSubmit={handleFormSubmit}>
            <label>Counter Hero</label>
            <div className="relative hero-dropdown">
                <div 
                    className="border-2 border-gray-300 p-2 rounded-md w-full text-xs cursor-pointer flex items-center gap-2"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    {selectedHero ? (
                        <>
                            <img 
                                src={`/images/heroIcon/${selectedHero.imageName}`} 
                                alt={selectedHero.name} 
                                className="w-6 h-6 rounded"
                            />
                            <span>{selectedHero.name}</span>
                        </>
                    ) : (
                        <span className="text-gray-500">Select a hero...</span>
                    )}
                    <span className="ml-auto">▼</span>
                </div>
                {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 bg-blue-900 border-2 border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto z-10">
                        {heroes.map((hero) => (
                            <div
                                key={hero.id}
                                className="p-2 hover:bg-blue-300 cursor-pointer flex items-center gap-2"
                                onClick={() => handleHeroSelect(hero.id)}
                            >
                                <img 
                                    src={`/images/heroIcon/${hero.imageName}`} 
                                    alt={hero.name} 
                                    className="w-6 h-6 rounded"
                                />
                                <span className="text-xs">{hero.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <label>Reason</label>
            <textarea
                value={counterData.reason ?? ""}
                onChange={(e) => setCounterData({...counterData, reason: e.target.value})}
                className="border-2 border-gray-300 p-2 rounded-md w-full text-xs"
                placeholder="Why does this hero counter the selected hero?"
            />
            <DashboardButton text="Submit" className="mt-2"/>
            </form>

        </div>
        </div>

        )}
        </div>
    )

}