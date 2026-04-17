"use server"
import { db } from "@/db";
import { abilityTable, heroTable } from "@/db/schema";
import { eq } from "drizzle-orm";

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