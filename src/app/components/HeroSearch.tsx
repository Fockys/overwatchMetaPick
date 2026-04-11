"use client"
import { useEffect } from "react";
import "@/app/globals.css"
import Image from "next/image"
import React, {useState} from "react";
import { useRouter } from "next/navigation";



interface HeroSearchProps {
    heros:any;
    className?:string;
}


export default function HeroSearch({heros, className}:HeroSearchProps){

    const [showHero, setShowHero] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const doShowHero = () => {
        setShowHero(true);

    }
    const filteredHeros = heros.filter((hero:any)=> hero.name.toUpperCase().includes(searchTerm.toUpperCase()))

    const updateSearch = (value:string) => {
        setSearchTerm(value);
        
    }

    const doHideHero = () => {
        if(searchTerm==""){
            setShowHero(false);
        }
        
    }

    const getHero = (heroName:string) => {
        console.log(heroName);
        router.push("/hero/"+heroName.replaceAll(" ","_"));

    }

    //so the page is reloaded on a backtrack.
    useEffect(() => {
        const handlePageShow = (event: PageTransitionEvent) => {
            if (event.persisted) {
                window.location.reload()
                
            }
        };

        window.addEventListener("pageshow", handlePageShow);

        return () => {
            window.removeEventListener("pageshow", handlePageShow);
        };
    }, []);



    return(
        <div id="heroSearch" onMouseLeave={doHideHero} className={`m-10 flex flex-col justify-center items-left bg-slate-400  rounded-2xl *:text-black ${className ?? ''}`}>
        <input value={searchTerm} onChange={(e) => updateSearch(e.target.value)} onMouseOver={doShowHero} placeholder="Search hero" type="text" className="w-full rounded-2xl h-12 border-blue-300 border-2 text-black p-5 outline-none"></input>
        <div id="heroSearchDropdown" className="overflow-y-scroll max-h-[50vh] sm:max-h-[30vh]">
        {showHero && filteredHeros.map((hero:any) => (
        <div onClick={(e)=> getHero(hero.name)} key={hero.id} id="seachItem" className="cursor-pointer p-3 flex-row flex items-center">
            <Image src={"/images/heroIcon/"+hero.imageName.trimEnd()} width={48} height={48} alt="hero Portrait" className="mr-8 border-blue-300 border-solid border-2 rounded-lg"/>
            <a className="font-[overwatchFont] text-4xl text-white">{hero.name}</a>
        </div>
        ))}
        
        </div>
        </div>
    )

}