const React = require('react');

// Modal Component for displaying Domo details
const DomoModal = ({ show, domo, onClose }) => {
    if (!show || !domo) return null; // Don't render if modal is not open

    return (
        <div className="domoModal">
            <div className="modalContent">
                <span className="close" onClick={onClose}>&times;</span>
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3>Name: {domo.name}</h3>
                <p>Size: {domo.size}</p>
                <p>Age: {domo.age}</p>
            </div>
        </div>
    );
};

export default DomoModal;