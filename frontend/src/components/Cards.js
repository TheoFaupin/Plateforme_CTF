import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cards = (props) => {
  const { category } = props;
  const numberOfChallenge = category.challenges.length;
  let progress;
  const [value, setValue] = useState(0);

  const getProgressBar = (value) => {
    var res = value / numberOfChallenge;
    if (res <= 33 / 100) {
      return ("progress is-medium is-danger")
    } else if (res <= 66 / 100) {
      return ("progress is-medium is-warning")
    } else {
      return ("progress is-medium is-success")
    }
  };

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
        let a = 0;
        category.challenges.forEach((element) => {
          (element.userValidated).forEach((e) => {
            if (e === response.data.data._id)
              a++;
          });
        });
        setValue(a);
      })
  }, []);

  progress = getProgressBar(value);
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

  return (
    <div className="card column is-3 mx-3 my-3">
      <Link to={"/challenges/" + category.name} >
        <div className="card-image">
          <figure className="image has-image-centered is-128x128">
            <img src={"/img/" + category.icons} alt="Web Logo" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">
                {capitalize(category.name)}
              </p>
              <p className="subtitle is-6">
                {numberOfChallenge + " Challenge" + ((numberOfChallenge > 1) ? "s" : "")}
              </p>
            </div>
          </div>
          <progress className={progress} value={value} max={numberOfChallenge}></progress>
          {Number((value / numberOfChallenge) * 100).toFixed(2) + "% passed"}
        </div>
      </Link>
    </div>
  );
};

export default Cards;
