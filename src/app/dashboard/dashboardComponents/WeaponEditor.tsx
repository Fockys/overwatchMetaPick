
interface WeaponEditorProps{
    className?:string,
    currentHeroID:number | null,
}

export default function WeaponEditor({className, currentHeroID}:WeaponEditorProps){
    return(
        <div className={` ${className ?? ''}`}>
            <h1>Weapon Editor</h1>
        </div>
    )
}