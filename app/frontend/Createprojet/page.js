"use client"
import React, { useState,useEffect } from 'react';
import axios, { Axios } from 'axios';
import ListSalarieEcriture from '@/app/component/listSalarieEcriture';
import ChefProjet from '@/app/component/chefProjet';
import ListSalarieLecture from '@/app/component/listSalarieLecture';






function CreateProjet  () {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [liste_salarie,setListe_salarie] = useState([]);
    const [lecture, setLecture]= useState([]);
    const [Chef_Projet,setChef_Projet] = useState("");
    const [Ecriture,setEcriture] = useState("")






    function handleInputChange(e){
        setInput1(e.target.value)

    }
    function handleInputChange2(e){
        setInput2(e.target.value)

    }
    
    

    async function handleClick(){
        console.log("Lecture : "+lecture+" Ecriture : "+ Ecriture+" Chef : "+Chef_Projet)
        const data = await axios.post("http://localhost:3003/creerProjet/"+input1+"/"+input2+"/"+ Chef_Projet , {Lecture :lecture,Ecriture : Ecriture})
    }


    useEffect(() => {
        const da = async ()=>{
        const liste = await axios.get("http://localhost:3003/Salarie")
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
          <ChefProjet liste_salarie={liste_salarie} Chef={Chef_Projet} setChef={setChef_Projet}></ChefProjet>
          <br></br>
          <ListSalarieLecture liste_salarie={liste_salarie} lecture={lecture} setlecture={setLecture} ></ListSalarieLecture>
          <br></br>
          <ListSalarieEcriture liste_salarie={liste_salarie} ecriture={Ecriture} setecriture={setEcriture}></ListSalarieEcriture>
          <br></br>
            <button onClick={handleClick}>Creer Projet</button>
        </div>
      );
};

export default CreateProjet;
