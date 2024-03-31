import axios from 'axios';
import { useEffect, useState } from 'react';

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
        {cultureSpots.map((spot) => {
          return (
            <div className="each-spot" key={spot._id}>
              <img src={spot.imgUrl} alt={spot.name} />
              <div className="each-spot-info">
                <h3>{spot.name}</h3>
                <hr />
                <p>{spot.miniDescription}</p>
              </div>
              <div className="button-list">
                <form action={`/cultureSpots/${spot._id}`} method="get">
                  <button type="submit" className="button">
                    See more
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CultureList;
