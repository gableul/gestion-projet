"use client"

import AfficherProjet from "../component/AfficherProjet";

function Welcome(){
    const handleLogOut=()=>{
        localStorage.clear()
        window.location.href = '/connexion'; 
    }
    return(
        <>
        <button onClick={handleLogOut}>Deconnexion</button>
        <AfficherProjet></AfficherProjet>
        <a className="lien" href="/Createprojet">Creer un projet</a>
        </>
    )
};

export default Welcome;