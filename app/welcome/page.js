"use client"

import AfficherProjet from "../component/AfficherProjet";
import "../styles/topBar/global.css"

function Welcome(){
    const handleLogOut=()=>{
        localStorage.clear()
        window.location.href = '/connexion'; 
    }
    return(
        <>
        <div className="topbar">
        <button onClick={handleLogOut}>Deconnexion</button>
        </div>
        <br></br>
        <AfficherProjet></AfficherProjet>
        <a className="lien" href="/Createprojet">Creer un projet</a>
        </>
    )
};

export default Welcome;