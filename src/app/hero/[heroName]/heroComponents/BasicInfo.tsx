

export default function BasicInfo({description}:{description:string}){

    return(

        <div id="basicInfoCard" className=" m-2 p-2 rounded-1xl border-2 border-blue-200 bg-blue-900 flex">
            <p className="text-xs sm:text-sm pl-2">{description}</p>
        </div>


    )
}