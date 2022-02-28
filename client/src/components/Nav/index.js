import React from "react";
import './style.css'

function Nav() {
  return (
    <nav>
      <h1 className="nav-web-title">3D Print Troubleshooting Guide</h1>
      <ul className="nav-list">
        <li className="nav-list-item">
          <a className="nav-link" href="/">Home</a>
        </li>
        <li className="nav-list-item">
          <a className="nav-link" href="/feedback">Feedback</a>
        </li>
        <li className="nav-list-item">
          <a className="nav-link" href="/mod-entry">Create Entry</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
