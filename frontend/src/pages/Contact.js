import React from 'react';
import ContactCard from '../components/ContactCard';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';


const Contact = () => {
  const Contributor = [
    ["Nils Colire", "nils.colire@epitech.eu", "/img/nils.jpg", "Backend"],
    ["JB Moreau", "jean-baptiste.moreau@epitech.eu", "/img/jb.jpg", "Challenge"],
    ["Théo Faupin", "théo.faupin@epitech.eu", "/img/theo.jpg", "Frontend"],
    ["Hugo Vincent", "hugo.vincent@epitech.eu", "/img/hugo.jpg", "Challenge"]
  ]

  return (
    <div className="header">
      < Navigation />
      < Logo />
      <ul className="divider columns is-multiline is-centered">
        {Contributor.map((contact) => (
          < ContactCard key={"Cards" + contact[0]} contact={contact} />
        ))}
      </ul>
    </div>
  );
};

export default Contact;
