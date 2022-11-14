import axios from "axios";
const homeURL = "http://127.0.0.1:3003/home";
const usersURL = "http://127.0.0.1:3003/users";
const loginURL = "http://127.0.0.1:3003/login";

export const getAllHome = async () => {
  return await axios.get(`${homeURL}`);
};

export const getHome = async (id) => {
  return await axios.get(`${homeURL}/${id}`);
};

export const deleteHome = async (id) => {
  return await axios.delete(`${homeURL}/${id}`);
};

export const addHome = async (home) => {
  return await axios.post(homeURL, home);
};

export const updateHome = async (id, home) => {
  return await axios.put(`${homeURL}/${id}`, home);
};

export const registerUser = async (user) => {
  return await axios.post(usersURL, user);
}

export const loginUser = async (user) => {
  return await axios.post(loginURL, user);
}