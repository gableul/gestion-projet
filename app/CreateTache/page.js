"use client"
import React, { useState } from 'react';
import axios, { Axios } from 'axios';

function CreateTache() {
    const [Titre,setTitre] = useState("");
    const [Description,setDescription] = useState("");
    const [Effort,setEffort] =  useState("");
    const [Etat,setEtat] = useState("")


  // Gestionnaire de soumission pour traiter les données lors de la soumission du formulaire
  const handleSubmit = async () => {
    try {
        if (Titre.length==0 || Description.length==0||Effort.length==0||Etat.length==0){
          alert("Merci de remplire tous les champs")
        }
        await axios.post("http://localhost:3000/api/creationTache", {
            titre: Titre,
            descrip: Description,
            effort: Effort,
            etat: Etat,
            idP: localStorage.getItem("idProjet")
        });
        
        console.log("Tâche créée avec succès !");
    } catch (error) {
        console.error("Erreur lors de la création de la tâche :", error);
    }window.location.href = '/welcome'; 
};


  return (
    <div>
      <div>
        <label >Titre : </label>
        <input
          type="text"
          id="title"
          name="title"
          value={Titre}
          onChange={(e) => setTitre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description : </label>
        <input
          type="text"
          id="description"
          name="description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label >Effort : </label>
        <input
          type="Number"
          id="effort"
          name="effort"
          value={Effort}
          onChange={(e) => setEffort(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="etat">État :</label>
        <select
          id="etat"
          name="etat"
          value={Etat}
          onChange={(e) => setEtat(e.target.value)}
          required
        >
          <option value="">Sélectionnez l'état</option>
          <option value="0">Non Commencé</option>
          <option value="1">En cours</option>
          <option value="2">Terminé</option>
        </select>
      </div>
      <button onClick={handleSubmit}>Soumettre</button>
      <br></br><a href="/welcome">Retour</a>
      </div>

  );
}

export default CreateTache;
