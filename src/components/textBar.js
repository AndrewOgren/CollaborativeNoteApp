import React, { Component } from 'react';

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
      <div id="noteTitle">
        <input onChange={this.onInputChange} value={this.state.noteTitle} />
      </div>
    );
  }


}

export default TextBar;
