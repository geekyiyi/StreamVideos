import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        {/* Field component has its own form props object being passed in its
                "component" property and input is one property of it, which also has value and onChange property*/}
        {/* meta contains the error message from validate */}
        <input {...input} autoComplete="off" />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  renderError({ error, touched }) {
    //touched is a property of meta of the Field that whether the element is being touched
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      // onSubmit is the property of form element
      // this.props.handleSubmit is the property of the redux form, it already has default event.preventDefault()
      //this.onSubmit is the function we made as a callback function once the form being submitted
      // this.props.handleSubmit passes all the formvalue into its callback function
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        {/* In Field, component property will include an element or function return some elemnt 
            that is going to be shown on the screen */}
        {/* {Any extra non-default property(label) we put inside Field element will be passed into component as a prop } */}
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

//redux form validate function
const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  // if return an empty object, then redux form think the form is no errors and can be submitted
  // if return an object with name of the field and message, it means there is error
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);

