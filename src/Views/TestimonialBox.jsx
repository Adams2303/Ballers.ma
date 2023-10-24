import React from "react";

const TestimonialBox = () => (
  <div
    style={{
      backgroundColor: "black",
      color: "white",
      border: "5px solid black",
      padding: "20px",
    }}
    className="testimonial-box"
  >
    <img src="" alt="Testimonial author" />
    <p className="testimony">
      {" "}
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
    <h6 className="author-name">Lorem ipsum dolor sit amet.</h6>
    <p className="author-job"> CEO at Lorem LLC. </p>
  </div>
);

export default TestimonialBox;
