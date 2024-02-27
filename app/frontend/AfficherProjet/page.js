"use client"
import React, { useState,useEffect } from 'react';
import axios, { Axios } from 'axios';
import ProjetSolo from '../ProjetSolo/page';


function AfficherProjet(props){
    const [projects, setProjects] = useState([]);
    const [affiche,setaffiche] = useState(false)

    useEffect(() => {
        const da = async ()=>{
        const liste = await axios.get("http://localhost:3003/Projet/"+props.id)
        console.log(liste.data)
        setProjects(liste.data)
        }

        da();
      },[]);
    return (
      <div>
        <h1>Liste des projets</h1>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>

            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project._id}>
                <td>{project.nom}</td>
                <td>{project.Description}</td>
                <td><button onClick={setaffiche(!affiche)}>Afficher Projet</button></td>
              </tr>
            ))}
          </tbody>
        </table>

      
      </div>
    );
  };
  


export default AfficherProjet;