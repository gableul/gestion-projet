"use client"

import { useEffect } from "react";

function Redirect(){

  useEffect(() => {
    window.location.href = '/connexion'; 
  }, []);

  return null; // Composant vide, car il n'y a rien à afficher lors de la redirection
}

   


export default Redirect;