import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';

function Note(props) {
  
  function handleClick() {
    props.onDelete(props._id);
  }

  return (
    <div className="note">
      <h1>{props.heading}<span className="key">{props.id}</span></h1>
      <p>{props.description}</p>
      <button onClick={handleClick} _id={props._id}><DeleteIcon /></button>
    </div>
  );
}

export default Note;
