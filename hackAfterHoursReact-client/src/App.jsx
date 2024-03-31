import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
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
import LandingPage from './Pages/LandingPage';

function App() {
  const location = useLocation();

  // Check if the current location is not the landing page
  const isNotLandingPage = location.pathname !== '/';

  return (
    <div>
      {isNotLandingPage && <Navbar />}
      {/* Render Navbar if not on LandingPage */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/index" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/cultureSpots" element={<CultureList />} />
        <Route path="/cultureSpots/:cultureId" element={<CultureDetails />} />
        <Route path="/leisureSpots" element={<LeisureList />} />
        <Route path="/leisureSpots/:leisureId" element={<LeisureDetails />} />
        <Route path="/foodDrinksSpots" element={<FoodDrinkList />} />
        <Route
          path="/foodDrinksSpots/:fooddrinkId"
          element={<FoodDrinkDetails />}
        />
      </Routes>
    </div>
  );
}

export default App;
