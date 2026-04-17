import { useEffect, useState, useTransition } from "react"
import { getHeroIconByID } from "../actions";


interface HeroIconEditorProps {
    className?:string,
    currentHeroID:number | null,
}

export default function HeroIconEditor( {className, currentHeroID}:HeroIconEditorProps){

    const [heroData, setHeroData] = useState<any>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (!currentHeroID){
            setHeroData(null);
            return;
        }
        
        startTransition(async () => {
            const data = await getHeroIconByID(currentHeroID);
            console.log(data);
            setHeroData(data);
        })
    }, [currentHeroID])
    



    return (
    <div className={`  ${className ?? ''}`}>
      {isPending && <p>Loading...</p>}

      {!isPending && heroData && (
        <div>
            <h1 className="text-2xl">Current hero Icon</h1>
            <img src={`/images/heroIcon/${heroData.imageName}`} className="w-32 border-4 border-blue-300 rounded-sm"></img>
            <form className="mt-4">
                <label className="block mb-2 text-lg">Upload New Icon</label>
                <input type="file" className="mb-4 border-2 cursor-pointer"/>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Upload</button>
            </form>
        </div>
      )}
    </div>
  );

}