import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";
import { useState, useEffect } from "react";
import "./GuestLayout.css";
import { Link } from "react-router-dom";
import ParticlesBG from "./Particles/ParticlesBG";
import ToastNotification from "../Components/Toasts/Toast";
import { ToastContainer } from "react-bootstrap";

export default function GuestLayout() {
  const { userToken, showToast, setShowToast, toastMessage } =
    useStateContext();

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

  // useEffect(() => {
  //   if (toastMessage !== "") {
  //     setTimeout(() => {
  //       setShowToast(true);
  //     }, 1000);
  //   }
  // }, [toastMessage]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((currentTitle + 1) % titles.length);
      setCurrentDescription((currentDescription + 1) % descriptions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentTitle, titles.length, currentDescription, descriptions.length]);

  if (userToken) {
    return <Navigate to="/" />;
  }
  return (
    <div className="GL-parent-container">
      <ParticlesBG></ParticlesBG>
      <div
        className="GL-header z-2"
        style={{ overflow: "hidden" }}
        id="GL-header"
      >
        <Outlet />
        <div className="GL-header-top">
          <ToastContainer
            position="top-end"
            className="p-3 position-fixed"
            style={{ zIndex: 3 }}
          >
            <ToastNotification
              show={showToast}
              onHide={() => setShowToast(false)}
              message={toastMessage}
            />
          </ToastContainer>
          <div className="GL-header-contact">
            <span>+212682330508</span>
            <span>support@ballers.ma</span>
          </div>
        </div>
        <div className="GL-header-main">
          <div className="GL-header-introduction">
            <h4 className="py-1">The Ultimate Football Experience.</h4>
            <h1 className="py-1">Ballers.ma</h1>
            <h2 className="GL-animated-title ">{titles[currentTitle]}</h2>
            <p className="GL-animated-description ">
              {descriptions[currentDescription]}
            </p>
          </div>
          <Link className="py-3 link" to="signup">
            <button>Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
