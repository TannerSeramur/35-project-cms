import React from "react";
import { connect } from "react-redux";
import Auth from '../auth/auth.js';

import { When } from "../if";

import * as actions from "./actions.js";

import '../../styles/main.scss';

const styles = {
  clickable: { cursor: "pointer" },
  delete: {
    color: "red",
    cursor: "pointer",
    marginLeft: ".5em"
  }
};

const API = process.env.REACT_APP_API;

class Records extends React.Component {
  getRecord = id => {
    console.log(id, 'hi id');
    let url = `${API}/${this.props.model}/${id}`;
    this.props.getRecord(url);
  };

  deleteRecord = id => {
    let url = `${API}/${this.props.model}/${id}`;
    this.props.deleteRecord(this.props.model, id, url);
  };

  render() {
    return (
      <When condition={this.props.model}>
        <ul className='records-ul'>
          {this.props.records.map((record, i) => (
            <li key={record._id}>
              <span
                style={styles.clickable}
                onClick={() => this.getRecord(record._id)}
              >
                {record.name}
              </span>
              <Auth capability="delete">
                <span
                  style={styles.delete}
                  onClick={() => this.deleteRecord(record._id)}
                >
                  x
              </span>
              </Auth>
            </li>
          ))}
        </ul>
      </When>
    );
  }
}

const mapStateToProps = state => ({
  records: state.records.records,
  model: state.records.model
});

const mapDispatchToProps = (dispatch, getState) => ({
  getRecord: url => dispatch(actions.getRecord(url)),
  deleteRecord: (model, id, url) => dispatch(actions.destroy(model, id, url)),
  clearRecord: () => dispatch(actions.clearRecord())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Records);
