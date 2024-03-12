"use client"
import React from 'react';
import SignupForm from '../component/SignUp';
import axios, { Axios } from 'axios';
import "../styles/signUp/global.css"

const SignupPage = () => {
  const handleSignup = async (formData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/register", {
        password: formData.password,
        nom: formData.name,
        prenom: formData.prenom
      });
  
      // Gérer la réponse, par exemple afficher un message de succès ou rediriger l'utilisateur
      alert("Compte créer avec succès")
    } catch (error) {
      // Gérer les erreurs, par exemple afficher un message d'erreur ou des détails sur la console
      console.error("Signup failed:", error);
    }window.location.href = '/connexion'; 
  };
  

  return (
    <div className='login-box'>
      <h1>Creer un compte</h1>
      <SignupForm onSubmit={handleSignup} />
      <a className="lien" href='/connexion'>Se connecter</a>
    </div>
  );
};

export default SignupPage;