import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';

function Note(props) {
  return (
    <div className="note">
      <h1>{props.heading}<span className="key">{props.id}</span></h1>
      <p>{props.description}</p>
      <button onClick={() => props.onDelete(props._id)} _id={props._id}><DeleteIcon /></button>
    </div>
  );
}

export default Note;
