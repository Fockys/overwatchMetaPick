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
            <h1 className="xxl:text-2xl text-sm">Current hero Icon</h1>
            <img src={`/images/heroIcon/${heroData.imageName}`} className="xxl:w-32 w-12 border-4 border-blue-300 rounded-sm"></img>
            <form className="xxl:mt-4 mt-1">
                <label className="block mb-2 xxl:text-lg text-sm">Upload New Icon</label>
                <input type="file" className="mb-4 border-2 cursor-pointer w-full"/>
                <button type="submit" className="bg-blue-500 text-white xxl:px-4 xxl:py-2 px-2 py-1 rounded-md">Upload</button>
            </form>
        </div>
      )}
    </div>
  );

}