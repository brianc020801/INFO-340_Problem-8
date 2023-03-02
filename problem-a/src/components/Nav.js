import React from 'react'; //import React Component
import { NavLink } from 'react-router-dom';

export function AboutNav() {
  return (
    <nav id="aboutLinks">
      <h2>About</h2>
      <ul className="list-unstyled">
        <li><NavLink to="/adopt">Adopt a Pet</NavLink></li>
        <li><NavLink to="/about">About Us</NavLink></li>
        <li><NavLink to="/resources">Resources</NavLink></li>
      </ul>
    </nav>
  );
}