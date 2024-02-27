"use client"

import AfficherProjet from "../AfficherProjet/page";

function Welcome(){
    return(
        <>
        <a href="/frontend/Createprojet">Creer un projet</a>
        <AfficherProjet id ={localStorage.getItem("id")}></AfficherProjet>
        </>
    )
};

export default Welcome;