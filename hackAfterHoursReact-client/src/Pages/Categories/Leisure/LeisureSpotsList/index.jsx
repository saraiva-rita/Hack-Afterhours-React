import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5005';

function LeisureList() {
  const [leisureSpots, setLeisureSpots] = useState([]);

  // To fetch the list of leisure spots, set up an effect with the `useEffect` hook:
  useEffect(() => {
    axios
      .get(`${API_URL}/leisureSpots`)
      .then((response) => {
        setLeisureSpots(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="spot-list wrapper">
      <h2 className="page-title">Leisure</h2>
      <br />
      <div className="list-content">
        {leisureSpots.map((leisureSpot) => {
          return (
            <div className="each-spot" key={leisureSpot._id}>
              <img src={leisureSpot.imgUrl} alt={leisureSpot.name} />
              <div className="each-spot-info">
                <h3>{leisureSpot.name}</h3>
                <hr />
                <p>{leisureSpot.miniDescription}</p>
              </div>
              <div className="button-list">
                <Link to={`/leisureSpots/${leisureSpot._id}`}>
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
export default LeisureList;
