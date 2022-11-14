import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHome } from "../Service/api";

const AllHome = () => {
  const HomePerPage = 10;
  const [allHome, setAllHome] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllHomeData();
  }, []);

  const getAllHomeData = async () => {
    const response = await getAllHome();
    setAllHome(response.data);
  };

  const indexOfLastTodo = currentPage * HomePerPage;
  const indexOfFirstTodo = indexOfLastTodo - HomePerPage;
  const currentHome = allHome.slice(indexOfFirstTodo, indexOfLastTodo);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allHome.length / HomePerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    setCurrentPage(event.target.id);
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        style={{
          display: "inline",
          margin: "5px",
          border: "1px solid blue",
          padding: "5px",
          cursor: "pointer"
        }}
        key={number}
        id={number}
        onClick={handleClick}
      >
        {number}
      </li>
    );
  });

  return (
    <div>
      {currentHome.map((data) => (
        <div key={data.id} className="card">
          <Link to={`/home/${data.id}`}>
            <div className="container">
              <h4>
                <b>{data.address}</b>
              </h4>
            </div>
          </Link>
        </div>
      ))}
      <ul>{renderPageNumbers}</ul>
    </div>
  );
};

export default AllHome;
