import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav>
      <div className="nav-title-container">
        <h1 className="nav-web-title">3D Help</h1>
        <h2 className="nav-web-subtitle">
          3D Printer troubleshooting made simple
        </h2>
      </div>
      <ul className="nav-list">
        <li className="nav-list-item">
          <a className="nav-link" href="/">
            Home
          </a>
        </li>
        <li className="nav-list-item">
          <a className="nav-link" href="/feedback">
            Feedback
          </a>
        </li>
        <li className="nav-list-item">
          <a className="nav-link" href="/mod-entry">
            Create Entry
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
