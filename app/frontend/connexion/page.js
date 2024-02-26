"use client"

import React from 'react';
import LoginForm from '@/app/component/LoginForm';

const LoginPage = () => {
  const handleLogin = (formData) => {
    console.log('Submitted:', formData);
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