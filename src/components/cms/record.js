import React from "react";
import { connect } from "react-redux";
import Form from "react-jsonschema-form";
import { When } from "../if";
import Auth from '../auth/auth.js';

import * as actions from "./actions.js";

const API = process.env.REACT_APP_API;

// Auto-Hide some of the mongo specific fields
const uiSchema = {
  _id: { "ui:widget": "hidden" },
  __v: { "ui:widget": "hidden" }
};

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schemas: {} };
  }

  // Runs whenever props change (pre-render)
  static getDerivedStateFromProps(props, state) {
    if (props.model && !props.schemas[props.model]) {
      let url = `${API}/${props.model}/schema`;
      props.getSchema(props.model, url);
    }
    return {};
  }


  handleError = error => {
    console.error(error);
  };

  handleSubmit = form => {
    if (form.formData._id) {
      let url = `${API}/${this.props.model}/${form.formData._id}`;
      this.props.put(this.props.model, url, form.formData);
      // this.props.clear
    } else {
      let url = `${API}/${this.props.model}`;
      this.props.post(this.props.model, url, form.formData);
    }
  };

  render() {
    return (
      <When condition={this.props.schemas[this.props.model]}>
        <Auth capability="update"><Form
          className='main-form'
          schema={this.props.schemas[this.props.model] || {}}
          uiSchema={uiSchema}
          formData={this.props.record}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          onError={this.handleError}
        /></Auth>
      </When>
    );
  }
}

const mapStateToProps = state => ({
  record: state.records.record,
  schemas: state.records.schemas,
  model: state.records.model
});

const mapDispatchToProps = (dispatch, getState) => ({
  getRecord: url => dispatch(actions.getRecord(url)),
  getSchema: (model, url) => dispatch(actions.getSchema(model, url)),
  post: (model, url, record) => dispatch(actions.post(model, url, record)),
  put: (model, url, record) => dispatch(actions.put(model, url, record))
});

export default connect(mapStateToProps, mapDispatchToProps)(Record);
