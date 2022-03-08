import React, { useState, useEffect } from "react";
import Navigation from '../components/Navigation';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import RenderLogin from "../components/RenderLogin";
import { toast, ToastContainer } from "react-toastify";

const SingleChallenge = () => {
  const { challid } = useParams();
  const [data, setData] = useState([]);
  const isAuth = (localStorage.getItem('token'));
  const [flag, setFlag] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/chall/getChall/" + challid)
      .then((res) => (setData(res.data.data)))
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3000/api/chall/verify/" + challid,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem('token')
      },
      data: {
        "flag": flag,
      }
    })
      .then((response) => {
        console.log(response.data.msg);
        if (response.data.msg === "GG! Flag Accepted") {
          setMessage(" is-success")
          toast.success(response.data.msg, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(response.data.msg, {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setMessage(" is-danger");
        }
      })
      .catch((error) => {
        setMessage(" is-danger");
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <div>
      <Navigation />
      {isAuth ? <div className="divider">
        <p className="header title is-1">
          {data.name}
        </p>
        <div className="column is-5">
          <p className="divider subtitle is-4">
            {"- " + data.description}
          </p>
          <span className="divider">
            <a href={data.url} target="_blank">
              <button className="button is-link">Go to Challenge</button>
            </a>
          </span>
          <div className="field divider has-addons">
            <div className="control">
              <input className={"input" + message} type="text" onChange={event => setFlag(event.target.value)} onKeyDown={handleKeyDown} placeholder="Flag" required />
            </div>
            <div className="control">
              <button className="button is-success" onClick={handleSubmit}>Submit</button>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div > : <RenderLogin />
      }
    </div >
  );
};

export default SingleChallenge;
