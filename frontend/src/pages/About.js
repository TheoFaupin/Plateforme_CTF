import Navigation from "../components/Navigation";

const About = () => {
  return (
    <div className="header">
      <Navigation />
      <h1 className="title">About</h1>
      <p className="divider basic-text">
        We are four first year
        <a href="https://www.epitech.eu/" target="_blank" >
          <span className="blue bold" href="https://www.epitech.eu/">
            {" " + "Epitech" + " "}
          </span>
        </a>
        students from Montpellier who are trying to bring an infosec atmosphere at Epitech because we think each Epitech student should have the basis, whether it’s to secure their own programs or acquire thorough knowledge for future business.
      </p>
      <img src="/img/sys_new.jpg" className="divider" alt="Placeholder image" />
    </div>
  );
};

export default About;
