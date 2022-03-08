import React from 'react';

const ContactCard = (props) => {
  const { contact } = props;

  return (
    <div className="card column is-3 is-one-quarter mx-0 my-3">
      <div className="card-image">
        <figure className="image">
          <img src={contact[2]} alt="Placeholder image" />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{contact[0]}</p>
            <p className="subtitle is-6">{contact[1]}</p>
          </div>
        </div>

        <div className="content">
          {contact[3]}
          <br />
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
