import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'
import axios from "axios";

const Tab = (props) => {
  const { chall } = props;
  const [icon, setIcon] = useState("fas fa-times");
  const [color, setColor] = useState("has-text-danger");

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/user/profile",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
    })
      .then((response) => {
        chall.userValidated.forEach((e) => {
          if (e === response.data.data._id) {
            setColor("has-text-success")
            return setIcon("fas fa-check")
          }
        });
      })
  }, []);

  return (
    <tr>
      <td>
        <Link to={chall._id}>{chall.name} </Link>
      </td>
      <td>{chall.points}</td>
      <td>{chall.userValidated.length}</td>
      <td className={color}>
        <i className={icon}></i>
      </td>
    </tr>
  );
};

export default Tab;
