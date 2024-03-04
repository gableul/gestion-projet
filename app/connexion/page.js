"use client"

import React from 'react';
import LoginForm from '../component/LoginForm';
import axios, { Axios } from 'axios';
import "../styles/connexion/global.css"


const LoginPage = () => {


  const handleLogin = async (formData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        password: formData.password,
        nom: formData.name,
      });
  
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("id",response.data.user.id)
      window.location.href = '/welcome'; 
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  
  return (
    <div className='login-box'>
      <h1>Connexion</h1>
      <LoginForm onSubmit={handleLogin}/>
      <a className="lien" href="/signup">Creer un compte</a>
    </div>
  );
};

export default LoginPage;