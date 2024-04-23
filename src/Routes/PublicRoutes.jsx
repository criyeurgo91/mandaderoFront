import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavbarPublic from '../ComponentsPublic/NavbarPublic/NavbarPublic';
import Home from '../ComponentsPublic/HomeLanding/Home';
import CardAbout from '../ComponentsPublic/Cards/CardAbout';
import CardService from '../ComponentsPublic/Cards/CardService';
import CardTeam from '../ComponentsPublic/Cards/CardTeam';
import Function from '../ComponentsPublic/Function/Function';
import LandingPage from '../PagesPublic/LandingPage';

const PublicRoutes = () => {
  return (
    <div>
      <NavbarPublic />
      <LandingPage/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<CardAbout />} />
        <Route path="/service" element={<CardService />} />
        <Route path="/function" element={<Function />} />
        <Route path="/team" element={<CardTeam />} />
      </Routes>
    </div>
  );
};

export default PublicRoutes;

