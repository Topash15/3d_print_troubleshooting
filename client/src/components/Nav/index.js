import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav>
      <div className="nav-title-container">
        <a className="nav-link link" href="/">
          <h1 className="nav-web-title">3D Assistant</h1>
        </a>
      </div>
      <ul className="nav-list">
        <li className="nav-list-item">
          <a className="nav-link link" href="/view-problem-list">
            View Problems
          </a>
        </li>
        <li className="nav-list-item">
          <a className="nav-link link" href="/feedback">
            Feedback
          </a>
        </li>
        <li className="nav-list-item">
          <a className="nav-link link" href="/mod-entry">
            Create Entry
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
