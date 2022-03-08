import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Cards from "../components/Cards";
import axios from "axios";
import RenderLogin from "../components/RenderLogin";

const Challenges = () => {
  const [data, setData] = useState([]);
  const isAuth = (localStorage.getItem('token'));

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/categories/getCategories", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      })
      .then((res) => setData(res.data.data))
  }, []);

  return (
    <div className="header">
      <Navigation />
      {isAuth ? <h1 className="title divider">
        Challenges
      </h1> : <RenderLogin />}
      <ul className="columns is-multiline is-centered">
        {data.map((category) => (
          <Cards key={"Cards" + category._id} category={category} />
        ))}
      </ul>
    </div>
  );
};

export default Challenges;
