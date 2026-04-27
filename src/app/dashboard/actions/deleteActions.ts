"use server"

import { db } from "@/db";
import { abilityTable, countersTable, passivesTable, weaponsTable } from "@/db/schema";
import { eq } from "drizzle-orm";


export async function deleteAbility(abilityID:number){
    await db.delete(abilityTable).where(eq(abilityTable.id,abilityID))
}

export async function deletePassive(passiveID:number){
    await db.delete(passivesTable).where(eq(passivesTable.id,passiveID))
}

export async function deleteWeapon(weaponID:number){
    await db.delete(weaponsTable).where(eq(weaponsTable.id,weaponID))
}

export async function deleteCounter(counterID:number){
    await db.delete(countersTable).where(eq(countersTable.id,counterID))
}

//function for delete hero shouldnt be implemented as this shouldnt normally happen