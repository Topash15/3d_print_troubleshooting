import React from "react";
import "./style.css";
import bot from "../../assets/bot.svg";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-text-container container">
        <h1 className="hero-title">3D Printing Troubleshooting Made Simple</h1>
        <p className="hero-sub-title">
          Select your problem and I'll walk you through the rest!
        </p>
      </div>
      <div className="hero-image-container">
        <img className="hero-image" src={bot} alt="Assistant"></img>
        <a
          hidden
          href="https://www.flaticon.com/free-icons/bot"
          title="bot icons"
        >
          Bot icons created by Smashicons - Flaticon
        </a>
      </div>
      <div className="hero-action-container container">
        <a className="hero-link link" href="/view-problem-list">
          Click here to get started!
        </a>
      </div>
    </section>
  );
}

export default Hero;
