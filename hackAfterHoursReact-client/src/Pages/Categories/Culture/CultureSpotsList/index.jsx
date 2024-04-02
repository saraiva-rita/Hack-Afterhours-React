import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5005';

function CultureList() {
  const [cultureSpots, setCultureSpots] = useState([]);

  // To fetch the list of culture spots, set up an effect with the `useEffect` hook:
  useEffect(() => {
    axios
      .get(`${API_URL}/cultureSpots`)
      .then((response) => {
        setCultureSpots(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="spot-list wrapper">
      <h2 className="page-title">Culture</h2>
      <br />
      <div className="list-content">
        {cultureSpots.map((cultureSpot) => {
          return (
            <div className="each-spot" key={cultureSpot._id}>
              <img src={cultureSpot.imgUrl} alt={cultureSpot.name} />
              <div className="each-spot-info">
                <h3>{cultureSpot.name}</h3>
                <hr />
                <p>{cultureSpot.miniDescription}</p>
              </div>
              <div className="button-list">
                <Link to={`/cultureSpots/${cultureSpot._id}`}>
                  <button type="submit" className="button">
                    See more
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CultureList;
