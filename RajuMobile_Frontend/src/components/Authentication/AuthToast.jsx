// AuthToast.jsx — Success/Error toast notification
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";

export default function AuthToast({ message, type = "success", onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // trigger enter animation
    const t1 = setTimeout(() => setVisible(true), 10);
    // auto dismiss after 3.5s
    const t2 = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400);
    }, 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onClose]);

  return (
    <div
      className="auth-toast"
      style={{
        transform: visible ? "translateY(0)" : "translateY(-20px)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.35s cubic-bezier(.4,0,.2,1), opacity 0.35s ease",
      }}
    >
      <div className={`auth-toast-inner ${type === "success" ? "toast-success" : "toast-error"}`}>
        {type === "success"
          ? <FaCheckCircle className="toast-icon" />
          : <FaTimesCircle className="toast-icon" />
        }
        <span className="toast-msg">{message}</span>
        <button onClick={() => { setVisible(false); setTimeout(onClose, 400); }} className="toast-close">
          <FaTimes />
        </button>
      </div>
    </div>
  );
}