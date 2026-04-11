"use server"

import { db } from "@/db";
import { abilityTable, countersTable, heroTable, passivesHeroJunction, passivesTable, ultimatesTable, weaponsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";


interface PageProps {
  params: Promise<{heroName:string}>
} 

export default async function heroPage({params}: PageProps) {
  //get hero name from page name parameters
  const { heroName } = await params;
  
  const basicHeroData = await getBasicHeroData(heroName)

  //ensure the hero exists
  if (!basicHeroData.length) notFound();

  const { id, name, imageName, description, role } = basicHeroData[0];
  const heroID = id
  const heroAbilities = await getHeroAbilities(heroID);
  const heroUltimates = await getHeroUltimate(heroID);
  const heroWeapons = await getHeroWeapons(heroID);
  const heroPassives = await getHeroPassives(heroID);
  const heroCounters = await getHeroCounters(heroID);
  const heroCounteredBy = await getHeroCounteredBy(heroID);

  return (
    <div className="p-1 ">
      
      {/* Header */}
      <div className="border-b flex mb-2 justify-between items-center">
        <div className="flex">
          <h1 className="text-3xl sm:text-8xl font-[overwatchFont]  pl-5">{name}</h1>
          <img src={"/images/heroIcon/"+imageName} loading="eager" alt={imageName!} className="  bg-blue-900 border-blue-200 border-2 rounded-sm sm:rounded-2xl sm:h-20 h-6 w-auto m-2"/>
        </div>
        <h1 className="text-xl sm:text-6xl  pr-8 pb-1 font-[overwatchMainFont] mb-1">{role}</h1>
      </div>

      <div className="flex-col ml-2 mr-2 sm:ml-8 sm:mr-8">
      
      {/* basic info */}
      <div id="basicInfoCard" className=" m-2 p-2 rounded-1xl border-2 border-blue-200 bg-blue-900 flex">
        <p className="text-xs sm:text-sm pl-2">{description}</p>
      </div>

      {/* abilities */ }
      {heroAbilities.map((ability:any) =>(
        <div key={ability.id} className="bg-blue-900 m-3 p-3 rounded-2xl  border-blue-200 border-2">
          <h1 className="font-[overwatchFont] text-4xl">{ability.name}</h1>
          <h1>{ability.description}</h1>
        </div>
      ))}

      {/* hero ultimates */}
      {heroUltimates.map((ultimate:any)=>(
        <div key={ultimate.id} className="bg-blue-900 m-3 p-3 rounded-2xl border-blue-200 border-2">
          <h1 className="font-[overwatchFont] text-4xl">{ultimate.name}</h1>
          <p>{ultimate.description}</p>
        </div>
      ))}





      {/* hero weapons */}
      <div>
      {heroWeapons.map((weapon:any)=>(
        <div key={weapon.id} className="bg-blue-900 m-3 p-3 rounded-2xl border-blue-200 border-2">
          <h1 className="font-[overwatchFont] text-4xl">{weapon.name}</h1>
          <p>{weapon.description}</p>
        </div>
      ))}
      </div>

      {/*Hero passivess */}
      <div>
      {heroPassives.map((passive:any)=>(
        <div key={passive.id} className="bg-blue-900 m-3 p-3 rounded-2xl border-blue-200 border-2">
          <h1 className="font-[overwatchFont] text-4xl">{passive.name}</h1>
          <p>{passive.description}</p>
        </div>
      ))}
      </div>


      <div className="bg-blue-900 m-3 p-3 rounded-2xl border-blue-200 border-2">
      <h1 className="font-[overwatchFont] text-4xl">Counters</h1>
      {heroCounters.map((counter:any)=>(
        <div className="flex items-center" key={counter.id}>
          <div>
          <h1 className="font-[overwatchFont] text-xl">{counter.counterName}</h1>
          <Image src={"/images/heroIcon/"+counter.counterImage.trimEnd()} width={48} height={48} alt="hero Portrait" className="mr-8 border-blue-300 border-solid border-2 rounded-lg"/>
          </div>
          <p>{counter.reason}</p>
        </div>
      ))}

      <h1 className="font-[overwatchFont] text-4xl pt-4">Countered by</h1>
      {heroCounteredBy.map((counteredBy:any)=>(
        <div key={counteredBy.id} className="flex items-center">
          <div>
          <h1 className="font-[overwatchFont] text-xl">{counteredBy.name}</h1>
          <Image src={"/images/heroIcon/"+counteredBy.counteredByImage.trimEnd()} width={48} height={48} alt="hero Portrait" className="mr-8 border-blue-300 border-solid border-2 rounded-lg"/>
          </div>
          <p>{counteredBy.reason}</p>
        </div>
      ))}


      </div>
      </div>


    </div>
  )

}

async function getBasicHeroData(heroName:string){
  const data = await db
    .select({id: heroTable.id, name: heroTable.name, imageName: heroTable.imageName, description: heroTable.description, role: heroTable.role})
    .from(heroTable)
    .where(eq(heroTable.name,heroName))
  return data
}

async function getHeroAbilities(heroID:number){
  const data = await db
    .select({id: abilityTable.id, name: abilityTable.name, description: abilityTable.description})
    .from(abilityTable)
    .where(eq(abilityTable.heroID,heroID))
  return data
}

async function getHeroUltimate(heroID:number){
  const data = await db
    .select({id: ultimatesTable.id, name: ultimatesTable.name, description: ultimatesTable.description})
    .from(ultimatesTable)
    .where(eq(ultimatesTable.heroID,heroID))
  return data
}

async function getHeroPassives(heroID:number){
  const data = await db
    .select({id: passivesHeroJunction.id, name: passivesTable.name, description: passivesTable.description})
    .from(passivesHeroJunction)
    .innerJoin(passivesTable, eq(passivesHeroJunction.passiveID,passivesTable.id))
    .where(eq(passivesHeroJunction.heroID, heroID))

    return data
}

async function getHeroWeapons(heroID:number){
  const data = await db
    .select({id: weaponsTable.id, name:weaponsTable.name, description:weaponsTable.description})
    .from(weaponsTable)
    .where(eq(weaponsTable.heroID,heroID))
  return data
}

async function getHeroCounters(heroID:number){
  const data = await db
    .select({id:countersTable.id, counterName:heroTable.name, counterImage:heroTable.imageName, reason:countersTable.reason})
    .from(countersTable)
    .innerJoin(heroTable, eq(countersTable.heroCounterID, heroTable.id))
    .where(eq(countersTable.heroID,heroID))
  return data
}

async function getHeroCounteredBy(heroID:number){
  const data = await db
    .select({id:countersTable.id, name:heroTable.name, counteredByImage:heroTable.imageName, reason:countersTable.reason})
    .from(countersTable)
    .innerJoin(heroTable, eq(countersTable.heroID, heroTable.id))
    .where(eq(countersTable.heroCounterID,heroID))
  return data
}