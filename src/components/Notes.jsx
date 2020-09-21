import React from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

class Notes extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: []
    }
    this.updateOuterState = this.updateOuterState.bind(this);
    this.deleteNote = this.deleteNote.bind(this); 
  }
  
  componentDidMount() {
    axios.get("http://localhost:5000/notes")
    .then(res => {
      this.setState({
        notes: res.data, 
      })
      console.log(res.data);
    })
    .catch(error => {
      console.log(error);
    })
  }
  
  updateOuterState(note) {
    this.setState(prevState => ({
      notes: [...prevState.notes, note]
    })
    );
  }
  
  deleteNote(_id) {
    this.setState(prevState => ({
      notes: prevState.notes.filter(noteItem => noteItem._id !== _id)
    })
    );
    axios.delete('http://localhost:5000/notes/' + _id)
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.log(_id);
    })
  }
  
  render() {
    return (
      <div>
      <CreateArea outerState={this.updateOuterState}/>
      {this.state.notes.map((note, index) => {
        ++index;
        return (
          <Note
          key={index}
          id={index}
          _id={note._id}
          heading={note.heading}
          description={note.description}
          onDelete={this.deleteNote}
          />
          )}
          )
        }
        </div>
        )
      }
    }
    export default Notes;
    