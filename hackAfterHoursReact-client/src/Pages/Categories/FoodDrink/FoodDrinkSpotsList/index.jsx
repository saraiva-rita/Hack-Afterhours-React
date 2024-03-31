import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5005';

function FoodDrinkList() {
  const [fooddrinksSpots, setFoodDrinksSpots] = useState([]);

  // To fetch the list of food and drinks spots, set up an effect with the `useEffect` hook:
  useEffect(() => {
    axios
      .get(`${API_URL}/foodDrinksSpots`)
      .then((response) => {
        setFoodDrinksSpots(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="spot-list wrapper">
      <h2 className="page-title">Food and Drinks</h2>
      <br />
      <div className="list-content">
        {fooddrinksSpots.map((spot) => {
          return (
            <div className="each-spot" key={spot._id}>
              <img src={spot.imgUrl} alt={spot.name} />
              <div className="each-spot-info">
                <h3>{spot.name}</h3>
                <hr />
                <p>{spot.miniDescription}</p>
              </div>
              <div className="button-list">
                <form action={`/foodDrinksSpots/${spot._id}`} method="get">
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
export default FoodDrinkList;
