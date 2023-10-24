import "./DefaultLayout.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DefaultLayout() {
  const [titles, setTitles] = useState([
    "Organized Competition",
    "Community Environment",
    "Learning Platform",
  ]);
  const [descriptions, setDescriptions] = useState([
    "Experience a Well-Structured League for Optimal Competition.",
    "Connect with Like-Minded Enthusiasts in our Tight-Knit Family.",
    "Unlock your Potential with Ballers.ma's Education and Experience Tools.",
  ]);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [currentDescription, setCurrentDescription] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((currentTitle + 1) % titles.length);
      setCurrentDescription((currentDescription + 1) % descriptions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentTitle, titles.length, currentDescription, descriptions.length]);

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="header" id="header">
        <div className="header-top">
          <div className="header-contact">
            <span>+212682330508</span>
            <span>support@ballers.ma</span>
          </div>
        </div>
        <div className="header-main">
          <div className="header-introduction">
            <h4 className="py-1">The Ultimate Football Experience.</h4>
            <h1 className="py-1">Ballers.ma</h1>
            <h2 className="animated-title ">{titles[currentTitle]}</h2>
            <p className="animated-description ">
              {descriptions[currentDescription]}
            </p>
          </div>
          <Link className="py-3" to="#">
            <button className="">Hit the Pitch</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
