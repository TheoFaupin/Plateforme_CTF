import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
import AdminTab from '../components/AdminTab';

const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [category, setCategory] = useState('web-server');
  const [data, setData] = useState([]);

  const [newCategory, setNewCategory] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState(0);
  const [flag, setFlag] = useState('');
  const [URL, setURL] = useState('');

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
        if (response.data.data.role === 2) {
          console.log("ADMIN");
          setIsAdmin(true);
        }
      })
  }, []);

  useEffect(() => {
    getChall(category);
  }, []);

  const getChall = (catog) => {
    axios
      .get("http://localhost:3000/api/chall/getChallenges/" + catog, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      })
      .then((res) => setData(res.data.data))
  };

  const displayInput = (
    <div className="field divider">
      <label className="label">Category Name</label>
      <p className="control">
        <input className="input" type="text" onKeyDown={event => setNewCategory(event.target.value)} onChange={event => setNewCategory(event.target.value)} placeholder="New category" required />
      </p>
    </div>
  );

  const createChallenge = async () => {
    var categ = newCategory;
    if (!categ || categ === '') {
      categ = (category)
    }
    await axios
      .post("http://localhost:3000/api/chall/create/" + categ + "/", {
        "name": name,
        "description": description,
        "points": points,
        "flags": flag,
        "url": URL,
        "userValidated": []
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem('token')
        },
      })
  };

  const displayChallenges = (
    <div>
      <div className="table-container">
        <table className="table is-hoverable is-fullwidth is-striped">
          <tbody>
            {data.map((chall) => (
              <AdminTab key={"Tab" + chall._id} chall={chall} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const accessPanel = (
    <div className="double-divider centered">
      <span className="title">Category</span>
      <div className="field centered divider">
        <div className="select">
          <select onChange={(e) => {
            getChall(e.target.value);
            setCategory(e.target.value);
          }}>
            <option>web-server</option>
            <option>steganography</option>
            <option>cracking</option>
            <option>programmation</option>
            <option>cryptography</option>
            <option>Add a category</option>
          </select>
        </div>
      </div>
      {category === "Add a category" ? displayInput : displayChallenges}
      <p className="divider">
        <span className="header bold">Create a new challenge in the above category:</span>
      </p>
      <div className="column is-4 is-offset-4">
        <p>
          <input className="input" type="text" onKeyDown={event => setName(event.target.value)} onChange={event => setName(event.target.value)} placeholder="Name" required />
        </p>
        <p className="divider">
          <input className="input" type="text" onKeyDown={event => setDescription(event.target.value)} onChange={event => setDescription(event.target.value)} placeholder="Description" required />
        </p>
        <p className="divider">
          <input className="input" type="text" onKeyDown={event => setPoints(parseInt(event.target.value))} onChange={event => setPoints(parseInt(event.target.value))} placeholder="Points" required />
        </p>
        <p className="divider">
          <input className="input" type="text" onKeyDown={event => setFlag(event.target.value)} onChange={event => setFlag(event.target.value)} placeholder="Flag" required />
        </p>
        <p className="divider">
          <input className="input" type="text" onKeyDown={event => setURL(event.target.value)} onChange={event => setURL(event.target.value)} placeholder="URL" required />
        </p>
        <p className="divider">
          <button className="button is-primary" onClick={createChallenge}>Submit</button>
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <Navigation />
      {!isAdmin ?
        <div className="double-divider title header">
          You do not have access to this page. Please go back to the Home page.
          <div className="divider centered">
            <button className="button is-link">
              <Link exact="true" to="/">
                Home page
              </Link>
            </button>
          </div>
        </div> : accessPanel}
    </div >
  );
};

export default AdminPanel;
