import React from 'react';
import { Link } from 'react-router';

const Navbar = () => (
  <nav className="nav container">
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
      <Link to="table">Table</Link>
      <Link to="graphes">Graphes</Link>
  </nav>
);

export default Navbar;
