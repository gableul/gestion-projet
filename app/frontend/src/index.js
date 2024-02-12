import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Map from "./Map"
import "./style.css";
import 'leaflet/dist/leaflet.css';
import Auto from "./Autocomplete"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <App />
  </React.StrictMode>
);


