import './style.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div id="spots-cards" className="wrapper">
      <div className="spots-question">
        <h2>What do you feel like doing?</h2>
      </div>

      {/* Spots Cards */}
      <div id="main-cards">
        <div className="card">
          <Link to="/cultureSpots">
            <img
              src="./public/images/attractions.jpg"
              className="card-img-top"
              alt="..."
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title">Culture Spots</h5>
            <Link to="/cultureSpots" className="button">
              See More
            </Link>
          </div>
        </div>
        <div className="card">
          <Link to="/fooddrinkSpots">
            <img
              src="./public/images/foodNdrink.jpg"
              className="card-img-top"
              alt="..."
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title">Food and Drink</h5>
            <Link to="/fooddrinkSpots" className="button">
              See More
            </Link>
          </div>
        </div>
        <div className="card">
          <Link to="/leisureSpots">
            <img
              src="./public/images/tours.jpg"
              className="card-img-top"
              alt="..."
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title">Leisure Spots</h5>
            <Link to="/leisureSpots" className="button">
              See More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
