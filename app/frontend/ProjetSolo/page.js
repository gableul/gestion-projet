"use client"
import React, { useState,useEffect,useRef } from 'react';
import axios, { Axios } from 'axios';

function ProjetSolo(props){
    const [projects, setProjects] = useState([]);
    const [Taches,setTaches] = useState([])
    const [Droit,setDroit] = useState(false);
    const ID = props.Id;
 
    useEffect(() => {
        const da = async ()=>{
        const liste = await axios.get("http://localhost:3003/ProjetbyId/"+localStorage.getItem("idProjet"))
        const liste2 = await axios.post("http://localhost:3003/TachebyId",{liste:liste.data[0].Taches})
        const droits = await axios.get("http://localhost:3003/Droit/"+localStorage.getItem("idProjet")+"/"+localStorage.getItem("id"));
        setDroit(droits.data)

        setProjects(liste.data)
        setTaches(liste2.data)
        }

        da();
      },[ID]);

    return (
      <div>
        <h1>Projet</h1>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Chef de Projet</th>

            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project._id}>
                <td>{project.nom}</td>
                <td>{project.Description}</td>
                <td>{project.Chef_Projet}</td>
                <td>{project.Taches}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {Droit.Lecteur ? Droit.Chef ? <div><button>Creer Tache</button> <br></br> <button>Modifier Tache</button> </div> :<button>Modifier Tache </button> :""}

      </div>
    );
  };
  


export default ProjetSolo;