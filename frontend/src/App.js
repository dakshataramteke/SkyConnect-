import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import './App.css';
import LoginPage from './components/MainPage/LoginPage';
import SignUpPage from './components/MainPage/SignUpPage.jsx';
import Navbar from './components/HomePage/Navbar.jsx';
import Pricing from './components/PricingPlans/Pricing.jsx';
import SingleMail from './components/Mails/SingleMail';
import ImportContact from './components/Mails/ImportContact.jsx';
import ContactMail from './components/Contact/ContactMail.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Navbar />} >
        <Route path="/home/Pricing" element={<Pricing/>}/>
        <Route path="/home/SingleMail" element={<SingleMail/>}/>
        <Route path="/home/MultipleMail" element={<ImportContact/>}/>
        <Route path="/home/Contact" element={<ContactMail/>}/>
        </Route>
        {/* Add other routes here as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;