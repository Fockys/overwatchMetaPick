

interface heroHeaderProps {
    name:string;
    imageName:string;
    role:string;
}

export default function HeroHeader({name , imageName, role}:heroHeaderProps){

    return(
        <div className="border-b flex mb-2 justify-between items-center">
            <div className="flex">
                <h1 className="text-3xl sm:text-8xl font-[overwatchFont]  pl-5">{name}</h1>
                <img src={"/images/heroIcon/"+imageName} loading="eager" alt={imageName!} className="  bg-blue-900 border-blue-200 border-2 rounded-sm sm:rounded-2xl sm:h-20 h-6 w-auto m-2"/>
            </div>
            <h1 className="text-xl sm:text-6xl  pr-8 pb-1 font-[overwatchMainFont] mb-1">{role}</h1>
        </div>
    )

}
