import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:5005';

function FoodDrinkList() {
  const [foodDrinksSpots, setFoodDrinksSpots] = useState([]);

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
        {foodDrinksSpots.map((foodDrinkSpot) => {
          return (
            <div className="each-spot" key={foodDrinkSpot._id}>
              <img src={foodDrinkSpot.imgUrl} alt={foodDrinkSpot.name} />
              <div className="each-spot-info">
                <h3>{foodDrinkSpot.name}</h3>
                <hr />
                <p>{foodDrinkSpot.miniDescription}</p>
              </div>
              <div className="button-list">
                <Link to={`/foodDrinksSpots/${foodDrinkSpot._id}`}>
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
export default FoodDrinkList;
