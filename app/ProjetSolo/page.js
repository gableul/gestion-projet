"use client"
import React, { useState,useEffect,useRef } from 'react';
import axios, { Axios } from 'axios';

function ProjetSolo(props){
    const [projects, setProjects] = useState([]);
    const [Taches,setTaches] = useState([])
    const [Droit,setDroit] = useState(false);
    const [NomPrenom,SetNomPrenom] = useState("")
    const ID = props.Id;

    const handleEtat=(num)=>{
      if(num==0){
        return (<td>Non Commencé</td> )
      }
      else if(num==1){
        return (<td>En cours</td> )
      }
      else if(num==2){
        return (<td>Terminé</td> )
      }
    }


    useEffect(() => {
        const da = async ()=>{
        const liste = await axios.get("http://localhost:3000/api/ProjetbyId?id="+localStorage.getItem("idProjet"))
        const liste2 = await axios.post("http://localhost:3000/api/TachebyId",{liste:liste.data.data[0].Taches})
        const droits = await axios.get("http://localhost:3000/api/Droit?IdProjet="+localStorage.getItem("idProjet")+"&IdUser="+localStorage.getItem("id"));
        const data = await axios.get("http://localhost:3000/api/GetNom?id="+liste.data.data[0].Chef_Projet);
        SetNomPrenom(data.data.salarie);
        setDroit(droits.data);
        setProjects(liste.data.data);
        setTaches(liste2.data.data);
        }

        da();
      },[ID]);

      const changementTache = (id)=>{
          localStorage.setItem("IdTache",id)
          window.location.href = '/ModificationTache';  
      }

    return (
      <div>
        <h1 className='title'>Projet</h1>
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
                <td>{NomPrenom.nom} {NomPrenom.Prenom}</td>
              
              </tr>
            ))}
          </tbody>
        </table>

        {Droit.Chef ? <div> <a className="lien" href="http://localhost:3000/CreateTache">Creer Tache</a><br></br><a className="lien" href="http://localhost:3000/ModifierProjet">Modifier Projet</a></div>:Droit.Lecteur ? <div> <a className="lien" href="http://localhost:3000/CreateTache">Creer Tache</a><br></br></div>:""  }

        

        <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Effort</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {Taches.map(task =>(
            <tr key={task._id} >
                  <td>{task.Type}</td>
                  <td>{task.titre}</td>
                  <td>{task.description}</td>
                  <td>{task.effort}</td> 
                  <td>{handleEtat(task.etat)}</td>
                  <td>{Droit.Lecteur ? <button onClick={() => changementTache(task._id)}>Modifier Tache</button> : ""}</td>

            </tr>
              ))}
            </tbody>
          </table>



        
      </div>
    );
  };
  


export default ProjetSolo;

