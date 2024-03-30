import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contacts from './Pages/ContactsPage';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import CultureList from './Pages/Categories/Culture/CultureSpotsList';
import CultureDetails from './Pages/Categories/Culture/CultureSpotsDetails';
import LeisureList from './Pages/Categories/Leisure/LeisureSpotsList';
import LeisureDetails from './Pages/Categories/Leisure/LeisureSpotsDetails';
import FoodDrinkList from './Pages/Categories/FoodDrink/FoodDrinkSpotsList';
import FoodDrinkDetails from './Pages/Categories/FoodDrink/FoodDrinkSpotsDetails';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/cultureSpots" element={<CultureList />} />
        <Route path="/cultureSpots/:cultureId" element={<CultureDetails />} />
        <Route path="/leisureSpots" element={<LeisureList />} />
        <Route path="/leisureSpots/:leisureId" element={<LeisureDetails />} />
        <Route path="/fooddrinksSpots" element={<FoodDrinkList />} />
        <Route
          path="/fooddrinkSpots/:fooddrinkId"
          element={<FoodDrinkDetails />}
        />
      </Routes>
    </div>
  );
}

export default App;
