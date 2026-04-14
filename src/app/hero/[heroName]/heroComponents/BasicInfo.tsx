

interface basicInfoProps {
    description:string;
    imageName:string;
}

export default function BasicInfo({description, imageName}:basicInfoProps){

    return(

        <div id="basicInfoCard" className="bg-blue-950 p-2 sm:py-16 sm:px-[20%] grid-cols-3 grid-rows-1 flex-none grid w-screen">
            <img src={"/images/heroIcon/"+imageName} loading="eager" alt={imageName!} className=" order-1 bg-blue-900 border-blue-200 border-2 rounded-sm sm:rounded-2xl sm:h-60 h-24 w-auto"/>
            <p className="text-xs sm:text-xl order-2">{description}</p>

        </div>


    )
}