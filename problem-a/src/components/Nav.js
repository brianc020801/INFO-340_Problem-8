import React from 'react'; //import React Component

export function AboutNav() {
  return (
    <nav id="aboutLinks">
      <h2>About</h2>
      <ul className="list-unstyled">
        <li><a href="/adopt">Adopt a Pet</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/resources">Resources</a></li>
      </ul>
    </nav>
  );
}