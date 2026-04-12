"use server"

import { db } from "@/db";
import { abilityTable, countersTable, heroTable, passivesHeroJunction, passivesTable, ultimatesTable, weaponsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";

//page components
import BasicInfo from "./heroComponents/BasicInfo";
import Abilities from "./heroComponents/Abilities";
import Ultimates from "./heroComponents/Ultimates";
import Weapons from "./heroComponents/Weapons";
import Passives from "./heroComponents/Passives";
import Counters from "./heroComponents/Counters";
import CounteredBy from "./heroComponents/CounteredBy";
import HeroHeader from "./heroComponents/HeroHeader";

interface PageProps {
  params: Promise<{heroName:string}>
} 

export default async function heroPage({params}: PageProps) {
  //get hero name from page name parameters
  const { heroName } = await params;

  const basicHeroData = await getBasicHeroData(heroName)
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
      <HeroHeader name={name} role={role!} imageName={imageName!}/>

      <div className="flex-col ml-2 mr-2 sm:ml-8 sm:mr-8">
        <BasicInfo description={description!}/>
        <Abilities heroAbilities={heroAbilities}/>
        <Ultimates heroUltimates={heroUltimates}/>
        <Weapons heroWeapons={heroWeapons}/>
        <Passives heroPassives={heroPassives}/>
        <Counters heroCounters={heroCounters}/>
        <CounteredBy heroCounteredBy={heroCounteredBy}/>
      </div>
    </div>
  )

}

////////////////////
//helper functions//
////////////////////

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