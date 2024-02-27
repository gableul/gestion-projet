"use client"
import React, { useState,useEffect } from 'react';
import axios, { Axios } from 'axios';

function ProjetSolo(props){
    const [projects, setProjects] = useState([]);
    const [Taches,setTaches] = useState([])
    const [Droit,setDroit] = useState(null);

 
    useEffect(() => {
        const da = async ()=>{
        const liste = await axios.get("http://localhost:3003/ProjetbyId/"+localStorage.getItem("idProjet"))
        const liste2 = await axios.post("http://localhost:3003/TachebyId",{liste:liste.data[0].Taches})

        console.log("hbjdjhb"+liste2.data)
        console.log("khgjgjfhg"+liste.data[0]._id)
        setProjects(liste.data)
        setTaches(liste2.data)
        }

        da();
      },[]);

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
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    );
  };
  


export default ProjetSolo;