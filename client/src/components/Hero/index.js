import React from "react";
import "./style.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text-container">
        <h1 className="hero-title">3D Printing Troubleshooting Made Simple</h1>
        <p className="hero-sub-title">
          Select your problem and I'll walk you through the rest!
        </p>
      </div>
      <div className="hero-image-container">
          <img src="http://placehold.it/" alt="Assistant"></img>
      </div>
      <div className="hero-action-container">
        <a className="hero-link link" href="/view-problems">
          Click here to get started!
        </a>
      </div>
    </section>
  );
}

export default Hero;
