import './style.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="sidebar">
      <div>
        <Link to="/index" className="logo">
          <img src="/Images/ironhack-symbol.png" alt="logo" />
          <h2>Hack AfterHours</h2>
        </Link>
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
          <Link to="/cultureSpots">Culture</Link>
        </li>
        <li>
          <span className="material-symbols-outlined">fastfood</span>
          <Link to="/foodDrinksSpots">Food and Drinks</Link>
        </li>
        <li>
          <span className="material-symbols-outlined">water_lux</span>
          <Link to="/leisureSpots">Leisure</Link>
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
