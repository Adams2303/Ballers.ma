import React from "react";
import "./mySocials.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faYoutube,
  faDiscord,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCircleHalfStroke,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";

function MySocials() {
  return (
    <div
      className="header container-fluid"
      style={{
        backgroundColor: "rgb(14, 150, 72)",
        color: "white",
      }}
    >
      <div
        className="py-3"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <FontAwesomeIcon
          className="fa-lg fa-fw"
          icon={faRankingStar}
          style={{ color: "white", paddingRight: "10px" }}
        />
        <p className="text-white">
          Connect, Compete, and Celebrate with Ballers.ma - The Ultimate
          Football Enthusiast Community!
        </p>
      </div>
      <div className="icons">
        <a className="icon" href="https://twitter.com">
          <FontAwesomeIcon icon={faTwitter} style={{ color: "#1da1f2" }} />
        </a>
        <a className="icon" href="https://youtube.com">
          <FontAwesomeIcon icon={faYoutube} style={{ color: "#ff0000" }} />
        </a>
        <a className="icon" href="https://discord.gg">
          <FontAwesomeIcon icon={faDiscord} style={{ color: "#5865f2" }} />
        </a>
        <a className="icon" href="https://instagram.com">
          <FontAwesomeIcon icon={faInstagram} style={{ color: "#e1306c" }} />
        </a>
        <div className="seperated"></div>
        <button className="btn" href="#">
          <FontAwesomeIcon
            icon={faCircleHalfStroke}
            style={{
              color: "#eeff00",
              fill: "rgb(17, 18, 17)",
              width: "14px",
              height: "14px",
              display: "block",
            }}
          />
        </button>
      </div>
    </div>
  );
}
export default MySocials;
