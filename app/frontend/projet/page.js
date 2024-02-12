"use client"
import React, { useState,useEffect } from 'react';
import axios, { Axios } from 'axios';






const App = () => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [liste_salarie,setListe_salarie] = useState([]);
    const [chefprojet, setChefProjet] = useState('');
    const [ecriture, setEcriture]= useState([]);
    const [lecture, setLecture]= useState([]);
    const [selectLecture, setSelectLecture] = useState("");
    const [selectEcriture, setSelectEcriture] = useState("");





    function handleInputChange(e){
        setInput1(e.target.value)

    }
    function handleInputChange2(e){
        setInput2(e.target.value)

    }

    const handleLectureChange = (e) => {
      const selectedValue = e.target.value;
      if (!lecture.includes(selectedValue)) {
        setSelectLecture(selectedValue);
        setLecture([...lecture, selectedValue]);
      }
    };
  
    const handleEcritureChange = (e) => {
      const selectedValue = e.target.value;
      if (!ecriture.includes(selectedValue)) {
        setSelectEcriture(selectedValue);
        setEcriture([...ecriture, selectedValue]);
      }
    };
    const getNomById = (id) => {
      const selectedSalarie = liste_salarie.find((item) => item._id === id);
      return selectedSalarie ? selectedSalarie.nom : '';
    };
    

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
            value={chefprojet}
            onChange={(e) => setChefProjet(e.target.value)}
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
                        value={selectLecture}
                        onChange={handleLectureChange}
                    >
                           {liste_salarie && liste_salarie.map((item)=>(
                <option value={item._id}>{item.nom}  {item.Prenom}</option>
            ))}
                    </select>
                </label>
            </div>
            <div>
                    {lecture.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Prénom</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lecture.map((selected) => (
                                        <tr key={selected}>
                                            <td>{getNomById(selected)}</td>
                                            <td></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    )}
                    </div>
            <div>
                <label>
                    <br></br>
                    Ecriture:
                    <select
                        value={selectEcriture}
                        onChange={handleEcritureChange}
                    >
                         {liste_salarie && liste_salarie.map((item)=>(
                <option value={item._id}>{item.nom}  {item.Prenom}</option>
            ))}
                    </select>
                    <div>
                    {ecriture.length > 0 && (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Prénom</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ecriture.map((selected) => (
                                        <tr key={selected}>
                                            <td>{getNomById(selected)}</td>
                                            <td></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    )}
                    </div>
                </label>
            </div>

            <button onClick={handleClick}>Creer Projet</button>
        </div>
      );
};

export default App;
