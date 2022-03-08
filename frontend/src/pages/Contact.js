import React from 'react';
import ContactCard from '../components/ContactCard';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';


const Contact = () => {
  const Contributor = [
    ["Nils Colire", "nils.colire@epitech.eu", "/img/nils.jpg", "Mec le plus bizarre de la sys"],
    ["JB Moreau", "jean-baptiste.moreau@epitech.eu", "/img/jb.jpg", "Mr. Robot"],
    ["Théo Faupin", "théo.faupin@epitech.eu", "/img/theo.jpg", "Giga bg"],
    ["Hugo Vincent", "hugo.vincent@epitech.eu", "/img/hugo.jpg", "Expert en cyber-sécurité informatique"]
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
