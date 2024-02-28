"use client"

import AfficherProjet from "../AfficherProjet/page";

function Welcome(){
    const handleLogOut=()=>{
        localStorage.clear()
        window.location.href = '/connexion'; 
    }
    return(
        <>
        <button onClick={handleLogOut}>Deconnexion</button>
        <AfficherProjet></AfficherProjet>
        <a href="/Createprojet">Creer un projet</a>
        </>
    )
};

export default Welcome;