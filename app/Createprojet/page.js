"use client"
import React, { useState,useEffect } from 'react';
import axios, { Axios } from 'axios';
import ListSalarieEcriture from '../component/listSalarieEcriture';
import ChefProjet from '../component/chefProjet';
import ListSalarieLecture from '../component/listSalarieLecture';






function CreateProjet  () {
    const [Titre, setTitre] = useState('');
    const [Description, setDescription] = useState('');
    const [liste_salarie,setListe_salarie] = useState([]);
    const [lecture, setLecture]= useState([]);
    const [Chef_Projet,setChef_Projet] = useState("");
    const [Ecriture,setEcriture] = useState("")






    function handleInputChange(e){
        setTitre(e.target.value)

    }
    function handleInputChange2(e){
        setDescription(e.target.value)

    }
    
    

    async function handleClick(){
      try{
      if((lecture.length==0&&Ecriture.length==0)||Chef_Projet.length==0|Titre.length==0||lecture.length==0){
        alert("Merci de remplir tous les champs")
      }
        const data = await axios.post("http://localhost:3000/api/CreerProjet?nom="+Titre+"&description="+Description+"&chef="+ Chef_Projet , {Lecture :lecture,Ecriture : Ecriture})
      } catch (error) {
        console.error("Erreur lors de la création de la tâche :", error);
    }window.location.href = '/welcome'; 
    }


    useEffect(() => {
        const da = async ()=>{
        const liste = await axios.get("http://localhost:3000/api/Salarie")
        setListe_salarie(liste.data.salarie)
        }

        da();
      },[]);

    
    return (
      <div>
        <div>
      <label>
        Nom Du projet :
        <br></br>
      <input
        type="text"
        value={Titre}
        onChange={handleInputChange}
      />
      </label>
      <p>Description :</p>

      <input
        type="text"
        value={Description}
        onChange={handleInputChange2}
      />

    </div>
          <ChefProjet liste_salarie={liste_salarie} Chef={Chef_Projet} setChef={setChef_Projet}></ChefProjet>
          <br></br>
          <ListSalarieLecture liste_salarie={liste_salarie} lecture={lecture} setlecture={setLecture} ></ListSalarieLecture>
          <br></br>
          <ListSalarieEcriture liste_salarie={liste_salarie} ecriture={Ecriture} setecriture={setEcriture}></ListSalarieEcriture>
          <br></br>
            <button onClick={handleClick}>Creer Projet</button>
            <br></br><a className="lien" href="/welcome">Retour</a>
        </div>
      );
};

export default CreateProjet;
