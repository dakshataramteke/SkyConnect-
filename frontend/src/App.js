
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import 'react-quill/dist/quill.snow.css';
import './App.css';
import LoginPage from './components/MainPage/LoginPage';
import SignUpPage from './components/MainPage/SignUpPage';
import Navbar from './components/HomePage/Navbar';
import Pricing from './components/PricingPlans/Pricing';
import SingleMail from './components/Mails/SingleMail';
import ImportContact from './components/Mails/ImportContact.jsx';
import ContactMail from './components/Contact/ContactMail.jsx';

function App() {
  return (
    <BrowserRouter>
      <AppWithAuthCheck />
    </BrowserRouter>
  );
}

function AppWithAuthCheck() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const SECRET_KEY = "abhishek";
    const userCookie = Cookies.get('user');
    console.log('User Cookie:', userCookie);

    let decrypted = null;
    if (userCookie) {
      decrypted = CryptoJS.AES.decrypt(userCookie, SECRET_KEY).toString(CryptoJS.enc.Utf8);
      decrypted = JSON.parse(decrypted);
      console.log("Decrypted data:", decrypted);
    } else {
      console.log("No user cookie found.");
    }

    const adminUsername = "dakshataramteke00@gmail.com";

    console.log("Admin username:", adminUsername, "and decrypted:", decrypted);

    if (adminUsername !== decrypted) {
      console.log("Authentication failed!");
      setIsAuthenticated(false);
      navigate('/');
    } else {
      console.log("Authentication successful!");
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/home" element={<Navbar />}>
        <Route path="Pricing" element={<Pricing />} />
        <Route path="SingleMail" element={<SingleMail />} />
        <Route path="MultipleMail" element={<ImportContact />} />
        <Route path="/home/Contact" element={<ContactMail/>}/>
      </Route>
      {/* Add other routes here as needed */}
    </Routes>
  );
}

export default App;