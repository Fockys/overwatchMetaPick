"use server"
import { db } from "@/db";
import { abilityTable, countersTable, heroTable, passivesTable, weaponsTable } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";




//basic
export async function updateBasicHeroInfo(heroID:number, name:string, description:string, role:string){

    await db.update(heroTable)
    .set({name:name, description:description, role:role})
    .where(eq(heroTable.id,heroID))

}

//abilities
export async function createAbility(heroID:number, name:string, description:string){
    await db.insert(abilityTable)
    .values({heroID:heroID, name:name, description:description})

}

export async function editAbility(abilityID:number, name:string, description:string){
    await db.update(abilityTable)
    .set({name:name, description:description})
    .where(eq(abilityTable.id,abilityID))
}

//counters
export async function createCounter(heroID:number, heroCounterID:number, reason:string){
    await db.insert(countersTable)
    .values({heroID:heroID,heroCounterID:heroCounterID,reason:reason})
}

export async function editCounter(counterID:number, heroCounterID:number, reason:string){
    await db.update(countersTable)
    .set({heroID:counterID,heroCounterID:heroCounterID,reason:reason})
    .where(and(eq(countersTable.heroID,counterID),eq(countersTable.heroCounterID,heroCounterID)));

}

//passives
export async function createPassive(name:string, description:string){
    await db.insert(passivesTable)
    .values({name:name,description:description})
}

export async function editPassive(passiveID:number, name:string, description:string){
    await db.update(passivesTable)
    .set({name:name,description:description})
    .where(eq(passivesTable.id,passiveID))
}

//weapons
export async function createWeapon(heroID:number, name:string, description:string){
    await db.insert(weaponsTable)
    .values({heroID:heroID, name:name, description:description});
}

export async function editWeapon(weaponID:number, name:string, description:string){
    await db.update(weaponsTable)
    .set({name:name,description:description})
    .where(eq(weaponsTable.id,weaponID));
}