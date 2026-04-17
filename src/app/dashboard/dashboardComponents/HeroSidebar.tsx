"use client"

interface HeroSidebarProps {
    heros:any,
    className?:string,
    onSelectHero:any,
    selectedHero:number | null,
}

export default function HeroSidebar({heros,className,onSelectHero,selectedHero}:HeroSidebarProps){

    return(
        <div className={`bg-blue-950 overflow-y-scroll ${className ?? ''}`}>
            <h1 className="text-4xl border-b-4 border-b-blue-300 sticky top-0 bg-blue-950">Heros</h1>
            <div className="px-5 py-2">

                {heros.map((hero:any) => (
                    <p key={hero.id} onClick={() => onSelectHero(hero.id)} className={selectedHero === hero.id ? "cursor-pointer border-blue-300 border-2 rounded-sm" : "cursor-pointer hover:bg-blue-500"}>{hero.name}</p>
                ))}

            </div>
        </div>
    )

}

