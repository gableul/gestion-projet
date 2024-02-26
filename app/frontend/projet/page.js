"use client"
import React, { useState,useEffect } from 'react';
import axios, { Axios } from 'axios';
import ListSalarieEcriture from '@/app/component/listSalarieEcriture';
import ChefProjet from '@/app/component/chefProjet';
import ListSalarieLecture from '@/app/component/listSalarieLecture';






const App = () => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [liste_salarie,setListe_salarie] = useState([]);







    function handleInputChange(e){
        setInput1(e.target.value)

    }
    function handleInputChange2(e){
        setInput2(e.target.value)

    }
    
    

    async function handleClick(){
        const data = await axios.post("http://localhost:3001/"+input1+"/"+input2+"/"+chefprojet , {Lecture :lecture,Ecriture : ecriture})
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
      <div>
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
      <p>Description :</p>

      <input
        type="text"
        value={input2}
        onChange={handleInputChange2}
      />

    </div>
          <ChefProjet liste_salarie={liste_salarie}></ChefProjet>
          <br></br>
          <ListSalarieLecture liste_salarie={liste_salarie} ></ListSalarieLecture>
          <br></br>
          <ListSalarieEcriture liste_salarie={liste_salarie} ></ListSalarieEcriture>
          <br></br>
            <button onClick={handleClick}>Creer Projet</button>
        </div>
      );
};

export default App;
