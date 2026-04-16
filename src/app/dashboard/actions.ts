"use server"
import { db } from "@/db";
import { heroTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getHeroByID(id:number){
    if (!id) return null;
    const hero = await db.select().from(heroTable).where(eq(heroTable.id,id));
    return hero[0] ?? null;
}