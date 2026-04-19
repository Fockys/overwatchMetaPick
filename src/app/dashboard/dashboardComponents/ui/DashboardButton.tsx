
interface DashboardButtonProps{
    className?:string,
    text:string,
    onclick?:() => void,
}


export default function DashboardButton({className, text, onclick}:DashboardButtonProps){
    return(
        <button className={`bg-blue-500 text-white xxl:px-4 xxl:py-2 px-2 py-1 rounded-md ${className || ''}`} onClick={onclick}>
            {text}
        </button>
    )
}