import React, { Component } from 'react';

/* Takes the title for the new note */
class TextBar extends Component {
  constructor(props) {
    super(props);
    this.state = { noteTitle: '' };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState({ noteTitle: event.target.value });
    this.props.updateText(event.target.value);
  }

  render() {
    return (
      <div>
        <input id="noteTitle" onChange={this.onInputChange} placeholder="Add Note Title" value={this.state.noteTitle} />
      </div>
    );
  }


}

export default TextBar;
