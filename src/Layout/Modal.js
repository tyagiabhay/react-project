import React from "react";
import styled from "./Modal.module.css";
import ReactDOM from "react-dom";
// import { useHistory } from "react-router-dom";

const Backdrop = (props) => {
    return (<div className={styled.backdrop}  onClick={props.onclick} >
             
    </div>);
  };
  

const ModalOverlay = (props) => {
  return (
    <div className={styled.modal}>
      <div>{props.children}</div>
    </div>
  );
};

const portalElements = document.getElementById("overlays");
const Modal = (props) => {

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onclick={props.onClose} />, portalElements)};
        { ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElements
      )}
      ;
   
    </React.Fragment>
  );
};
export default Modal;

