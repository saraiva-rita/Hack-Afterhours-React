import './style.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/">
          <img src="./public/images/ironhack-symbol.png" alt="logo" />
        </Link>
        <h2>Hack AfterHours</h2>
      </div>
      <ul className="links">
        <h4>Home</h4>
        <li>
          <span className="material-symbols-outlined">dashboard</span>
          <Link to="/about">About</Link>
        </li>
        <li>
          <span className="material-symbols-outlined">share</span>
          <Link to="/contacts">Contacts</Link>
        </li>
        <hr />
        <h4>Categories</h4>
        <li>
          <span className="material-symbols-outlined">church</span>
          <Link to="/cultureSpots">Culture Spots</Link>
        </li>
        <li>
          <span className="material-symbols-outlined">fastfood</span>
          <Link to="/fooddrinkSpots">Food and Drink Spots</Link>
        </li>
        <li>
          <span className="material-symbols-outlined">water_lux</span>
          <Link to="/leisureSpots">Leisure Spots</Link>
        </li>
        <hr />
        <h4>My Account</h4>

        <li>
          <span className="material-symbols-outlined">person</span>
          <Link to="/profile">My Profile</Link>
        </li>

        <li>
          <span className="material-symbols-outlined">person_add</span>
          <Link to="/auth/signup">Sign Up</Link>
        </li>
        <li>
          <span className="material-symbols-outlined">login</span>
          <Link to="/auth/login">Login</Link>
        </li>
        <li className="logout-link">
          <span className="material-symbols-outlined">logout</span>
          <Link to="/auth/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
}
export default Navbar;
