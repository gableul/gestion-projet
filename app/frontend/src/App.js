import React, { useState,useEffect } from 'react';
import axios, { Axios } from 'axios';
import Map from "./Map"
import "./style.css"




const App = () => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [liste_salarie,setListe_salarie] = useState([]);
    const [select1, setSelect1] = useState('');
    const [select2, setSelect2] = useState([]);
    const [select3,setSelect3] = useState([]);
    const [liste_lecteur,setListe_lecteur] = useState([]);




    function handleInputChange(e){
        setInput1(e.target.value)

    }
    function handleInputChange2(e){
        setInput2(e.target.value)

    }

    function handleChange2(e){
        let liste = []
        liste = select2
        liste.push(e.target.value)
        setSelect2(liste);
        console.log(select2)
    }

    function handleChange(e){
        let liste = []
        liste = liste_lecteur;
        liste.push(e.target.value);
        setListe_lecteur(liste);
        console.log(liste_lecteur)
        

    }

    async function handleClick(){
        const data = await axios.post("http://localhost:3001/"+input1+"/"+input2+"/"+select1 , {Lecture :select2,Ecriture : liste_lecteur})
    }


    useEffect(() => {
        const da = async ()=>{
        const liste = await axios.get("http://localhost:3001/Salarie")
        console.log(liste.data)
        setListe_salarie(liste.data.salarie)
        }

        da();
      },[]);


 

  return (
    <div >
        <div>
      <label>
        Nom Du projet :
        <br></br>
      <input
        type="text"
        value={input1}
        onChange={handleInputChange}
      />
      </label>
      <label>
        Description :
        <br></br>
      <input
        type="text"
        value={input2}
        onChange={handleInputChange2}
      />
      </label>
    </div>
      <div>
        <label>
            <br></br>
          Chef de Projet:
          <select
            value={select1}
            onChange={(e) => setSelect1(e.target.value)}
          >
            {liste_salarie && liste_salarie.map((item)=>(
                <option value={item._id}>{item.nom}  {item.Prenom}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
            <br></br>
          Lecteur:
          <select
            value={select2}
            onChange={handleChange2}
          >
            {liste_salarie && liste_salarie.map((item)=>(
                <option value={item._id}>{item.nom}  {item.Prenom}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
            <br></br>
          Ecriture:
          <select
            value={liste_lecteur}
            onChange={handleChange}
          >
            {liste_salarie && liste_salarie.map((item)=>(
                <option value={item._id}>{item.nom}  {item.Prenom}</option>
            ))}
          </select>
        </label>
      </div>

      <button onClick={handleClick}>Creer Projet</button>


        
    
    </div>
    
  );
};

export default App;
