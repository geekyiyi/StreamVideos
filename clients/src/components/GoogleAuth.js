import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    // gapi is google api library object
    //auth2 - google Auth
    window.gapi.load("client:auth2", () => {
      //create a client object after initiate
      window.gapi.client
        .init({
          clientId:
            "34572091622-apsnvji2q842suesmdfi33sll606gu40.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          //this.auth is an instance of the Google Auth object
          //must initiate the google.auth object and then call this function
          this.auth = window.gapi.auth2.getAuthInstance();
          //get isSignedIn state and set it
          this.onAuthChange(this.auth.isSignedIn.get());
          //once the isSignedIn status change, a callback function will be called
          //Listen for changes in the current user's sign-in state.
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      //call action creator and pass the userId into the redux state
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      //call signOut action creator
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    // the property of Google Auth instance
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui green google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  // isSignedIn property inside authReducer state object
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
