import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ title, content, actions, onDismiss }) => {
  return ReactDOM.createPortal(
    //   the grey background
    <div onClick={onDismiss} className="ui dimmer modals visible active">
      <div
        onClick={(e) => e.stopPropagation()} // avoid click on the modal but cause history.push of its parent
        className="ui standard modal visible active"
      >
        <div className="header">{title}</div>
        <div className="content">{content}</div>
        <div className="actions">{actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
