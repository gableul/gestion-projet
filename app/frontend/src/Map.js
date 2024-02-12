import React from 'react';
import { MapContainer, TileLayer, Polyline,Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "./style.css";
import { Icon} from "leaflet";



function Map(props) {
    const {position} = props;
    const {user} = props

    const customIcon = new Icon({
      
      iconUrl: require("./place.png"),
      iconSize: [38, 38] // size of the icon
    });

  
    return (
      
      <MapContainer
        center={user}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position && <Polyline
        positions={position}
        color="blue"
      />}
        

        {user && <Marker position={user} icon={customIcon}>
    </Marker>}
        
       
        
      </MapContainer>
    );
  }
  
  export default Map;
  