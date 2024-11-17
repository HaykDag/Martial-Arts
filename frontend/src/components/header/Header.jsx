import { useNavigate } from "react-router-dom";
import "./header.css";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header className="header">
      <h1>Martial Arts Academy</h1>
      <nav>
        <ul>
          <li><a href="#classes">Classes</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
