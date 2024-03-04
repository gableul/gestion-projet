"use client"

import AfficherProjet from "../component/AfficherProjet";
import "../styles/topBar/global.css"

function Welcome(){
    const name = localStorage.getItem("nom")
    const handleLogOut=()=>{
        localStorage.clear()
        window.location.href = '/connexion'; 
    }
    return(
        <>
        <div className="topbar">
        <div className="welcom-div">Bienvenue {name}</div>
        <img src="../favicon.ico" alt="Logo" className="logo"></img>
        <button onClick={handleLogOut} className="logout-button">Deconnexion</button>
        </div>
        <br></br>
        <AfficherProjet></AfficherProjet>
        <div className="buttoncenter"><a className="lienCreerprojet" href="/Createprojet">Creer un projet</a></div>
        </>
    )
};

export default Welcome;