import Image from "next/image";
import HeroSearch from "./components/HeroSearch";
import { db } from "@/db";
import { heroTable } from "@/db/schema";


export default async function Home() {
  const heros = await db.select().from(heroTable)




  return (
    <div className=" relative h-full overflow-hidden touch-none">

    <div className="bg-[url(/images/gibraltar.jpg)] opacity-90 h-full absolute inset-0  bg-cover bg-center"/>
    <div className="absolute inset-0 bg-black/20" />

    <div className="relative z-10 flex flex-col items-center pt-[9vh] sm:pt-[12vh]">
      <h1 className="text-5xl sm:text-8xl text-white font-[overwatchFont]">Find your next pick</h1>
      <HeroSearch heros={heros} className=" sm:w-9/12 lg:w-180  w-[94vw]"></HeroSearch>
    </div>
    </div>
  );
}
