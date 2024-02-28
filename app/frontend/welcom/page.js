"use client"

import AfficherProjet from "../AfficherProjet/page";

function Welcome(){
    const handleLogOut=()=>{
        localStorage.clear()
        window.location.href = '/frontend/connexion'; 
    }
    return(
        <>
        <a href="/frontend/Createprojet">Creer un projet</a>
        <AfficherProjet></AfficherProjet>
        <button onClick={handleLogOut}>Deconnexion</button>
        </>
    )
};

export default Welcome;