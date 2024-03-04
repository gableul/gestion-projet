"use client"
import React, { useState,useEffect } from 'react';
import axios, { Axios } from 'axios';
import "../styles/Crud/global.css"


function ModificationTache() {
    const [Liste_Tache,setListe_Tache] = useState([]);
    const [Tache_choisi,setChangement] = useState(localStorage.getItem("IdTache"));
    const [newEtat,setnewEtat] = useState("");



  // Gestionnaire de soumission pour traiter les données lors de la soumission du formulaire

  async function handleSubmit(){
  if(Tache_choisi.length!=0 || newEtat.length !=0 ){
  try{
      console.log("c'est ca que je veux voir " + localStorage.getItem("IdTache"))
        setChangement(localStorage.getItem("IdTache"))
        await axios.patch("http://localhost:3000/api/ModifierEtatTache?id="+Tache_choisi,{etat:newEtat})
        window.location.href = '/welcome'; 
        
  }catch (error) {
    console.error("Erreur lors de la modification:", error)
  }}
  else{
    alert("Pas de modification réalisé")
    window.location.href = '/welcome'; 
  }
}




  return (
    <div className='container'>
      
    <div className='form-container'>
    <h1>Modifier tache </h1>
        <select value={newEtat} onChange={(e)=>setnewEtat(e.target.value)}>          
            <option value="">Sélectionnez l'état</option>
            <option value="0">Non Commencé</option>
            <option value="1">En cours</option>
            <option value="2">Terminé</option></select>
            <button onClick={handleSubmit} >Modifier</button>
            <a className="lien" href="/welcome">Retour</a>
    </div>
    </div>


  );
}

export default ModificationTache;


