"use client"
import React, { useState } from 'react';
import axios, { Axios } from 'axios';
import "../styles/createProject/global.css"
function CreateTache() {
    const [Titre,setTitre] = useState("");
    const [Description,setDescription] = useState("");
    const [Effort,setEffort] =  useState("");
    const [Etat,setEtat] = useState("");
    const [Type,setType] = useState("");


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
            Typess:Type,
            idP: localStorage.getItem("idProjet")
        });       
    } catch (error) {
        console.error("Erreur lors de la création de la tâche :", error);
    }window.location.href = '/welcome'; 
};


  return (
    <div class="container">
      <div class="form-container">
        <h1>Creer Tache </h1>
        <p >Type :</p>
        <select
          id="Type"
          name="Type"
          value={Type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value=""></option>
          <option value="Technique">Technique</option>
          <option value="Fonctionelle">Fonctionelle</option>
        </select>
        <p >Titre : </p>
        <input
          type="text"
          id="title"
          name="title"
          value={Titre}
          onChange={(e) => setTitre(e.target.value)}
          required
        />
        <p>Description : </p>
        <input
          type="text"
          id="description"
          name="description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <p>Effort : </p>
        <input
          type="Number"
          id="effort"
          name="effort"
          value={Effort}
          onChange={(e) => setEffort(e.target.value)}
          required
        />
        <br></br>
        <p>État :</p>
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
      
      <button onClick={handleSubmit}>Soumettre</button>
      <br></br><a className="lien" href="/welcome">Retour</a>
      </div>
      </div>

  );
}

export default CreateTache;
