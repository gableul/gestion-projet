"use client"
import React, { useState,useEffect } from 'react';
import axios, { Axios } from 'axios';
import "../styles/Crud/global.css"


function ModificationProjet() {
    const [description, setDescription] = useState('');
    const [nom, setNom] = useState('');



  // Gestionnaire de soumission pour traiter les données lors de la soumission du formulaire

  async function handleSubmit(){
    if(description.length==0 && nom.length==0){
      alert("Aucune modification n'as été réalisé !")
      window.location.href = '/welcome';  
    }else{
    try{
        await axios.patch("http://localhost:3000/api/ModifierProjet?id="+localStorage.getItem("idProjet"),{Description:description,Nom:nom})
    }catch(error){
      console.error("Erreur lors de la modification:", error)
    }window.location.href = '/welcome';  

  }  

}


  return (
    <div className='container'>
      <div className='form-container'>

        
        <p>Description :</p>
            <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <p>Nom :</p>
            <input
                type="text"
                id="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
            />

            <button onClick={handleSubmit} >Modifier</button>
            <a className="lien" href="/welcome">Retour</a>
      </div>
    </div>


  );
}

export default ModificationProjet;

