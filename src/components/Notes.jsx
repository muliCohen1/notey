import React from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

class Notes extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      cloudAccess: false,
    }
  }
  
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("savedNotes"))){
      this.setState({
          notes: JSON.parse(localStorage.getItem("savedNotes"))
      })
  }
    axios.get("http://localhost:5000/notes")
    .then(res => {
      this.setState({
        notes: res.data, 
      })
      this.setState({ cloudAccess: true })
    })
    .catch(error => {
      console.log(error);
      this.setState({ cloudAccess: false })
    })
  }
  
  componentDidUpdate() {
    if(!this.state.cloudAccess)
      localStorage.setItem("savedNotes", JSON.stringify(this.state.notes))
  }


  updateOuterState = (note) => {
    this.setState(prevState => ({
      notes: [...prevState.notes, note]
    })
    );
  }
  
  deleteNote = (_id) => {
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
    