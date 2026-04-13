"use client"

export default function LogoutButton(){
    async function handleLogout(){
        const res = await fetch("/api/logout", {method: "POST"});
        if (res.ok) window.location.href = "/";
        
    }

    return(
        <button onClick={handleLogout}>Logout</button>
    )
}