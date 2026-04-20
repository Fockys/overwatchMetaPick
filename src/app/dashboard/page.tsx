
import DashboardClient from "./dashboardComponents/DashboardClient";
import { heroTable } from "@/db/schema";
import { NextRequest,NextResponse } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";


export default async function Dashboard() {


    const heros = await getHeros();
    return(
        <div className="h-full w-screen overflow-y-hidden">  
        <DashboardClient heros={heros}/>
        </div>
    )

}



async function getHeros(){
    const response = await db.select().from(heroTable);
    return response;
}

