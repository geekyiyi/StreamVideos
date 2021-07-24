import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

// flv download the video stream and then convert it to some file that can actually be played
//inside of HTML normal video player <video>
class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
    // build player
    this.buildPlayer();
  }

  componentDidUpdate() {
    // every time when the component rerender(the stream has been fetched successfully),
    // the player needed to check whether built or not
    this.buildPlayer();
  }

  buildPlayer() {
    // if the player has already been built or the stream hasn't fetched yet
    if (this.player || !this.props.stream) {
      return;
    }
    //build the player
    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  //will clean up the sources the component will create
  componentWillUnmount() {
    //tell the player to stop attempting to stream video
    this.player.destroy();
  }
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    const { title, description } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream })(StreamShow);
