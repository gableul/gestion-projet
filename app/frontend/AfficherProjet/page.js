"use client"
import React, { useState,useEffect } from 'react';
import axios, { Axios } from 'axios';
import ProjetSolo from '../ProjetSolo/page';


function AfficherProjet(props){
    const [projects, setProjects] = useState([]);
    const [affiche,setaffiche] = useState(false)
    const [idProjet,setidProjet] = useState(null);

    useEffect(() => {
        const da = async ()=>{
        const liste = await axios.get("http://localhost:3003/Projet/"+localStorage.getItem("id"))
        console.log(liste.data)
        setProjects(liste.data)
        }

        da();
      },[props.id]);
    const Clique = (id) =>{
      setidProjet(id)
      localStorage.setItem("idProjet",id)
      console.log(localStorage.getItem("idProjet"))
    }


    return (
      <div>
        <h1>Liste des projets</h1>
        <ul>
          {console.log(projects)}
          {projects && projects.map((project) => (
            <li key={project._id} onClick={() => Clique(project._id)} >
              <p>id : {project._id}</p>
              <p>Nom : {project.nom}</p>
              <p>Description : {project.Description}</p>
              <button>Clique ici</button>
            </li>

          ))}
        </ul>

        {idProjet && <ProjetSolo Id={idProjet}></ProjetSolo>}
        



      
      </div>
    );
  };
  


export default AfficherProjet;