
import React, { useState } from 'react';

const SignupForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, prenom, password });
  };
 

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="prenom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type='submit'>Creer le compte</button>
    </form>
    </>
  );
};

export default SignupForm;