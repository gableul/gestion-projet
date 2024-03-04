
import React, { useState } from 'react';
import "../styles/connexion/global.css"

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
    < div>
    <form onSubmit={handleSubmit}>
      <input
        className='NameConnexion'
        type="text"
        placeholder="pseudo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type='submit'>Connexion</button>
    </form>
    </div>
  );
};

export default LoginForm;