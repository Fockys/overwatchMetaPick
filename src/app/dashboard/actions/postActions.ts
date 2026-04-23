"use server"
import { db } from "@/db";
import { abilityTable, heroTable } from "@/db/schema";
import { eq } from "drizzle-orm";




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
}

export async function editCounter(counterID:number, HeroCounterID:number, reason:string){
}

//passives
export async function createPassive(name:string, description:string){
}

export async function editPassive(passiveID:number, name:string, description:string){
}

//weapons
export async function createWeapon(heroID:number, name:string, description:string){
}

export async function editWeapon(weaponID:number, name:string, description:string){
}