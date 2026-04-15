"use client"
import { useState, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"

export default function Abilities({heroAbilities}:{heroAbilities:any}){
    const [emblaRef,emblaApi] = useEmblaCarousel({loop:true})
    const [selectedIndex, setSelectedIndex] = useState(0)

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        emblaApi.on("select", onSelect)
    }, [emblaApi, onSelect])


    return(
        <div className="bg-blue-900 py-8 ">
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex">
                {heroAbilities.map((ability:any) =>(
                <div key={ability.id} className=" flex-[0_0_100%] sm:px-[20%]">
                    <h1 className="font-[overwatchFont] text-8xl">{ability.name}</h1>
                    <p className="text-3xl">{ability.description}</p>
                </div>
                ))}
                </div>
            </div>

            <div className="flex justify-center gap-2 mt-3 h-18">
                {heroAbilities.map((ability: any, index: number) => (
                <div className="w-16 flex justify-center items-center">
                <button
                    key={index}
                    onClick={() => emblaApi?.scrollTo(index)}
                    className={`w-12 h-12 bg-no-repeat bg-center bg-blue-950 rounded-full transition-colors hover:w-16 hover:h-16 static ${
                    index === selectedIndex ? "opacity-100" : "opacity-30"
                    }`}
                    style={{backgroundImage:`url(/images/abilityIcon/${ability.imageName})`,backgroundSize: "70%"}}
                />
                </div>
                ))}
            </div>


        </div>
      
    )
}