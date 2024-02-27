"use client"

import React from 'react';
import LoginForm from '@/app/component/LoginForm';
import axios, { Axios } from 'axios';
import Cookies from 'js-cookie';


const LoginPage = () => {


  const handleLogin = async (formData) => {
    console.log(formData)
    try {
      const response = await axios.post("http://localhost:3003/users/login", {
        password: formData.password,
        nom: formData.name,
      });
  
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("id",response.data.user.id)
      window.location.href = '/frontend/welcom'; 
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