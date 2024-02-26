
import React, { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    setName("")
    setPassword("")
    e.preventDefault();
    onSubmit({ name, password });
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
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type='submit'>Connexion</button>
    </form>
    </>
  );
};

export default LoginForm;