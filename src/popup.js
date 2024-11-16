import React, { useEffect } from 'react';
import './styles.css';

function Popup({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{message}</h2>
      </div>
    </div>
  );
}

export default Popup;