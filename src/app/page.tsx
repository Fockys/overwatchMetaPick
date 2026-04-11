import Image from "next/image";
import HeroSearch from "./components/HeroSearch";
import { db } from "@/db";
import { heroTable } from "@/db/schema";


export default async function Home() {
  const heros = await db.select().from(heroTable)




  return (
    <div className="bg-[url(/images/gibraltar.jpg)] min-h-screen bg-cover  flex flex-col items-center  pt-[12%]">
      <h1 className="text-5xl sm:text-8xl text-white font-[overwatchFont]  pt-[10vh]">Find your next pick</h1>
      <HeroSearch heros={heros} className=" sm:w-9/12 lg:w-180  w-[94vw]"></HeroSearch>
    </div>
  );
}
