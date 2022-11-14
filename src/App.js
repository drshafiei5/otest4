import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AddHome from "./Components/AddHome";
import AllHome from "./Components/AllHome";
import TheHome from "./Components/TheHome";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Nav from "./Components/Nav";
import { getFromLs } from "./Service/ls";
import "./styles.css";

export default function App() {
  const [auth, setAuth] = useState(getFromLs('user')?.accessToken?.length > 0 ? true : false);

  return (
    <>
    <Router>
    <Nav auth={auth} setAuth={setAuth} />
      <Routes>
        <Route path="/" element={<AllHome />} />
        <Route path="/add" element={auth ? <AddHome /> : <Navigate to={'/signin'} />} />
        <Route path="/home/:id" element={auth ? <TheHome /> : <Navigate to={'/signin'} />} />
        <Route path="/register" element={<SignUp setAuth={setAuth} />} />
        <Route path="/signin" element={<SignIn setAuth={setAuth} />} />
      </Routes>
    </Router>
    </>
  );
}
