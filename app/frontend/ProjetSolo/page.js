"use client"
import React, { useState,useEffect } from 'react';
import axios, { Axios } from 'axios';

function ProjetSolo(props){
    const [projects, setProjects] = useState([]);

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