"use client"
import React, { useState,useEffect,useRef } from 'react';
import axios, { Axios } from 'axios';

function ProjetSolo(props){
    const [projects, setProjects] = useState([]);
    const [Taches,setTaches] = useState([])
    const [Droit,setDroit] = useState(false);
    const ID = props.Id;
    const [IdTache,setIdTache] = useState(0)

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
        const liste = await axios.get("http://localhost:3003/ProjetbyId/"+localStorage.getItem("idProjet"))
        const liste2 = await axios.post("http://localhost:3003/TachebyId",{liste:liste.data[0].Taches})
        const droits = await axios.get("http://localhost:3003/Droit/"+localStorage.getItem("idProjet")+"/"+localStorage.getItem("id"));
        setDroit(droits.data)
        setProjects(liste.data)
        console.log(liste2.data)
        setTaches(liste2.data)
        }

        da();
      },[ID]);

      const changementTache = (id)=>{
          localStorage.setItem("IdTache",id)
          window.location.href = '/ModificationTache';

        
        console.log("ici c'est l'id que je veux voir  ::" + id)
      }
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

        {Droit.Chef ? <div> <a href="http://localhost:3000/CreateTache"><button>Creer Tache</button></a><br></br><a href="http://localhost:3000/ModifierProjet"><button>Modifier Projet</button></a></div>:Droit.Lecteur ? <div> <a href="http://localhost:3000/CreateTache"><button>Creer Tache</button></a><br></br></div>:""  }

        <ul>

        <table>
            <thead>
              <tr>
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
                  <td>{task.titre}</td>
                  <td>{task.description}</td>
                  <td>{task.effort}</td> 
                  <td>{handleEtat(task.etat)}</td>
                  <td>{Droit.Lecteur ? <button onClick={() => changementTache(task._id)}>Modifier Tache</button> : ""}</td>

            </tr>
              ))}
            </tbody>
          </table>



        </ul>
      </div>
    );
  };
  


export default ProjetSolo;


/*<table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Effort</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {Taches.map(task =>(
            <tr key={task._id}>
                  <td>{task.titre}</td>
                  <td>{task.descrip}</td>
                  <td>{task.effort}</td> 
                  {handleEtat(task.etat)}
                  <td>{Droit.Lecteur ?  <a href="http://localhost:3000/ModificationTache"><button onClick={changementTache(task)}>Modifier Tache</button></a>:""}</td>
            </tr>
              ))}
            </tbody>
          </table>*/


          /*
                  {Taches.map(task =>(
          <div>
            <li key={task._id} onClick={changementTache(task._id)}>
                <p>Nom : {task.titre}</p>
                <p>Description : {task.descrip}</p>
                <p>Effort : {task.effort}</p>
                <p>Status : {handleEtat(task.etat)}</p>
                <p>{Droit.Lecteur ?  <button>Modifier Tache</button>:""}</p>
            </li>
            
            </div>
              ))}
              */