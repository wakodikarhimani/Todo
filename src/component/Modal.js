import React from "react";
import "./Modal.css";
import {useDispatch,useSelector} from 'react-redux';


function Modal({ setOpenModal,moveBack,moveComplete }) {
  let dispatch=useDispatch();

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>You want to move this to todo or Completed?</h1>
        </div>
        {/* <div className="body">
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div> */}
        <div className="footer">
          <button
            onClick={moveBack}
            id="cancelBtn"
          >
            Todo
          </button>
          <button onClick={moveComplete}>Completed</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;