
interface CountersEditorProps{
    className?:string,
    currentHeroID?:number | null,
}


export default function CountersEditor({className, currentHeroID}:CountersEditorProps){
    return(
        <div>
            <h1>Counter editor</h1>
        </div>
    )
}