import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Popup } from "react-leaflet/Popup";
import { Marker } from "react-leaflet/Marker";
import { deleteHome, getHome, updateHome } from "../Service/api";
import MapEvents from "./MapEvents";

const initialValue = {
  address: "",
  description: "",
  phone: ""
};

const AllHome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [home, setHome] = useState(initialValue);
  const [editHome, setEditHome] = useState(initialValue);
  const modalElement = useRef();

  useEffect(() => {
    getHomeData();
  }, []);

  const getHomeData = async () => {
    const response = await getHome(id);
    setHome(response.data);
    setEditHome(response.data);
  };

  const deleteItem = async () => {
    if (confirm('delete ?')) {
      await deleteHome(id);
      navigate("/");
    }
  };

  const editItem = (id) => {
    modalElement.current.style.display = "block";
  };

  const onValueChange = (e) => {
    setEditHome({ ...editHome, [e.target.name]: e.target.value });
  };

  const editHomeDetails = async (e) => {
    e.preventDefault();
    await updateHome(id, editHome);
    navigate("/");
  };

  return (
    <>
      {home?.length !== 0 ? (
        <div className="card">
          <div className="container">
            <h4>
              <b>{home?.address}</b>
            </h4>
            <p>{home?.phone}</p>
            <p>{home?.description}</p>

            {
              home?.coordinates?.length > 0 &&
              <MapContainer
                center={home?.coordinates}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={home?.coordinates}>
                </Marker>
              </MapContainer>
            }

            <div>
              <span onClick={deleteItem} className="act">Delete</span>
              <span onClick={editItem} className="act">Edit</span>
            </div>

            {/* modal */}
            <div ref={modalElement} className="modal">
              <div className="modal-content">
                <span
                  className="close"
                  onClick={() => (modalElement.current.style.display = "none")}
                >
                  &times;
                </span>
                <form>
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={(e) => onValueChange(e)}
                    value={editHome?.phone}
                  />
                  <br />
                  <br />

                  <label htmlFor="description">description:</label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    onChange={(e) => onValueChange(e)}
                    value={editHome?.description}
                  />
                  <br />
                  <br />

                  <label htmlFor="address">address:</label>
                  <input
                    type="text"
                    id="description"
                    name="address"
                    onChange={(e) => onValueChange(e)}
                    value={editHome?.address}
                  />
                  <br />
                  <br />


                  {
                    home?.coordinates?.length > 0 &&
                    <MapContainer
                      center={editHome?.coordinates}
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
                        }} />

                      <Marker position={editHome?.coordinates}>
                      </Marker>
                    </MapContainer>
                  }

                  <button onClick={editHomeDetails}>edit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default AllHome;
