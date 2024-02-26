"use client"
import React from 'react';
import SignupForm from '@/app/component/SignUp';

const SignupPage = () => {
  const handleSignup = (formData) => {
    // Gérer la soumission du formulaire (par exemple, soumettre les données au backend)
    console.log('Submitted:', formData);
  };

  return (
    <div>
      <h1>Creer un compte</h1>
      <SignupForm onSubmit={handleSignup} />
      <a href='/frontend/connexion'>Se connecter</a>
    </div>
  );
};

export default SignupPage;