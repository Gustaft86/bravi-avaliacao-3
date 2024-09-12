import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PeopleList from './components/PeopleList';
import PersonDetails from './components/PersonDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PeopleList />} />
        <Route path="/details/:id" element={<PersonDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
