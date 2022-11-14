import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { addHome } from "../Service/api";
import MapEvents from "./MapEvents";

const initialValue = {
  address: "",
  description: "",
  phone: ""
};

const AddHome = () => {
  const [home, setHome] = useState(initialValue);
  const { address, description, phone } = home;

  const navigate = useNavigate();

  const onValueChange = (e) => {
    setHome({ ...home, [e.target.name]: e.target.value });
  };

  const addHomeDetails = async (e) => {
    e.preventDefault();
    console.log(home);
    await addHome(home);
    navigate("/");
  };

  return (
    <div>
      <form>
         <label htmlFor="phone">Phone:</label>
         
        <input
          type="text"
          id="phone"
          name="phone"
          onChange={(e) => onValueChange(e)}
          value={phone}
        />
        <br />
        <br />
         <label htmlFor="description">description:</label>
         
        <input
          type="text"
          id="description"
          name="description"
          onChange={(e) => onValueChange(e)}
          value={description}
        />
        <br />
        <br />
         <label htmlFor="address">address:</label>
         
        <input
          type="text"
          id="description"
          name="address"
          onChange={(e) => onValueChange(e)}
          value={address}
        />
        <br />
        <br />
        <div>
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEvents
              clickFn={(e) => {
                const coordinatesObj = {
                  target: {
                    name: "coordinates",
                    value: [e.latlng.lat, e.latlng.lng]
                  }
                };
                onValueChange(coordinatesObj);
              }}
            />
          </MapContainer>
        </div>
        <br />
        <br />
        <button onClick={addHomeDetails}>Add</button>
      </form>
    </div>
  );
};

export default AddHome;
