import React from "react";
import './style.css'

function Footer() {
  return (
    <footer>
      <ul className="footer-list">
        <li className="footer-list-item">
          <a className="footer-link" href="#">Home</a>
        </li>
        <li className="footer-list-item">
          <a className="footer-link" href="#">Feedback</a>
        </li>
        <li className="footer-list-item">
          <a className="footer-link" href="#">Contact</a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;