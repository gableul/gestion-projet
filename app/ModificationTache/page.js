"use client"
import React, { useState,useEffect } from 'react';
import axios, { Axios } from 'axios';
import Tache from '@/app/backEnd/src/models/Tache';

function ModificationTache() {
    const [Liste_Tache,setListe_Tache] = useState([]);
    const [Tache_choisi,setChangement] = useState("");
    const [newEtat,setnewEtat] = useState("");



  // Gestionnaire de soumission pour traiter les données lors de la soumission du formulaire

  async function handleSubmit(){
  if(Tache_choisi.length!=0 || newEtat.length !=0 ){
  try{
      console.log("c'est ca que je veux voir " + localStorage.getItem("IdTache"))
        setChangement(localStorage.getItem("IdTache"))
        await axios.patch("http://localhost:3003/ModifierEtatTache/"+Tache_choisi,{etat:newEtat})
        
  }catch (error) {
    console.error("Erreur lors de la modification:", error)
  }}
  else{
    alert("Pas de modification réalisé")
    window.location.href = '/welcome'; 
  }
}

  useEffect(() => {
    const da = async ()=>{
        const data = await axios.get("http://localhost:3003/Tache/"+localStorage.getItem("idProjet"));
        setListe_Tache(data.data.Taches);
    }

    da();
  },[]);



  return (
    <div>
        <select
          id="etat"
          name="etat"
          value={Tache_choisi}
          onChange={(e) => setChangement(e.target.value)}
        >
            <option value="">Selectionner une Tache</option>
            {Liste_Tache.map((element => (
                <option key={element} value={element}>{element}</option>
            )))}

        </select>

        <select value={newEtat} onChange={(e)=>setnewEtat(e.target.value)}>          
            <option value="">Sélectionnez l'état</option>
            <option value="0">Non Commencé</option>
            <option value="1">En cours</option>
            <option value="2">Terminé</option></select>
            <button onClick={handleSubmit} >Modifier</button>
            <a href="/welcome">Retour</a>
    </div>


  );
}

export default ModificationTache;
