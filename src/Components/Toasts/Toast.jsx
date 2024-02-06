import { CloseButton } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

function ToastNotification({ onHide, show, message }) {
  return (
    <Toast
      className="text-white bg-primary border-0 rounded fade"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      onClose={onHide}
      animation
      autohide
      delay={4000}
      show={show}
      bg="primary"
    >
      <div className="d-flex">
        <Toast.Body className="fw-normal">{message}</Toast.Body>
        <CloseButton
          className="me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        />
      </div>
    </Toast>
  );
}
export default ToastNotification;
