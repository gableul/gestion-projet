"use client"

import React from 'react';
import LoginForm from '@/app/component/LoginForm';
import axios, { Axios } from 'axios';
const LoginPage = () => {
  const handleLogin = async (formData) => {
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        password: formData.password,
        nom: formData.name,

      });
  
      // Gérer la réponse, par exemple afficher un message de succès ou rediriger l'utilisateur
      console.log("Login successful!", response.data);
    } catch (error) {
      // Gérer les erreurs, par exemple afficher un message d'erreur ou des détails sur la console
      console.error("Login failed:", error);
    }
  };
  
  return (
    <div>
      <h1>Connexion</h1>
      <LoginForm onSubmit={handleLogin} />
      <a href="/frontend/signup">Creer un compte</a>
    </div>
  );
};

export default LoginPage;