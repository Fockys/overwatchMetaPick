import { db } from "@/db";
import { abilityTable } from "@/db/schema";
import { eq } from "drizzle-orm";


export default async function deleteAbility(abilityID:number){
    await db.delete(abilityTable).where(eq(abilityTable.id,abilityID))
}