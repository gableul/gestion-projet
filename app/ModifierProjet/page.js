"use client"
import React, { useState,useEffect } from 'react';
import axios, { Axios } from 'axios';


function ModificationProjet() {
    const [description, setDescription] = useState('');
    const [nom, setNom] = useState('');



  // Gestionnaire de soumission pour traiter les données lors de la soumission du formulaire

  async function handleSubmit(){

        await axios.patch("http://localhost:3000/api/ModifierProjet?id="+localStorage.getItem("idProjet"),{Description:description,Nom:nom})
        /*alert("Mise a jour effectué")
        window.location.href = '/welcome'; */


}


  return (
    <div>

        {/* Input pour la description */}
        <label htmlFor="description">Description :</label>
            <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            {/* Input pour le nom */}
            <label>Nom :</label>
            <input
                type="text"
                id="nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
            />

            <button onClick={handleSubmit} >Modifier</button>
            <a href="/welcome">Retour</a>
    </div>


  );
}

export default ModificationProjet;

