import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import Navigation from '../components/Navigation';
import Tab from '../components/Tab';
import axios from "axios";
import RenderLogin from "../components/RenderLogin";
import '@fortawesome/fontawesome-free/css/all.min.css'

const Category = (props) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const isAuth = (localStorage.getItem('token'));
  const [once, setOnce] = useState(true);
  const [sortedData, setSortedData] = useState([]);

  const setCharAt = (str, index, chr) => {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    s = setCharAt(s, 0, s.charAt(0).toUpperCase())
    for (let i = 1; i < s.length; i++) {
      if (s.charAt(i - 1) === '-')
        return setCharAt(s, i, s.charAt(i).toUpperCase())
    }
    return s
  }

  useEffect(() => {
    if (once) {
      axios
        .get("http://localhost:3000/api/chall/getChallenges/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        })
        .then((res) => {
          setData(res.data.data);
          setOnce(false);
        });
    }
    const sortChall = () => {
      const chall = Object.keys(data).map((i) => data[i]);
      const sortedChall = chall.sort((a, b) => {
        return a.points - b.points;
      });
      setSortedData(sortedChall);
    }
    sortChall();
  }, [data]);

  return (
    <div className="header">
      <Navigation />
      {isAuth ? <div className="title">
        <table className="table is-fullwidth divider">
          <tbody>
            <th className="hard-bold">
              {capitalize(id)}
            </th>
            <tr></tr>
          </tbody>
        </table>
        <div className="table-container">
          <table className="table is-hoverable is-fullwidth is-striped">
            <tbody>
              <th>
                <span className="icon">
                  <i className="fas fa-tag"></i>
                </span>
                {" Challenge Name"}
              </th>
              <th>
                <span className="icon">
                  <i className="fas fa-bullseye"></i>
                </span>
                {' Points'}
              </th>
              <th>
                <span className="icon">
                  <i className="fas fa-chart-bar"></i>
                </span>
                {" Validation"}
              </th>
              <th>
                <span className="icon">
                  <i className="fas fa-check"></i>
                </span>
                {" Validated"}
              </th>
              {sortedData.map((chall) => (
                <Tab key={"Tab" + chall._id} chall={chall} />
              ))}
            </tbody>
          </table>
        </div>
      </div> : <RenderLogin />}
    </div>
  );
};

export default Category;
