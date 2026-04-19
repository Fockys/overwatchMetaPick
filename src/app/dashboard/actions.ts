"use server"
import { db } from "@/db";
import { abilityTable, countersTable, heroTable } from "@/db/schema";
import { eq, or } from "drizzle-orm";

export async function getHeroBasicByID(id:number){
    if (!id) return null;
    const hero = await db.select({id: heroTable.id, name: heroTable.name, description: heroTable.description}).from(heroTable).where(eq(heroTable.id,id));
    return hero[0] ?? null;
}

export async function getHeroIconByID(id:number){
    if (!id) return null;
    const hero = await db.select({id: heroTable.id, imageName: heroTable.imageName}).from(heroTable).where(eq(heroTable.id,id));
    return hero[0] ?? null;
}


export async function updateHeroBasicInfo(id:number, name:string, description:string){
    if (!id || !name || !description) return null;
    const result = await db.update(heroTable).set({name,description}).where(eq(heroTable.id,id));
    return;
}

export async function getAbilitiesByHeroId(id:number){
    if (!id) return null;
    const result = await db.select().from(abilityTable).where(eq(abilityTable.heroID,id));
    return result;
}

export async function getCountersByHeroId(id:number){
    if (!id) return null;
    const result = await db.select().from(countersTable).where(eq(countersTable.heroID,id))
        .leftJoin(heroTable, eq(countersTable.heroCounterID, heroTable.id));
    
    return result
}

export async function getCounteredByByHeroId(id:number){
    if (!id) return null;
    const result = await db.select().from(countersTable).where(eq(countersTable.heroCounterID,id))
        .leftJoin(heroTable, eq(countersTable.heroID, heroTable.id));
    return result
}