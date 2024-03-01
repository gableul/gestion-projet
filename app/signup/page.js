"use client"
import React from 'react';
import SignupForm from '@/app/component/SignUp';
import axios, { Axios } from 'axios';

const SignupPage = () => {
  const handleSignup = async (formData) => {
    try {
      const response = await axios.post("http://localhost:3003/users/register", {
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
    <div>
      <h1>Creer un compte</h1>
      <SignupForm onSubmit={handleSignup} />
      <a className="lien" href='/connexion'>Se connecter</a>
    </div>
  );
};

export default SignupPage;