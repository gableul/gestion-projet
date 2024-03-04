"use client"
import React, { useState,useEffect } from 'react';
import axios, { Axios } from 'axios';
import ProjetSolo from '../ProjetSolo/page';
import "../styles/projetAfficher/global.css"


function AfficherProjet(props){
    const [projects, setProjects] = useState([]);

    const [idProjet,setidProjet] = useState(null);

    useEffect(() => {
        const da = async ()=>{
        const liste = await axios.get("http://localhost:3000/api/Projet?id="+localStorage.getItem("id"))

        setProjects(liste.data.data)
        }

        da();
      },[props.id]);
    const Clique = (id) =>{
      setidProjet(id)
      localStorage.setItem("idProjet",id)

    }


    return (
      <div>
        <br></br>
        <h1>Liste des projets</h1>
        <div className='dropdown-content'>
        <ul className='liste-projets'>
          {projects && projects.map((project) => (
            <li key={project._id} onClick={() => Clique(project._id)} >
              <p>id : {project._id}</p>
              <p>Nom : {project.nom}</p>
              <p>Description : {project.Description}</p>
              <button>Voir informations</button>
            </li>

          ))}
        </ul>
        </div>

        {idProjet && <ProjetSolo Id={idProjet}></ProjetSolo>}
        



      
      </div>
    );
  };
  


export default AfficherProjet;