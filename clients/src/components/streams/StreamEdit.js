import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";
import _ from "lodash";

class StreamEdit extends React.Component {
  // fetch stream with id in the url and add it into redux state - streams
  // use id to get the stream from state
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.stream.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    // react-router-dom automatically add many props to StreamEdit element when it gets rendered
    // match props contains info about url
    // can access the stream id inside match props with its params property
    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* initialValues is a special name with redux form */}
        {/* the property name will be the same as the field name in redux form */}
        <StreamForm
          // _.pick => pull out specified element from the object
          //only want title and description element from this.props.stream
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// state is the redux state, ownProps is the props of the current component
const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
