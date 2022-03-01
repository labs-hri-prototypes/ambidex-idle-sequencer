import React from 'react';

class Placeholder extends React.Component {
  render() {
    return (
      <div
        id={this.props.id}
        className="placeholder"
        style={{visibility: this.props.visibility ? "visible" : "hidden"}}
      >
        {this.props.content}
      </div>
    );
  }
}

class Video extends React.Component {
  changeSource() {

  }
  render() {
    return (
      <video
        id={this.props.id}
        className=""
        onEnded={() => videoEndHandler()}
        src={this.props.src}
      />
    );
  }
}

class Img extends React.Component {
  render() {
    return (
      <img
        id={this.props.id}
        src={this.props.src}
      />
    );
  }
}

export {Placeholder, Video, Img};

function videoEndHandler() {

}
