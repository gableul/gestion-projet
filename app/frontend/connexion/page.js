"use client"

import React from 'react';
import LoginForm from '@/app/component/LoginForm';
import axios, { Axios } from 'axios';
const LoginPage = () => {
  async function handleLogin  (formData){
    const data = await axios.post("http://localhost:3001/users/login", {password : formData.password,nom : formData.name})
  }


  return (
    <div>
      <h1>Connexion</h1>
      <LoginForm onSubmit={handleLogin} />
      <a href="/frontend/signup">Creer un compte</a>
    </div>
  );
};

export default LoginPage;