import React from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import axios from "axios";

class CreateArea extends React.Component {
  constructor() {
    super();
    this.state = {
      heading: "",
      description: "",
      expanded: false
    }
  }
  
  onChangeTitle = (event) => {
    this.setState({
      heading: event.target.value
    })
  }
  
  onChangeContent = (event) => {
    this.setState({
      description: event.target.value
    })
  }
  
  expandArea = () => {
    this.setState({
      expanded: true
    })
  }
  
  submitNote = (event) => {
    event.preventDefault();
    const note = {
      heading: this.state.heading,
      description: this.state.description,
      _id:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }
    this.props.outerState(note);
    console.log(note);
    axios.post('http://localhost:5000/notes/add', note)
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.log(error);
    })
    this.setState({
      heading: "",
      description: ""
    })
  }
  
  render() {
    return (
      <div>
      <form className="create-note">
      {this.state.expanded ? <input
        name="heading"
        onChange={this.onChangeTitle}
        value={this.state.heading}
        placeholder="Title"
        /> : null}
        <textarea
        onClick={this.expandArea}
        name="description"
        onChange={this.onChangeContent}
        value={this.state.description}
        placeholder="Take a note..."
        rows={this.state.expanded ? 3 : 1}
        />
        <Zoom in={this.state.expanded}>
        <Fab onClick={this.submitNote}><AddIcon /></Fab>
        </Zoom>
        </form> 
        </div>
        );
      }
    }
    
    export default CreateArea;
    